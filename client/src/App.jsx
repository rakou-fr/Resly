import { Routes, Route } from "react-router-dom"
import Vitrine from "./pages/Vitrine"
import Login from "./pages/Login"
import DashboardLayout from "./components/dashboard/DashboardLayout"
import DashboardHome from "./pages/DashboardHome"
import PrivateRoute from "./components/PrivateRoute"

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Vitrine />} />
      <Route path="/login" element={<Login />} />

      {/* Protected dashboard */}
      <Route
        path="/dashboard/*"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        {/* Ajoute ici d'autres pages du dashboard */}
      </Route>
    </Routes>
  )
}

export default App
