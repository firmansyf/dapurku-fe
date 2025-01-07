import apiResolver from "@/api/apiResolver"
import getCustomAxios from "@/api/customAxios"

const axios = getCustomAxios({
    baseURL: `${process.env.NEXT_PUBLIC_API_ADDRESS_URL}/api`
})


// Endpoint Address
export function getProvince() {
    return apiResolver(() => axios.get('/provinces.json'), {
      throwErrorObject: true,
   })
}

export function getCity(idProv: string | undefined) {
    return apiResolver(() => axios.get(`/regencies/${idProv}.json`), {
        throwErrorObject: true,
    })
}

export function getDistrict(idCity: string | undefined) {
    return apiResolver(() => axios.get(`/districts/${idCity}.json`), {
        throwErrorObject: true,
    })
}