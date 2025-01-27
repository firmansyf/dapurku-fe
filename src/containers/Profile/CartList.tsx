/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import { CartItem } from '@/types/containers/product'
import { currencyFormat } from '@/helpers/commons'
import { Button } from '@/components/commons'

export default function CartList({ cart } : any) {

    return (
        <div className='flex flex-col space-y-5 mb-10'>
          <span>List Keranjang</span>

            <div className='space-y-4 pb-4'>
                {cart && cart.map((item : CartItem, i: number) => (
                    <div key={i} className='w-full border-2 p-5 rounded-xl bg-[#EEE]'>
                        <div className='flex gap-3 h-full'>
                            <div>
                                <img src={item.product?.image} className='w-24 rounded-md' alt={item.product.name} />
                            </div> 

                            <div className='flex flex-col gap-2 justify-between'>
                                <span className='font-semibold'>{item.product.name}</span>
                                <span className='text-sm opacity-70'>{item.product.description}</span>
                                <span className='font-semibold'>Rp{currencyFormat(item.product.price)}</span>

                                <div className='flex gap-3 items-center'>
                                  <Button text='+' size='xs' className='font-semibold' variant='secondary'/>
                                    <p>{item.quantity}</p>
                                  <Button text='-' size='xs' className='font-semibold' variant='secondary'/>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}