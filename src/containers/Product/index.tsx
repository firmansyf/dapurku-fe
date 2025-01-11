'use client'

import { Card, Button } from '@/components/commons'
import { FC, useState} from 'react'
import { DataProducts } from '@/types/admin/productManagement'
import { ProductProps } from '@/types/containers/product'
import { currencyFormat } from '@/helpers/commons'
import { BiCart } from "react-icons/bi"
import AddToCart from './modal/AddToCart'

const Products: FC<ProductProps> = ({ data }) => {
    const [openModalAddToCart, setOpenModalAddToCart] = useState<boolean>(false)
    const [dataProduct, setDataProduct] = useState<DataProducts>()
    return (
        <>
         <div className='w-full'>
            <div className='flex items-center flex-wrap gap-5 px-2'>
                {data && data?.map((item : DataProducts, key: number) => {
                    return (
                        <Card 
                          key={key} 
                          title={`${item.name}`} 
                          description={item?.description}
                          imageUrl={item?.image}
                          className='flex w-[20rem] flex-col'
                            actions={
                              <div className='flex gap-2 w-full'>
                                <Button text='Beli sekarang' size='sm' className='flex-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 transition duration-300'
                                />
                                    
                                <div
                                   onClick={() => {
                                    setOpenModalAddToCart(true)
                                    setDataProduct(item)     
                                   }}
                                  className='p-2 bg-gray-200 rounded-md flex items-center cursor-pointer hover:bg-gray-300'
                                >
                                 <BiCart className='' />
                                </div>
                              </div>
                          }
                         >
                          <span className='font-bold text-green-600'>Rp{currencyFormat(item.price)}</span>
                        </Card>
                    )
                })}
             </div>
            </div>

            <AddToCart
                data={dataProduct}
                openModal={openModalAddToCart}
                setOpenModal={setOpenModalAddToCart}
            />
        </>
    )
}

export default Products