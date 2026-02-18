import { useNavigate, Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"

export default function DashboardLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  // Protection simple
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) navigate("/login")
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/")
  }

  const navItems = [
    { name: "Accueil", path: "/dashboard" },
    { name: "Recherche", path: "/dashboard/search" },
    { name: "Mes annonces", path: "/dashboard/listings" },
    { name: "Statistiques", path: "/dashboard/stats" },
    { name: "Paramètres", path: "/dashboard/settings" }
  ]

  return (
    <div className="flex min-h-screen bg-black text-white overflow-hidden">

      {/* Background premium */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#000000]" />
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-white/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[160px]" />
      </div>

      {/* Sidebar */}
      <aside className="w-64 h-screen fixed left-0 top-0 
                        bg-white/5 backdrop-blur-2xl 
                        border-r border-white/10 
                        flex flex-col justify-between p-6">

        {/* Logo */}
        <div>
          <h1 
            onClick={() => navigate("/dashboard")}
            className="text-2xl font-semibold tracking-wide cursor-pointer hover:text-white/80 transition"
          >
            RESLY
          </h1>

          <nav className="mt-10 flex flex-col gap-2">
            {navItems.map((item) => {
              const active = location.pathname === item.path

              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`text-left px-4 py-3 rounded-xl transition-all duration-300
                    ${
                      active
                        ? "bg-white/10 border border-white/20 shadow-lg"
                        : "hover:bg-white/5 hover:border hover:border-white/10"
                    }`}
                >
                  <span className="text-white/80">{item.name}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-white/10 border border-white/20 hover:bg-white/20 transition-all rounded-xl"
        >
          Se déconnecter
        </button>
      </aside>

      {/* Content */}
      <main className="ml-64 flex-1 p-10">
        <Outlet />
      </main>
    </div>
  )
}
