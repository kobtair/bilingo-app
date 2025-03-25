"use client"

import { NavLink } from "react-router-dom"
// import { Button } from "./ui/button"
// import { useNavigate } from "react-router-dom"

export default function NavBar() {
  return (
    <div className="w-full bg-blue-800 flex justify-around py-4 fixed bottom-0 left-0">
      <NavLink
        to="/home"
        className={({ isActive }) => `text-white flex flex-col items-center ${isActive ? "bg-blue-700" : ""}`}
      >
        <div className="w-6 h-6">🏠</div>
        <span className="text-xs">Home</span>
      </NavLink>
      <NavLink
        to="/lessons"
        className={({ isActive }) => `text-white flex flex-col items-center ${isActive ? "bg-blue-700" : ""}`}
      >
        <div className="w-6 h-6">📚</div>
        <span className="text-xs">Learn</span>
      </NavLink>
      <NavLink
        to="/progress"
        className={({ isActive }) => `text-white flex flex-col items-center ${isActive ? "bg-blue-700" : ""}`}
      >
        <div className="w-6 h-6">📈</div>
        <span className="text-xs">Progress</span>
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) => `text-white flex flex-col items-center ${isActive ? "bg-blue-700" : ""}`}
      >
        <div className="w-6 h-6">👤</div>
        <span className="text-xs">Profile</span>
      </NavLink>
    </div>
  );
}

