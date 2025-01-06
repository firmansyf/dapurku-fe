import { useMutation } from '@tanstack/react-query'
import { deleteProduct, postProduct, putProduct } from './api'
import { ProductPayload } from './types'

export const useDeleteProductMutation = () => {
    return useMutation({
      mutationKey: ['delete-product'],
      mutationFn: (id: number | undefined) => deleteProduct(id),
    })
}

export const useAddProductMutation = (reloadData = 0) => {
  return useMutation({
    mutationKey: ['post-product', {reloadData}],
    mutationFn: (params: ProductPayload) => postProduct(params),
  })
}

export const useEditProductMutation = (reloadData = 0) => {
  return useMutation({
    mutationKey: ['put-product', { reloadData }],
    mutationFn: ({id, params}:{ id: number, params: ProductPayload}) => putProduct(id, params),
  })
}