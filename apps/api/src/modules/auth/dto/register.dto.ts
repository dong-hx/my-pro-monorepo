import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class RegisterDto {
  @IsEmail()
  email!: string

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password!: string

  @IsString()
  @MinLength(4)
  @MaxLength(10)
  code!: string

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  name?: string
}
