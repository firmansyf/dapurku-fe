'use client'

import { FC, useState } from 'react'
import DetailProfile from './DetailProfile'

const ProfileModule: FC = () => {
    const [activeSection, setActiveSection] = useState('profile')

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
            case 'activity':
                return (
                    <div>
                        <h2 className='text-xl font-semibold mb-4'>Aktivitas Saya</h2>
                        <p>Daftar aktivitas Anda akan muncul di sini.</p>
                    </div>
                )
            default:
                return null;
        }
    };

    return (
        <>
        <div className='text-2xl backdrop-blur-sm font-semibold bg-white/30 p-7 px-20 z-10 border-b-2 sticky top-14'>
            Informasi Pengguna
        </div>
        <div className='p-[57px] min-h-screen overflow-y-hidden space-y-5'>
            <div className='flex rounded-md h-[80vh]'>
                <div className='w-1/5 p-5'>
                    {/* Navigation */}
                    <nav className='space-y-2'>
                        <button 
                            onClick={() => setActiveSection('profile')} 
                            className={`block text-sm w-full text-left px-3 py-2 rounded ${activeSection === 'profile' ? 'text-green-700 font-semibold' : ' hover:'}`}>
                            Profil Saya
                        </button>
                        <button 
                            onClick={() => setActiveSection('activity')} 
                            className={`block text-sm w-full text-left px-3 py-2 rounded ${activeSection === 'activity' ? 'text-green-700 font-semibold' : ' hover:'}`}>
                            Pesanan Saya
                        </button>
                        <button 
                            onClick={() => setActiveSection('settings')} 
                            className={`block text-sm w-full text-left px-3 py-2 rounded ${activeSection === 'settings' ? 'text-green-700 font-semibold' : ' hover:'}`}>
                            Pengaturan Akun
                        </button>
                    </nav>
                </div>
                <div className='flex-1 ml-4 p-5'>
                    {/* Content */}
                    {renderContent()}
                </div>
            </div>
        </div>
        </>
    );
};

export default ProfileModule;
