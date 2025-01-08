/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useQueriesGetProducts } from "@/api/user/product"
import Products from "@/containers/Product"
import { useState, useEffect, useCallback } from "react"
import { FiLoader, FiArrowDown } from "react-icons/fi"

export default function Home() {
  const [page, setPage] = useState<number>(1)
  const [limit] = useState<number>(12)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const params = { page, limit: 12 }
  const { data, error } = useQueriesGetProducts(params) ?? { data: [], error: null }

  const fetchProducts = useCallback(() => {
    setLoading(true)

    setTimeout(() => {
      try {
        if (data && Array.isArray(data.data) && data.data.length > 0) {
          setProducts((prevProducts) => [...prevProducts, ...data.data])
          setHasMore(data.data.length === limit)
        } else {
          setHasMore(false)
        }
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setLoading(false);
      }
    }, 1000)
  }, [limit, data])

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

  return (
    <div className="p-20">
      <section className="my-5">
        <Products data={products} />

          {loading && (
            <div className="mt-10 w-full flex items-center justify-center">
              <span className="flex items-center gap-1 text-gray-500">
                <FiLoader className="animate-spin" /> Loading...
              </span>
            </div>
          )}

          {hasMore && !loading && (
            <div className="mt-10 w-full flex items-center justify-center">
              <span
                onClick={handleLoadMore}
                className="cursor-pointer font-semibold text-sm flex items-center gap-1 text-gray-400 hover:text-black"
              >
                <FiArrowDown /> Lebih banyak
              </span>
            </div>
          )}

        {!hasMore && !loading && (
          <div className="mt-10 w-full flex items-center justify-center text-gray-400">
            Maaf, tidak ada lagi product
          </div>
        )}

        {error && (
          <div className="mt-10 w-full flex items-center justify-center text-red-500">
            Gagal memuat produk.
          </div>
        )}

      </section>
    </div>
  );
}
