import { Navigate, Outlet } from "react-router-dom"

function PrivateRoute({ user }: { user: any }) {
  // Redirect to the welcome page if the user is not logged in
  return user ? <Outlet /> : <Navigate to="/" replace />
}

export default PrivateRoute
