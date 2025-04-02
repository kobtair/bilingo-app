import axios from "axios"
import { UserState } from "@/store/User/user"

interface AuthResponse {
  success: boolean;
  message?: string;
  user?: UserState
}

const api = import.meta.env.VITE_BACKEND_API

// In-memory user database for demo purposes
const users: { email: string; password: string }[] = [{ email: "test@example.com", password: "password123" }]

export async function login(email: string, password: string): Promise<AuthResponse> {
  // Simulate API call delay
  const response = await  axios.post<AuthResponse>(`${api}/login`, {
    email, password
  })

  const user = response.data;

  if (user && user.user) {
    return {
      success: true,
      user: user.user,
    }
  }

  return {
    success: false,
    message: "Invalid email or password",
  }
}

export async function register(email: string, name: string, password: string): Promise<AuthResponse> {
  try {
    const response = await axios.post<AuthResponse>(`${api}/register`, {
      email, name, password
    })

    const user = response.data;

    if (user && user.user) {
      return {
        success: true,
        user: user.user,
      }
    }
    if (user && user.message) {
      return {
        success: false,
        message: user.message,
      }
    }

    return {
      success: false,
      message: "Registration failed",
    }
  } catch (error) {
    console.error("Registration error:", error)
    return {
      success: false,
      message: error.response.data || "An error occurred during registration",  
    }
  }
}

export async function resetPassword(email: string): Promise<AuthResponse> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Check if user exists
  const user = users.find((u) => u.email === email)

  if (!user) {
    return {
      success: false,
      message: "User not found",
    }
  }

  // In a real app, this would send an email with a reset link
  return {
    success: true,
    message: "Password reset email sent",
  }
}

export async function signInWithGoogle(): Promise<AuthResponse> {
  try {
    const response = await axios.get<AuthResponse>(`${api}/auth/google`)
    const user = response.data

    if (user && user.user) {
      return {
        success: true,
        user: user.user,
      }
    }

    return {
      success: false,
      message: "Google sign-in failed",
    }
  } catch (error) {
    console.error("Google sign-in error:", error)
    return {
      success: false,
      message: "An error occurred during Google sign-in",
    }
  }
}

