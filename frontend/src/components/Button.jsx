import React from 'react'
export default function Button({children, onClick, className=''}){
  return (
    <button onClick={onClick} className={`btn bg-green-600 text-white hover:bg-green-700 ${className}`}>
      {children}
    </button>
  )
}
