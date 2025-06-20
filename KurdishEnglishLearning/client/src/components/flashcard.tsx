import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAudio } from "@/hooks/use-audio";
import { cn } from "@/lib/utils";
import type { Vocabulary } from "@shared/schema";

interface FlashcardProps {
  vocabulary: Vocabulary;
  onNext?: () => void;
  onPrevious?: () => void;
  showNavigation?: boolean;
}

export function Flashcard({ vocabulary, onNext, onPrevious, showNavigation = true }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { isPlaying, speakText } = useAudio();

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handlePlayAudio = () => {
    if (vocabulary.audioUrl) {
      // Would play actual audio file if available
      console.log("Playing audio:", vocabulary.audioUrl);
    } else {
      // Fallback to text-to-speech
      speakText(vocabulary.english);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1">
            <div 
              className={cn("flashcard cursor-pointer", isFlipped && "flipped")}
              onClick={handleFlip}
            >
              <div className="flashcard-inner min-h-[300px]">
                {/* Front (English) */}
                <Card className="flashcard-front bg-white shadow-lg p-8 flex flex-col justify-center items-center">
                  {vocabulary.imageUrl && (
                    <img 
                      src={vocabulary.imageUrl} 
                      alt={vocabulary.english}
                      className="w-32 h-32 mx-auto mb-4 rounded-lg object-cover"
                    />
                  )}
                  <h3 className="text-4xl font-bold text-gray-800 mb-2 font-english ltr-text">
                    {vocabulary.english}
                  </h3>
                  <p className="text-lg text-gray-600 mb-4 font-english ltr-text">
                    {vocabulary.pronunciation}
                  </p>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayAudio();
                    }}
                    disabled={isPlaying}
                    className="bg-[hsl(45,78%,53%)] text-white hover:bg-yellow-500 transition-colors font-kurdish"
                  >
                    <i className="fas fa-volume-up mr-2"></i>
                    گوێگرتن
                  </Button>
                </Card>

                {/* Back (Kurdish) */}
                <Card className="flashcard-back bg-[hsl(45,78%,53%)] shadow-lg p-8 flex flex-col justify-center text-white">
                  <h3 className="text-4xl font-bold mb-4 font-kurdish text-center">
                    {vocabulary.kurdish}
                  </h3>
                  {vocabulary.example && vocabulary.exampleKu && (
                    <div className="space-y-2 text-center">
                      <p className="font-kurdish"><strong>نموونە:</strong></p>
                      <p className="bg-white/20 p-3 rounded-lg font-kurdish">
                        {vocabulary.exampleKu}
                      </p>
                      <p className="font-english ltr-text text-white/90 text-sm">
                        "{vocabulary.example}"
                      </p>
                    </div>
                  )}
                  <div className="text-center mt-4">
                    <span className={cn(
                      "inline-block px-3 py-1 rounded-full text-xs font-medium",
                      vocabulary.difficulty === 'easy' ? 'bg-green-500/20 text-green-100' :
                      vocabulary.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-100' :
                      'bg-red-500/20 text-red-100'
                    )}>
                      {vocabulary.difficulty === 'easy' ? 'ئاسان' : 
                       vocabulary.difficulty === 'medium' ? 'ناوەند' : 'قورس'}
                    </span>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        {showNavigation && (
          <div className="flex justify-center mt-8 space-x-reverse space-x-4">
            <Button 
              onClick={onPrevious}
              disabled={!onPrevious}
              variant="outline"
              className="font-kurdish"
            >
              <i className="fas fa-arrow-right mr-2"></i>
              پێشوو
            </Button>
            <Button 
              onClick={onNext}
              disabled={!onNext}
              className="bg-[hsl(120,60%,35%)] text-white hover:bg-green-600 font-kurdish"
            >
              دواتر
              <i className="fas fa-arrow-left ml-2"></i>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
