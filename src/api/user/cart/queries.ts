'use client'

import { useQuery } from '@tanstack/react-query'
import { getCart } from './api';
import { CartParams } from './types'

export const useQueriesGetCart = (
    params: CartParams,
    reloadData?: number,
) => {
    return useQuery({
        queryKey: ['products', {...params, reloadData }],
        queryFn: () => getCart(params),
    })
}