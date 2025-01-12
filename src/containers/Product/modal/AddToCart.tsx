import { Modal, Button } from "@/components/commons"
import { AddToCartProps } from '@/types/containers/product'
import { BiCartAlt } from "react-icons/bi"
import { currencyFormat } from '@/helpers/commons'
import { useGlobalState } from "@/context/authContextProvider"
import Swal from 'sweetalert2'
import { useAddCartMutation } from "@/api/user/cart"
import toast from "react-hot-toast"

export default function AddToCart({ openModal, setOpenModal, data }: AddToCartProps) {
    const { state : { isAuthenticated } } = useGlobalState()
    const postCart = useAddCartMutation()

    const handleOnClick = () => {
        if (isAuthenticated) {
            const params = {product_id: data?.id as number, quantity: 1}
            try {
                postCart.mutateAsync(params).then((res) => {
                    setOpenModal(false)
                    console.log('res :', res)
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: 'Data berhasil masuk keranjang',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
            } catch (err) {
                const { data } = err as { data: { error: string } }
                toast.error(data.error)
            }
           
        } else {
            setOpenModal(false)
            Swal.fire({
                title: "Kelihatannya anda belum login",
                text: "Mohon untuk login terlebih dahulu",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: 'Close',
                showConfirmButton: false,
            })
        }

    }

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
                        onClick={handleOnClick}
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