import { useCallback, useEffect, useRef, useState } from 'react'

export function useCountdown(seconds = 60) {
  const [remaining, setRemaining] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    clear()
    setRemaining(seconds)
    timerRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clear()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [seconds, clear])

  useEffect(() => clear, [clear])

  return { remaining, isActive: remaining > 0, start }
}
