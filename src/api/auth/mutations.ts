import { useMutation } from '@tanstack/react-query'
import { LoginParams } from './types'
import { login, loginAdmin, logout } from './api'

export const useLoginMutation = () => {
    return useMutation({
      mutationKey: ['login'],
      mutationFn: (params: LoginParams) => login(params),
    })
}

export const useLogoutMutation = () => {
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: () => logout(),
  })
}

export const useLoginAdminMutation = () => {
  return useMutation({
    mutationKey: ['login-admin'],
    mutationFn: (params: LoginParams) => loginAdmin(params),
  })
}