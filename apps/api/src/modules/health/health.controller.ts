import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { HealthResponseDto } from './dto/health-response.dto.js'

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOkResponse({ type: HealthResponseDto })
  health() {
    return { ok: true, timestamp: new Date().toISOString() }
  }
}
