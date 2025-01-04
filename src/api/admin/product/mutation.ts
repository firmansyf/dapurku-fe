import { useMutation } from '@tanstack/react-query'
import { deleteProduct } from './api'

export const useDeleteProductMutation = () => {
    return useMutation({
      mutationKey: ['delete-product'],
      mutationFn: (id: number | undefined) => deleteProduct(id),
    })
}