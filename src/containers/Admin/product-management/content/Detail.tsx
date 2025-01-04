import { Button, Modal } from '@/components/commons'
import { DetailProductProps } from '@/types/admin/productManagement'
import { FC } from 'react'

const DetailProduct: FC <DetailProductProps> = ({data, openModal, setOpenModal}) => {
 
    const onClose = () => {
        setOpenModal(false)
    }

    return (
        <Modal
            isOpen={openModal}
            onClose={onClose}
            title={`Detail ${data?.name}`}
            size='large'
            footer={
                <div>
                    <Button
                        variant='secondary'
                        text='Close'
                        className=''
                        size='sm'
                        type='button'
                    />
                </div>
            }
        >
                <div>

                </div>
        </Modal>
    )
}

export { DetailProduct }