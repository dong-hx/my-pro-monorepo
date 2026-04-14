import { HealthController } from './health.controller.js'

describe('HealthController', () => {
  it('returns service status', () => {
    const controller = new HealthController()
    const result = controller.health()

    expect(result.ok).toBe(true)
    expect(typeof result.timestamp).toBe('string')
  })
})
