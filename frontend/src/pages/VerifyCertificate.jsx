import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState('')
  const [certificate, setCertificate] = useState(null)

  const verifyCertificate = async () => {
    if (!certificateId) return toast.error('Enter Certificate ID')

    try {
      const res = await fetch(`/api/certificates/public/${certificateId}`)
      const data = await res.json()

      if (!res.ok) throw new Error(data.message)

      setCertificate(data.certificate)
      toast.success('Certificate is valid')
    } catch (err) {
      toast.error(err.message)
      setCertificate(null)
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Verify Certificate</h1>

      <input
        value={certificateId}
        onChange={e => setCertificateId(e.target.value)}
        placeholder="Enter Certificate ID"
        className="w-full p-3 border rounded"
      />

      <button onClick={verifyCertificate} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded">
        Verify
      </button>

      {certificate && (
        <div className="mt-6 border p-4 rounded bg-white">
          <p><b>Name:</b> {certificate.studentName}</p>
          <p><b>Course:</b> {certificate.course}</p>
          <p><b>Grade:</b> {certificate.grade}</p>
          <p><b>Status:</b> {certificate.valid ? 'Valid' : 'Invalid'}</p>
        </div>
      )}
    </div>
  )
}
