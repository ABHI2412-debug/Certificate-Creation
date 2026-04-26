import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function DownloadCertificate() {
  const { id } = useParams()
  const { user } = useAuth()
  const [certificates, setCertificates] = useState([])

  useEffect(() => {
    fetchMyCertificates()
  }, [])

  const fetchMyCertificates = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('http://localhost:5000/api/certificates', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()

      const myCerts = data.certificates?.filter(cert =>
        cert.studentName?.toLowerCase().includes(user?.name?.toLowerCase())
      ) || []

      setCertificates(myCerts)
    } catch (err) {
      console.error(err)
    }
  }

  const selected = certificates.find(c => c.certificateId === id)

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Download Certificates</h1>

      {id && selected && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">{selected.course}</h2>
          <p>{selected.studentName}</p>
          <a
            href={`http://localhost:5000/uploads/certificates/${selected.fileName}`}
            download
            className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded"
          >
            Download PDF
          </a>
        </div>
      )}

      {!id && (
        <div className="grid md:grid-cols-2 gap-4">
          {certificates.map(cert => (
            <div key={cert.certificateId} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">{cert.course}</h3>
              <p className="text-sm text-gray-600">{cert.studentName}</p>
              <Link
                to={`/download/${cert.certificateId}`}
                className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded"
              >
                Download
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
