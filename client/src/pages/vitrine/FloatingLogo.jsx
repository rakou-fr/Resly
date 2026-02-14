import { useEffect, useState, useRef } from "react"

export default function FloatingLogos({ max = 100, size = 50 }) {
  const [logosData, setLogosData] = useState([])
  const [floatingLogos, setFloatingLogos] = useState([])
  const borderRadius = 10

  const currentIndex = useRef(0)

  useEffect(() => {
    fetch("/data/logos.json")
      .then((res) => res.json())
      .then((data) => setLogosData(data))
      .catch((err) => console.error("Erreur chargement logos :", err))
  }, [])

  const isOverlapping = (x, y) => {
    return floatingLogos.some((logo) => {
      const dx = (logo.x / 100) * window.innerWidth - x
      const dy = logo.y - y
      const distance = Math.sqrt(dx * dx + dy * dy)
      return distance < size
    })
  }

  useEffect(() => {
    if (!logosData.length) return

    const interval = setInterval(() => {
      setFloatingLogos((prev) => {
        if (prev.length >= max) return prev

        if (currentIndex.current >= logosData.length) currentIndex.current = 0
        const logo = logosData[currentIndex.current]
        currentIndex.current += 1

        const scrollTop = window.scrollY
        const visibleHeight = window.innerHeight

        let x, y
        let attempts = 0
        do {
          x = Math.random() * 90
          y = scrollTop + Math.random() * visibleHeight
          attempts++
        } while (isOverlapping(x, y) && attempts < 20)

        return [
          ...prev,
          {
            id: Date.now() + Math.random(),
            src: logo.src,
            alt: logo.alt || "logo",
            x,
            y,
            rotate: -15 + Math.random() * 30,
          },
        ]
      })
    }, 80)

    return () => clearInterval(interval)
  }, [logosData, max, floatingLogos])

  // Supprimer après 7s
  useEffect(() => {
    const timers = floatingLogos.map((logo) =>
      setTimeout(() => {
        setFloatingLogos((prev) => prev.filter((l) => l.id !== logo.id))
      }, 7000)
    )

    return () => timers.forEach((t) => clearTimeout(t))
  }, [floatingLogos])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {floatingLogos.map((logo) => (
        <img
          key={logo.id}
          src={logo.src}
          alt={logo.alt}
          style={{
            position: "absolute",
            left: `${logo.x}%`,
            top: `${logo.y}px`,
            width: `${size}px`,
            height: `${size}px`,
            transform: `rotate(${logo.rotate}deg)`,
            opacity: 0,
            borderRadius: `${borderRadius}px`,
            animation: "fadeInOut 5s ease-in-out forwards",
          }}
        />
      ))}

      <style>
        {`
          @keyframes fadeInOut {
            0% { opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}
      </style>
    </div>
  )
}