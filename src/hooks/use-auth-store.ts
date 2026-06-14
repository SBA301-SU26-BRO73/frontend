import { decodeJwt, tokenStorage } from '@/utils/token'
import type { TokenResponse } from '@/types/auth'

export function useAuthStore() {
  const user = tokenStorage.getUser()
  const isLoggedIn = !!tokenStorage.getAccessToken()

  function setAuth(tokens: TokenResponse) {
    tokenStorage.setTokens(tokens)
    tokenStorage.setUser(decodeJwt(tokens.accessToken))
  }

  function clearAuth() {
    tokenStorage.clear()
  }

  return { user, isLoggedIn, setAuth, clearAuth }
}
