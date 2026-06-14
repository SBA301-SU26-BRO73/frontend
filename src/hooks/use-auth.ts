import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { login, registerCourtOwner, registerCustomer } from '@/services/auth/auth.service'
import type { LoginRequest, RegisterCustomerRequest } from '@/types/auth'
import { useAuthStore } from './use-auth-store'

export function useLogin() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (res) => {
      if (res.data) {
        setAuth(res.data)
        navigate('/')
      }
    },
  })
}

export function useRegisterCustomer() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()

  return useMutation({
    mutationFn: (data: RegisterCustomerRequest) => registerCustomer(data),
    onSuccess: (res) => {
      if (res.data) {
        setAuth(res.data)
        navigate('/')
      }
    },
  })
}

export function useRegisterCourtOwner(onSuccess: () => void) {
  return useMutation({
    mutationFn: (data: FormData) => registerCourtOwner(data),
    onSuccess,
  })
}
