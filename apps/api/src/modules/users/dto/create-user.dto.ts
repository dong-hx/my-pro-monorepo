import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

import { UserRole } from '../../../common/enums/index.js'

export { UserRole }

export class CreateUserDto {
  @ApiProperty({ example: 'editor@example.com' })
  @IsEmail()
  email!: string

  @ApiProperty({ minLength: 2, example: 'Editor User' })
  @IsString()
  @MinLength(2)
  name!: string

  @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
  @IsEnum(UserRole)
  role!: UserRole
}
