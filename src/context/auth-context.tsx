import { createContext, useContext, useState, type PropsWithChildren } from 'react'

import type { AuthUser, TokenResponse } from '@/types/auth'
import { decodeJwt, tokenStorage } from '@/utils/token'

interface AuthContextValue {
  user: AuthUser | null
  isLoggedIn: boolean
  setAuth: (tokens: TokenResponse) => void
  clearAuth: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(() => tokenStorage.getUser())

  function setAuth(tokens: TokenResponse) {
    tokenStorage.setTokens(tokens)
    const decoded = decodeJwt(tokens.accessToken)
    tokenStorage.setUser(decoded)
    setUser(decoded)
  }

  function clearAuth() {
    tokenStorage.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
