import { FC } from 'react'
import Header from './header'
import Content from './content'


const UserManagement: FC = () => {
    return (
        <div className='my-14'>
            <Header />
            <Content />
        </div>
    )
}

export default UserManagement