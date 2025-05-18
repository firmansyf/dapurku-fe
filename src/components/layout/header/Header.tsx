/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/commons'
import React, { useState } from 'react'
import { Login } from '@/containers/Login'
import { useGlobalState } from '@/context/authContextProvider'
import { FiLogOut } from 'react-icons/fi'
import Logout from '@/containers/Logout'
import { useRouter, usePathname } from 'next/navigation'
import { PATHS } from '@/helpers/constants'
import RegisterModule from '@/containers/Register'
import { useQueriesGetCategory } from '@/api/user/category'
import { CategoryData } from '@/types/containers/product'

const Header: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [openLogin, setOpenLogin] = useState(false)
  const [openLogout, setOpenLogout] = useState(false)
  const [openRegister, setOpenRegister] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { data } = useQueriesGetCategory({ limit: 10 })
  const categories = data?.data ?? []

  const { state } = useGlobalState()

  const shouldShowSearch = pathname && ![PATHS.profile].includes(pathname)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    if (value.trim() === '') router.push('/')
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(searchQuery.trim() ? `/?search=${encodeURIComponent(searchQuery)}` : '/')
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

            {shouldShowSearch && (
              <div className="hidden md:flex w-1/2 justify-center">
                <form className="relative w-full" onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Cari produk..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    className="w-full h-9 px-5 pr-10 text-sm border rounded-full shadow-md focus:outline-none focus:border-transparent"
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
            )}

            {state.isAuthenticated ? (
              <div className="flex items-center gap-3 py-4 text-white">
                <span
                  onClick={() => router.push('/profile')}
                  className="text-sm tracking-wide truncate cursor-pointer hover:underline"
                >
                  {state.data?.username}
                </span>
                <div className="h-5 border border-white/60 mx-2" />
                <span
                  className="flex items-center gap-1 tracking-wide text-sm cursor-pointer"
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
                  size="md"
                  variant="secondary"
                  className="tracking-wider text-green-600 !font-bold"
                  onClick={() => setOpenLogin(true)}
                />
                <Button
                  text="Daftar"
                  size="md"
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

      {/* Modals */}
      <Login isOpen={openLogin} setIsOpen={setOpenLogin} />
      <Logout isOpen={openLogout} setIsOpen={setOpenLogout} />
      <RegisterModule onOpen={openRegister} setOnOpen={setOpenRegister} />
    </>
  )
}

export default Header
