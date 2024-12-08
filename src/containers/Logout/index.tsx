import { FC } from 'react'
import { Button, Modal } from '@/components/commons';
import {LogoutProps} from '@/types/containers/logout'
import { useLogoutMutation } from '@/api/auth';
import { useGlobalState } from '@/context/authContextProvider';
import toast from 'react-hot-toast';

const Logout: FC<LogoutProps> = ({ isOpen, setIsOpen }) => {
    const logout = useLogoutMutation()
    const {clearLogout} = useGlobalState()

    const onSubmit = async () => {
        await logout
            .mutateAsync()
            .then((res) => {
                toast.success(res.message)
                setIsOpen(false)
                clearLogout()
            })
    }

    return (
        <Modal
            title="Log out"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            footer={
                <div>
                    <Button type='button' text='Logout' variant='danger' size='sm' onClick={onSubmit} />
                </div>
            }
        >
            <span>Apakah anda yakin ingin keluar ?</span> 
        </Modal>
    )
}

export default Logout