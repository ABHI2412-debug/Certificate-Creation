import React from 'react'
export default function Pagination(){
  return (
    <div className="flex gap-2 items-center">
      <button className="px-3 py-1 border rounded">Prev</button>
      <div className="text-sm text-gray-600">1 / 1</div>
      <button className="px-3 py-1 border rounded">Next</button>
    </div>
  )
}
