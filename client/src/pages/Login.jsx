import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Login() {
  const navigate = useNavigate()

  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0b0b] text-white px-6">

      {/* Card glass */}
      <div className="
        w-full max-w-md
        rounded-3xl
        bg-white/[0.04]
        border border-white/[0.08]
        backdrop-blur-xl
        shadow-[0_20px_60px_rgba(0,0,0,0.6)]
        p-10
      ">

        <h1 className="text-3xl font-semibold text-center mb-2">
          Connexion
        </h1>

        <p className="text-white/60 text-center mb-10">
          Accède à ton dashboard RESLY
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {error && (
            <p className="text-sm text-center text-white/70">
              {error}
            </p>
          )}

          <div>
            <label className="block text-sm text-white/60 mb-1">
              Identifiant
            </label>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="
                w-full
                px-4 py-3
                rounded-xl
                bg-white/[0.04]
                border border-white/[0.08]
                text-white
                outline-none
                focus:border-white/30
                transition
              "
            />
          </div>

          <div>
            <label className="block text-sm text-white/60 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                px-4 py-3
                rounded-xl
                bg-white/[0.04]
                border border-white/[0.08]
                text-white
                outline-none
                focus:border-white/30
                transition
              "
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              mt-4
              py-3
              rounded-full
              bg-white
              text-black
              font-medium
              transition
              hover:opacity-90
              disabled:opacity-50
            "
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          className="block mt-8 mx-auto text-sm text-white/50 hover:text-white transition"
        >
          ← Retour à l’accueil
        </button>
      </div>
    </div>
  )
}
