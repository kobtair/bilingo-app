"use client"

import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"

interface NavBarProps {
  activeItem: "home" | "learn" | "progress" | "profile"
}

export default function NavBar({ activeItem }: NavBarProps) {
  const navigate = useNavigate()

  return (
    <div className="w-full bg-blue-800 flex justify-around py-4">
      <Button
        variant="ghost"
        className={`text-white flex flex-col items-center ${activeItem === "home" ? "bg-blue-700" : ""}`}
        onClick={() => navigate("/home")}
      >
        <div className="w-6 h-6">🏠</div>
        <span className="text-xs">Home</span>
      </Button>
      <Button
        variant="ghost"
        className={`text-white flex flex-col items-center ${activeItem === "learn" ? "bg-blue-700" : ""}`}
        onClick={() => navigate("/lessons")}
      >
        <div className="w-6 h-6">📚</div>
        <span className="text-xs">Learn</span>
      </Button>
      <Button
        variant="ghost"
        className={`text-white flex flex-col items-center ${activeItem === "progress" ? "bg-blue-700" : ""}`}
        onClick={() => navigate("/progress")}
      >
        <div className="w-6 h-6">📈</div>
        <span className="text-xs">Progress</span>
      </Button>
      <Button
        variant="ghost"
        className={`text-white flex flex-col items-center ${activeItem === "profile" ? "bg-blue-700" : ""}`}
        onClick={() => navigate("/profile")}
      >
        <div className="w-6 h-6">👤</div>
        <span className="text-xs">Profile</span>
      </Button>
    </div>
  )
}

