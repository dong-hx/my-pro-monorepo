/** 将 `7d` / `12h` 等转为秒，供响应 `expiresIn` 使用（与 jsonwebtoken 约定一致） */
export function parseJwtExpiresToSeconds(input: string): number {
  const trimmed = input.trim()
  const match = /^(\d+)([smhd])$/i.exec(trimmed)
  if (!match) {
    return 7 * 24 * 60 * 60
  }
  const value = Number(match[1])
  const unit = match[2].toLowerCase()
  const mult: Record<string, number> = {
    s: 1,
    m: 60,
    h: 60 * 60,
    d: 24 * 60 * 60,
  }
  return value * (mult[unit] ?? 7 * 24 * 60 * 60)
}
