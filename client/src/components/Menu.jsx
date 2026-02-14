import { NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, Users, ShoppingCart, User } from "lucide-react"

const NavItem = ({ to, children, icon: Icon }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${isActive ? "bg-muted text-primary" : ""}`
    }>
    <Icon className="h-4 w-4" />
    {children}
  </NavLink>
)

export default function Menu() {
  return (
    <>
      <aside className="hidden border-r md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <NavLink
              to="/"
              className="flex items-center gap-2 font-semibold flex-row-reverse"
            >
              <img
                src="data/images/logo.png"
                alt="Logo"
                className="w-20 h-20"
              />

              <span className="text-xl">Resly</span>
            </NavLink>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-l font-medium lg:px-4">
              <NavItem to="/" icon={Home}>Accueil</NavItem>
              <NavItem to="/marques" icon={ShoppingCart}>Marques</NavItem>
              <NavItem to="/catalogues" icon={Users}>Catalogues</NavItem>
              <NavItem to="/profil" icon={User}>Profil</NavItem>
              <NavItem to="/annonces" icon={User}>Description</NavItem>
            </nav>
          </div>
        </div>
      </aside>

      <header className="flex items-center gap-4 border-b bg-muted/40 px-4 md:hidden h-14">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Home className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <NavLink to="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                <span className="">Resly</span>
              </NavLink>
              <NavItem to="/" icon={Home}>Accueil</NavItem>
              <NavItem to="/marques" icon={ShoppingCart}>Marques</NavItem>
              <NavItem to="/catalogues" icon={Users}>Catalogues</NavItem>
              <NavItem to="/profil" icon={User}>Profil</NavItem>
              <NavItem to="/annonces" icon={User}>Description</NavItem>
            </nav>
          </SheetContent>
        </Sheet>
        <h1 className="text-lg font-semibold">Resly</h1>
      </header>
    </>
  )
}
