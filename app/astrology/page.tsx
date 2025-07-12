"use client";

import { useEffect, useState } from "react";
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
import { Star, Moon, Sun, Sparkles, Loader2, Volume2 } from "lucide-react";
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

  // const handlePronunciation = (suggestion: any) => {
  //   if ("speechSynthesis" in window) {
  //     const utterance = new SpeechSynthesisUtterance(suggestion.meaning);
  //     utterance.rate = 0.8;
  //     speechSynthesis.speak(utterance);
  //   } else {
  //     toast({
  //       title: "Speech not supported",
  //       description: "Your browser doesn't support text-to-speech.",
  //       variant: "destructive",
  //     });
  //   }
  // };

  // useEffect(() => {
  //   const loadVoices = () => {
  //     const voices = window.speechSynthesis.getVoices();
  //     console.log("Available voices:");
  //     voices.forEach((voice, index) => {
  //       console.log(
  //         `${index + 1}. Name: ${voice.name}, Lang: ${voice.lang}, Default: ${
  //           voice.default
  //         }`
  //       );
  //     });
  //   };

  //   // Some browsers (like Chrome) load voices asynchronously
  //   if (window.speechSynthesis.onvoiceschanged !== undefined) {
  //     window.speechSynthesis.onvoiceschanged = loadVoices;
  //   }

  //   // Also call it once in case it's already loaded
  //   loadVoices();
  // }, []);

  const handlePronunciation = (suggestion: any) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(suggestion.name);
      utterance.rate = 0.8;

      // Load and assign a specific voice
      const voices = speechSynthesis.getVoices();
      const selectedVoice = voices.find(
        (voice) => voice.name === "Google हिन्दी" // <-- change this as needed
      );

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Speech not supported",
        description: "Your browser doesn't support text-to-speech.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Astrology & Numerology Guide
          </h1>
          <p className="text-muted-foreground">
            Discover names aligned with celestial influences and numerological
            harmony
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Birth Details
              </CardTitle>
              <CardDescription>
                Enter birth information for astrological analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="birthDate">Birth Date *</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthTime">Birth Time (Optional)</Label>
                <Input
                  id="birthTime"
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  More accurate for Vedic astrology calculations
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthPlace">Birth Place (Optional)</Label>
                <Input
                  id="birthPlace"
                  placeholder="City, Country"
                  value={birthPlace}
                  onChange={(e) => setBirthPlace(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Astrology System</Label>
                <Select
                  value={astrologySystem}
                  onValueChange={setAstrologySystem}
                >
                  <SelectTrigger>
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
                className="w-full bg-transparent"
                variant="outline"
              >
                <Moon className="mr-2 h-4 w-4" />
                Analyze Birth Chart
              </Button>
            </CardContent>
          </Card>

          {astrologyData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="h-5 w-5" />
                  Your Astrological Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Life Path Number
                    </Label>
                    <Badge variant="secondary" className="mt-1">
                      {astrologyData.numerology.lifePathNumber}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Zodiac Sign</Label>
                    <Badge variant="secondary" className="mt-1">
                      {astrologyData.zodiacSign}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Nakshatra</Label>
                    <Badge variant="secondary" className="mt-1">
                      {astrologyData.nakshatra}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">
                      Chinese Zodiac
                    </Label>
                    <Badge variant="secondary" className="mt-1">
                      {astrologyData.chineseZodiac}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Gender for Name Generation *</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger>
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
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
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
        <Card>
          <CardHeader>
            <CardTitle>Astrologically Aligned Names</CardTitle>
            <CardDescription>
              {suggestions.length > 0
                ? `${suggestions.length} names aligned with your birth chart`
                : "Names aligned with your astrological profile will appear here"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isGenerating ? (
              <div className="text-center py-12">
                <Star className="h-12 w-12 mx-auto mb-4 opacity-50 animate-pulse" />
                <p className="text-muted-foreground">
                  Consulting the stars and calculating cosmic harmony...
                </p>
              </div>
            ) : suggestions.length > 0 ? (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-primary">
                            {suggestion.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            /{suggestion.pronunciation}/
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              handlePronunciation(suggestion);
                            }}
                            className="h-8 w-8 p-0"
                          >
                            <Volume2 className="h-4 w-4" />
                          </Button>
                          <Badge variant="secondary" className="text-xs">
                            {suggestion.gender}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Meaning:</span>{" "}
                          {suggestion.meaning}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Origin:</span>{" "}
                          {suggestion.origin}
                        </p>
                        <div className="bg-purple-50 dark:bg-purple-950 p-2 rounded-md">
                          <p className="text-sm">
                            <span className="font-medium text-purple-700 dark:text-purple-300">
                              Astrological Significance:
                            </span>{" "}
                            {suggestion.astrologicalSignificance}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>
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
