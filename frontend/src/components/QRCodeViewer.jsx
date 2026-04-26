import React from 'react'
export default function QRCodeViewer({value}){
  return (
    <div className="p-3 border rounded bg-white text-center text-sm">QR: {value || '-'}</div>
  )
}
