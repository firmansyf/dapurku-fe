/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useQueriesGetProducts } from "@/api/user/product"
import { Banner } from "@/components/commons";
import ProductPopuler from "@/containers/Product/components/ProductPopuler";
import ProductFlashSale from "@/containers/Product/components/ProductFlashSale";
import ProductList from "@/containers/Product/components/ProductList";


export default function Home() {
  const params = { page: 1, limit: 12 }
  const { data } = useQueriesGetProducts(params) ?? { data: [], error: null }


  return (
    <main className="pt-10 pb-10">
      <div className="w-full mx-auto">
        {/* Optional: Bisa taruh Banner di sini */}
        <div className="max-w-screen-xl mx-auto px-4">
          <Banner
            title="Diskon Besar Hari Ini!"
            description="Dapatkan promo spesial untuk produk dapur terbaik."
            buttonText="Lihat Sekarang"
            imageUrl="https://placehold.co/600x400.png"
            href="/produk"
          />
        </div>

        {/* Produk */}
        <section className="my-8">
         <div className="max-w-screen-xl mx-auto px-4">
            <ProductFlashSale
              products={[
                {
                  id: 1,
                  name: 'Keripik pisang',
                  store: 'Oleh-oleh Lampung',
                  price: 10000,
                  rating: 5,
                  reviews: 210,
                  image: 'https://placehold.co/600x400.png',
                  description: 'Enak buat ngemil, yuk beli sekarang'
                },
                {
                  id: 2,
                  name: 'Bolu kukus',
                  store: 'Kue Mbok Darmi',
                  price: 5000,
                  rating: 4,
                  reviews: 84,
                  image: 'https://placehold.co/600x400.png',
                  description: 'Ada yang manis dan enak, buruan beli'
                },
                {
                  id: 3,
                  name: 'Gorengan (Karoket)',
                  store: 'Gorengan Pak Rohim',
                  price: 5000,
                  rating: 3.5,
                  reviews: 56,
                  image: 'https://placehold.co/600x400.png',
                  description: 'Masih hangat, dan siap antar nich'
                },
                {
                  id: 4,
                  name: 'Bakwan Jagung',
                  store: 'Warung Bu Siti',
                  price: 7500,
                  rating: 4.5,
                  reviews: 120,
                  image: 'https://placehold.co/600x400.png',
                  description: 'Renyah dan gurih, favorit semua orang'
                },
                {
                  id: 4,
                  name: 'Bakwan Jagung',
                  store: 'Warung Bu Siti',
                  price: 7500,
                  rating: 4.5,
                  reviews: 120,
                  image: 'https://placehold.co/600x400.png',
                  description: 'Renyah dan gurih, favorit semua orang'
                },
                {
                  id: 4,
                  name: 'Bakwan Jagung',
                  store: 'Warung Bu Siti',
                  price: 7500,
                  rating: 4.5,
                  reviews: 120,
                  image: 'https://placehold.co/600x400.png',
                  description: 'Renyah dan gurih, favorit semua orang'
                }
              ]} 
            />
          </div>

          <div className='my-10' />

          <div className="max-w-screen-xl mx-auto px-4">
            <ProductPopuler
              products={[
                {
                  id: 1,
                  name: 'Keripik pisang',
                  store: 'Oleh-oleh Lampung',
                  price: 10000,
                  rating: 5,
                  reviews: 210,
                  image: 'https://placehold.co/600x400.png',
                  description: 'Enak buat ngemil, yuk beli sekarang'
                },
                {
                  id: 2,
                  name: 'Bolu kukus',
                  store: 'Kue Mbok Darmi',
                  price: 5000,
                  rating: 4,
                  reviews: 84,
                  image: 'https://placehold.co/600x400.png',
                  description: 'Ada yang manis dan enak, buruan beli'
                },
                {
                  id: 3,
                  name: 'Gorengan (Karoket)',
                  store: 'Gorengan Pak Rohim',
                  price: 5000,
                  rating: 3.5,
                  reviews: 56,
                  image: 'https://placehold.co/600x400.png',
                  description: 'Masih hangat, dan siap antar nich'
                },
                {
                  id: 4,
                  name: 'Bakwan Jagung',
                  store: 'Warung Bu Siti',
                  price: 7500,
                  rating: 4.5,
                  reviews: 120,
                  image: 'https://placehold.co/600x400.png',
                  description: 'Renyah dan gurih, favorit semua orang'
                },
                {
                  id: 4,
                  name: 'Bakwan Jagung',
                  store: 'Warung Bu Siti',
                  price: 7500,
                  rating: 4.5,
                  reviews: 120,
                  image: 'https://placehold.co/600x400.png',
                  description: 'Renyah dan gurih, favorit semua orang'
                },
                {
                  id: 4,
                  name: 'Bakwan Jagung',
                  store: 'Warung Bu Siti',
                  price: 7500,
                  rating: 4.5,
                  reviews: 120,
                  image: 'https://placehold.co/600x400.png',
                  description: 'Renyah dan gurih, favorit semua orang'
                }
              ]} 
            />
          </div>
          
          <div className='my-10' />

          <div className="max-w-screen-xl mx-auto px-4">
            <ProductList
              products={data?.data} 
            />
         </div>
          
        </section>
      </div>
    </main>
  )
}
