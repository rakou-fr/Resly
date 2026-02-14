import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Shirt, Footprints, Handbag } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Marques() {
  const [data, setData] = useState(null)
  const [search, setSearch] = useState("")
  const [selectedMarque, setSelectedMarque] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch("/data/Marque.json")
      .then((res) => res.json())
      .then((json) => setData(json))
  }, [])

  if (!data) return <p>Chargement...</p>

  const categoryIcons = {
    tshirt: <Shirt className="w-5 h-5 mr-2" />,
    pull:<Shirt className="w-5 h-5 mr-2" />,
    jeans: <Shirt className="w-5 h-5 mr-2" />,
    shoe: <Footprints className="w-5 h-5 mr-2" />,
    accessory: <Handbag className="w-5 h-5 mr-2" />
  }

  // Recherche par nom de marque
  const filteredMarques = data.marques.filter((marque) =>
    marque.name.toLowerCase().includes(search.toLowerCase())
  )

  // Catégories associées à la marque sélectionnée
  const categoriesForMarque = selectedMarque
    ? data.categories.filter((cat) => {
        const marque = data.marques.find((m) => m.id === selectedMarque)
        return marque.categories.includes(cat.id)
      })
    : []

  // Navigation vers /articles avec query params
  const handleValidation = () => {
    if (!selectedMarque || !selectedCategory) return

    const marque = data.marques.find((m) => m.id === selectedMarque)
    const category = data.categories.find((c) => c.id === selectedCategory)

    navigate(
      `/articles?brand=${marque.slug}&category=${category.slug}`
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* MARQUES */}
      <Card>
        <CardHeader>
          <CardTitle>Marques</CardTitle>
          <Input
            placeholder="Rechercher une marque..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-4"
          />
        </CardHeader>

        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMarques.map((marque) => (
            <Card
              key={marque.id}
              onClick={() => {
                setSelectedMarque(marque.id)
                setSelectedCategory(null)
              }}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 bg-gradient-to-b from-gradA to-gradB hover:shadow-md ${
                selectedMarque === marque.id ? "ring-2 ring-primary" : ""
              }`}
            >
              <CardContent className="flex flex-col items-center p-6">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                  <img
                    src={marque.logo}
                    alt={marque.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-semibold text-lg text-center">
                  {marque.name}
                </span>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* CATEGORIES */}
      <Card>
        <CardHeader>
          <CardTitle>Catégories</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2 ">
          {selectedMarque ? (
            categoriesForMarque.map((cat) => (
              <Card
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`cursor-pointer bg-gradient-to-b from-gradA to-gradB hover:shadow-md transition duration-300 hover:scale-105${
                  selectedCategory === cat.id ? "ring-2 ring-primary" : ""
                }`}
              >
                <CardContent className="flex items-center p-4">
                  {categoryIcons[cat.slug] || (
                    <Shirt className="w-5 h-5 mr-2" />
                  )}
                  <span className="font-semibold text-lg">
                    {cat.name}
                  </span>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground">
              Sélectionnez une marque pour voir les catégories.
            </p>
          )}
        </CardContent>

        {selectedMarque && selectedCategory && (
          <CardHeader>
            <Button onClick={handleValidation} size="lg" className="w-full">
              Voir les articles
            </Button>
          </CardHeader>
        )}
      </Card>
    </div>
  )
}
