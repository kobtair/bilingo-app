"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Play } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import NavBar from "../components/NavBar"
import { updateProgress } from "../api/progress"

const lessonData = {
  1: {
    title: "L1: Introduction",
    steps: [
      {
        title: "Step 1: Warm-Up",
        instructions:
          'Relax your mouth and tongue. The "R" sound requires your tongue to stay lifted without touching the roof of your mouth.',
        practice: [
          'Say "ahh" (as in doctor check-ups).',
          'Slowly transition to "err" by curling your tongue slightly backward, but don\'t let it touch the top of your mouth.',
        ],
        repeatInstructions: "Practice: Repeat the transition five times:",
        repeats: ['"ahhh" → "errr"', '"ahhh" → "errr"'],
      },
      {
        title: "Step 2: Sound Focus",
        instructions: 'The "R" sound is made with:',
        details: [
          "Tongue: Curled slightly back but not touching the roof of your mouth.",
          "Lips: Slightly rounded.",
          "Voice: Vibrating your vocal cords.",
        ],
        audioInstructions: "Listen and Repeat: Tap the play button to hear the sound.",
        audioUrl: "/sounds/r-sound.mp3",
        practice: [
          'Hear the sound "rrrrr".',
          'Now you try! Hold the sound for 3 seconds: "rrrrr".',
          "Repeat this five times.",
        ],
      },
    ],
  },
  2: {
    title: "L2: Common Phrases",
    steps: [
      {
        title: "Step 1: Greetings",
        instructions: "Practice these common greeting phrases:",
        practice: ["Hello - Hola", "Good morning - Buenos días", "How are you? - ¿Cómo estás?"],
      },
    ],
  },
  3: {
    title: "L3: Pronunciation",
    steps: [
      {
        title: "Step 1: Vowel Sounds",
        instructions: "Practice these vowel sounds:",
        practice: ["A - as in 'father'", "E - as in 'let'", "I - as in 'machine'"],
      },
    ],
  },
}

export default function LessonDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const lessonId = Number.parseInt(id || "1")
  const lesson = lessonData[lessonId as keyof typeof lessonData]

  useEffect(() => {
    // Mark lesson as started when the page loads
    const markLessonStarted = async () => {
      try {
        const userEmail = JSON.parse(localStorage.getItem("user") || "{}").email
        if (userEmail) {
          await updateProgress(userEmail, lessonId)
        }
      } catch (error) {
        console.error("Error updating progress:", error)
      }
    }

    markLessonStarted()
  }, [lessonId])

  if (!lesson) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-900 to-blue-400 items-center justify-center">
        <h1 className="text-2xl font-bold text-white">Lesson not found</h1>
        <Button className="mt-4 bg-blue-600 hover:bg-blue-700" onClick={() => navigate("/lessons")}>
          Back to Lessons
        </Button>
      </div>
    )
  }

  const playAudio = () => {
    if (audioRef.current) {
      setIsPlaying(true)
      audioRef.current.play()
      audioRef.current.onended = () => setIsPlaying(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-900 to-blue-400">
      <div className="p-4 flex items-center">
        <Button variant="ghost" className="text-white p-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-white ml-4">{lesson.title}</h1>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {lesson.steps.map((step, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <CardTitle>{step.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                <strong>Instructions:</strong> {step.instructions}
              </p>

              {step.details && (
                <ul className="list-disc pl-5 space-y-1">
                  {step.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              )}

              {step.practice && (
                <>
                  <ul className="list-disc pl-5 space-y-1">
                    {step.practice.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {step.repeatInstructions && (
                <p>
                  <strong>{step.repeatInstructions}</strong>
                </p>
              )}

              {step.repeats && (
                <ul className="list-disc pl-5 space-y-1">
                  {step.repeats.map((repeat, i) => (
                    <li key={i}>{repeat}</li>
                  ))}
                </ul>
              )}

              {step.audioInstructions && (
                <div className="space-y-2">
                  <p>{step.audioInstructions}</p>
                  <div className="flex items-center space-x-2">
                    <Button size="icon" onClick={playAudio} disabled={isPlaying}>
                      <Play className="h-4 w-4" />
                    </Button>
                    <div className="h-8 w-full bg-gray-200 rounded-md overflow-hidden">
                      <div className="h-full bg-green-500 w-1/2 flex items-center">
                        <div className="w-full h-4 flex items-center">
                          {Array.from({ length: 30 }).map((_, i) => (
                            <div
                              key={i}
                              className="h-full w-1 bg-green-300 mx-0.5"
                              style={{
                                height: `${Math.random() * 100}%`,
                                opacity: isPlaying ? 1 : 0.5,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <audio ref={audioRef} src={step.audioUrl} />
                  </div>
                </div>
              )}

              {index === 1 && (
                <div className="flex justify-center mt-4">
                  <Button size="icon" className="rounded-full h-16 w-16 bg-blue-600 hover:bg-blue-700">
                    <Mic className="h-8 w-8" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <NavBar activeItem="learn" />
    </div>
  )
}

function Mic(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  )
}

