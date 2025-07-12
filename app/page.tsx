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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, Atom as SidebarTrigger } from "lucide-react";
import { generateNames } from "@/lib/ai-generator";
import { NameResult } from "@/components/name-result";
import { useToast } from "@/hooks/use-toast";

interface NameSuggestion {
  name: string;
  meaning: string;
  origin: string;
  pronunciation: string;
  gender: string;
}

const religions = [
  "Hindu",
  "Christian",
  "Muslim",
  "Sikh",
  "Buddhist",
  "Jewish",
  "Other",
];

const styles = [
  "Modern",
  "Traditional",
  "Indian",
  "Western",
  "Nature-inspired",
  "Mythological",
  "Literary",
  "Royal",
  "Spiritual",
];

export default function HomePage() {
  const [inspirations, setInspirations] = useState(["", "", ""]);
  const [gender, setGender] = useState<string>("");
  const [selectedReligions, setSelectedReligions] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [minLength, setMinLength] = useState("");
  const [maxLength, setMaxLength] = useState("");
  const [startingLetter, setStartingLetter] = useState("");
  const [endingLetter, setEndingLetter] = useState("");
  const [desiredMeaning, setDesiredMeaning] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<NameSuggestion[]>([]);
  const { toast } = useToast();

  const handleInspirationChange = (index: number, value: string) => {
    const newInspirations = [...inspirations];
    newInspirations[index] = value;
    setInspirations(newInspirations);
  };

  const handleReligionToggle = (religion: string) => {
    setSelectedReligions((prev) =>
      prev.includes(religion)
        ? prev.filter((r) => r !== religion)
        : [...prev, religion]
    );
  };

  const handleStyleToggle = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const handleGenerate = async () => {
    if (!gender) {
      toast({
        title: "Please select a gender",
        description: "Gender selection is required to generate names.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const filters = {
        inspirations: inspirations.filter((i) => i.trim()),
        gender,
        religions: selectedReligions,
        styles: selectedStyles,
        minLength: minLength ? Number.parseInt(minLength) : undefined,
        maxLength: maxLength ? Number.parseInt(maxLength) : undefined,
        startingLetter,
        endingLetter,
        desiredMeaning,
      };

      const results = await generateNames(filters);
      setSuggestions(results);

      toast({
        title: "Names generated successfully!",
        description: `Found ${results.length} unique name suggestions for you.`,
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
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <SidebarTrigger className=" animate-spin  " />
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Welcome to Namveda
          </h1>
          <p className="text-muted-foreground">
            Discover unique, culturally relevant, and meaningful baby names with
            AI
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Name Generator
            </CardTitle>
            <CardDescription>
              Enter your preferences and let AI create perfect name suggestions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Inspirations */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Name Inspirations</Label>
              {inspirations.map((inspiration, index) => (
                <Input
                  key={index}
                  placeholder={`Inspiration ${
                    index + 1
                  } (e.g., parent name, hero name)`}
                  value={inspiration}
                  onChange={(e) =>
                    handleInspirationChange(index, e.target.value)
                  }
                />
              ))}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Gender *</Label>
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

            {/* Religion */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Religion</Label>
              <div className="flex flex-wrap gap-2">
                {religions.map((religion) => (
                  <div key={religion} className="flex items-center space-x-2">
                    <Checkbox
                      id={religion}
                      checked={selectedReligions.includes(religion)}
                      onCheckedChange={() => handleReligionToggle(religion)}
                    />
                    <Label htmlFor={religion} className="text-sm">
                      {religion}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Style */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Style Preferences</Label>
              <div className="flex flex-wrap gap-2">
                {styles.map((style) => (
                  <Badge
                    key={style}
                    variant={
                      selectedStyles.includes(style) ? "default" : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => handleStyleToggle(style)}
                  >
                    {style}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Advanced Options */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">Advanced Options</Label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="minLength" className="text-xs">
                    Min Length
                  </Label>
                  <Input
                    id="minLength"
                    type="number"
                    placeholder="3"
                    value={minLength}
                    onChange={(e) => setMinLength(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="maxLength" className="text-xs">
                    Max Length
                  </Label>
                  <Input
                    id="maxLength"
                    type="number"
                    placeholder="12"
                    value={maxLength}
                    onChange={(e) => setMaxLength(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="startingLetter" className="text-xs">
                    Starts with
                  </Label>
                  <Input
                    id="startingLetter"
                    placeholder="A"
                    maxLength={1}
                    value={startingLetter}
                    onChange={(e) =>
                      setStartingLetter(e.target.value.toUpperCase())
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="endingLetter" className="text-xs">
                    Ends with
                  </Label>
                  <Input
                    id="endingLetter"
                    placeholder="A"
                    maxLength={1}
                    value={endingLetter}
                    onChange={(e) =>
                      setEndingLetter(e.target.value.toUpperCase())
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="desiredMeaning" className="text-xs">
                  Desired Meaning
                </Label>
                <Textarea
                  id="desiredMeaning"
                  placeholder="courage, wisdom, peace, strength..."
                  value={desiredMeaning}
                  onChange={(e) => setDesiredMeaning(e.target.value)}
                  rows={2}
                />
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Names...
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

        {/* Results */}
        <Card className="bg-[#000001]">
          <CardHeader>
            <CardTitle>Name Suggestions</CardTitle>
            <CardDescription>
              {suggestions.length > 0
                ? `${suggestions.length} unique names generated for you`
                : "Your AI-generated names will appear here"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isGenerating ? (
              <div className="text-center  flex flex-col justify-center lg:h-[870px] py-12">
                <img
                  src="/search.gif"
                  alt="Generating..."
                  className="mx-auto w-160 h-160"
                />
                <p className="mt-4 text-muted-foreground">
                  Generating your name suggestions...
                </p>
              </div>
            ) : suggestions.length > 0 ? (
              <div className="space-y-4 max-h-[750px] lg:max-h-[870px] overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <NameResult key={index} suggestion={suggestion} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 flex flex-col justify-center lg:h-[870px] text-muted-foreground">
                <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>
                  Fill in your preferences and click "Generate Names" to get
                  started!
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader>
            <CardTitle>Name Suggestions</CardTitle>
            <CardDescription>
              {suggestions.length > 0
                ? `${suggestions.length} unique names generated for you`
                : "Your AI-generated names will appear here"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {suggestions.length > 0 ? (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <NameResult key={index} suggestion={suggestion} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Fill in your preferences and click "Generate Names" to get started!</p>
              </div>
            )}
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
