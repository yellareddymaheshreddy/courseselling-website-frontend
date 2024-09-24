import { useState } from 'react'
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { AlertCircle } from "lucide-react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Component() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
  })
  const [errors, setErrors] = useState({})
  const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    let newErrors = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.price.trim()) newErrors.price = 'Price is required'
    else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) < 0) newErrors.price = 'Price must be a valid number'
    if (!formData.imageUrl.trim()) newErrors.imageUrl = 'Image URL is required'
    else if (!/^https?:\/\/.+\..+/.test(formData.imageUrl)) newErrors.imageUrl = 'Invalid image URL'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "token":localStorage.getItem('token')
        }
      };
      // Here you would typically send the data to your server
      axios.post("http://localhost:3000/api/v1/admin/create-course",{...formData},axiosConfig).then(response=>console.log(response.data))
      console.log('Course created:', formData)
      navigate('/admin/dashboard')
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create a New Course</CardTitle>
        <CardDescription>Fill in the details to create a new course</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Course Title</Label>
            <Input 
              id="title" 
              name="title" 
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter course title"
            />
            {errors.title && <p className="text-sm text-red-500 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.title}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Course Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter course description"
              rows={4}
            />
            {errors.description && <p className="text-sm text-red-500 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.description}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input 
              id="price" 
              name="price" 
              type="number" 
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter course price"
              min="0"
              step="0.01"
            />
            {errors.price && <p className="text-sm text-red-500 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.price}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input 
              id="imageUrl" 
              name="imageUrl" 
              type="url" 
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Enter course image URL"
            />
            {errors.imageUrl && <p className="text-sm text-red-500 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.imageUrl}</p>}
          </div>
          
          <Button type="submit" className="w-full">Create Course</Button>
        </form>
      </CardContent>
      <CardFooter className="text-sm text-center text-gray-500">
        Make sure all information is accurate before creating the course.
      </CardFooter>
    </Card>
  )
}