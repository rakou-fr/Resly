import { useEffect, useState } from "react"

export default function CGV() {
  const [cgv, setCgv] = useState([])

  useEffect(() => {
    fetch("/data/cgv.json")
      .then((res) => res.json())
      .then((data) => setCgv(data))
      .catch((err) => console.error("Erreur chargement CGV :", err))
  }, [])

  return (
    <div id="cgv" className="text-white px-6 md:px-20 lg:px-40 mb-48 mt-16 gap-8">
      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-bold text-center mt-8">
        Conditions Générales de Vente
      </h1>

      {/* CGV content */}
      <main className="flex flex-col gap-6 mt-8 text-gray-300">
        {cgv.map((section, index) => (
          <section key={index}>
            <h2 className="text-xl font-bold text-blue-500 mb-2">{section.title}</h2>
            <p className="text-xs">{section.content}</p>
          </section>
        ))}
      </main>
    </div>
  )
}
