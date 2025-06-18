import { Modal, Button } from '@/components/commons'
import { FC } from 'react'
import { ModalDeleteProps } from '@/types/containers/cart'
import { BsFillTrash3Fill } from "react-icons/bs";

const ModalDeletCart: FC<ModalDeleteProps> = ({
    openModal,
    setOpenModal,
    description,
    title,
    handleClick,
}) => {

    const onClose = () => {
        setOpenModal(false)
    }

    return (
        <Modal
            isOpen={openModal}
            onClose={onClose}
        >
            <div className='flex items-center flex-col gap-4 p-1'>
                <div className='flex flex-col gap-y-2 items-center'>
                    <div className='w-16 h-16 bg-red-200 flex items-center justify-center rounded-full'>
                        <span>
                            <BsFillTrash3Fill className='text-2xl text-red-600' />
                        </span>
                    </div>

                    <span className='font-semibold tracking-wide'>{title}</span>
                </div>
                
                <div className='opacity-65 tracking-wide'>
                    <p>{description}</p>
                </div>

                <div className='flex gap-x-2 justify-center w-full'>
                    <Button text='Batal' className='w-1/2' variant='outline' onClick={onClose} />
                    <Button text='Hapus' className='w-1/2' variant='danger' onClick={handleClick}/>
                </div>
            </div>
        </Modal>
    )
}

export default ModalDeletCart