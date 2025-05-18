import apiResolver from "@/api/apiResolver"
import getCustomAxios from "@/api/customAxios"
import { CategoryParams } from './types'

const axios = getCustomAxios({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`
})


export function getCategories(param: CategoryParams) {
    const params = { page : param.page ?? 1, limit: param?.limit, search: param.keyword }
    return apiResolver(() => axios.get('/v1/categories', { params }), {
        throwErrorObject: true,
      }) 
}