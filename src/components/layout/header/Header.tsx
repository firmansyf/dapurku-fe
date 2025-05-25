/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/commons'
import React, { useState, useEffect} from 'react'
import { Login } from '@/containers/Login'
import { useGlobalState } from '@/context/authContextProvider'
import { FiLogOut } from 'react-icons/fi'
import Logout from '@/containers/Logout'
import { useRouter } from 'next/navigation'
import RegisterModule from '@/containers/Register'
import { useQueriesGetCategory } from '@/api/user/category'
import { CategoryData } from '@/types/containers/product'
import SearchResults from '../components/SearchResults'
import { BiCartAlt } from "react-icons/bi";
import { useQueriesGetCart } from '@/api/user/cart'

const Header: React.FC = () => {
  const router = useRouter()
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [openLogin, setOpenLogin] = useState<boolean>(false)
  const [openLogout, setOpenLogout] = useState<boolean>(false)
  const [openRegister, setOpenRegister] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const { data } = useQueriesGetCategory({ limit: 10 })
  const { data: cartData } = useQueriesGetCart({page: 1})

  const cart = cartData?.data ?? []
  const categories = data?.data ?? []

  const { state } = useGlobalState()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    if (value.trim() === '') router.push('/')
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = searchQuery.trim()
    if (trimmed === '') {
      router.push('/')
      setIsSearchOpen(false)
    } else {
      router.push(`/?search=${encodeURIComponent(trimmed)}`)
      setIsSearchOpen(true)
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-green-500 to-green-600 shadow-md z-50">
        <div className="container max-w-screen-xl mx-auto px-4 pt-3">
          <div className="flex justify-between items-center">
            <span
              onClick={() => router.push('/')}
              className="text-xl text-white font-bold tracking-wider cursor-pointer"
            >
              Dapurku!
            </span>

            <div className="hidden md:flex w-1/2 justify-center">
              <form className="relative w-full" onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Cari produk..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  className="w-full h-10 px-5 pr-10 text-sm border rounded-full shadow-md focus:outline-none focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </form>
            </div>
  
            {state.isAuthenticated ? (
              <div className="flex items-center gap-x-3 py-4 text-white">
                <div className="relative">
                  {/* Icon Cart */}
                  <BiCartAlt className="text-2xl " />

                  {/* Badge Count */}
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                      {cart.length}
                    </span>
                  )}
                </div>

                <span
                  onClick={() => router.push('/profile')}
                  className="text-sm ml-2 text-green-600 font-semibold tracking-wide w-16 truncate bg-green-200 p-1 rounded-lg cursor-pointer hover:underline"
                >
                  {state.data?.username}
                </span>

                <div className="h-5 border border-white/60" />

                <span
                  className="flex items-center gap-1 tracking-wide text-md cursor-pointer"
                  onClick={() => setOpenLogout(true)}
                >
                  <FiLogOut size={14} className="mt-[2px]" />
                  <span>Keluar</span>
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  text="Masuk"
                  size="sm"
                  variant="secondary"
                  className="tracking-wider text-green-600 !font-bold"
                  onClick={() => setOpenLogin(true)}
                />
                <Button
                  text="Daftar"
                  size="sm"
                  variant="secondary"
                  className="tracking-wide text-green-600 !font-bold"
                  onClick={() => setOpenRegister(true)}
                />
              </div>
            )}
          </div>
        </div>

        <div className="container max-w-screen-xl mx-auto px-4 my-3">
          <div className="flex gap-3 flex-wrap py-1 bg-white/10 rounded-md overflow-x-auto">
            {categories && 
              categories?.map((item : CategoryData, i: number) => (
              <div
                key={i}
                className="px-4 py-2 rounded-full text-sm cursor-pointer whitespace-nowrap text-white hover:bg-white/20 transition"
              >
                {item.name_category || ''}
              </div>
            ))}
          </div>
        </div>
      </header>

      {isSearchOpen && (
        <div
          className={`fixed top-[72px] left-0 w-full z-[9999] bg-white shadow-lg transition-all duration-300 ease-in-out transform ${
            isSearchOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
        <div className="container max-w-screen-xl mx-auto px-4">
            <SearchResults setShow={setIsSearchOpen} />
        </div>
      </div>
      )}

      {/* Modals */}
      <Login isOpen={openLogin} setIsOpen={setOpenLogin} />
      <Logout isOpen={openLogout} setIsOpen={setOpenLogout} />
      <RegisterModule onOpen={openRegister} setOnOpen={setOpenRegister} />
    </>
  )
}

export default Header
