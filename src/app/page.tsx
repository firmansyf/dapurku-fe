'use client'

import { useQueriesGetProducts } from "@/api/user/product"
// import { useQueriesGetProfile } from '@/api/auth'
import Products from "@/containers/Product"
import { useState } from "react"

export default function Home() {
  const [page,] = useState<number>(1)
  const params = { page }
  
  // const { data: profile } = useQueriesGetProfile()?.data ?? []
  const { data: product } = useQueriesGetProducts(params) ?? []
    
  return (
    <div className="p-20">
      <section className="my-5">
        <Products data={product?.data} />
      </section>
    </div>
  );
}
