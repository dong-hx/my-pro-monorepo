import { ApiProperty } from '@nestjs/swagger'

import { UserRole } from '../../../common/enums/index.js'

export class AuthUserViewDto {
  @ApiProperty()
  id!: string

  @ApiProperty()
  email!: string

  @ApiProperty()
  name!: string

  @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
  role!: UserRole
}
