import apiResolver from "../apiResolver"
import getCustomAxios from "../customAxios"
import { LoginParams } from "./types"

const axios = getCustomAxios({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`
})

export function login(param: LoginParams) {
    return apiResolver(() => axios.post('/auth/login', param), {
      throwErrorObject: true,
    })
}

export function logout() {
  return apiResolver(() => axios.post('/auth/logout'), {
    throwErrorObject: true,
  })
}


// Login Admin
export function loginAdmin(param: LoginParams) {
  return apiResolver(() => axios.post('/auth/login-admin', param), {
    throwErrorObject: true,
  })
}