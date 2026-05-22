import { ApiProperty } from '@nestjs/swagger'

import { UserRole } from '../../../common/enums/index.js'

export class UserPublicDto {
  @ApiProperty()
  id!: string

  @ApiProperty()
  email!: string

  @ApiProperty()
  name!: string

  @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
  role!: UserRole

  @ApiProperty({ format: 'date-time' })
  createdAt!: string

  @ApiProperty({ format: 'date-time' })
  updatedAt!: string
}
