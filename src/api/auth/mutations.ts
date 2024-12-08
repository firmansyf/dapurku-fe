import { useMutation } from '@tanstack/react-query'
import { LoginParams } from './types'
import { login, logout } from './api'

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