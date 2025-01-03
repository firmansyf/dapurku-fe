'use client'

import { useQuery } from '@tanstack/react-query'
import { getProfile } from './api';

export const useQueriesGetProfile = () => {
    return useQuery({
        queryKey: ['products-list'],
        queryFn: () => getProfile(),
    })
}