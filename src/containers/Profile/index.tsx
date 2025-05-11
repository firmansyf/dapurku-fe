'use client'

import { FC, useState } from 'react'
import DetailProfile from './DetailProfile'
import CartList from './CartList'
import { useQueriesGetCart } from '@/api/user/cart'
import { FiAlertCircle } from "react-icons/fi"

const ProfileModule: FC = () => {
    const [activeSection, setActiveSection] = useState('profile')
    const [page, ] = useState<number>(1)
    const params = { page, }
    
    const { data : cart} = useQueriesGetCart(params)?.data ?? []

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
                return <CartList cart={cart} />
            default:
                return null;
        }
    };

    return (
        <>
        <div className='text-2xl backdrop-blur-sm font-semibold bg-white/30 p-7 px-20 z-10 border-b-2 sticky top-14'>
            Informasi Pengguna
        </div>
        <div className='px-12 py-5'>
            <div className='flex rounded-md h-[80vh]'>
                <div className='w-1/5 pl-5 py-14'>
                    {/* Navigation */}
                    <nav className='space-y-2 sticky top-36'>
                        <button 
                            onClick={() => setActiveSection('profile')} 
                            className={`block text-sm w-full text-left px-3 py-2 rounded ${activeSection === 'profile' ? 'text-green-700 font-semibold' : ' hover:'}`}>
                            Profil Saya
                        </button>
                        <button 
                            onClick={() => setActiveSection('order')} 
                            className={`block text-sm w-full text-left px-3 py-2 rounded ${activeSection === 'order' ? 'text-green-700 font-semibold' : ' hover:'}`}>
                            Pesanan Saya
                        </button>
                        <button 
                            onClick={() => setActiveSection('cart')} 
                            className={`block text-sm w-full text-left px-3 py-2 rounded ${activeSection === 'cart' ? 'text-green-700 font-semibold' : ' hover:'}`}>
                                <span className='flex gap-1'>Keranjang {cart?.length > 0 && <FiAlertCircle className='text-red-500' />}</span>
                        </button>
                        <button 
                            onClick={() => setActiveSection('settings')} 
                            className={`block text-sm w-full text-left px-3 py-2 rounded ${activeSection === 'settings' ? 'text-green-700 font-semibold' : ' hover:'}`}>
                            Pengaturan Akun
                        </button>
                    </nav>
                </div>
                <div className='flex-1 ml-4 py-14 h-auto'>
                    {/* Content */}
                    {renderContent()}
                </div>
            </div>
        </div>
        </>
    );
};

export default ProfileModule;
