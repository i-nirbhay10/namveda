"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NameSuggestion {
  name: string;
  meaning: string;
  origin: string;
  pronunciation: string;
  gender: string;
}

interface NameResultProps {
  suggestion: NameSuggestion;
}

export function NameResult({ suggestion }: NameResultProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const { toast } = useToast();

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    // In a real app, this would save to database
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: `${suggestion.name} ${
        isFavorited ? "removed from" : "added to"
      } your favorites.`,
    });
  };

  const handlePronunciation = () => {
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
    <Card className="hover:shadow-md transition-shadow">
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
              onClick={handlePronunciation}
              className="h-8 w-8 p-0"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavorite}
              className={`h-8 w-8 p-0 ${isFavorited ? "text-red-500" : ""}`}
            >
              <Heart
                className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`}
              />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-medium">Meaning:</span> {suggestion.meaning}
          </p>
          <p className="text-sm">
            <span className="font-medium">Origin:</span> {suggestion.origin}
          </p>
          <Badge variant="secondary" className="text-xs">
            {suggestion.gender}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
