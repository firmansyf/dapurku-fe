'use client'

import { FC, useState } from 'react'
import DetailProfile from './DetailProfile'
import CartList from './CartList'
import { useQueriesGetCart } from '@/api/user/cart'

const ProfileModule: FC = () => {
  const [activeSection, setActiveSection] = useState<'profile' | 'order' | 'cart' | 'settings'>('profile')
  const [page] = useState<number>(1)
  const params = { page }

  const { data: cartData, refetch } = useQueriesGetCart(params) ?? {}
  const cart = cartData?.data ?? []

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <DetailProfile />
      case 'settings':
        return (
          <div>
            <h2 className='text-xl font-semibold mb-4'>Pengaturan Akun</h2>
            <p>Ubah pengaturan akun Anda di sini.</p>
          </div>
        )
      case 'order':
        return (
          <div>
            <h2 className='text-xl font-semibold mb-4'>Pesanan Saya</h2>
            <p>Daftar pesanan Anda akan muncul di sini.</p>
          </div>
        )
      case 'cart':
        return <CartList cart={cart} refetch={refetch} />
      default:
        return null
    }
  }

  const navButton = (key: typeof activeSection, label: string) => (
    <button
      onClick={() => setActiveSection(key)}
      className={`block text-sm w-full text-left px-3 py-2 rounded transition ${
        activeSection === key
          ? 'text-green-700 font-semibold bg-green-50'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <span className='flex items-center tracking-wide gap-2'>
        {label}
        {key === 'cart' && cart?.length > 0 && (
          <span className='flex items-center gap-1 text-red-500'>
            <span className='text-xs text-red-600'>({cart.length})</span>
          </span>
        )}
      </span>
    </button>
  )

  return (
    <div className='px-12 py-8'>
      <div className='flex flex-col md:flex-row gap-4'>
        {/* Sidebar */}
        <aside className='w-full md:w-1/5 sticky top-36 space-y-2'>
          {navButton('profile', 'Profil Saya')}
          {navButton('order', 'Pesanan Saya')}
          {navButton('cart', 'Keranjang')}
          {navButton('settings', 'Pengaturan Akun')}
        </aside>

        {/* Content */}
        <section className='flex-1 bg-white rounded-xl shadow-md p-6 min-h-[400px]'>
          {renderContent()}
        </section>
      </div>
    </div>
  )
}

export default ProfileModule
