import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type UserState = {
  user: {
    email: string,
    name: string,
    role: string,
    points: string
  } | null
  setUser: (user: UserState['user']) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: UserState['user']) => set({ user }),
      logout: () => set({ user: null })
    }),
    {
      name: 'user-storage', // name of the item in the storage
      storage: createJSONStorage(() => sessionStorage) // using sessionStorage
    }
  )
)

