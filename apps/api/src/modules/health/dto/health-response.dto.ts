import { ApiProperty } from '@nestjs/swagger'

export class HealthResponseDto {
  @ApiProperty()
  ok!: boolean

  @ApiProperty({ format: 'date-time' })
  timestamp!: string
}
