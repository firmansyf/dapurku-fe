import { useQueriesGetProducts } from '@/api/user/product'
import CardProduct from '@/containers/Product/elements/CardProduct'
import { useRouter, useSearchParams } from 'next/navigation'
import { Dispatch, FC, SetStateAction } from 'react'
import { PATHS } from '@/helpers/constants'
import { ProductData } from '@/types/containers/product'

type Prop = {
 setShow : Dispatch<SetStateAction<boolean>>
}

const SearchResults: FC<Prop> = ({setShow}) => {
  const searchParams = useSearchParams()
  const search = searchParams.get('search') ?? ''
  const shouldFetch = Boolean(search.trim())
  const router = useRouter()

  const params = { page: 1, limit: 12, keyword: search }
  const { data, isLoading } = useQueriesGetProducts(params, {
    enabled: shouldFetch,
  })

  const handleSeeAll = () => {
    router.push(`${PATHS.product}?search=${encodeURIComponent(search)}`)
    setShow(false)
  }

  if (!shouldFetch) return null

  if (isLoading) {
    return (
      <div className="py-10 text-center text-gray-500 animate-pulse">
        Memuat hasil pencarian...
      </div>
    )
  }

  if (!data?.data?.length) {
    return (
      <div className="min-h-[17rem] flex items-center justify-center text-gray-500">
        Tidak ada produk ditemukan untuk
        <strong className='px-1'>{`"${search}"`}</strong>
      </div>
    )
  }

  const slicedData = data.data.slice(0, 4)
  const showViewAllLink = data.data.length > 4

  return (
    <section className="min-h-[20rem]">
      <div className="py-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold mb-4">
            Hasil pencarian untuk: <span className="text-green-600">{`"${search}"`}</span>
          </h2>

          {showViewAllLink && (
            <span
              onClick={handleSeeAll}
              className="text-green-500 hover:underline cursor-pointer"
            >
              Lihat semua
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {slicedData?.map((product: ProductData, i: number) => (
            <div key={i} className="mb-4">
              <CardProduct product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SearchResults
