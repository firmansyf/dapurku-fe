'use client'

import { Card } from '@/components/commons'
import { FC } from 'react'
import { DataProducts } from '@/types/admin/productManagement'
import { ProductProps } from '@/types/containers/product'
import { currencyFormat } from '@/helpers/commons'

const Products: FC<ProductProps> = ({ data}) => {
    return (
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
                         >
                          <span>Rp{currencyFormat(item.price)}</span>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

export default Products