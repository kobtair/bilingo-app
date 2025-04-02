import { create } from 'zustand'

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

export const useUserStore = create((set: any) => ({
  user: null,
  setUser: (user: UserState['user']) => set({ user }),
  logout: () => set({ user: null })
}))

