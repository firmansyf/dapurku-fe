/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import moment from 'moment'
import { useQueriesGetProducts } from '@/api/admin/product'
import { Datatable } from '@/components/commons'
import { useDebounce } from 'use-debounce'
import { FC, useState } from 'react'
import { currencyFormat } from '@/helpers/commons'
import { DataProducts } from '@/types/admin/productManagement'
import { DeleteProduct } from './Delete'
import { DetailProduct } from './Detail'
import AddEditForm from './AddEdit'

const Content: FC = () => {
  const [page, setPage] = useState<number>(1)
  const [detail, setDetail] = useState<DataProducts | null>(null)
  const [reloadData, setReloadData] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [debouncedSearch] = useDebounce(searchQuery, 700)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [openModalDetail, setOpenModalDetail] = useState<boolean>(false)
  const [openModalAdd, setOpenModalAdd] = useState<boolean>(false)

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

  const onDelete = (val : any) => {
    setOpenModalDelete(true)
    setDetail(val)
  }

  const onDetail = (val : any) => {
    setDetail(val)
    setOpenModalDetail(true)
  }

  const onAdd = () => {
    setOpenModalAdd(true)
    setDetail(null)
  }
  
  const onEdit = (val: any) => {
    setOpenModalAdd(true)
    setDetail(val)
  }

  return (
      <>
      <div className="container mx-auto p-6">
            <Datatable 
              page={page} 
              total={total}
              limit={limit} 
              setPage={setPage}
              data={data}
              onSearch={handleSearch}
              totalPages={totalPages}
              isActions={true}
              onDelete={onDelete}
              onDetail={onDetail}
              onAdd={onAdd}
              onEdit={onEdit}
            />
        </div>
      
        <AddEditForm
          openModal={openModalAdd}
          setOpenModal={setOpenModalAdd}
          data={detail as DataProducts}
          reload={reloadData }
          setReload={setReloadData}
        />
      
        <DeleteProduct
          data={detail as DataProducts}
          openModal={openModalDelete}
          reload={reloadData}
          setOpenModal={setOpenModalDelete}
          setReload={setReloadData}
        />
      
        <DetailProduct 
          data={detail as DataProducts} 
          openModal={openModalDetail} 
          setOpenModal={setOpenModalDetail}
        />
      
      </>
    )
}

export default Content