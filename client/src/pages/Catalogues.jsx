import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export default function Catalogue() {
  const [articles, setArticles] = useState([])
  const [stats, setStats] = useState(null)
  const [loadingArticles, setLoadingArticles] = useState(true)
  const [loadingStats, setLoadingStats] = useState(true)

  useEffect(() => {
    fetch("/data/Articles.json")
      .then(res => res.json())
      .then(data => {
        setArticles(data)
        setLoadingArticles(false)
      })
      .catch(() => setLoadingArticles(false))
  }, [])

  useEffect(() => {
    fetch("/data/statsCatalogue.json")
      .then(res => res.json())
      .then(data => {
        setStats(data)
        setLoadingStats(false)
      })
      .catch(() => setLoadingStats(false))
  }, [])

  if (loadingArticles) {
    return <p className="text-center text-muted-foreground">Chargement...</p>
  }

  return (
    <div className="flex flex-col space-y-4">

      <Card>
        <CardHeader>
          <CardTitle>Catalogue complet</CardTitle>
          <p className="text-sm text-muted-foreground">
            Tous les articles du bot
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">

        {/* --- ARTICLES SCROLLABLE --- */}
        {articles.length === 0 ? (
          <p className="text-center text-muted-foreground ">
            Aucun article dans le catalogue.
          </p>
        ) : (
          <div className="max-h-[700px] overflow-y-auto p-1 ">
            <div className="flex flex-col gap-4">
              {articles.map((article, index) => (
                <div
                  key={`${article.id}-${index}`}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center rounded-xl p-4 ring-2 ring-secondary hover:ring-primary transition duration-300 hover:scale-105 bg-gradient-to-r from-gradA to-gradB"
                >
                  {/* Image */}
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full sm:w-32 h-32 object-cover rounded-lg mb-2 sm:mb-0 sm:mr-4 flex-shrink-0 "
                  />

                  {/* Infos principales */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
                    <div>
                      <p className="font-semibold">{article.title}</p>
                      <p className="text-sm opacity-80">{article.brand} • {article.category}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-70">Prix</p>
                      <p className="font-bold">{article.price} €</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-70">Taille / État / Date</p>
                      <p className="text-sm opacity-80">
                        {article.taille} • {article.etat} • {article.date}
                      </p>
                    </div>
                  </div>

                  {/* Lien article */}
                  {article.link && (
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 shrink-0 bg-white/20 hover:bg-white/30 backdrop-blur rounded-full p-1 transition"
                      title="Voir l'article"
                    >
                      <ArrowUpRight className="w-6 h-6 text-orange-600" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- STATS --- */}
        <div className="space-y-4">
          <Card className="">
            <CardHeader>
              <CardTitle>Statistique global— Vinted</CardTitle>
            </CardHeader>
            {!loadingStats && stats ? (
              <div className="p-4 space-y-3">
                <div className="bg-gradient-to-b from-gradA to-gradB rounded-xl p-4 duration-300 hover:scale-105">
                  <h3>Marché</h3>
                  <div className="flex justify-between">
                    <span className="opacity-70">Volatilié : </span>
                    <span className="font-bold">{stats.avgPrice} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Saturation : </span>
                    <span className="font-bold">{stats.totalItems}</span>
                  </div>
                </div>

                <div className="bg-gradient-to-b from-gradA to-gradB rounded-xl p-4 duration-300 hover:scale-105">
                  <h3>Marques</h3>
                  <div className="flex justify-between">
                    <span className="opacity-70"></span>
                    <span className="font-bold">{stats.topBrand}</span>
                  </div>
                </div>

                <div className="bg-gradient-to-b from-gradA to-gradB rounded-xl p-4 duration-300 hover:scale-105">
                  <h3>Moyenne mobile</h3>
                  <div className="flex justify-between">
                    <span className="opacity-70">Moyenne 15% : </span>
                    <span className="font-bold">{stats.topCategory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Moyenne vente : </span>
                    <span className="font-bold">{stats.topCategory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Moyenne basse : </span>
                    <span className="font-bold">{stats.topCategory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Moyenne haute : </span>
                    <span className="font-bold">{stats.topCategory}</span>
                  </div>
                </div>

                {stats.trendingBrands?.length > 0 && (
                  <div>
                    <span className="opacity-70">Marques tendances :</span>
                    <ul className="list-disc list-inside text-sm">
                      {stats.trendingBrands.map((brand, i) => (
                        <li key={i}>{brand}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <p className="p-4 text-muted-foreground text-sm">Chargement des stats...</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
