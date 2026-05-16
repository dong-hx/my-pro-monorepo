import { plainToInstance } from 'class-transformer'
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
  validateSync,
} from 'class-validator'

class EnvVariables {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(65535)
  PORT?: number

  @IsOptional()
  @IsString()
  DATABASE_URL?: string

  @IsOptional()
  @IsIn(['development', 'staging', 'production'])
  APP_MODE?: string

  /** 生产环境必须在 .env 里配置（≥16 字符）；本地开发未配置时会自动填入仅用于开发的默认值 */
  @IsOptional()
  @IsString()
  @MinLength(16)
  JWT_SECRET?: string

  @IsOptional()
  @IsString()
  JWT_EXPIRES_IN?: string

  @IsOptional()
  @IsString()
  SMTP_HOST?: string

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(65535)
  SMTP_PORT?: number

  @IsOptional()
  @IsString()
  SMTP_USER?: string

  @IsOptional()
  @IsString()
  SMTP_PASS?: string

  @IsOptional()
  @IsString()
  SMTP_FROM?: string
}

const DEV_FALLBACK_JWT_SECRET =
  'local-dev-only-jwt-secret-min-16-chars'

export const validateEnv = (config: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(EnvVariables, config, {
    enableImplicitConversion: true,
  })

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }

  const nodeEnv =
    (config.NODE_ENV as string | undefined) ??
    process.env.NODE_ENV ??
    'development'
  const isProductionLike =
    nodeEnv === 'production' || validatedConfig.APP_MODE === 'production'

  const raw = validatedConfig.JWT_SECRET?.trim()
  if (raw && raw.length < 16) {
    throw new Error('JWT_SECRET 至少需要 16 个字符；若本地不想配置，请删除该变量以使用开发默认值。')
  }

  const hasStrongSecret = Boolean(raw && raw.length >= 16)

  if (isProductionLike && !hasStrongSecret) {
    throw new Error(
      '生产环境必须在环境变量中设置 JWT_SECRET：至少 16 位随机字符串（勿提交到 Git）。',
    )
  }

  const jwtSecret = hasStrongSecret ? raw! : DEV_FALLBACK_JWT_SECRET

  return Object.assign(validatedConfig, { JWT_SECRET: jwtSecret })
}
