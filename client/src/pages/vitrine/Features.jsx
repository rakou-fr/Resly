import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Features() {
  const [features, setFeatures] = useState([])

  useEffect(() => {
    fetch("/data/features.json")
      .then(res => res.json())
      .then(data => setFeatures(data))
      .catch(err => console.error("Erreur chargement features :", err))
  }, [])

  return (
    <div id="fonctionnalite" className="text-white py-16 px-6 md:px-20 lg:px-40">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">Fonctionnalités</h1>

      <div className="flex flex-col gap-16">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              index % 2 === 0 ? "" : "md:flex-row-reverse"
            }`}
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="h-64 rounded-xl shadow-lg"
            />
            <div className="md:w-1/2 flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-500">{feature.title}</h2>
              <p className="text-gray-300 text-lg">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
