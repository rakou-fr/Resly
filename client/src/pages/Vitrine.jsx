import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import CGV from "./vitrine/CGV"
import FAQ from "./vitrine/faq"
import Features from "./vitrine/Features"
import Stats from "./vitrine/Stats"
import FloatingLogos from "./vitrine/FloatingLogo"
import Abonnement from "./vitrine/abonnement"

export default function Vitrine() {
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

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

  const glass =
    "backdrop-blur-2xl bg-white/[0.04] border border-white/[0.08]"

  const glassStrong =
    "backdrop-blur-3xl bg-white/[0.06] border border-white/[0.12]"

  /* =========================
     MOBILE
  ========================== */

  if (isMobile) {
    return (
      <div className="relative flex flex-col text-white min-h-screen bg-black overflow-hidden">

        <FloatingLogos max={10} />

        <header className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] rounded-2xl px-4 py-3 flex justify-between items-center ${glass}`}>
          <button
            onClick={() => scrollToSection("resly")}
            className="font-semibold tracking-wide text-white"
          >
            RESLY
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white/70 text-xl"
          >
            ☰
          </button>
        </header>

        {menuOpen && (
          <div className={`fixed top-20 left-1/2 -translate-x-1/2 w-[92%] rounded-2xl p-6 flex flex-col gap-5 z-40 ${glassStrong}`}>
            <button onClick={() => scrollToSection("fonctionnalite")} className="text-white/70 hover:text-white transition">
              Fonctionnalités
            </button>

            <button onClick={() => scrollToSection("abonnement")} className="text-white/70 hover:text-white transition">
              Abonnement
            </button>

            <button onClick={() => scrollToSection("cgv")} className="text-white/70 hover:text-white transition">
              CGV
            </button>

            <button onClick={() => scrollToSection("faq")} className="text-white/70 hover:text-white transition">
              FAQ
            </button>

            <Button
              onClick={handleLogin}
              className="bg-white text-black rounded-xl"
            >
              Se connecter
            </Button>
          </div>
        )}

        <main id="resly" className="flex flex-col items-center text-center px-6 pt-32 pb-20 gap-8">
          <h1 className="text-3xl font-semibold leading-tight">
            Transformez votre activité de reselling Vinted
          </h1>

          <p className="text-white/60 text-sm">
            Gagnez du temps et augmentez vos ventes
          </p>

          {/* MOBILE → scroll vers abonnement */}
          <Button
            onClick={() => scrollToSection("abonnement")}
            className="bg-white text-black rounded-2xl px-8 py-3"
          >
            Découvrir
          </Button>

          <div className="flex flex-col gap-6 mt-12 w-full">
            <Stats value={64} label="Utilisateurs satisfaits" />
            <Stats value={357} label="Membres" />
            <Stats value="24h/24" label="Support 7j/7" />
          </div>
        </main>

        <div className="px-6 flex flex-col gap-20 pb-24">
          <Features />
          <Abonnement />
          <CGV />
          <FAQ />
        </div>
      </div>
    )
  }

  /* =========================
     DESKTOP
  ========================== */

  return (
    <div className="relative flex flex-col text-white min-h-screen bg-black overflow-hidden">

      <FloatingLogos max={25} />

      <header className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl rounded-3xl px-10 py-4 flex items-center justify-between ${glassStrong}`}>
        <button
          onClick={() => scrollToSection("resly")}
          className="font-semibold text-lg tracking-wide"
        >
          RESLY
        </button>

        <nav className="flex gap-8 items-center text-white/70">
          <button onClick={() => scrollToSection("fonctionnalite")} className="hover:text-white transition">
            Fonctionnalités
          </button>

          <button onClick={() => scrollToSection("abonnement")} className="hover:text-white transition">
            Abonnement
          </button>

          <button onClick={() => scrollToSection("cgv")} className="hover:text-white transition">
            CGV
          </button>

          <button onClick={() => scrollToSection("faq")} className="hover:text-white transition">
            FAQ
          </button>

          <Button
            onClick={handleLogin}
            className="bg-white text-black rounded-2xl px-6 py-2"
          >
            Se connecter
          </Button>
        </nav>
      </header>

      <main
        id="resly"
        className="flex flex-col items-center justify-center text-center px-20 gap-10 min-h-screen pt-32"
      >
        <div className={`rounded-[40px] p-16 w-full max-w-6xl ${glassStrong}`}>
          <h1 className="text-6xl font-semibold leading-tight">
            Transformez votre activité de reselling Vinted
          </h1>

          <p className="text-white/60 text-xl max-w-2xl mx-auto mt-8">
            Des outils professionnels pour optimiser vos recherches et augmenter vos ventes
          </p>

          <div className="flex gap-6 mt-12 justify-center">
            {/* DESKTOP → scroll vers abonnement */}
            <Button
              onClick={() => scrollToSection("abonnement")}
              className="bg-white text-black rounded-2xl px-10 py-4"
            >
              Découvrir les offres
            </Button>
          </div>

          <div className="flex gap-24 mt-20 justify-center">
            <Stats value={64} label="Utilisateurs satisfaits" />
            <Stats value={357} label="Membres" />
            <Stats value="24h/24" label="Support 7j/7" />
          </div>
        </div>
      </main>

      <div className="px-20 flex flex-col gap-40 pb-40">
        <Features />
        <Abonnement />
        <div className="grid grid-cols-2 gap-20">
          <CGV />
          <FAQ />
        </div>
      </div>

      <a
        href="https://discord.gg/Xk7H3FS4"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-8 right-8 rounded-3xl p-4 ${glass} transition`}
      >
        <img
          className="h-10 w-10 opacity-80"
          src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/discord-white-icon.png"
          alt="Discord"
        />
      </a>
    </div>
  )
}
