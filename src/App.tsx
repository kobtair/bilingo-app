import { Routes, Route } from "react-router-dom"
import WelcomePage from "./pages/WelcomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import CourseSelectionPage from "./pages/CourseSelectionPage"
import HomePage from "./pages/HomePage"
import LessonsPage from "./pages/LessonsPage"
import LessonDetailPage from "./pages/LessonDetailPage"
import ProgressPage from "./pages/ProgressPage"
import PracticePage from "./pages/PracticePage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ProfilePage from "./pages/ProfilePage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/language-selection" element={<CourseSelectionPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/lessons" element={<LessonsPage />} />
      <Route path="/lessons/:id" element={<LessonDetailPage />} />
      <Route path="/progress" element={<ProgressPage />} />
      <Route path="/practice" element={<PracticePage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  )
}

export default App

