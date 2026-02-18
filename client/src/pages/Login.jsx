import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Erreur de connexion")
      }

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      navigate("/dashboard")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  /* ===== LIQUID GLASS SYSTEM ===== */

  const glassOuter =
    "relative backdrop-blur-[80px] bg-gradient-to-br from-white/[0.10] via-white/[0.05] to-white/[0.02] border border-white/[0.15] shadow-[0_40px_120px_rgba(0,0,0,0.6)]"

  const glassInner =
    "backdrop-blur-3xl bg-white/[0.05] border border-white/[0.10]"

  const inputStyle =
    "w-full mt-2 px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.15] focus:border-white/40 focus:bg-white/[0.10] focus:shadow-[0_0_20px_rgba(255,255,255,0.15)] outline-none transition-all duration-300"

  /* =========================
     MOBILE
  ========================== */

  if (isMobile) {
    return (
      <div className="relative min-h-screen bg-black flex items-center justify-center px-6 text-white overflow-hidden">

        {/* Glow background */}
        <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-white/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-white/5 rounded-full blur-[120px]" />

        <div className={`relative w-full rounded-[32px] p-8 ${glassOuter}`}>

          <h1 className="text-2xl font-semibold text-center mb-2 tracking-tight">
            Connexion
          </h1>

          <p className="text-white/60 text-center mb-8 text-sm">
            Accède à ton dashboard RESLY
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {error && (
              <p className="text-red-400 text-sm text-center">
                {error}
              </p>
            )}

            <div>
              <label className="text-xs text-white/60">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputStyle}
              />
            </div>

            <div>
              <label className="text-xs text-white/60">Mot de passe</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputStyle}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black rounded-xl py-3 font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(255,255,255,0.25)]"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <button
            onClick={() => navigate("/")}
            className="block mt-8 mx-auto text-sm text-white/50 hover:text-white transition"
          >
            ← Retour
          </button>

        </div>
      </div>
    )
  }

  /* =========================
     DESKTOP
  ========================== */

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center text-white px-6 overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute -top-52 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[160px]" />

      <div className={`relative w-full max-w-md rounded-[48px] p-14 ${glassOuter}`}>

        <div className={`rounded-3xl p-10 ${glassInner}`}>

          <h1 className="text-3xl font-semibold text-center tracking-tight mb-2">
            Connexion à RESLY
          </h1>

          <p className="text-white/60 text-center mb-10">
            Accède à ton dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-7">

            {error && (
              <p className="text-red-400 text-sm text-center">
                {error}
              </p>
            )}

            <div>
              <label className="text-sm text-white/60">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputStyle}
              />
            </div>

            <div>
              <label className="text-sm text-white/60">Mot de passe</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputStyle}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black rounded-xl py-3 font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(255,255,255,0.25)]"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <button
            onClick={() => navigate("/")}
            className="block mt-10 mx-auto text-sm text-white/50 hover:text-white transition"
          >
            ← Retour à l’accueil
          </button>

        </div>
      </div>
    </div>
  )
}
