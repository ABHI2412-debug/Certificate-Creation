import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export default function Students(){
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    email: '',
    course: '',
    grade: ''
  })

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/students', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setStudents(data)
      } else {
        toast.error('Failed to fetch students')
      }
    } catch (error) {
      console.error('Error fetching students:', error)
      toast.error('Error fetching students')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitStudent = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const url = editingStudent
        ? `/api/students/${editingStudent._id}`
        : '/api/students'
      const method = editingStudent ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success(editingStudent ? 'Student updated successfully' : 'Student added successfully')
        setShowAddModal(false)
        setEditingStudent(null)
        setFormData({ studentId: '', name: '', email: '', course: '', grade: '' })
        fetchStudents()
      } else {
        const error = await response.json()
        toast.error(error.message || 'Failed to save student')
      }
    } catch (error) {
      console.error('Error saving student:', error)
      toast.error('Error saving student')
    } finally {
      setLoading(false)
    }
  }

  const handleEditStudent = (student) => {
    setEditingStudent(student)
    setFormData({
      studentId: student.studentId,
      name: student.name,
      email: student.email || '',
      course: student.course,
      grade: student.grade
    })
    setShowAddModal(true)
  }

  const handleDeleteStudent = async (studentId) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`/api/students/${studentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        return toast.error(data.message || 'Failed to delete student');
      }

      toast.success('Student deleted successfully');

      // Instantly update UI
      setStudents(prev => prev.filter(student => student._id !== studentId));
    } catch (error) {
      console.error('Error deleting student:', error);
      toast.error('Server error while deleting student');
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-green-900">Students</h1>
          <p className="text-green-700 text-lg mt-1">Manage student profiles and certificates</p>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-green-200 shadow-xl">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search students..."
                className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              + Add Student
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredStudents.map((student) => (
            <div key={student._id} className="bg-white rounded-2xl shadow-lg border border-green-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                  {student.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'ST'}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-green-900">{student.name}</h3>
                  <p className="text-green-700 text-base">{student.email}</p>
                  <p className="text-green-600 text-sm">ID: {student.studentId}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-base text-green-700 font-medium">Course</span>
                  <span className="text-lg font-bold text-green-900">{student.course}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-base text-green-700 font-medium">Grade</span>
                  <span className="text-lg font-bold text-green-900">{student.grade}</span>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleEditStudent(student)}
                  className="flex-1 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-all text-base font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteStudent(student._id)}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all text-base font-semibold shadow-lg hover:shadow-xl"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && !loading && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-green-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <h3 className="text-lg font-medium text-green-900 mb-2">No students found</h3>
            <p className="text-green-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Add/Edit Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-green-900">
                {editingStudent ? 'Edit Student' : 'Add New Student'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingStudent(null)
                  setFormData({ studentId: '', name: '', email: '', course: '', grade: '' })
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmitStudent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-green-700 mb-1">Student ID</label>
                <input
                  type="text"
                  required
                  value={formData.studentId}
                  onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  placeholder="Enter student ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-green-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  placeholder="Enter student name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-green-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  placeholder="Enter email (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-green-700 mb-1">Course</label>
                <input
                  type="text"
                  required
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  placeholder="Enter course name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-green-700 mb-1">Grade</label>
                <input
                  type="text"
                  required
                  value={formData.grade}
                  onChange={(e) => setFormData({...formData, grade: e.target.value})}
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  placeholder="Enter grade"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingStudent(null)
                    setFormData({ studentId: '', name: '', email: '', course: '', grade: '' })
                  }}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
                >
                  {loading ? 'Saving...' : (editingStudent ? 'Update' : 'Add Student')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
