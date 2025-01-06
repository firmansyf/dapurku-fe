
import { Dispatch, SetStateAction } from 'react';

  
export interface DataProducts {
    id?: number
    name: string
    description: string
    price: number
    createdAt: string
    updatedAt: string
    image?: string
}

export interface DeleteProductProps {
    openModal: boolean
    data: DataProducts
    reload: number
    setReload: Dispatch<SetStateAction<number>>
    setOpenModal: Dispatch<SetStateAction<boolean>>
}

export interface DetailProductProps {
    openModal: boolean
    data: DataProducts
    setOpenModal: Dispatch<SetStateAction<boolean>>
}

export interface AddEditProductProps {
    openModal: boolean
    data?: DataProducts
    reload: number
    setReload?: Dispatch<SetStateAction<number>>
    setOpenModal: Dispatch<SetStateAction<boolean>>
}