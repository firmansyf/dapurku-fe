'use client'

import { useQuery } from '@tanstack/react-query'
import { getProvince, getCity, getDistrict } from './api'

export const useQueriesGetProvince = () => {
    return useQuery({
        queryKey: ['province-list'],
        queryFn: () => getProvince(),
    })
}

export const useQueriesGetCity = (id: string | undefined) => {
    return useQuery({
        queryKey: ['city-list'],
        queryFn: () => getCity(id),
    })
}

export const useQueriesGetDistrict = (id: string | undefined) => {
    return useQuery({
        queryKey: ['district-list'],
        queryFn: () => getDistrict(id),
    })
}