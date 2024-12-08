import { AxiosError, AxiosResponse } from 'axios'
import { createErrorResponse } from './customAxios'
import { ErrorResponseData } from './apiAxiosInterface'

interface ResolverOptions {
  throwErrorObject?: boolean
}

const apiResolver = async <T>(
  fetcher: () => Promise<AxiosResponse<T>>,
  options?: ResolverOptions
) => {
  try {
    const res = await fetcher()
    return res.data
  } catch (err) {
    const error = err as AxiosError<ErrorResponseData>
    const errRes = createErrorResponse(error)
    if (options?.throwErrorObject) throw errRes
    throw new Error(errRes.message)
  }
}
export default apiResolver
