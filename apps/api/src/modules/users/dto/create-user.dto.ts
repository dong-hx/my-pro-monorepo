import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator'

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

export class CreateUserDto {
  @IsEmail()
  email!: string

  @IsString()
  @MinLength(2)
  name!: string

  @IsEnum(UserRole)
  role!: UserRole
}
