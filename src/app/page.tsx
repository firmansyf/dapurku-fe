/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useQueriesGetProducts } from "@/api/user/product"
import { Button } from "@/components/commons"
import Products from "@/containers/Product"
import { useState, useEffect, useCallback } from "react"
import { FiLoader, FiArrowDown } from "react-icons/fi"

export default function Home() {
  const [page, setPage] = useState<number>(1)
  const [limit] = useState<number>(12)
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const params = { page, limit: 12 }
  const { data } = useQueriesGetProducts(params) ?? []


  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      if (data?.data?.length > 0) {
        setProducts((prevProducts) => [...prevProducts, ...data.data])
        setHasMore(data.data.length === limit)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setLoading(false)
    }
  }, [limit, data])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  return (
    <div className="p-20">
      <section className="my-5">
        <Products data={products} />

        {hasMore && (
          <div className="mt-10 w-full flex items-center justify-center">
            <Button
              text={
                loading ? (
                  <span className="flex items-center gap-1">
                    <FiLoader className="animate-spin" /> Loading...
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <FiArrowDown /> Lebih banyak
                  </span>
                )
              }
              size="xs"
              variant="success"
              onClick={handleLoadMore}
              disabled={loading}
            />
          </div>
        )}

        {!hasMore && (
          <div className="mt-10 w-full text-center text-gray-500">
            Tidak ada produk lagi.
          </div>
        )}
      </section>
    </div>
  );
}