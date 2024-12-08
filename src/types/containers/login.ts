
import { Dispatch, SetStateAction} from 'react';

export interface LoginProps {
    isOpen: boolean
    setIsOpen:  Dispatch<SetStateAction<boolean>>
}