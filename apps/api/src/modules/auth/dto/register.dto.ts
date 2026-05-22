import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class RegisterDto {
  @ApiProperty({ example: 'admin@example.com' })
  @IsEmail()
  email!: string

  @ApiProperty({ minLength: 8, maxLength: 72, example: 'Passw0rd!@#' })
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password!: string

  @ApiProperty({ minLength: 4, maxLength: 10, example: '123456' })
  @IsString()
  @MinLength(4)
  @MaxLength(10)
  code!: string

  @ApiPropertyOptional({ minLength: 2, maxLength: 80, example: 'Admin User' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  name?: string
}
