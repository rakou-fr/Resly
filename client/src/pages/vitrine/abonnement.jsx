import { useEffect, useState } from "react"

export default function Abonnement() {
  const [abonnements, setAbonnements] = useState([])

  useEffect(() => {
    fetch("/data/abonnement.json")
      .then((res) => res.json())
      .then((data) => setAbonnements(data))
      .catch(console.error)
  }, [])

  return (
    <section
      id="abonnement"
      className="flex flex-col gap-24 text-center py-32 px-6 bg-black text-white"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-6">
        <h2 className="text-5xl font-semibold tracking-tight">
          Nos abonnements
        </h2>

        <p className="text-white/50 text-lg">
          Choisissez l’offre qui correspond à votre activité de reselling
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto w-full">
        {abonnements.map((plan) => (
          <div
            key={plan.id}
            className="
              rounded-3xl
              px-10
              py-12
              bg-[#111111]
              border border-white/10
              transition-all
              duration-300
              hover:bg-[#151515]
              flex
              flex-col
              gap-10
            "
          >
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-medium text-white">
                {plan.title}
              </h3>

              <span className="text-5xl font-semibold text-white">
                {plan.price}
              </span>
            </div>

            <ul className="flex flex-col gap-4 text-white/50 text-sm text-left">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-white/70">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href={plan.link}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-auto
                bg-white
                text-black
                py-3
                rounded-xl
                font-medium
                transition
                hover:opacity-90
              "
            >
              Choisir l'offre
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
