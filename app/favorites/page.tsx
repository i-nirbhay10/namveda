"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Download, PointerIcon as SidebarTrigger, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data - in real app this would come from database
const mockFavorites = {
  male: [
    {
      id: "1",
      name: "Arjun",
      meaning: "Bright, shining, white, silver",
      origin: "Sanskrit/Hindu",
      pronunciation: "AR-jun",
      gender: "male",
    },
    {
      id: "2",
      name: "Kiran",
      meaning: "Ray of light, beam of light",
      origin: "Sanskrit/Hindu",
      pronunciation: "KEE-ran",
      gender: "male",
    },
  ],
  female: [
    {
      id: "3",
      name: "Anaya",
      meaning: "Caring, guardian, protected",
      origin: "Sanskrit/Hindu",
      pronunciation: "ah-NAH-ya",
      gender: "female",
    },
    {
      id: "4",
      name: "Priya",
      meaning: "Beloved, dear one",
      origin: "Sanskrit/Hindu",
      pronunciation: "PREE-ya",
      gender: "female",
    },
  ],
  unisex: [
    {
      id: "5",
      name: "Avani",
      meaning: "Earth, nature",
      origin: "Sanskrit/Hindu",
      pronunciation: "ah-VAH-nee",
      gender: "unisex",
    },
  ],
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(mockFavorites)
  const { toast } = useToast()

  const removeFavorite = (id: string, gender: string) => {
    setFavorites((prev) => ({
      ...prev,
      [gender]: prev[gender as keyof typeof prev].filter((fav) => fav.id !== id),
    }))
    toast({
      title: "Removed from favorites",
      description: "Name has been removed from your favorites.",
    })
  }

  const exportToPDF = () => {
    toast({
      title: "Export feature coming soon!",
      description: "PDF export will be available in the next update.",
    })
  }

  const exportToCSV = () => {
    const allFavorites = [...favorites.male, ...favorites.female, ...favorites.unisex]
    const csvContent = [
      "Name,Meaning,Origin,Pronunciation,Gender",
      ...allFavorites.map(
        (fav) => `"${fav.name}","${fav.meaning}","${fav.origin}","${fav.pronunciation}","${fav.gender}"`,
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "namveda-favorites.csv"
    a.click()
    window.URL.revokeObjectURL(url)

    toast({
      title: "CSV exported successfully!",
      description: "Your favorites have been downloaded as a CSV file.",
    })
  }

  const totalFavorites = favorites.male.length + favorites.female.length + favorites.unisex.length

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold">My Favorites</h1>
            <p className="text-muted-foreground">{totalFavorites} saved names across all categories</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={exportToPDF}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {totalFavorites === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-4">
              Start generating names and save your favorites to see them here!
            </p>
            <Button asChild>
              <a href="/">Generate Names</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="male" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="male">Boys ({favorites.male.length})</TabsTrigger>
            <TabsTrigger value="female">Girls ({favorites.female.length})</TabsTrigger>
            <TabsTrigger value="unisex">Unisex ({favorites.unisex.length})</TabsTrigger>
          </TabsList>

          {(["male", "female", "unisex"] as const).map((gender) => (
            <TabsContent key={gender} value={gender}>
              <div className="grid gap-4">
                {favorites[gender].length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-8">
                      <p className="text-muted-foreground">No {gender} names saved yet</p>
                    </CardContent>
                  </Card>
                ) : (
                  favorites[gender].map((favorite) => (
                    <Card key={favorite.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-primary">{favorite.name}</h3>
                            <p className="text-sm text-muted-foreground">/{favorite.pronunciation}/</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFavorite(favorite.id, gender)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm">
                            <span className="font-medium">Meaning:</span> {favorite.meaning}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Origin:</span> {favorite.origin}
                          </p>
                          <Badge variant="secondary" className="text-xs">
                            {favorite.gender}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  )
}
