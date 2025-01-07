import apiResolver from "../apiResolver"
import getCustomAxios from "../customAxios"
import getCustomAxiosAdmin from "../customAxiosAdmin"
import { LoginParams, RegisterParams } from "./types"

const axios = getCustomAxios({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/`
})

const axiosAdmin = getCustomAxiosAdmin({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/`
})

const axiosWithAuth = getCustomAxios({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/`,
  config: {
    isAuth: true
  }
})

// Login User
export function login(param: LoginParams) {
    return apiResolver(() => axios.post('/login', param), {
      throwErrorObject: true,
    })
}

// Login Admin
export function loginAdmin(param: LoginParams) {
  return apiResolver(() => axiosAdmin.post('/login-admin', param), {
    throwErrorObject: true,
  })
}

// Endpoint Register
export function register(params: RegisterParams) {
  return apiResolver(() => axios.post('/register', params), {
    throwErrorObject: true,
  })
}

// Endpoint Logout
export function logout() {
  return apiResolver(() => axios.post('/logout'), {
    throwErrorObject: true,
  })
}

// Endpoint Me ( Data Pengguna )
export function getProfile() {
  return apiResolver(() => axiosWithAuth.get('/me'), {
    throwErrorObject: true
  })
}