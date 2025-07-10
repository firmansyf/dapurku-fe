'use client'

import { FC, useCallback, useState, useEffect} from 'react'
import CardProduct from './elements/CardProduct'
import { useQueriesGetProducts } from '@/api/user/product'
import { useSearchParams } from 'next/navigation'
import { FiLoader, FiArrowDown } from "react-icons/fi"

const AllProduct: FC = () => {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const category = searchParams.get('category')

    const [limit] = useState<number>(12)
    const [page, setPage] = useState<number>(1)
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState<boolean>(true)

    const params = { page, limit: 12, keyword: search, category_name: category }
    const { data, error } = useQueriesGetProducts(params) 

    const fetchProducts = useCallback(() => {
        setLoading(true)
        setTimeout(() => {
          try {
            if (data && Array.isArray(data.data) && data.data.length > 0) {
              setProducts((prevProducts) => {
                const newProducts = data.data.filter(
                  (newProduct: any) =>
                    !prevProducts.some((prevProduct) => prevProduct.id === newProduct.id)
                )
                return [...prevProducts, ...newProducts]
              })
              setHasMore(data.data.length === limit)
            } else {
              setHasMore(false)
            }
          } catch (error) {
            console.error("Failed to fetch products:", error)
          } finally {
            setLoading(false)
          }
        }, 1000)
    }, [limit, data])
    
    useEffect(() => {
        setProducts([])
        setPage(1)
      }, [search, category])
    
      useEffect(() => {
        if (data) {
          fetchProducts()
        }
      }, [fetchProducts, data])
    
      const handleLoadMore = () => {
        if (!loading && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
  }
  
  console.log('data :', data)
    
      const noProductsMessage = search && !loading && !hasMore && !products.length
        ? "Maaf, produk tidak ada"
        : "Maaf, tidak ada lagi product"
    
    return (
      <div className='pt-5 pb-10'>
        <div className='max-w-screen-xl mx-auto px-4'>
        <div className="flex justify-between items-center mb-4">
           <h2 className="text-xl font-bold border-b-2 border-green-500 pb-1">List Produk</h2>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {products &&
                products.map((product, i) => (
                <div key={i} className='mb-4'>
                    <CardProduct product={product} />
                </div>
            ))}
        </div>
            
          {loading && (
            <div className="mt-10 w-full flex items-center justify-center">
              <span className="flex items-center gap-1 text-gray-500">
                <FiLoader className="animate-spin mt-1" /> Loading...
              </span>
            </div>
          )}

          {hasMore && !loading && (
            <div className="mt-10 w-full flex items-center justify-center">
              <span
                onClick={handleLoadMore}
                className="cursor-pointer font-semibold text-sm flex items-center gap-1 text-gray-400 hover:text-black"
              >
                <FiArrowDown className="mt-1" /> Lebih banyak
              </span>
            </div>
          )}

          {!hasMore && !loading && (
            <div className="mt-10 w-full flex items-center justify-center text-gray-400">
              {noProductsMessage}
            </div>
          )}

          {error && (
            <div className="mt-10 w-full flex items-center justify-center text-red-500">
              Gagal memuat produk.
            </div>
          )}  
        </div> 
      </div>
    )
}

export default AllProduct