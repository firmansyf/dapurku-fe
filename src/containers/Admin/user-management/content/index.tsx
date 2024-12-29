import { Datatable } from '@/components/commons'
import { DataUsers } from '@/types/admin/userManagement'
import { FC } from 'react'

const Content: FC = () => {
    
    const data = [
        { name: 'John Doe', age: 28, city: 'New York' },
        { name: 'Jane Smith', age: 34, city: 'Los Angeles' },
        { name: 'George Brown', age: 25, city: 'Chicago' },
        { name: 'Emily Johnson', age: 22, city: 'San Francisco' },
    ];
    
    return (
        <div className="container mx-auto p-6">
            <Datatable data={data} />
        </div>
    )
}

export default Content