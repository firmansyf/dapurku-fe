import { Dispatch, SetStateAction} from 'react';

export interface LogoutProps {
    isOpen: boolean
    setIsOpen:  Dispatch<SetStateAction<boolean>>
}