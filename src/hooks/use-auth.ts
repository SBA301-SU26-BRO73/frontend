import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/context/auth-context'
import { login, registerCourtOwner, registerCustomer } from '@/services/auth/auth.service'
import type { LoginRequest, RegisterCustomerRequest } from '@/types/auth'

export function useLogin() {
  const navigate = useNavigate()
  const { setAuth } = useAuth()

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

  return useMutation({
    mutationFn: (data: RegisterCustomerRequest) => registerCustomer(data),
    onSuccess: () => {
      navigate('/auth/login?role=customer')
    },
  })
}

export function useRegisterCourtOwner(onSuccess: () => void) {
  return useMutation({
    mutationFn: (data: FormData) => registerCourtOwner(data),
    onSuccess,
  })
}
