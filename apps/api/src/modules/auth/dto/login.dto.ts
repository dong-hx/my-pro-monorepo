import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({ example: 'admin@example.com' })
  @IsEmail()
  email!: string

  @ApiProperty({ minLength: 8, maxLength: 128, example: 'Passw0rd!@#' })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password!: string
}
