import { useEffect, useState } from "react"

export default function CGV() {
  const [cgv, setCgv] = useState([])
  const [isMobile, setIsMobile] = useState(false)

  // Détection taille écran
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Chargement JSON
  useEffect(() => {
    fetch("/data/cgv.json")
      .then((res) => res.json())
      .then((data) => setCgv(data))
      .catch((err) => console.error("Erreur chargement CGV :", err))
  }, [])

  // iOS 26 glass
  const glass =
    "backdrop-blur-2xl bg-white/[0.04] border border-white/[0.08]"

  const glassSoft =
    "backdrop-blur-xl bg-white/[0.03] border border-white/[0.06]"

  // =========================
  // VERSION MOBILE
  // =========================
  if (isMobile) {
    return (
      <div
        id="cgv"
        className="relative z-10 px-4 py-16 text-white flex justify-center"
      >
        <div className={`w-full rounded-2xl p-6 ${glass}`}>
          <h1 className="text-2xl font-semibold text-center mb-8 tracking-tight">
            CGV
          </h1>

          <main className="flex flex-col gap-6">
            {cgv.map((section, index) => (
              <section
                key={index}
                className={`rounded-xl p-4 ${glassSoft}`}
              >
                <h2 className="text-base font-semibold mb-2 tracking-tight">
                  {section.title}
                </h2>

                <div className="h-px w-full bg-white/[0.08] mb-3"></div>

                <p className="text-sm text-white/60 leading-relaxed">
                  {section.content}
                </p>
              </section>
            ))}
          </main>
        </div>
      </div>
    )
  }

  // =========================
  // VERSION DESKTOP
  // =========================
  return (
    <div
      id="cgv"
      className="relative z-10 px-24 py-24 text-white flex justify-center"
    >
      <div className={`w-full max-w-5xl rounded-3xl p-12 ${glass}`}>
        <h1 className="text-5xl font-semibold text-center mb-16 tracking-tight">
          Conditions Générales de Vente
        </h1>

        <main className="flex flex-col gap-8">
          {cgv.map((section, index) => (
            <section
              key={index}
              className={`rounded-2xl p-8 transition-colors duration-300 ${glassSoft}`}
            >
              <h2 className="text-xl font-semibold mb-4 tracking-tight">
                {section.title}
              </h2>

              <div className="h-px w-full bg-white/[0.08] mb-6"></div>

              <p className="text-base text-white/60 leading-relaxed">
                {section.content}
              </p>
            </section>
          ))}
        </main>
      </div>
    </div>
  )
}
