import { LogOut, CheckCircle} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUserStore } from "@/store/User/user";
import { useNavigate } from "react-router";

export default function ProfilePage() {
  const {user, logout} = useUserStore();
    const navigate = useNavigate();
    const handleLogOut = () => {
        logout();
        navigate("/");
    }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-900 via-blue-700 to-blue-400">
      {/* Header */}
      <header className="pt-12 pb-6 text-center">
        <h1 className="text-2xl font-bold text-white">Your Profile</h1>
      </header>

      {/* Profile Card */}
      <div className="mx-4 bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
        {/* Avatar and User Info */}
        <div className="w-full flex items-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center text-white text-xl font-bold">
              DD
            </div>
            <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold">{user?.name}</h2>
            <p className="text-gray-600 text-sm">{user?.email}</p>
          </div>
        </div>

        {/* Buttons */}
        <Button className="w-full bg-blue-500 hover:bg-blue-600 mb-3" variant="default">
          Privacy Policy
        </Button>
        <Button className="w-full bg-blue-500 hover:bg-blue-600 mb-3" variant="default">
          Terms of Service
        </Button>
        <Button onClick={handleLogOut} className="w-full border-red-500 text-red-500 hover:bg-red-50" variant="outline">
          <LogOut className="w-5 h-5 mr-2" /> Log Out
        </Button>
      </div>
    </div>
  )
}

