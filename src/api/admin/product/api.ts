import apiResolver from "@/api/apiResolver"
import getCustomAxios from "@/api/customAxios"
import { ProductParams } from './types'
import getCustomAxiosAdmin from "@/api/customAxiosAdmin"

const axios = getCustomAxios({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`
})

const axiosWithAuth = getCustomAxiosAdmin({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
    config: {
        isAuth: true
    }
})

export function getProducts(param: ProductParams) {
    const params = { page : param.page ?? 1, search: param?.keyword }
    return apiResolver(() => axios.get('/products', { params }), {
        throwErrorObject: true,
      }) 
}

export function deleteProduct(id: number | undefined) {
    return apiResolver(() => axiosWithAuth.delete('/products/' + id), {
        throwErrorObject: true,
      }) 
}