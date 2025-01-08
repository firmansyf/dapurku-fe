'use client'

import { useQuery } from '@tanstack/react-query'
import { getUsers } from './api'
import { UserParams } from './types'

export const useQueriesGetUsers = (
    reloadData: number,
    params: UserParams
) => {
    return useQuery({
        queryKey: ['users-list', {...params, reloadData }],
        queryFn: () => getUsers(params),
    })
}