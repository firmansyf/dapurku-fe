import apiResolver from "../apiResolver"
import getCustomAxios from "../customAxios"
import { LoginParams } from "./types"

const axios = getCustomAxios({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/`
})

const axiosWithAuth = getCustomAxios({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/`,
  config: {
    isAuth: true
  }
})

export function login(param: LoginParams) {
    return apiResolver(() => axios.post('/login', param), {
      throwErrorObject: true,
    })
}

export function logout() {
  return apiResolver(() => axios.post('/logout'), {
    throwErrorObject: true,
  })
}


// Login Admin
export function loginAdmin(param: LoginParams) {
  return apiResolver(() => axios.post('/login-admin', param), {
    throwErrorObject: true,
  })
}

// Endpoint Me ( Data Pengguna )
export function getProfile() {
  return apiResolver(() => axiosWithAuth.get('/me'), {
    throwErrorObject: true
  })
}