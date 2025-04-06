"use client"

import { useNavigate } from "react-router-dom"
import { ArrowLeft, Play } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"

const lessons = [
  {
    id: 1,
    title: "Lesson 1: Introduction",
    description: "Learn basic vocabulary",
    details:
      "Listen to the native speaker and try to mimic their accent. Pay attention to the pitch, loudness, and speed of their speech.",
  },
  {
    id: 2,
    title: "Lesson 2: Common Phrases",
    description: "Learn the most common phrases",
    details:
      "Listen to the native speaker and try to mimic their accent. Pay attention to the pitch, loudness, and speed of their speech.",
  },
  {
    id: 3,
    title: "Lesson 3: Pronunciation",
    description: "Learn Pronunciation",
    details: "Focus on the correct pronunciation of difficult sounds.",
  },
]

export default function LessonsPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-900 to-blue-400">
      <div className="p-4 flex items-center">
        <Button variant="ghost" className="text-white p-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-white ml-4">Choose Lesson</h1>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {lessons.map((lesson) => (
          <Card key={lesson.id} className="w-full">
            <CardHeader>
              <CardTitle>{lesson.title}</CardTitle>
              <p className="text-gray-500">{lesson.description}</p>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
                onClick={() => navigate(`/lessons/${lesson.id}`)}
              >
                <Play className="h-5 w-5" />
                Start Lesson
              </Button>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-500">{lesson.details}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

