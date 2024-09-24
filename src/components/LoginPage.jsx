import { useEffect, useState } from 'react'
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { AlertCircle } from "lucide-react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Component() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const navigate=useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    let newErrors = {}
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.password) newErrors.password = 'Password is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (validateForm()) {
      // Here you would typically send the data to your server
      if(isAdmin){
        console.log("Admin login")
        const response =await axios.post('http://localhost:3000/api/v1/admin/login',formData)
        const token=response.headers["token"]
        window.localStorage.setItem('token',token)
        navigate('/admin/dashboard')
      }else{
        console.log("user login")
        const response =await axios.post('http://localhost:3000/api/v1/user/login',formData)
        const token=response.headers["token"]
        window.localStorage.setItem('token',token)
        navigate('/user/courses')

      }
      console.log('Form submitted:', { ...formData, isAdmin })
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{isAdmin ? 'Admin Login' : 'User Login'}</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="user-type">Login as Admin</Label>
            <Switch
              id="user-type"
              checked={isAdmin}
              onCheckedChange={setIsAdmin}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="text-sm text-red-500 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-sm text-red-500 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.password}</p>}
          </div>
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 text-sm text-center text-gray-500">
        <a href="/forgot-password" className="text-primary hover:underline">Forgot password?</a>
        <p>Don't have an account? <a href="/signup" className="text-primary hover:underline">Sign up</a></p>
      </CardFooter>
    </Card>
  )
}