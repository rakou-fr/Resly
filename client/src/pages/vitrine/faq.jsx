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

  return (
    <div id="faq" className="text-white px-6 md:px-20 lg:px-40 mt-16 mb-48">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-12">FAQ</h1>

      <div className="flex flex-col gap-4">
        {faq.map((item, index) => (
          <div key={index} className="border-b border-gray-600">
            <button
              onClick={() => toggle(index)}
              className="w-full text-left py-4 text-lg md:text-xl font-semibold flex justify-between items-center hover:text-blue-400 transition"
            >
              {item.question}
              <span className="ml-2">{openIndex === index ? "-" : "+"}</span>
            </button>
            {openIndex === index && (
              <p className="text-xs text-gray-300 py-2 md:py-4">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
