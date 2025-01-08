'use client'

import { Datatable } from '@/components/commons'
import { FC, useState } from 'react'
import moment from 'moment'
import { useDebounce } from 'use-debounce'
import { useQueriesGetUsers } from '@/api/admin/user'
import { User } from '@/types/admin/userManagement';

const Content: FC = () => {
  const [page, setPage] = useState<number>(1)
  const [reloadData] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [debouncedSearch] = useDebounce(searchQuery, 700)
    
    const params = { page, keyword: debouncedSearch}
    const { data: users } = useQueriesGetUsers(reloadData, params) ?? [];
    const limit = users?.meta?.limit ?? 10
    const total = users?.meta?.total ?? 0
    const totalPages = users?.meta?.totalPages 

    // Mapping data
    const data = users?.data.map((item : User) => {
      return {
        ...item,
        birth_date: moment(item.birth_date).format('LLL'),
        registration_date: moment(item.registration_date).format('LLL'),
        is_active: `${item.is_active === true ? 'Yes' : 'No'}`,
        is_verified: `${item.is_verified === true ? 'Yes' : 'No'}`,
      }
    })

    const handleSearch = (query: string) => {
        setSearchQuery(query)
        setPage(1)
    }

    
    return (
        <div className="container mx-auto p-6">
            <Datatable 
              page={page} 
              total={total}
              limit={limit} 
              setPage={setPage}
              data={data}
              onSearch={handleSearch}
              totalPages={totalPages}
              isActions={false}
            />
        </div>
    )
}

export default Content