import axios, {
    AxiosError,
    AxiosResponse,
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
} from 'axios'
import { ErrorResponseData } from './apiAxiosInterface'
import { APIResponse } from '@/types/commonTypes'

type ConfigOptions = {
    isAuth?: boolean
    includeFormMultipart?: boolean
}

type AxiosConfigParams = {
    baseURL: string
    config?: ConfigOptions
  }

type HeaderProperties = { [key: string]: string | EpochTimeStamp }
  
async function requestHandler(
    request: AxiosRequestConfig,
    config?: ConfigOptions
  ) {
    if (request.headers === undefined) {
      request.headers = {}
    }
    const token = localStorage.getItem('token')
  
    if (config?.isAuth) {
      if (token) {
        request.headers.Authorization = `Bearer ${token}`
      }
    }
  
    return request
}

const errorHandler = (error: AxiosError) => {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const externalUrl =
    typeof window !== 'undefined'
      ? '/' + window.location.pathname.split('/')[1] + '/' + window.location.pathname.split('/')[2]
      : '';
  
    if (
      currentPath !== '/' &&
      currentPath !== '/choose-store' &&
      externalUrl !== '/invoice/external' &&
      error.response?.status === 401
    ) {
      localStorage.clear()
    //   deleteCookie('token')
    //   setTimeout(() => Router.push(PATHS.home), 500)
    }
  
    return Promise.reject(error)
  }
  
const responseHandler = (response: AxiosResponse<APIResponse<null>>) => {
    const errorMessage = response.data?.message || 'Error Exception API'
  
    if (
      (Object.keys(response.data).includes('status') &&
        !`${response.data.status.toString()}`.startsWith('2')) ||
      !`${response.status.toString()}`.startsWith('2')
    ) {
      // eslint-disable-next-line no-throw-literal
      throw {
        error: errorMessage,
        response,
      }
    }
  
    if (!Object.keys(response.data).includes('status')) {
      return { ...response, data: { ...response.data, status: response.status } }
    }
  
    return response
}
  
export const createErrorResponse = (err: AxiosError<ErrorResponseData>) => {
    const message =
      err?.response?.data?.message || err?.message || 'Error Exception API'
  
    return {
      data: err?.response?.data,
      message: message,
      status: err?.response?.data?.status || err?.response?.status || 500,
    }
}

const getCustomAxiosAdmin = ({ baseURL, config }: AxiosConfigParams) => {
    let token = null

    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token')
    }
    
    let headers = {} as unknown as HeaderProperties
    headers = {
    'Content-type': 'application/json',
    }
  
  
    if (config?.isAuth) {
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }
    }

    if (config?.includeFormMultipart) {
      headers['Content-Type'] = 'multipart/form-data'
    }
  
    const customAxios = axios.create({
      baseURL,
      headers,
    })
  
    customAxios.interceptors.response.use(responseHandler, errorHandler)
  
    customAxios.interceptors.request.use((request) => {
      const updatedRequest = requestHandler(request, config)
      return updatedRequest as unknown as InternalAxiosRequestConfig
    }, errorHandler)
  
    return customAxios
  }
  
  export default getCustomAxiosAdmin