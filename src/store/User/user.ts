import { create } from 'zustand'

type UserState = {
 isLogged: boolean
 login: () => void
  logout: () => void
}

const useUserStore = create((set: any) => ({
 isLogged: false,
  login: () => {
    
    set({ isLogged: true })
  }, 
  logout: () => {
    set({ isLogged: false })
  }
}))

