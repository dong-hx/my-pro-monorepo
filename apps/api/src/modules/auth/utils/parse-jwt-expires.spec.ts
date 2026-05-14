import { parseJwtExpiresToSeconds } from './parse-jwt-expires.js'

describe('parseJwtExpiresToSeconds', () => {
  it('解析 7d 为秒', () => {
    expect(parseJwtExpiresToSeconds('7d')).toBe(7 * 24 * 60 * 60)
  })

  it('解析 12h 为秒', () => {
    expect(parseJwtExpiresToSeconds('12h')).toBe(12 * 60 * 60)
  })

  it('解析 30m 为秒', () => {
    expect(parseJwtExpiresToSeconds('30m')).toBe(30 * 60)
  })

  it('无法解析时回退为 7 天', () => {
    expect(parseJwtExpiresToSeconds('invalid')).toBe(7 * 24 * 60 * 60)
  })
})
