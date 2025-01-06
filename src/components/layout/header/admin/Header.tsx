import React, { useState } from 'react'
import Logout from '@/containers/Logout'
import Link from 'next/link'
import { PATHS } from '@/helpers/constants'


const HeaderAdmin: React.FC = () => {
  const [openLogout, setOpenLogout] = useState<boolean>(false)

  const menu = [
    { id: 1, label: 'User Management', path: PATHS.userManagement},
    { id: 2, label: 'Product Management', path: PATHS.productManagement}
  ]

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-[#003A77] shadow z-50">
        <div className="mx-auto xl:px-7 sm:px-6 lg:px-2">
          <div className="flex gap-3 justify-between items-center h-14">
            <div className={`text-lg text-white font-bold`}>
                Dapurku! CMS
            </div>

            {/* Navigation */}
            <nav className="space-x-6 text-white text-center">
              {menu.map((link, index) => (
                <Link
                  href={link.path}
                  key={index}
                  className="text-sm transition"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            
            <div className='flex items-center gap-2'> 
              <Link
                href='#'
                className='tracking-wide text-white text-lg'
                onClick={() => setOpenLogout(true)}
              >
                Keluar
              </Link>           
            </div>
          
          </div>
        </div>
      </header>

      <Logout isOpen={openLogout} setIsOpen={setOpenLogout} />
    </>
  );
};

export default HeaderAdmin;