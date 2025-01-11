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