import Image from 'next/image'
import { FC } from 'react'

const LeftContainer : FC = () => {
    return (
        <div className='w-1/3 min-h-screen px-10 relative'>
            <h1 className='text-2xl mt-10 font-semibold text-green-900'>Dapurku!</h1>

            <div>

            </div>

            <div className='flex items-center gap-2 border-2 py-2 px-32 justify-center rounded-md cursor-pointer bg-gray-100 tracking-wide absolute bottom-10 left-1/5'>
                <Image src='/logo/google.png' width={24} height={24} alt='google-logo' />
                <span className='text-sm opacity-70'>Sign up with Google</span>
            </div>
        </div>
    )
}

export { LeftContainer }