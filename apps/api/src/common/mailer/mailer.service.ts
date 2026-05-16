import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createTransport, type Transporter } from 'nodemailer'

interface SendMailOptions {
  to: string
  subject: string
  html: string
}

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name)
  private transporter: Transporter | null = null

  constructor(private readonly configService: ConfigService) {
    const host = this.configService.get<string>('SMTP_HOST')
    if (host) {
      this.transporter = createTransport({
        host,
        port: this.configService.get<number>('SMTP_PORT', 587),
        secure: this.configService.get<number>('SMTP_PORT', 587) === 465,
        auth: {
          user: this.configService.get<string>('SMTP_USER', ''),
          pass: this.configService.get<string>('SMTP_PASS', ''),
        },
      })
    }
  }

  async sendMail(options: SendMailOptions): Promise<void> {
    const from = this.configService.get<string>(
      'SMTP_FROM',
      'noreply@example.com',
    )

    if (!this.transporter) {
      this.logger.warn(
        `[DEV] 邮件未发送（未配置 SMTP），收件人: ${options.to}, 主题: ${options.subject}`,
      )
      this.logger.debug(`[DEV] 邮件内容:\n${options.html}`)
      return
    }

    await this.transporter.sendMail({
      from,
      to: options.to,
      subject: options.subject,
      html: options.html,
    })
    this.logger.log(`邮件已发送至 ${options.to}`)
  }

  async sendVerificationCode(
    email: string,
    code: string,
    purpose: 'register' | 'reset-password',
  ): Promise<void> {
    const purposeLabel = purpose === 'register' ? '注册' : '重置密码'
    const subject = `【验证码】您的${purposeLabel}验证码`
    const html = `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #1a1a1a;">${purposeLabel}验证码</h2>
        <p style="color: #666; font-size: 14px;">您好，您正在进行${purposeLabel}操作，验证码为：</p>
        <div style="background: #f5f5f5; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #1677ff;">${code}</span>
        </div>
        <p style="color: #999; font-size: 12px;">验证码 10 分钟内有效，请勿泄露给他人。</p>
      </div>
    `

    await this.sendMail({ to: email, subject, html })
  }
}
