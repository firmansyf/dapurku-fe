import { FC, useEffect, useState} from 'react'
import { Button, Modal } from '@/components/commons';
import {LogoutProps} from '@/types/containers/logout'
import { useLogoutMutation } from '@/api/auth';
import { useGlobalState } from '@/context/authContextProvider';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Logout: FC<LogoutProps> = ({ isOpen, setIsOpen }) => {
    const logout = useLogoutMutation()
    const { clearLogout } = useGlobalState()
    const router = useRouter()
    const [pathname, setPathname] = useState<string | null>(null)
    
     useEffect(() => {
        if (typeof window !== "undefined") {
          setPathname(window.location.pathname)
        }
      }, [])

    const onSubmit = async () => {
        await logout
            .mutateAsync()
            .then((res) => {
                if (pathname && pathname === '/admin') {
                    router.push('/admin')
                    window.location.reload()              
                }

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