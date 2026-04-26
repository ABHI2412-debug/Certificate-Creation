import React from 'react'
export default function SearchBar({value='', onChange}){
  return (
    <div className="flex items-center gap-2">
      <input value={value} onChange={onChange} placeholder="Search..." className="px-3 py-2 border rounded w-full bg-white" />
      <button className="btn bg-gray-800 text-white">Search</button>
    </div>
  )
}
