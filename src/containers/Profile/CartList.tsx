/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import { useState } from 'react'
import { CartItem } from '@/types/containers/product'
import { currencyFormat } from '@/helpers/commons'
import { Button } from '@/components/commons'
import { BsFillTrash3Fill } from "react-icons/bs";
import ModalDeletCart from './_components/DeleteCart'
import { useDelCartMutation  } from '@/api/user/cart'

export default function CartList({ cart, refetch } : any) {
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
    const { mutate: deleteCart } = useDelCartMutation()
    
    const [isItem, setIsItem] = useState<string>()
    const [selectedProductId, setSelectedProductId] = useState<number>()

    const onDeleteCart = () => {
        if (!selectedProductId) return
      
        deleteCart(selectedProductId, {
          onSuccess: () => {
            setOpenModalDelete(false)
            setSelectedProductId(undefined)
            refetch() 
          },
          onError: (err) => {
            console.error('Gagal menghapus cart:', err)
          },
        })
      }

    return (
        <>
            <div className='flex flex-col space-y-5 mb-10'>
                <div className='flex justify-between'>
                    <span className='font-semibold tracking-wide'>List Keranjang</span>
                    <span className='text-red-400 hover:text-red-600 cursor-pointer'>Hapus semua</span>
                </div>

                <div className='space-y-4 pb-4'>
                    {cart && cart.map((item : CartItem, i: number) => (
                        <div key={i} className='w-full flex gap-x-4 border p-3 rounded-xl relative'>
                            <div className='flex-1 flex'>
                              <div className='flex gap-x-4'>
                                <img src={item.product?.image} className='w-28 h-28 rounded-md' alt={item.product.name} />
                                    <div className='flex flex-col justify-between'>
                                        <div className='flex flex-col gap-2'>
                                            <span className='font-semibold tracking-wide'>{item.product.name}</span>
                                            <span className='text-sm opacity-70 w-56 truncate'>{item.product.description}</span>
                                        </div>
                                            
                                        <Button text='Beli' size='xs' className='w-16' variant='outline' />
                                    </div>
                                </div> 
                            </div>    
                    
                        
                            <div className='flex-1 flex items-center text-left'>
                                <span className='font-semibold opacity-75 text-sm'>Rp{currencyFormat(item.product.price)}</span>
                            </div>

                            <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-full shadow-sm w-fit">
                                <button className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-gray-800 hover:bg-gray-200 transition-all duration-150 shadow text-lg font-semibold" >
                                    <p className='mb-1'>+</p>
                                </button>

                                <div className="text-sm font-medium w-4 text-center">{item.quantity}</div>

                                <button className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-gray-800 hover:bg-gray-200 transition-all duration-150 shadow text-lg font-semibold">
                                    <p className='mb-1'>-</p>
                                </button>
                            </div>

                            <div className='mx-2' />
                                    
                            <div
                              onClick={() => {
                                setOpenModalDelete(true)
                                setIsItem(item.product.name as string)
                                setSelectedProductId(item.id as number)
                              }}
                              className='cursor-pointer w-10 h-10 flex items-center justify-center text-sm absolute rounded-full -top-2 -right-2 bg-red-200 hover:bg-red-300'>
                                <span className=''>
                                    <BsFillTrash3Fill className='text-lg text-red-600' />
                                </span>
                            </div>
                        </div>  
                    ))}
                </div>
            </div>
    
            {openModalDelete && (
                <ModalDeletCart
                    openModal={openModalDelete}
                    setOpenModal={setOpenModalDelete}
                    title='Konfirmasi Hapus'
                    description={`${isItem}, apakah anda yakin akan hapusnya ?`}
                    handleClick={onDeleteCart}
                />
            )}
        </>
    )
}