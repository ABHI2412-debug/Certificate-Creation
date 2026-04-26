import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function SearchCertificate() {
  const [certificateId, setCertificateId] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    if (!certificateId) return toast.error('Enter Certificate ID')
    navigate(`/view/${certificateId}`)
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Search Certificate</h1>

      <input
        value={certificateId}
        onChange={e => setCertificateId(e.target.value)}
        placeholder="Enter Certificate ID"
        className="w-full p-3 border rounded"
      />

      <button onClick={handleSearch} className="mt-4 bg-green-600 text-white px-6 py-2 rounded">
        Search
      </button>
    </div>
  )
}
