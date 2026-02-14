import { useEffect, useState } from "react"
import AvisCaroussel from "../components/Aviscaroussel"

function formatTextWithLinks(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  return text.split(urlRegex).map((part, i) =>
    urlRegex.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline"
      >
        {part}
      </a>
    ) : (
      part
    )
  );
}



export default function Home() {
  const [stats, setStats] = useState({});
  const [news, setNews] = useState([]);

  async function getNews(){
    const response = await fetch("data/News.json");
    const data = await response.json();
    setNews(data);
  }

  async function getStats(){
    const response = await fetch("/data/StatsBot.json");
    const data = await response.json();
    setStats(data);
  }

  useEffect(() =>{
    getStats()
    getNews() 
  }, [])

  return (
    <div className="">
      <h1 className="font-bold text-white text-2xl">Bienvenue sur votre dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

          <div className="rounded-xl ring-2 ring-secondary hover:ring-primary p-4 bg-gradient-to-b from-gradA to-gradB duration-300 hover:scale-105">
            <h3 className="font-semibold text-sm opacity-70">Total annonces scanné</h3>
            <p className="text-3xl font-bold">{stats.performance?.total_scans}</p>
            <h3 className="mt-4 font-semibold text-sm opacity-70">Total filtre géré</h3>
            <p className="text-3xl font-bold">{stats.performance?.total_customer_filter}</p>
          </div>

          <div className=" rounded-xl ring-2 ring-secondary hover:ring-primary p-4 bg-gradient-to-b from-gradA to-gradB duration-300 hover:scale-105">
            <h3 className="font-semibold text-sm opacity-70">Article correspondants</h3>
            <p className="text-3xl font-bold">{stats.performance?.matched_items}</p>
          </div>

          <div className=" rounded-xl ring-2 ring-secondary hover:ring-primary p-4 bg-gradient-to-b from-gradA to-gradB duration-300 hover:scale-105">
            <h3 className="font-semibold text-sm opacity-70">Taux de réussite</h3>
            <p className="text-3xl font-bold">
              {(stats.performance?.success_rate * 100).toFixed(1)}%
            </p>
          </div>

        </section>  
        
        <section className=" rounded-xl ring-2 ring-secondary hover:ring-primary p-4 mt-4 bg-gradient-to-b from-gradA to-gradB duration-300 hover:scale-105">
          <h2 className="font-bold mb-2">Performance du bot</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm opacity-70">Détection moyenne</p>
              <p className="text-xl font-bold">
                {stats.performance?.avg_detection_delay_ms} ms
              </p>
            </div>

            <div>
              <p className="text-sm opacity-70">Exécution achat</p>
              <p className="text-xl font-bold">
                {stats.performance?.avg_purchase_execution_ms} ms
              </p>
            </div>

            <div>
              <p className="text-sm opacity-70">Temps total médian</p>
              <p className="text-xl font-bold">
                {stats.performance?.median_total_reaction_ms} ms
              </p>
            </div>

            <div>
              <p className="text-sm opacity-70">Achats réussis</p>
              <p className="text-xl font-bold">
                {stats.performance?.successful_purchases}
                <span className="opacity-60">
                  /{stats.performance?.attempted_purchases}
                </span>
              </p>
            </div>

          </div>
        </section>

        
        <section className="rounded-xl ring-2 ring-secondary hover:ring-primary p-4 duration-300 hover:scale-105">
          <h2 className="font-bold mb-2">Actualités du bot</h2>

          <div className="max-h-[500px] overflow-y-auto space-y-3 ">
            {news.map((item, i) => (
              <div key={i} className="p-4 rounded-xl ring-2 ring-secondary bg-gradient-to-r from-gradA to-gradB">
                <div className="flex justify-between">
                  <span className="font-semibold">{item.title}</span>
                  <span className="text-xs px-2 py-1 rounded capitalize bg-black/40">
                    {item.type}
                  </span>
                </div>

                <div className="text-sm opacity-70 mt-1">
                  {new Date(item.date).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm opacity-80">{item.author}</span>
                </div>

                <p className="text-sm mt-1">{formatTextWithLinks(item.content)}</p>

                {item.images?.length > 0 && (
                  <div className="mt-2 overflow-x-auto flex gap-2">
                    {item.images.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        className="h-28 rounded-lg flex-shrink-0"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>



        <section className="col-span-1 md:col-span-1 rounded-xl ring-2 ring-secondary hover:ring-primary p-4 duration-300 hover:scale-105">
          <h2 className="font-bold mb-3">Tuto & Présentation du dashboard</h2>

          <div className="aspect-video rounded-xl overflow-hidden bg-black">
            <video
              src="data/videos/tuto.mp4"
              controls
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        </div>
    </div>  
  )
}
