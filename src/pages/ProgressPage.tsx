"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import NavBar from "../components/NavBar"
import { getUserProgress } from "../api/progress"

export default function ProgressPage() {
  const navigate = useNavigate()
  const [progressData, setProgressData] = useState({
    overallProgress: 33,
    completedLessons: [1],
    totalLessons: 3,
    score: 90,
    rank: 2,
  })

  const leaderboardData = [
    { rank: 1, name: "Steve Wolfe", score: 100 },
    { rank: 2, name: "Sean John Combs (You)", score: 90 },
    { rank: 3, name: "Herschel Beahm IV", score: 30 },
    { rank: 4, name: "Aubrey Drake Graham", score: 10 },
  ]

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const userEmail = JSON.parse(localStorage.getItem("user") || "{}").email
        if (userEmail) {
          const data = await getUserProgress(userEmail)
          if (data) {
            setProgressData(data)
          }
        }
      } catch (error) {
        console.error("Error fetching progress:", error)
      }
    }

    fetchProgress()
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-900 to-blue-400">
      <div className="p-4 flex items-center">
        <Button variant="ghost" className="text-white p-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-white ml-4">Your Progress</h1>
      </div>

      <div className="flex-1 p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progressData.overallProgress} className="h-4 mb-2" />
            <p className="text-sm text-gray-500">You've completed {progressData.overallProgress}% of the course</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              Leaderboard <span className="text-yellow-500 ml-2">🏆</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {leaderboardData.map((user) => (
                <div
                  key={user.rank}
                  className={`flex items-center justify-between p-2 rounded-md ${
                    user.name.includes("(You)") ? "bg-blue-600 text-white" : user.rank === 1 ? "bg-blue-100" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <span className="w-6 text-center">{user.rank}</span>
                    <span className="ml-4">{user.name}</span>
                  </div>
                  <span>{user.score}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

