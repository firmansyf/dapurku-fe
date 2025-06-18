import { useMutation } from '@tanstack/react-query'
import { PostCart } from './types'
import { postCart, delCart } from './api'

export const useAddCartMutation = (reloadData = 0) => {
    return useMutation({
      mutationKey: ['post-cart', { reloadData }],
      mutationFn: (params: PostCart) => postCart(params),
    })
  }

export const useDelCartMutation = () => {
  return useMutation({
    mutationKey: ['delete-cart'],
    mutationFn: (id: number) => delCart(id),
  })
}