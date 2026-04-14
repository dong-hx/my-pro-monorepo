import { plainToInstance } from 'class-transformer'
import { IsIn, IsInt, IsOptional, IsString, Max, Min, validateSync } from 'class-validator'

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
}

export const validateEnv = (config: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(EnvVariables, config, {
    enableImplicitConversion: true,
  })

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: true,
  })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }

  return validatedConfig
}
