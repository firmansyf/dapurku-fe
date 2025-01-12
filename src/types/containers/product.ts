import { DataProducts } from '@/types/admin/productManagement';
import { Dispatch, SetStateAction } from 'react';

export interface ProductProps {
    data : DataProducts[]
}

export interface AddToCartProps {
    openModal: boolean
    setOpenModal: Dispatch<SetStateAction<boolean>>
    data?: DataProducts
}

interface Product {
  id: number
  name: string
  price: string
  image: string;
  description: string
}
export interface CartItem {
    id: number
    register_id: number
    product_id: number
    quantity: number
    createdAt?: string
    updatedAt?: string
    product: Product
}
  
interface Meta {
  total: number
  page: number
  limit: number
  totalPages: number
}
  
export interface CartResponse {
  message: string
  data: CartItem[]
  meta: Meta
}