import { Dispatch, SetStateAction } from "react"

export interface ModalDeleteProps {
    openModal: boolean
    setOpenModal: Dispatch<SetStateAction<boolean>>
    title: string;
    description: string
    handleClick?: () => void
}