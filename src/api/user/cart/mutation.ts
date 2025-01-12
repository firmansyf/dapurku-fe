import { useMutation } from '@tanstack/react-query'
import { PostCart } from './types'
import { postCart } from './api'

export const useAddCartMutation = (reloadData = 0) => {
    return useMutation({
      mutationKey: ['post-cart', { reloadData }],
      mutationFn: (params: PostCart) => postCart(params),
    })
  }