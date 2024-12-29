'use client'

import { useState } from 'react';

interface DataTableProps<T> {
  data: T[];
}

const DataTable = <T extends Record<string, string | number | boolean>>({ data }: DataTableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filter data berdasarkan search term
  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="overflow-x-auto">
      <input
        type="text"
        placeholder="Search..."
        className="p-2 mb-4 border border-gray-300 rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="border-b bg-gray-100 rounded-full">
            {Object.keys(data[0]).map((key) => (
              <th key={key} className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, idx) => (
            <tr key={idx} className="border-b">
              {Object.values(row).map((value, i) => (
                <td key={i} className="py-2 px-4 text-sm text-gray-600">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;