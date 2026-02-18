import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Features() {
  const [features, setFeatures] = useState([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    fetch("/data/features.json")
      .then(res => res.json())
      .then(data => setFeatures(data))
      .catch(err => console.error("Erreur chargement features :", err))
  }, [])

  // iOS 26 glass (neutre)
  const glass =
    "backdrop-blur-2xl bg-white/[0.04] border border-white/[0.08]"

  // =========================
  // VERSION MOBILE
  // =========================
  if (isMobile) {
    return (
      <div id="fonctionnalite" className="relative z-10 py-16 px-5 text-white">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-semibold text-center mb-12 tracking-tight">
            Fonctionnalités
          </h1>

          <div className="flex flex-col gap-14">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-6"
              >
                <div className={`rounded-3xl p-4 ${glass}`}>
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="h-56 w-full object-cover rounded-2xl"
                  />
                </div>

                <div className={`rounded-3xl p-6 flex flex-col gap-3 ${glass}`}>
                  <h2 className="text-lg font-semibold tracking-tight">
                    {feature.title}
                  </h2>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // =========================
  // VERSION DESKTOP
  // =========================
  return (
    <div id="fonctionnalite" className="relative z-10 py-28 px-24 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-semibold text-center mb-24 tracking-tight">
          Fonctionnalités
        </h1>

        <div className="flex flex-col gap-32">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex items-center gap-20 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* IMAGE CARD */}
              <div
                className={`w-1/2 rounded-[2.5rem] p-6 transition-transform duration-300 hover:scale-[1.01] ${glass}`}
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="h-96 w-full object-cover rounded-[2rem]"
                />
              </div>

              {/* TEXT CARD */}
              <div
                className={`w-1/2 rounded-[2.5rem] p-12 flex flex-col gap-6 ${glass}`}
              >
                <h2 className="text-4xl font-semibold tracking-tight">
                  {feature.title}
                </h2>
                <p className="text-lg text-white/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
