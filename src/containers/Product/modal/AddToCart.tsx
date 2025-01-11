import { Modal, Button } from "@/components/commons"
import { AddToCartProps } from '@/types/containers/product'
import { BiCartAlt } from "react-icons/bi"
import { currencyFormat } from '@/helpers/commons'

export default function AddToCart({ openModal, setOpenModal, data }: AddToCartProps) {

    const onCloseModal = () => {
        setOpenModal(false)
    }
    return (
        <Modal
            size="small"
            isOpen={openModal}
            onClose={onCloseModal}
            title="Simpan Di Keranjang ?"
            footer={
                <div>
                    <Button
                        size='sm'
                        variant="outline"
                        className='border-2'
                        text={
                            <span className="flex gap-1 items-center">
                                <BiCartAlt className='text-lg' />
                                Simpan
                            </span>
                        }
                    />
                </div>
            }
        >

            <div className='flex flex-col gap-2 relative'>
                <div className="flex flex-col gap-1">
                    <label className="text-sm tracking-wide opacity-60">Harga</label>
                    <span className="text-sm font-semibold text-green-600">
                        Rp{currencyFormat(data?.price)}
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm tracking-wide opacity-60">Produk</label>
                    <span className='text-sm font-semibold'>{data?.name}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm tracking-wide opacity-60">Deskripsi</label>
                    <span className='text-sm font-semibold'>{data?.description}</span>
                </div>


                <BiCartAlt className='text-6xl opacity-20 absolute right-5' />
            </div>
        </Modal>
    )
}