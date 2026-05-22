import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ResetPasswordDto {
  @ApiProperty({ example: 'admin@example.com' })
  @IsEmail()
  email!: string

  @ApiProperty({ minLength: 4, maxLength: 10, example: '123456' })
  @IsString()
  @MinLength(4)
  @MaxLength(10)
  code!: string

  @ApiProperty({ minLength: 8, maxLength: 72, example: 'Passw0rd!@#' })
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  newPassword!: string
}
