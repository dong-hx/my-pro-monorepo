import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class ResetPasswordDto {
  @IsEmail()
  email!: string

  @IsString()
  @MinLength(4)
  @MaxLength(10)
  code!: string

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  newPassword!: string
}
