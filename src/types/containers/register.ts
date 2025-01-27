
import { Dispatch, SetStateAction } from 'react'

export interface RegisterProps {
    onOpen: boolean
    setOnOpen?: Dispatch<SetStateAction<boolean>>
}