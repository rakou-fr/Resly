export default function DashboardHome() {
  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <div>
      <h1 className="text-4xl font-semibold mb-6">
        Bienvenue {user?.username || ""}
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-2xl">
          <h2 className="text-white/70">Ventes</h2>
          <p className="text-3xl font-bold mt-2">124</p>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-2xl">
          <h2 className="text-white/70">Chiffre d'affaire</h2>
          <p className="text-3xl font-bold mt-2">3 540€</p>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-2xl">
          <h2 className="text-white/70">Articles actifs</h2>
          <p className="text-3xl font-bold mt-2">42</p>
        </div>
      </div>
    </div>
  )
}
