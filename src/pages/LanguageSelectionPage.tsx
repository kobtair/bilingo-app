"use client"

import { useNavigate } from "react-router-dom"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { Button } from "../components/ui/button"
import chinaFlag from "../assets/chn.png"
import ukFlag from "../assets/eng.png"
import pakistanFlag from "../assets/pak.png"

const languages = [
  { id: "urdu", name: "Urdu", flag: pakistanFlag },
  { id: "chinese", name: "Chinese", flag: chinaFlag},
  { id: "english", name: "English", flag: ukFlag},
]

export default function LanguageSelectionPage() {
  const navigate = useNavigate()

  const selectLanguage = (languageId: string) => {
    // In a real app, you would save this to the user's profile
    localStorage.setItem("selectedLanguage", languageId)
    navigate("/home")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-900 to-blue-400">
      <div className="p-4 flex items-center">
        <Button variant="ghost" className="text-white p-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-white ml-4">Choose Language</h1>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {languages.map((language) => (
          <Button
            key={language.id}
            variant="outline"
            className="w-full bg-white hover:bg-gray-100 flex items-center justify-between p-6 rounded-lg"
            onClick={() => selectLanguage(language.id)}
          >
            <div className="flex items-center">
              <div className="w-12 h-8 mr-4 relative">
                <img
                  src={language.flag || "/placeholder.svg"}
                  alt={`${language.name} flag`}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl">{language.name}</span>
            </div>
            <ChevronRight className="h-6 w-6 text-blue-600" />
          </Button>
        ))}
      </div>

      <div className="w-full bg-blue-800 flex justify-around py-4">
        <Button variant="ghost" className="text-white flex flex-col items-center">
          <div className="w-6 h-6">🏠</div>
          <span className="text-xs">Home</span>
        </Button>
        <Button variant="ghost" className="text-white flex flex-col items-center">
          <div className="w-6 h-6">📚</div>
          <span className="text-xs">Learn</span>
        </Button>
        <Button variant="ghost" className="text-white flex flex-col items-center">
          <div className="w-6 h-6">📈</div>
          <span className="text-xs">Progress</span>
        </Button>
        <Button variant="ghost" className="text-white flex flex-col items-center">
          <div className="w-6 h-6">👤</div>
          <span className="text-xs">Profile</span>
        </Button>
      </div>
    </div>
  )
}

