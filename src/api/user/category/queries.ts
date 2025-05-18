'use client'

import { useQuery } from '@tanstack/react-query'
import { getCategories } from './api';
import { CategoryParams } from './types'

export const useQueriesGetCategory = (
    params: CategoryParams,
    reloadData?: number,
) => {
    return useQuery({
        queryKey: ['products', {...params, reloadData }],
        queryFn: () => getCategories(params),
    })
}