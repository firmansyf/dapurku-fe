'use client'

import { useQueriesGetProducts } from '@/api/admin/product';
import { Datatable } from '@/components/commons'
import { useDebounce } from 'use-debounce'
import { FC, useState } from 'react'
import { currencyFormat } from '@/helpers/commons'
import { DataProducts } from '@/types/admin/productManagement'
import moment from 'moment';

const Content: FC = () => {
  const [page, setPage] = useState<number>(1)
  const [reloadData, ] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [debouncedSearch] = useDebounce(searchQuery, 700)

  const params = { page, keyword: debouncedSearch}
  const { data: products } = useQueriesGetProducts(reloadData, params) ?? [];
  const limit = products?.meta?.limit ?? 10
  const total = products?.meta?.total ?? 0
  const totalPages = products?.meta?.totalPages

  // Mapping data
  const data = products?.data.map((item : DataProducts) => {
    return {
      ...item,
      price: `Rp${currencyFormat(item.price)}`,
      createdAt: moment(item.createdAt).format('LLL'),
      updatedAt: moment(item.updatedAt).format('LLL')
    }
  })
    
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setPage(1)
  }

  return (
        <div className="container mx-auto p-6">
            <Datatable 
              page={page} 
              total={total}
              limit={limit} 
              setPage={setPage}
              data={data}
              onSearch={handleSearch}
              totalPages={totalPages}
            />
        </div>
    )
}

export default Content