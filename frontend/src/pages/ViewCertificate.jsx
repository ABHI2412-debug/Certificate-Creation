import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ViewCertificate() {
  const { id } = useParams()
  const [certificate, setCertificate] = useState(null)

  useEffect(() => {
    loadCertificate()
  }, [])

  const loadCertificate = async () => {
    try {
      const res = await fetch(`/api/certificates/public/${id}`)
      const data = await res.json()

      if (!res.ok) throw new Error(data.message)

      setCertificate(data.certificate)
    } catch (err) {
      toast.error(err.message)
    }
  }

  if (!certificate) return <p>Loading...</p>

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Certificate</h1>

      <div className="border p-6 rounded bg-white">
        <p><b>Certificate ID:</b> {certificate.certificateId}</p>
        <p><b>Name:</b> {certificate.studentName}</p>
        <p><b>Course:</b> {certificate.course}</p>
        <p><b>Grade:</b> {certificate.grade}</p>
        <p><b>Issue Date:</b> {new Date(certificate.issueDate).toDateString()}</p>

        <a
          href={certificate.pdfUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-4 bg-green-600 text-white px-6 py-2 rounded"
        >
          Download Certificate
        </a>
      </div>
    </div>
  )
}
