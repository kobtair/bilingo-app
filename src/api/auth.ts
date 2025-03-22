// Mock API functions for authentication

interface AuthResponse {
  success: boolean
  message?: string
  user?: {
    email: string
  }
}

// In-memory user database for demo purposes
const users: { email: string; password: string }[] = [{ email: "test@example.com", password: "password123" }]

export async function login(email: string, password: string): Promise<AuthResponse> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const user = users.find((u) => u.email === email && u.password === password)

  if (user) {
    return {
      success: true,
      user: { email: user.email },
    }
  }

  return {
    success: false,
    message: "Invalid email or password",
  }
}

export async function register(email: string, password: string): Promise<AuthResponse> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Check if user already exists
  if (users.some((u) => u.email === email)) {
    return {
      success: false,
      message: "User already exists",
    }
  }

  // Add user to in-memory database
  users.push({ email, password })

  return {
    success: true,
    user: { email },
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

