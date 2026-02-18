import { useState, useEffect } from "react"

export default function FAQ() {
  const [faq, setFaq] = useState([])
  const [openIndex, setOpenIndex] = useState(null)

  useEffect(() => {
    fetch("/data/faq.json")
      .then(res => res.json())
      .then(data => setFaq(data))
      .catch(err => console.error("Erreur chargement FAQ :", err))
  }, [])

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // iOS 26 glass (neutre)
  const glass =
    "backdrop-blur-2xl bg-white/[0.04] border border-white/[0.08]"

  return (
    <div
      id="faq"
      className="relative z-10 text-white px-6 md:px-24 lg:px-40 py-28"
    >
      <h1 className="text-4xl md:text-6xl font-semibold text-center mb-20 tracking-tight">
        FAQ
      </h1>

      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {faq.map((item, index) => (
          <div
            key={index}
            className={`rounded-[2rem] p-6 md:p-8 transition-colors duration-300 ${glass}`}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full text-left flex justify-between items-center text-lg md:text-2xl font-semibold tracking-tight"
            >
              {item.question}

              <span className="ml-6 text-2xl md:text-3xl font-light text-white/60">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-400 ${
                openIndex === index
                  ? "max-h-96 opacity-100 mt-5"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="h-px w-full bg-white/[0.08] my-5"></div>

              <p className="text-sm md:text-base text-white/60 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
