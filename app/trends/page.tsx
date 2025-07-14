"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Search, MapPin, Calendar } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
} from "recharts"
import { Button } from "@/components/ui/button"

// Mock data for demonstrations
const trendingNames = [
  { name: "Aria", change: "+15%", rank: 1, category: "Rising Star" },
  { name: "Luna", change: "+12%", rank: 2, category: "Rising Star" },
  { name: "Kai", change: "+10%", rank: 3, category: "Rising Star" },
  { name: "Zara", change: "+8%", rank: 4, category: "Rising Star" },
  { name: "Leo", change: "-5%", rank: 5, category: "Declining" },
]

const historicalData = [
  { year: 2020, Emma: 85, Olivia: 92, Ava: 78, Isabella: 65 },
  { year: 2021, Emma: 82, Olivia: 89, Ava: 81, Isabella: 68 },
  { year: 2022, Emma: 79, Olivia: 87, Ava: 84, Isabella: 71 },
  { year: 2023, Emma: 76, Olivia: 85, Ava: 87, Isabella: 74 },
  { year: 2024, Emma: 73, Olivia: 83, Ava: 90, Isabella: 77 },
]

const regionalData = [
  { region: "North India", popularity: 85, color: "#8884d8" },
  { region: "South India", popularity: 72, color: "#82ca9d" },
  { region: "West India", popularity: 68, color: "#ffc658" },
  { region: "East India", popularity: 59, color: "#ff7c7c" },
  { region: "Central India", popularity: 45, color: "#8dd1e1" },
]

const popularityByDecade = [
  { decade: "1990s", Traditional: 75, Modern: 25 },
  { decade: "2000s", Traditional: 60, Modern: 40 },
  { decade: "2010s", Traditional: 45, Modern: 55 },
  { decade: "2020s", Traditional: 30, Modern: 70 },
]

export default function TrendsPage() {
  const [searchName, setSearchName] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedTimeframe, setSelectedTimeframe] = useState("5years")
  const [nameAnalysis, setNameAnalysis] = useState<any>(null)

  const handleNameSearch = () => {
    if (!searchName.trim()) return

    // Mock analysis data
    const analysis = {
      name: searchName,
      currentRank: Math.floor(Math.random() * 1000) + 1,
      trend: Math.random() > 0.5 ? "rising" : "declining",
      change: `${Math.random() > 0.5 ? "+" : "-"}${Math.floor(Math.random() * 20)}%`,
      peakYear: 2000 + Math.floor(Math.random() * 24),
      regions: [
        { name: "Mumbai", popularity: Math.floor(Math.random() * 100) },
        { name: "Delhi", popularity: Math.floor(Math.random() * 100) },
        { name: "Bangalore", popularity: Math.floor(Math.random() * 100) },
        { name: "Chennai", popularity: Math.floor(Math.random() * 100) },
      ],
    }

    setNameAnalysis(analysis)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Name Trends & Analytics
          </h1>
          <p className="text-muted-foreground">Explore name popularity, regional preferences, and historical trends</p>
        </div>
      </div>

      <Tabs defaultValue="trending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trending">Trending Now</TabsTrigger>
          <TabsTrigger value="historical">Historical Trends</TabsTrigger>
          <TabsTrigger value="regional">Regional Heatmap</TabsTrigger>
          <TabsTrigger value="search">Name Search</TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Rising Stars
                </CardTitle>
                <CardDescription>Names gaining popularity this year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trendingNames
                    .filter((name) => name.category === "Rising Star")
                    .map((name, index) => (
                      <div
                        key={name.name}
                        className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-950"
                      >
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">#{name.rank}</Badge>
                          <div>
                            <h4 className="font-semibold">{name.name}</h4>
                            <p className="text-sm text-muted-foreground">Trending upward</p>
                          </div>
                        </div>
                        <Badge variant="default" className="bg-green-500">
                          {name.change}
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popularity by Style</CardTitle>
                <CardDescription>Current preferences breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Modern", value: 45, fill: "#8884d8" },
                        { name: "Traditional", value: 30, fill: "#82ca9d" },
                        { name: "International", value: 15, fill: "#ffc658" },
                        { name: "Unique", value: 10, fill: "#ff7c7c" },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="historical" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Historical Name Trends
              </CardTitle>
              <CardDescription>Track how name popularity has changed over the years</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="Emma" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="Olivia" stroke="#82ca9d" strokeWidth={2} />
                  <Line type="monotone" dataKey="Ava" stroke="#ffc658" strokeWidth={2} />
                  <Line type="monotone" dataKey="Isabella" stroke="#ff7c7c" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Style Evolution by Decade</CardTitle>
              <CardDescription>How naming preferences have shifted over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={popularityByDecade}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="decade" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Traditional" fill="#8884d8" />
                  <Bar dataKey="Modern" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Regional Popularity Heatmap
              </CardTitle>
              <CardDescription>See where names are most popular across different regions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {regionalData.map((region) => (
                    <div key={region.region} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: region.color }} />
                        <span className="font-medium">{region.region}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${region.popularity}%`,
                              backgroundColor: region.color,
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium">{region.popularity}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">
                      Interactive map visualization would appear here in production
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Name Analytics Search
              </CardTitle>
              <CardDescription>Search for specific name trends and popularity data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="searchName">Name to Analyze</Label>
                  <Input
                    id="searchName"
                    placeholder="Enter a name (e.g., Arjun, Priya)"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleNameSearch}>
                    <Search className="mr-2 h-4 w-4" />
                    Analyze
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Region</Label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      <SelectItem value="north">North India</SelectItem>
                      <SelectItem value="south">South India</SelectItem>
                      <SelectItem value="west">West India</SelectItem>
                      <SelectItem value="east">East India</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Timeframe</Label>
                  <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1year">Last Year</SelectItem>
                      <SelectItem value="5years">Last 5 Years</SelectItem>
                      <SelectItem value="10years">Last 10 Years</SelectItem>
                      <SelectItem value="all">All Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {nameAnalysis && (
            <Card>
              <CardHeader>
                <CardTitle>Analysis Results for "{nameAnalysis.name}"</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950">
                    <div className="text-2xl font-bold text-blue-600">#{nameAnalysis.currentRank}</div>
                    <div className="text-sm text-muted-foreground">Current Rank</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-950">
                    <div className="text-2xl font-bold text-green-600">{nameAnalysis.change}</div>
                    <div className="text-sm text-muted-foreground">Year-over-Year</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-950">
                    <div className="text-2xl font-bold text-purple-600">{nameAnalysis.peakYear}</div>
                    <div className="text-sm text-muted-foreground">Peak Year</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-orange-50 dark:bg-orange-950">
                    <div className="text-2xl font-bold text-orange-600">
                      {nameAnalysis.trend === "rising" ? "📈" : "📉"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {nameAnalysis.trend === "rising" ? "Rising" : "Declining"}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Regional Popularity</h4>
                  <div className="space-y-2">
                    {nameAnalysis.regions.map((region: any) => (
                      <div key={region.name} className="flex items-center justify-between p-2 rounded border">
                        <span>{region.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${region.popularity}%` }} />
                          </div>
                          <span className="text-sm">{region.popularity}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
