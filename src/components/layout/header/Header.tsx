/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/commons'
import React, { useState } from 'react'
import { Login } from '@/containers/Login'
import { useGlobalState } from '@/context/authContextProvider'
import { FiLogOut } from 'react-icons/fi'
import Logout from '@/containers/Logout'
import { Pacifico } from 'next/font/google'
import { useRouter, usePathname } from 'next/navigation'
import { PATHS } from '@/helpers/constants'

const pacifico = Pacifico({
    subsets: ['latin'],
    display: 'swap',
    weight: '400'
})

const Header: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [openLogin, setOpenLogin] = useState<boolean>(false)
  const [openLogout, setOpenLogout] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { state } = useGlobalState()

  const shouldShowSearch = pathname && ![PATHS.profile].includes(pathname);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  
    if (value.trim() === '') {
      router.push('/');
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/')
    }
  }
  
  return (
    <>
       <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 shadow-md z-50">
        <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex px-14 justify-between items-center h-14">
            <div
              className={`text-lg text-[#000] font-bold tracking-wide cursor-pointer ${pacifico.className}`}
              onClick={() => window.location.href = '/'}
            >
                Dapurku!
            </div>

            {/* Navigation */}
            {/* <nav className="hidden md:flex space-x-6">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-600 hover:text-gray-900 transition"
                >  
                  {link.label}
                </a>
              ))}
            </nav> */}

            {shouldShowSearch && (

            <div className='w-full flex items-center justify-center'>
              <form className='relative w-2/3' onSubmit={handleSearch}>
                <input 
                  type='text' 
                  placeholder='Cari produk...' 
                  value={searchQuery}
                  onChange={handleInputChange}
                  className='w-full h-9 px-5 pr-10 text-sm border rounded-full shadow-md focus:outline-none focus:border-transparent'
                />
                <button type='submit' className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'>
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

            {state.isAuthenticated && (
              <div className='flex items-center gap-2 h-full py-4'>  
                <span
                  onClick={() => router.push('/profile')}
                  className='text-sm tracking-wide truncate cursor-pointer hover:underline text-[#FFF]'
                >
                  {state.data?.username}
                </span>
                <div className='h-full border border-[#F9F9F9] mx-2' />
                <span
                  className='flex items-center gap-1 tracking-wide text-sm cursor-pointer text-blue-700 hover:text-blue-800'
                  onClick={() => setOpenLogout(true)}
                >
                  <FiLogOut size={17} /> 
                  Keluar
                </span>            
              </div>
            )}

            {!state.isAuthenticated && (
              <div className='flex items-center gap-2'>
                <Button text='Masuk' size='xs' variant='secondary' className='tracking-wide' onClick={() => setOpenLogin(true)}/>  
                <Button text='Daftar' size='xs' variant='success' className='tracking-wide' onClick={() => window.location.href = '/register'}/>            
              </div>
            )} 
            
          </div>
        </div>
      </header>

      <Login isOpen={openLogin} setIsOpen={setOpenLogin} />
      <Logout isOpen={openLogout} setIsOpen={setOpenLogout} />
    </>
  );
};

export default Header;