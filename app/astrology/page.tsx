"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Star, Moon, Sun, Sparkles, Loader2 } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AdBanner } from "@/components/ad-banner";
import { generateAstrologicalNames } from "@/lib/astrology-generator";
import {
  calculateNumerology,
  calculateNakshatra,
  calculateZodiacSign,
  calculateChineseZodiac,
} from "@/lib/astrology-utils";
import { useToast } from "@/hooks/use-toast";

interface AstrologicalNameSuggestion {
  name: string;
  meaning: string;
  origin: string;
  pronunciation: string;
  gender: string;
  astrologicalSignificance: string;
}

export default function AstrologyPage() {
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [gender, setGender] = useState("");
  const [astrologySystem, setAstrologySystem] = useState("vedic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<AstrologicalNameSuggestion[]>(
    []
  );
  const [astrologyData, setAstrologyData] = useState<any>(null);
  const { toast } = useToast();

  const handleAnalyze = () => {
    if (!birthDate) {
      toast({
        title: "Please enter birth date",
        description: "Birth date is required for astrological analysis.",
        variant: "destructive",
      });
      return;
    }

    const date = new Date(birthDate);
    const analysis = {
      numerology: calculateNumerology(date),
      nakshatra: calculateNakshatra(date),
      zodiacSign: calculateZodiacSign(date),
      chineseZodiac: calculateChineseZodiac(date),
    };

    setAstrologyData(analysis);
    toast({
      title: "Astrological analysis complete!",
      description: "Your birth chart has been analyzed for name suggestions.",
    });
  };

  const handleGenerate = async () => {
    if (!astrologyData) {
      toast({
        title: "Please analyze birth details first",
        description: "Click 'Analyze Birth Chart' before generating names.",
        variant: "destructive",
      });
      return;
    }

    if (!gender) {
      toast({
        title: "Please select gender",
        description: "Gender selection is required for name generation.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const filters = {
        astrologyData,
        gender,
        astrologySystem,
        birthDate,
        birthTime,
        birthPlace,
      };

      const results = await generateAstrologicalNames(filters);
      setSuggestions(results);

      toast({
        title: "Astrological names generated!",
        description: `Found ${results.length} names aligned with your birth chart.`,
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Please try again with different parameters.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <SidebarTrigger className="md:hidden" />
        <div className="flex-1 min-w-0">
          <h1 className="text-responsive-xl md:text-responsive-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Astro & Numerology Guide
          </h1>
          <p className="text-responsive-base text-muted-foreground mt-1 sm:mt-2">
            Discover names aligned with celestial influences and numerological
            harmony
          </p>
        </div>
      </div>

      {/* Mobile In-Content Ad */}
      {/* <AdBanner slot="in-content" className="md:hidden mb-4" /> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Input Form */}
        <div className="space-y-4 sm:space-y-6">
          <Card className="card-mobile-optimized sm:p-0">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-responsive-lg">
                <Star className="h-4 w-4 sm:h-5 sm:w-5" />
                Birth Details
              </CardTitle>
              <CardDescription className="text-responsive-sm">
                Enter birth information for astrological analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Label htmlFor="birthDate" className="text-responsive-sm">
                  Birth Date *
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="text-responsive-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthTime" className="text-responsive-sm">
                  Birth Time (Optional)
                </Label>
                <Input
                  id="birthTime"
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className="text-responsive-sm"
                />
                <p className="text-xs text-muted-foreground">
                  More accurate for Vedic astrology calculations
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthPlace" className="text-responsive-sm">
                  Birth Place (Optional)
                </Label>
                <Input
                  id="birthPlace"
                  placeholder="City, Country"
                  value={birthPlace}
                  onChange={(e) => setBirthPlace(e.target.value)}
                  className="text-responsive-sm"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-responsive-sm">Astrology System</Label>
                <Select
                  value={astrologySystem}
                  onValueChange={setAstrologySystem}
                >
                  <SelectTrigger className="text-responsive-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vedic">Vedic (Indian)</SelectItem>
                    <SelectItem value="western">Western Zodiac</SelectItem>
                    <SelectItem value="chinese">Chinese Zodiac</SelectItem>
                    <SelectItem value="numerology">Numerology Focus</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleAnalyze}
                className="w-full bg-transparent text-responsive-sm"
                variant="outline"
              >
                <Moon className="mr-2 h-4 w-4" />
                Analyze Birth Chart
              </Button>
            </CardContent>
          </Card>

          {astrologyData && (
            <Card className="card-mobile-optimized sm:p-0">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="flex items-center gap-2 text-responsive-lg">
                  <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
                  Your Astrological Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <Label className="text-responsive-sm font-medium">
                      Life Path Number
                    </Label>
                    <Badge
                      variant="secondary"
                      className="mt-1 text-xs sm:text-sm"
                    >
                      {astrologyData.numerology.lifePathNumber}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-responsive-sm font-medium">
                      Zodiac Sign
                    </Label>
                    <Badge
                      variant="secondary"
                      className="mt-1 text-xs sm:text-sm"
                    >
                      {astrologyData.zodiacSign}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-responsive-sm font-medium">
                      Nakshatra
                    </Label>
                    <Badge
                      variant="secondary"
                      className="mt-1 text-xs sm:text-sm"
                    >
                      {astrologyData.nakshatra}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-responsive-sm font-medium">
                      Chinese Zodiac
                    </Label>
                    <Badge
                      variant="secondary"
                      className="mt-1 text-xs sm:text-sm"
                    >
                      {astrologyData.chineseZodiac}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-responsive-sm">
                    Gender for Name Generation *
                  </Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger className="text-responsive-sm">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="unisex">Unisex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-responsive-sm"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Astrological Names...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Names
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results */}
        <Card className="card-mobile-optimized sm:p-0">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-responsive-lg">
              Astrologically Aligned Names
            </CardTitle>
            <CardDescription className="text-responsive-sm">
              {suggestions.length > 0
                ? `${suggestions.length} names aligned with your birth chart`
                : "Names aligned with your astrological profile will appear here"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isGenerating ? (
              <div className="text-center py-8 sm:py-12">
                <Star className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 opacity-50 animate-pulse" />
                <p className="text-responsive-sm text-muted-foreground">
                  Consulting the stars and calculating cosmic harmony...
                </p>
              </div>
            ) : suggestions.length > 0 ? (
              <div className="space-y-3 sm:space-y-4 max-h-[400px] sm:max-h-[600px] overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <div key={index}>
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-start justify-between mb-2 sm:mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-responsive-lg font-bold text-primary truncate">
                              {suggestion.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              /{suggestion.pronunciation}/
                            </p>
                          </div>
                          <Badge
                            variant="secondary"
                            className="text-xs flex-shrink-0 ml-2"
                          >
                            {suggestion.gender}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <p className="text-responsive-sm">
                            <span className="font-medium">Meaning:</span>{" "}
                            {suggestion.meaning}
                          </p>
                          <p className="text-responsive-sm">
                            <span className="font-medium">Origin:</span>{" "}
                            {suggestion.origin}
                          </p>
                          <div className="bg-purple-50 dark:bg-purple-950 p-2 rounded-md">
                            <p className="text-responsive-sm">
                              <span className="font-medium text-purple-700 dark:text-purple-300">
                                Astrological Significance:
                              </span>{" "}
                              {suggestion.astrologicalSignificance}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* In-content ad every 4 results */}
                    {(index + 1) % 4 === 0 &&
                      index < suggestions.length - 1 && (
                        <div className="my-4">
                          {/* <AdBanner slot="in-content" /> */}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12 text-muted-foreground">
                <Star className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 opacity-50" />
                <p className="text-responsive-sm">
                  Enter your birth details and analyze your chart to get
                  started!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
