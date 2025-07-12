"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Users, Sparkles, Loader2, Plus, X } from "lucide-react"
import { generateSiblingNames } from "@/lib/sibling-generator"
import { useToast } from "@/hooks/use-toast"

interface SiblingNameSuggestion {
  name: string
  meaning: string
  origin: string
  pronunciation: string
  gender: string
  matchReason: string
}

const matchingStyles = [
  "Rhythmic (similar syllable patterns)",
  "Cultural (same origin/tradition)",
  "Thematic (similar meanings)",
  "Phonetic (similar sounds)",
  "Length (similar character count)",
  "Modern vs Traditional balance",
]

export default function SiblingMatcherPage() {
  const [existingNames, setExistingNames] = useState<string[]>([""])
  const [newBabyGender, setNewBabyGender] = useState<string>("")
  const [matchingPreferences, setMatchingPreferences] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [suggestions, setSuggestions] = useState<SiblingNameSuggestion[]>([])
  const { toast } = useToast()

  const addNameField = () => {
    setExistingNames([...existingNames, ""])
  }

  const removeNameField = (index: number) => {
    if (existingNames.length > 1) {
      setExistingNames(existingNames.filter((_, i) => i !== index))
    }
  }

  const updateName = (index: number, value: string) => {
    const newNames = [...existingNames]
    newNames[index] = value
    setExistingNames(newNames)
  }

  const toggleMatchingStyle = (style: string) => {
    setMatchingPreferences((prev) => (prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]))
  }

  const handleGenerate = async () => {
    const validNames = existingNames.filter((name) => name.trim())

    if (validNames.length === 0) {
      toast({
        title: "Please enter at least one existing name",
        description: "We need existing sibling names to find matches.",
        variant: "destructive",
      })
      return
    }

    if (!newBabyGender) {
      toast({
        title: "Please select gender for new baby",
        description: "Gender selection helps us find appropriate matches.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    try {
      const filters = {
        existingNames: validNames,
        newBabyGender,
        matchingPreferences,
      }

      const results = await generateSiblingNames(filters)
      setSuggestions(results)

      toast({
        title: "Sibling names generated!",
        description: `Found ${results.length} perfect matches for your family.`,
      })
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Please try again with different parameters.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Sibling Name Matcher
          </h1>
          <p className="text-muted-foreground">
            Find perfect sibling names that harmonize with your existing children's names
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Sibling Matcher
            </CardTitle>
            <CardDescription>Enter your existing children's names to find harmonious matches</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Existing Names */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Existing Children's Names</Label>
                <Button variant="outline" size="sm" onClick={addNameField} className="h-8 bg-transparent">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Name
                </Button>
              </div>
              {existingNames.map((name, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder={`Child ${index + 1} name`}
                    value={name}
                    onChange={(e) => updateName(index, e.target.value)}
                  />
                  {existingNames.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeNameField(index)}
                      className="h-10 w-10 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* New Baby Gender */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">New Baby Gender *</Label>
              <Select value={newBabyGender} onValueChange={setNewBabyGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender for new baby" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Boy</SelectItem>
                  <SelectItem value="female">Girl</SelectItem>
                  <SelectItem value="unisex">Either/Unisex</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Matching Preferences */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Matching Style Preferences</Label>
              <div className="space-y-2">
                {matchingStyles.map((style) => (
                  <Badge
                    key={style}
                    variant={matchingPreferences.includes(style) ? "default" : "outline"}
                    className="cursor-pointer mr-2 mb-2"
                    onClick={() => toggleMatchingStyle(style)}
                  >
                    {style}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Select matching styles to prioritize. Leave empty for balanced suggestions.
              </p>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Finding Perfect Matches...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Find Sibling Names
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>Sibling Name Suggestions</CardTitle>
            <CardDescription>
              {suggestions.length > 0
                ? `${suggestions.length} harmonious sibling names found`
                : "Perfect sibling matches will appear here"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isGenerating ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50 animate-pulse" />
                <p className="text-muted-foreground">Analyzing name harmony and finding perfect matches...</p>
              </div>
            ) : suggestions.length > 0 ? (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-primary">{suggestion.name}</h3>
                          <p className="text-sm text-muted-foreground">/{suggestion.pronunciation}/</p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {suggestion.gender}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Meaning:</span> {suggestion.meaning}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Origin:</span> {suggestion.origin}
                        </p>
                        <div className="bg-blue-50 dark:bg-blue-950 p-2 rounded-md">
                          <p className="text-sm">
                            <span className="font-medium text-blue-700 dark:text-blue-300">Perfect Match:</span>{" "}
                            {suggestion.matchReason}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter your children's names and click "Find Sibling Names" to get started!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
