"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { Button } from "../components/ui/button"

export default function CourseSelectionPage() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])

  const api = import.meta.env.VITE_BACKEND_API
  console.log("API URL:", api)

  useEffect(() => {
    fetch(`${api}/courses`)
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error(err))
  }, [])

  const selectCourse = (courseId: string) => {
    localStorage.setItem("selectedCourse", courseId)
    navigate("/home")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-900 to-blue-400">
      <div className="p-4 flex items-center">
        <Button variant="ghost" className="text-white p-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-white ml-4">Choose Course</h1>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {courses.map((course: any) => (
          <Button
            key={course.id}
            variant="outline"
            className="w-full bg-white hover:bg-gray-100 flex items-center justify-between p-6 rounded-lg"
            onClick={() => selectCourse(course.id)}
          >
            <div className="flex items-center">
              <span className="text-xl">{course.title}</span>
            </div>
            <ChevronRight className="h-6 w-6 text-blue-600" />
          </Button>
        ))}
      </div>
    </div>
  )
}

