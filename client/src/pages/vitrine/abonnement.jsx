import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

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
      className="relative flex flex-col gap-16 text-center py-24 px-6 bg-gradient-to-b from-[#0f1115] to-[#12151c] text-white"
    >
      <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
        Nos abonnements
      </h2>

      <p className="text-white/50 max-w-2xl mx-auto text-lg">
        Choisissez l’offre qui correspond à votre activité de reselling
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto w-full">
        {abonnements.map((plan) => (
          <div
            key={plan.id}
            className="group rounded-2xl p-10 border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] transition-all duration-300 flex flex-col gap-8 shadow-lg hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-semibold tracking-tight">
                {plan.title}
              </h3>

              <span className="text-4xl font-bold tracking-tight">
                {plan.price}
              </span>
            </div>

            <ul className="flex flex-col gap-3 text-white/60 text-sm text-left">
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2"
                >
                  <span className="text-white">✔</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              asChild
              className="mt-auto bg-white text-black rounded-lg py-3 font-medium transition hover:opacity-90"
            >
              <a
                href={plan.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Choisir
              </a>
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}
