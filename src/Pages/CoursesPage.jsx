import { useState,useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

// Mock user data
// const user = {
//   firstname: "firstname Doe",
//   email: "john@example.com"
// }

// Updated mock course data


export default function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [toast, setToast] = useState(null)
  const [user, setuser] = useState({})
  useEffect(()=>{
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          "token":localStorage.getItem('token')
      }
    };
    axios.get('http://localhost:3000/api/v1/user/allcourses').then((courses)=>{
        setCourses(courses.data)
    })
    axios.get("http://localhost:3000/api/v1/user/user-details",axiosConfig).then((response)=>{
      console.log(response.data)
      setuser(response.data)
  }
      ) 
  },[])

  const enrollCourse = async(courseId) => {
    console.log(courseId)
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "token":localStorage.getItem('token')
        }
      };
    const response=await axios.post("http://localhost:3000/api/v1/user/purchase",{"courseId":courseId},axiosConfig)
    console.log(response)
    setCourses(courses.map(course => 
      course._id === courseId ? { ...course, enrolled: true } : course
    ))
    console.log(courses)
    setToast("Enrolled Successfully! You have been enrolled in the course.")
    setTimeout(() => setToast(null), 3000) // Hide toast after 3 seconds
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user.firstname}</h1>
        <Link to="/user/dashboard" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Go to Dashboard
        </Link>
      </header>

      <main>
        <h2 className="text-2xl font-semibold mb-6">Available Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-blue-600">${course.price.toFixed(2)}</span>
                  <span className="text-sm text-gray-500">Created by: {course.createdBy}</span>
                </div>
                <div className="mb-4">
                  <span className={`text-sm font-semibold px-2 py-1 rounded ${
                    course.enrolled ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'
                  }`}>
                    {course.enrolled ? 'Enrolled' : 'Available'}
                  </span>
                </div>
                <button 
                  onClick={() => enrollCourse(course._id)} 
                  disabled={course.enrolled}
                  className={`w-full py-2 px-4 rounded font-bold ${
                    course.enrolled 
                      ? 'bg-gray-300 text-gray-800 cursor-not-allowed' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {course.enrolled ? 'Enrolled' : 'Enroll Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {toast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          {toast}
        </div>
      )}
    </div>
  )
}