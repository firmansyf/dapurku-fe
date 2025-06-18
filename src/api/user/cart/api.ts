import apiResolver from "@/api/apiResolver"
import getCustomAxios from "@/api/customAxios"
import { CartParams, PostCart } from './types'

const axios = getCustomAxios({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
    config: {
        isAuth: true
    }
})


export function getCart(param: CartParams) {
    const params = { page : param.page ?? 1, limit: param?.limit, search: param.keyword }
    return apiResolver(() => axios.get('/cart', { params }), {
        throwErrorObject: true,
      }) 
}

export function postCart(params: PostCart) {
    return apiResolver(() => axios.post('/cart',  params), {
        throwErrorObject: true,
      }) 
}

export function delCart(id: number) {
    return apiResolver(() => axios.delete(`/cart/${id}`), {
        throwErrorObject: true,
      }) 
}