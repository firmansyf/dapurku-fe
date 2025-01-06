/* eslint-disable @next/next/no-img-element */
import { Button, Modal } from '@/components/commons'
import { DetailProductProps } from '@/types/admin/productManagement'
import { FC } from 'react'

const DetailProduct: FC <DetailProductProps> = ({data, openModal, setOpenModal}) => {
 
    const onClose = () => {
        setOpenModal(false)
    }

    console.log('data:' , data)

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
                        onClick={onClose}
                    />
                </div>
            }
        >
                <div className='flex gap-3'>
                    <div className='flex-1'>
                       <img src={data?.image} alt={data?.name} width={500} height={500} className='' />
                    </div>
                    <div className='flex-1 space-y-3'>
                        <div className='flex flex-col gap-1'>
                            <label className='text-sm text-slate-500'>Nama </label>
                            <span className='text-sm'> { data?.name ?? '-' }</span>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-sm text-slate-500'>Deskripsi </label>
                            <span className='text-sm text-justify'> { data?.description ?? '-' }</span>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-sm text-slate-500'>Harga </label>
                            <span className='text-sm'> { data?.price ?? '-' }</span>
                        </div>
                        <div></div>
                    </div>
                </div>
        </Modal>
    )
}

export { DetailProduct }