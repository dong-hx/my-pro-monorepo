import { IsEmail, IsIn } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SendCodeDto {
  @ApiProperty({ example: 'admin@example.com' })
  @IsEmail()
  email!: string

  @ApiProperty({ enum: ['register', 'reset-password'] })
  @IsIn(['register', 'reset-password'])
  purpose!: 'register' | 'reset-password'
}
