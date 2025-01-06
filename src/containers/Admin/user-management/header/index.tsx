import { FC } from 'react'

const Header: FC = () => {
    return (
        <div className='backdrop-blur-sm bg-white/30 p-7 sticky top-14 border-b-2'>
            <h1 className='text-xl font-bold'>Users Management</h1>
        </div>
    )
}

export default Header