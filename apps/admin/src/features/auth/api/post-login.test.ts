import { beforeEach, describe, expect, it, vi } from 'vitest'

import { httpClient } from '@/shared/api/http-client'

import { postLogin } from './post-login'

vi.mock('@/shared/api/http-client', () => ({
  httpClient: {
    post: vi.fn(),
  },
}))

describe('postLogin', () => {
  beforeEach(() => {
    vi.mocked(httpClient.post).mockReset()
  })

  it('POST /auth/login 并返回 data', async () => {
    const payload = { email: 'a@b.com', password: '12345678' }
    const response = {
      accessToken: 't',
      tokenType: 'Bearer' as const,
      expiresIn: 3600,
      user: {
        id: '1',
        email: 'a@b.com',
        name: 'A',
        role: 'admin' as const,
      },
    }
    vi.mocked(httpClient.post).mockResolvedValue({ data: response })

    await expect(postLogin(payload)).resolves.toEqual(response)
    expect(httpClient.post).toHaveBeenCalledWith('/auth/login', payload)
  })
})
