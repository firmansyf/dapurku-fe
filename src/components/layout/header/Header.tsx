/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/commons'
import React, { useState } from 'react'
import { Pacifico } from 'next/font/google'
import { Login } from '@/containers/Login'
import { useGlobalState } from '@/context/authContextProvider'
import { FiLogOut } from 'react-icons/fi'
import Logout from '@/containers/Logout'

const pacifico = Pacifico({
    subsets: ['latin'],
    display: 'swap',
    weight: '400'
  })

const Header: React.FC = () => {
  const [openLogin, setOpenLogin] = useState<boolean>(false)
  const [openLogout, setOpenLogout] = useState<boolean>(false)
  const { state } = useGlobalState()
  
  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-[#81C784] shadow z-50">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex px-14 justify-between items-center h-14">
            <div className={`text-lg text-[#000] font-bold ${pacifico.className}`}>
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

            {state.isAuthenticated && (
              <div className='flex items-center gap-2 h-full py-4'>  
                <span className='text-sm tracking-wide cursor-pointer hover:underline text-[#333333]'>{state.data?.username}</span>
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
                <Button text='Masuk' size='xs' variant='outline' onClick={() => setOpenLogin(true)}/>  
                <Button text='Daftar' size='xs' variant='success' className='tracking-wide'/>            
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