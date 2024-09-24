import { useEffect, useState } from 'react'
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { AlertCircle } from "lucide-react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Component() {
  
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
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
    if (!formData.firstname.trim()) newErrors.firstname = 'First name is required'
    if (!formData.lastname.trim()) newErrors.lastname = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (validateForm()) {
      // Here you would typically send the data to your server
      const response =await axios.post('http://localhost:3000/api/v1/user/signup',formData)
      console.log('Form submitted:', response)
      navigate('/login')
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>Sign up for a new user account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstname">First Name</Label>
              <Input 
                id="firstname" 
                name="firstname" 
                value={formData.firstname}
                onChange={handleChange}
                placeholder="John"
              />
              {errors.firstname && <p className="text-sm text-red-500 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.firstname}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname">Last Name</Label>
              <Input 
                id="lastname" 
                name="lastname" 
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Doe"
              />
              {errors.lastname && <p className="text-sm text-red-500 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.lastname}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
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
              placeholder="Create a strong password"
            />
            {errors.password && <p className="text-sm text-red-500 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.password}</p>}
          </div>
          <Button type="submit" className="w-full">Sign Up</Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 text-sm text-center text-gray-500">
        <p>By signing up, you agree to our Terms of Service and Privacy Policy.</p>
        <p>Already have an account? <a href="/login" className="text-primary hover:underline">Log in</a></p>
      </CardFooter>
    </Card>
  )
}