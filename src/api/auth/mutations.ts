import { useMutation } from '@tanstack/react-query'
import { LoginParams, RegisterParams, EditUserParams } from './types'
import { login, loginAdmin, logout, register, putProfile } from './api'

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

export const useRegisterMutation = () => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: (params: RegisterParams) => register(params),
  })
}

export const useUserPutMutation = () => {
  return useMutation({
    mutationKey: ['put-users'],
    mutationFn: ({id, params}:{ id: number, params: EditUserParams}) => putProfile(id, params),
  })
}