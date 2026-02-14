import { useEffect, useState, useMemo } from "react"
import { useSearchParams, useNavigate  } from "react-router-dom"
import { ArrowUpRight, ArrowLeft  } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Articles() {
  const navigate = useNavigate()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  const [searchParams] = useSearchParams()
  const brand = searchParams.get("brand")
  const category = searchParams.get("category")

  useEffect(() => {
    fetch("/data/Articles.json")
      .then(res => res.json())
      .then(data => {
        setArticles(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      return (
        (!brand || article.brand === brand) &&
        (!category || article.category === category)
      )
    })
  }, [articles, brand, category])

  if (loading) {
    return <p className="text-center text-muted-foreground">Chargement...</p>
  }

  return (
    <div className="flex flex-col space-y-4 ">
      <button
        onClick={() => navigate("/marques")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition mb-2"
      >
        <ArrowLeft className="w-5 h-5" />
        Retour
      </button>

      <Card>
        <CardHeader>
          <CardTitle>Articles</CardTitle>
          <p className="text-sm text-muted-foreground">
            {brand && `Marque : ${brand}`} {category && `• Catégorie : ${category}`}
          </p>
        </CardHeader>
      </Card>

      {filteredArticles.length === 0 ? (
        <p className="text-center text-muted-foreground">
          Aucun article trouvé.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredArticles.map(article => (
            <Card
              key={article.id}
              className="relative overflow-hidden group h-[380px] cursor-pointer"
            >
              {/* Image en fond */}
              <img
                src={article.image}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Overlay sombre */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />

              {/* Infos en bas */}
              <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white space-y-1">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-semibold text-lg leading-tight">
                    {article.title}
                  </h3>

                  {article.link && (
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 bg-white/20 hover:bg-white/30 backdrop-blur rounded-full p-1 transition"
                      title="Voir l'article"
                    >
                      <ArrowUpRight className="w-7 h-7 text-orange-600" />
                    </a>
                  )}
                </div>

                <p className="text-sm opacity-90">
                  {article.brand} • {article.category}
                </p>

                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="font-bold text-base">
                    {article.price} €
                  </span>
                  <span className="opacity-80">
                    {article.taille}
                  </span>
                </div>

                <div className="flex justify-between text-xs opacity-80">
                  <span>{article.etat}</span>
                  <span>{article.date}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
