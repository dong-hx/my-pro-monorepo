import { IsEmail, IsIn } from 'class-validator'

export class SendCodeDto {
  @IsEmail()
  email!: string

  @IsIn(['register', 'reset-password'])
  purpose!: 'register' | 'reset-password'
}
