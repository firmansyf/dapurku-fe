'use client'

import { useQuery } from '@tanstack/react-query'
import { getProducts } from './api';
import { ProductParams } from './types'

export const useQueriesGetProducts = (
    reloadData: number,
    params: ProductParams
) => {
    return useQuery({
        queryKey: ['products-list', {...params, reloadData }],
        queryFn: () => getProducts(params),
    })
}