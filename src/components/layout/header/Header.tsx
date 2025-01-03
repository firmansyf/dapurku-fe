/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/commons'
import React, { useState } from 'react'
import { Pacifico } from 'next/font/google'
import { Login } from '@/containers/Login'
import { useGlobalState } from '@/context/authContextProvider'
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
  
  console.log('state :', state)

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-gray-100 shadow z-50">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex px-14 justify-between items-center h-16">
            <div className={`text-lg text-green-700 font-bold ${pacifico.className}`}>
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

            {state.isAuthenticated && state.data !== null && (
              <div className='flex items-center gap-2'>  
                <span className=''>{state.data?.username}</span>
                <span className='tracking-wide' onClick={() => setOpenLogout(true)}> Keluar </span>            
              </div>
            )}

            {!state.isAuthenticated && (
              <div className='flex items-center gap-2'>
                <Button text='Masuk' size='sm' variant='outline' onClick={() => setOpenLogin(true)}/>  
                <Button text='Daftar' size='sm' variant='success' className='tracking-wide'/>            
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