import {
  BadRequestException,
  Injectable,
  Logger,
  type OnModuleInit,
} from '@nestjs/common'
import crypto from 'node:crypto'

import { PrismaService } from '../../common/database/prisma.service.js'
import { MailerService } from '../../common/mailer/mailer.service.js'
import type { VerificationPurpose } from '@repo/contracts'

const CODE_LENGTH = 6
const CODE_TTL_MINUTES = 10
const CODE_COOLDOWN_SECONDS = 60
const CLEANUP_INTERVAL_MS = 60 * 60 * 1000

@Injectable()
export class VerificationCodeService implements OnModuleInit {
  private readonly logger = new Logger(VerificationCodeService.name)
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,
  ) {}

  onModuleInit() {
    setInterval(() => {
      void this.cleanupExpired()
    }, CLEANUP_INTERVAL_MS)
  }

  private async cleanupExpired(): Promise<void> {
    try {
      const { count } = await this.prisma.verificationCode.deleteMany({
        where: {
          OR: [
            { expiresAt: { lt: new Date() } },
            { usedAt: { not: null } },
          ],
        },
      })
      if (count > 0) {
        this.logger.log(`已清理 ${count} 条过期/已用验证码`)
      }
    } catch (err) {
      this.logger.error('清理验证码失败', err)
    }
  }

  async send(email: string, purpose: VerificationPurpose): Promise<void> {
    await this.assertCooldown(email, purpose)

    const code = this.generate()
    const expiresAt = new Date(Date.now() + CODE_TTL_MINUTES * 60 * 1000)

    await this.prisma.verificationCode.create({
      data: { email, code, purpose, expiresAt },
    })

    await this.mailerService.sendVerificationCode(email, code, purpose)

    this.logger.log(`验证码已发送: ${email} [${purpose}]`)
  }

  async verify(
    email: string,
    code: string,
    purpose: VerificationPurpose,
  ): Promise<void> {
    const record = await this.prisma.verificationCode.findFirst({
      where: {
        email,
        code,
        purpose,
        usedAt: null,
        expiresAt: { gte: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    })

    if (!record) {
      throw new BadRequestException('验证码无效或已过期')
    }

    await this.prisma.verificationCode.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    })
  }

  private async assertCooldown(
    email: string,
    purpose: VerificationPurpose,
  ): Promise<void> {
    const recent = await this.prisma.verificationCode.findFirst({
      where: {
        email,
        purpose,
        createdAt: {
          gte: new Date(Date.now() - CODE_COOLDOWN_SECONDS * 1000),
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    if (recent) {
      throw new BadRequestException(
        `请求过于频繁，请 ${CODE_COOLDOWN_SECONDS} 秒后重试`,
      )
    }
  }

  private generate(): string {
    const num = crypto.randomInt(0, 10 ** CODE_LENGTH)
    return String(num).padStart(CODE_LENGTH, '0')
  }
}
