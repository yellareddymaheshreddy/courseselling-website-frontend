import React ,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { BookOpen, GraduationCap, Star } from "lucide-react"

const LandingPage = () => {
  const [islogin, setislogin] = useState(false)
  useEffect(()=>{
    const token=localStorage.getItem('token')
    console.log("effect",token)
    if(token){
      setislogin(true)
    }
  },[])
  const [email, setEmail] = React.useState('')
  const navigate=useNavigate()
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement email subscription logic
    console.log('Subscribing email:', email)
    setEmail('')
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <div className="flex items-center justify-center">
          <GraduationCap className="h-6 w-6 mr-2" />
          <span className="font-bold text-xl">EduPlatform</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {islogin?(<>
          <Button className="w-full" onClick={()=>{
            localStorage.removeItem('token')
            setislogin(false)
          }}>Logout</Button>
          <Button className="w-full" onClick={()=>{
            navigate('/user/courses')
          }}>Courses</Button>
          
          </>
          ):( <>
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="/login">Login</Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" to="/admin/signup">Signup as Admin</Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" to="/user/signup">Signup as User</Link> </>)}
         
            
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Unlock Your Potential with Online Courses
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  Discover a world of knowledge at your fingertips. Learn from industry experts and advance your career.
                </p>
              </div>
              <div className="space-x-4">
                <Button variant="secondary" size="lg">
                  Browse Courses
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="courses" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Featured Courses</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Web Development Bootcamp", description: "Learn HTML, CSS, and JavaScript", price: "$99", rating: 4.8 },
                { title: "Data Science Fundamentals", description: "Master Python and Machine Learning", price: "$129", rating: 4.9 },
                { title: "Digital Marketing Mastery", description: "Grow your online presence", price: "$79", rating: 4.7 },
              ].map((course, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BookOpen className="h-12 w-12 mb-4" />
                    <p className="text-2xl font-bold">{course.price}</p>
                    <div className="flex items-center mt-2">
                      <Star className="h-5 w-5 text-yellow-400 mr-1" />
                      <span>{course.rating}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Enroll Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Students Say</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Alex Johnson", role: "Web Developer", quote: "This platform transformed my career. The courses are top-notch!" },
                { name: "Sarah Lee", role: "Data Analyst", quote: "I learned more in 3 months than I did in my entire college program." },
                { name: "Mike Brown", role: "Marketing Specialist", quote: "The instructors are industry experts. Highly recommended!" },
              ].map((testimonial, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Simple, Transparent Pricing</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Basic", price: "$9.99/month", features: ["Access to 10 courses", "Community support", "Monthly webinars"] },
                { name: "Pro", price: "$19.99/month", features: ["Access to all courses", "Priority support", "Weekly live Q&A sessions", "Certificates of completion"] },
                { name: "Enterprise", price: "Custom", features: ["Custom course creation", "Dedicated account manager", "Advanced analytics", "API access"] },
              ].map((plan, index) => (
                <Card key={index} className={index === 1 ? "border-primary" : ""}>
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription className="text-2xl font-bold">{plan.price}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">{index === 2 ? "Contact Sales" : "Get Started"}</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Start Learning Today
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-600 md:text-xl">
                  Join thousands of students and take the first step towards your goals.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2" onSubmit={handleSubmit}>
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  <Button type="submit">Subscribe</Button>
                </form>
                <p className="text-xs text-gray-500">
                  By subscribing, you agree to our Terms & Conditions and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2023 EduPlatform. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#terms">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#privacy">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  )
}

export default LandingPage