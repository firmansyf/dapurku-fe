'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { Button } from '@/components/commons'

interface DatatableProps<T> {
  data: T[]
  limit?: number
  page: number
  total?: number
  totalPages: number
  setPage: Dispatch<SetStateAction<number>>
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  onDetail?: (item: T) => void
  onSearch?: (query: string) => void
  onAdd?: () => void
  isActions?: boolean
}

const Datatable = <T extends Record<string, string | number | boolean>>({
  data,
  page,
  total,
  setPage,
  onEdit,
  onDelete,
  onDetail,
  onSearch,
  totalPages,
  onAdd,
  isActions = true
}: DatatableProps<T>) => {
  const [searchQuery, setSearchQuery] = useState('')
  
  const handlePreviousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  }

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  }


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    onSearch?.(query)
    setSearchQuery(query);
  }

  return (
    <div className="overflow-x-hidden">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search..."
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none"
        />

        {isActions && (<Button text='Tambah +' size='sm' className='text-sm' onClick={onAdd} />)}
      </div>

      {data?.length > 0 ? (
        <>
          <div className='overflow-x-auto'>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="border-b bg-gray-100">
                {/* Filter kolom untuk menghilangkan ID dan gambar */}
                {Object.keys(data[0] || {})
                  .filter((key) => key !== 'id' && key !== 'image' && key !== 'category_id')
                  .map((key) => (
                    <th key={key} className="py-2 px-4 text-left capitalize text-sm font-semibold text-gray-700">
                      {key}
                    </th>
                  ))}
                  {isActions && (<th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>)}
              </tr>
            </thead>

            <tbody>
              {data?.map((row, idx) => (
                <tr key={idx} className="border-b">
                  {/* Filter nilai untuk menghilangkan ID dan gambar */}
                  {Object.entries(row)
                    .filter(([key]) => key !== 'id' && key !== 'image' && key !== 'category_id')
                    .map(([key, value], i) => {
                      let displayValue: string | number | boolean = ''

                      if (typeof value === 'object' && value !== null) {
                        if (key === 'category' && 'name_category' in value) {
                          displayValue = value.name_category
                        } else {
                          displayValue = '[Object]'
                        }
                      } else {
                        displayValue = value
                      }

                      return (
                        <td key={i} className="py-2 px-4 text-sm text-gray-600">
                          <p className="truncate w-[200px]">{displayValue}</p>
                        </td>
                      )
                    })}
                  
                  {isActions && (
                    <td className="py-2 px-4 text-sm text-gray-600">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onDetail?.(row)}
                          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Detail
                        </button>
                        <button
                          onClick={() => onEdit?.(row)}
                          className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete?.(row)}
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          <div className="flex items-center justify-end gap-3 mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className={`px-4 py-2 border border-gray-300 rounded ${
                page === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'
              }`}
            >
              Previous
            </button>
            <span className="text-sm">
              Page {page} of {total}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className={`px-4 py-2 border border-gray-300 rounded ${
                page === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'
              }`}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500">No data available.</div>
      )}
    </div>
  )
}

export default Datatable
