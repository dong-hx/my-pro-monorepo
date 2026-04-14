import { useQuery } from '@tanstack/react-query'

import { httpClient } from '@/shared/api/http-client'

interface HealthResponse {
  ok: boolean
  timestamp: string
}

const fetchHealth = async () => {
  const { data } = await httpClient.get<HealthResponse>('/health')
  return data
}

export const useHealthQuery = () =>
  useQuery({
    queryKey: ['health-status'],
    queryFn: fetchHealth,
  })
