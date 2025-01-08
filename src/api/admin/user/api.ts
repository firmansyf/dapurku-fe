import apiResolver from "@/api/apiResolver"
import getCustomAxiosAdmin from "@/api/customAxiosAdmin"
import { UserParams } from "./types"

const axiosWithAuth = getCustomAxiosAdmin({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
    config: {
        isAuth: true
    }
})

export function getUsers(param: UserParams) {
    const params = { page : param.page ?? 1, search: param?.keyword }
    return apiResolver(() => axiosWithAuth.get('/users', { params }), {
        throwErrorObject: true,
      }) 
}
