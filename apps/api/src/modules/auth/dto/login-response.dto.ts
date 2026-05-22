import { ApiProperty } from '@nestjs/swagger'

import { AuthUserViewDto } from './auth-user-view.dto.js'

export class LoginResponseDto {
  @ApiProperty()
  accessToken!: string

  @ApiProperty()
  refreshToken!: string

  @ApiProperty({ example: 'Bearer' })
  tokenType!: 'Bearer'

  @ApiProperty({ example: 900 })
  expiresIn!: number

  @ApiProperty({ type: AuthUserViewDto })
  user!: AuthUserViewDto
}
