import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pencil, Trash, Plus } from 'lucide-react'
import axios from 'axios'

// Mock courses data
export default function CourseCreatorDashboard() {
  const [courses, setCourses] = useState([])
  const [user, setuser] = useState({})
    useEffect(()=>{
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token":localStorage.getItem('token')
            }
          };
        axios.get('http://localhost:3000/api/v1/admin/getcourses',axiosConfig).then(response=>{
            setCourses(response.data)
        })
        axios.get('http://localhost:3000/api/v1/admin/admin-details',axiosConfig).then(response=>{setuser(response.data)})
    },[])
  const handleDeleteCourse = (id) => {
    if (window.confirm('Are you sure you want to delete this course this will delete the course from database?')) {
        axios.delete("http://localhost:3000/api/v1/admin/delete-course",{
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token":localStorage.getItem('token')
            },
              data: {
                id
              }
        })
      setCourses(courses.filter(course => course.id !== id))
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Course Creator Dashboard</h1>
        <div>
          <span className="mr-4">Welcome, {user?.firstname}</span>
          <Link to="/admin/create-course" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add New Course
          </Link>
        </div>
      </header>

      <main>
        <h2 className="text-2xl font-semibold mb-6">Your Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-blue-600">${course.price.toFixed(2)}</span>
                  <span className="text-sm text-gray-500">{course.students} students</span>
                </div>
                <div className="flex justify-between">
                  <Link 
                    to={`/edit-course/${course.id}`} 
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDeleteCourse(course._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}