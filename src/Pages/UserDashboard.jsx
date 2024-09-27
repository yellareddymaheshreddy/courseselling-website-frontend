import axios from 'axios'
import  { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Mock user data
const initialUserData = {
  firstname: "John Doe",
  email: "john@example.com",
  _id: "352345we53er45",
  avatar: "/User.svg"
}

// Mock enrolled courses data


export default function UserDashboard() {
  const [userData, setUserData] = useState(initialUserData)
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const navigate=useNavigate()
    useEffect(()=>{
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "token":localStorage.getItem('token')
            }
          };
        axios.post("http://localhost:3000/api/v1/user/course",undefined,axiosConfig).then((response)=>{
            console.log(response.data)
            setEnrolledCourses(response.data)
        }
            ) 
        axios.get("http://localhost:3000/api/v1/user/user-details",axiosConfig).then((response)=>{
            console.log(response.data)
            setUserData({...response.data,avatar:'/User.svg'})
        }
            ) 
    },[])
  const handleLogout = () => {
    // Implement logout logic here
    console.log("User logged out")
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex flex-col items-center">
              <img
                src={userData.avatar}
                alt={`${userData.firstname}'s avatar`}
                className="w-32 h-32 rounded-full mb-4"
              />
              <h2 className="text-2xl font-semibold">{userData.firstname}</h2>
              <p className="text-gray-600">{userData.email}</p>
              <p className="text-sm text-gray-500 mt-1">Joined: {userData._id}</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Your Enrolled Courses</h3>
            {enrolledCourses.length === 0 ? (
              <p>You haven t enrolled in any courses yet.</p>
            ) : (
              <div className="space-y-6">
                {enrolledCourses.map((course) => (
                  <div key={course._id} className="flex flex-col md:flex-row gap-4 border-b pb-4 last:border-b-0">
                    <img 
                      src={course.imageUrl} 
                      alt={course.title} 
                      className="w-full md:w-48 h-32 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-lg font-medium mb-2">{course.title}</h4>
                      <p className="text-gray-600 mb-2">{course.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Created by: {course.createdBy}</span>
                        <span className="text-lg font-bold text-blue-600">${course.price.toFixed(2)}</span>
                      </div>
                      <Link
                        to={`/course/${course.id}`}
                        className="mt-2 inline-block text-blue-500 hover:text-blue-600"
                      >
                        Go to Course
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}