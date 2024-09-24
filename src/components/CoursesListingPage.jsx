import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"


// This would typically come from an API call
const initialCourses= [
  {
    "_id": "66f03b7d5ddedab5ad7acd88",
    "title": "hello 2222 course",
    "description": "dummy description is need for this ",
    "price": 999,
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGvitVKYc5RmP_PMx0N1CeuqxMZP5aKHwnVA&s",
    "createdBy": "66f038d9698ec5a03287d43c",
    "__v": 0
  },
  // Add more courses here as needed
]

export default function Component() {
  const [courses, setCourses] = useState(initialCourses)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
      <div className="mb-4">
        <Label htmlFor="search">Search Courses</Label>
        <Input
          id="search"
          placeholder="Search by title or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <Card key={course._id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <img 
                src={course.imageUrl} 
                alt={course.title} 
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <p className="font-bold text-lg">${course.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">View Details</Button>
              <Button>Enroll Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {filteredCourses.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No courses found matching your search.</p>
      )}
    </div>
  )
}