import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ConsentStatus = 'pending' | 'accepted' | 'declined'

interface ConsentState {
  status: ConsentStatus
  accept: () => void
  decline: () => void
}

export const useConsentStore = create<ConsentState>()(
  persist(
    (set) => ({
      status: 'pending',
      accept: () => set({ status: 'accepted' }),
      decline: () => set({ status: 'declined' }),
    }),
    { name: 'cookie-consent' },
  ),
)
