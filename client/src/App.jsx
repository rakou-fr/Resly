import { Routes, Route } from "react-router-dom"
import Menu from "./components/Menu"
import Home from "./pages/Home"
import Marques from "./pages/Marques"
import Profil from "./pages/Profil"
import Catalogues from "./pages/Catalogues"
import Articles from "./pages/Articles"
import { ModeToggle } from "./components/mode-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Home as HomeIcon} from "lucide-react"
import { NavLink } from "react-router-dom"
import { Users, ShoppingCart, User } from "lucide-react"
import Annonces from "./pages/annonces"
import Vitrine from "./pages/Vitrine"
import Login from "./pages/Login"
import PrivateRoute from "./components/PrivateRoute"

// Petit composant pour les liens du mobile
const NavItem = ({ to, children, icon: Icon }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
        isActive ? "bg-muted text-primary" : ""
      }`
    }
  >
    <Icon className="h-4 w-4" />
    {children}
  </NavLink>
)


function App() {
  return (
    <Routes>
      {/* Page vitrine */}
      <Route path="/" element={<Vitrine />} />
      <Route path="/login" element={<Login />} />
      {/* App protégée */}
      <Route
        path="/dashboard/*"
        element={
          <PrivateRoute>
            <div className="flex w-full h-screen">
              {/* Menu desktop */}
              <aside className="hidden md:flex md:flex-col border-r">
                <Menu />
              </aside>

              {/* Contenu principal */}
              <div className="flex-1 flex flex-col">
                <header className="flex h-14 border-b px-4 lg:h-[60px] lg:px-6 sticky top-0 z-10">
                  <div className="flex items-center gap-4 md:hidden">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                          <HomeIcon className="h-5 w-5" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="flex flex-col p-4 gap-4">
                        <h2 className="text-lg font-semibold mb-4">Resly</h2>
                        <nav className="flex flex-col gap-2">
                          <NavItem to="/dashboard" icon={HomeIcon}>Accueil</NavItem>
                          <NavItem to="/dashboard/marques" icon={ShoppingCart}>Marques</NavItem>
                          <NavItem to="/dashboard/catalogues" icon={Users}>Catalogues</NavItem>
                          <NavItem to="/dashboard/annonces" icon={User}>Description</NavItem>
                          <NavItem to="/dashboard/profil" icon={User}>Profil</NavItem>
                        </nav>
                      </SheetContent>
                    </Sheet>
                    <h1 className="text-lg font-semibold">Resly</h1>
                  </div>

                  <div className="mt-2 ml-auto md:ml-0">
                    <ModeToggle />
                  </div>
                </header>

                <main className="flex-1 overflow-auto p-4 lg:p-6">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard/marques" element={<Marques />} />
                    <Route path="/dashboard/catalogues" element={<Catalogues />} />
                    <Route path="/dashboard/profil" element={<Profil />} />
                    <Route path="/dashboard/annonces" element={<Annonces />} />
                    <Route path="/dashboard/articles" element={<Articles />} />
                  </Routes>
                </main>
              </div>
            </div>
          </PrivateRoute>
        }
      />
    </Routes>

  )
}

export default App
