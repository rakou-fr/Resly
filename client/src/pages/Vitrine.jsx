import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import CGV from "./vitrine/CGV"
import FAQ from "./vitrine/faq"
import Features from "./vitrine/Features"
import Stats from "./vitrine/Stats"
import FloatingLogos from "./vitrine/FloatingLogo";

export default function Vitrine() {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/login")
  }

  const scrollToSection = (id, duration = 1000) => {
    const element = document.getElementById(id)
    if (!element) return

    const target = element.getBoundingClientRect().top + window.scrollY
    const start = window.scrollY
    const distance = target - start
    let startTime = null

    const easeInOut = (t) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)
      const run = start + distance * easeInOut(progress)
      window.scrollTo(0, run)
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }

  return (
    <div className="relative flex flex-col text-white scroll-smooth min-h-screen">
      <FloatingLogos max={25} />
      
      {/* Background gradient + orbes lumineuses floues */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* gradient de base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F2E] to-[#0D132A]" />

        {/* orbes floues */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] animate-pulseSlow" />
        <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px] animate-pulseSlow" />
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[140px] animate-pulseSlow" />
      </div>

      {/* Navbar simple */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-2 backdrop-blur-md">
        <button onClick={() => scrollToSection("resly", 1200)} className="text-blue-600 font-bold text-xl">
          RESLY
        </button>
        {/* <div className="text-blue-600 font-bold text-xl">RESLY</div> */}
        <nav className="flex gap-6 items-center">
          <button onClick={() => scrollToSection("fonctionnalite", 1200)} className="hover:text-blue-400 transition">
            Fonctionnalités
          </button>
          <button onClick={() => scrollToSection("cgv", 1200)} className="hover:text-blue-400 transition">
            CGV
          </button>
          <button onClick={() => scrollToSection("tarifs", 1200)} className="hover:text-blue-400 transition">
            Tarifs
          </button>
          <button onClick={() => scrollToSection("faq", 1200)} className="hover:text-blue-400 transition">
            FAQ
          </button>
          <Button onClick={handleLogin} className="ml-4 px-6 py-2 font-bold">
            Se connecter
          </Button>
        </nav>
      </header>


      {/* Hero section */}
      <main id="resly" className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-20 lg:px-40 gap-6 min-h-screen">
        <h1 className="text-4xl md:text-5xl lg:text-8xl font-bold animate-breathe">
          Transformez <span className="text-blue-500">votre activité</span> de <br /> reselling Vinted
        </h1>

        <p className="text-gray-300 text-lg md:text-xl max-w-2xl animate-breathe">
          Des outils professionnels pour gagner du temps, optimiser vos recherches et augmenter vos ventes
        </p>


        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <Button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-600 text-whitepx-6 py-3">
            Découvrir les offres
          </Button>
          <Button variant="outline" className="px-6 py-3 border-gray-500 text-gray-300 hover:border-blue-500 hover:text-white">
            En savoir plus
          </Button>
        </div>

        {/* Stats */}
        <div className="flex gap-12 mt-12 text-center">
          <div>
            <Stats value={64} label="Utilisateurs satisfaits" />
          </div>
          <div>
            <Stats value={357} label="Membres" />
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-500">24/7</div>
            <div className="text-gray-300">Support disponible</div>
          </div>
        </div>
      </main>

      {/* Sections avec séparateurs */}
      <div className="relative z-10">
        <div className="my-20 h-[4px] w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        <div id="fonctionnalite">
          <Features />
        </div>
        <div className="my-20 h-[4px] w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div id="cgv">
            <CGV />
          </div>
          <div id="faq">
            <FAQ />
          </div>
        </div>
        <div className="my-20 h-[4px] w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      </div>

      {/* Discord Button fixed bottom-right */}
      <a
        href="https://discord.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="z-50 fixed bottom-4 right-4"
      >
        <img
          className="h-12 w-12"
          src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/discord-white-icon.png"
          alt="Discord"
        />
      </a>
    </div>
  )
}
