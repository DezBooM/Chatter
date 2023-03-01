import { Navigate, Route, Routes } from "react-router-dom"
import { useAuthContext } from "./contexts/AuthContext"
import Home from "./pages/Home"
import Login from "./pages/Login"
import PasswordReset from "./pages/PasswordReset"
import Register from "./pages/Register"

function App() {
  const { currentUser } = useAuthContext()

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" replace />
    } else return children
  }

  return (
    <div className="min-h-screen bg-green-600 font-overpass text-green-100">
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="password-reset" element={<PasswordReset />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
