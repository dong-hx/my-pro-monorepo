import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator'

/** 取值须与 `@repo/type` 的 `UserRole` 字面量类型一致（供 class-validator 运行时使用） */
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
