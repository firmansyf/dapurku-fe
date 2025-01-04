import { useDeleteProductMutation } from '@/api/admin/product/mutation'
import { Button, Modal } from '@/components/commons'
import { DeleteProductProps } from '@/types/admin/productManagement'
import { FC } from 'react'
import toast from 'react-hot-toast'

const DeleteProduct: FC <DeleteProductProps> = ({data, openModal, setOpenModal, reload, setReload}) => {
    const deleteProduct = useDeleteProductMutation()

    const onDelete = async () => { 
        try {
            await deleteProduct.mutateAsync(data.id).then((res) => {
                toast.success(res.message)
                setReload(reload + 1)
                setOpenModal(false)
            })

        } catch (error) {
            const message = `Error delete data ${error}`
            toast.error(message)
        }
    }
    
    const onClose = () => {
        setOpenModal(false)
    }

    return (
        <Modal
            isOpen={openModal}
            onClose={onClose}
            title='Delete Data'
            footer={
                <div>
                    <Button
                        variant='danger'
                        text='Delete'
                        className=''
                        size='sm'
                        type='button'
                        onClick={onDelete}
                    />
                </div>
            }
        >

            <span>
                Apa kamu yakin akan menghapus data ini ?
            </span>

        </Modal>
    )
}

export { DeleteProduct }