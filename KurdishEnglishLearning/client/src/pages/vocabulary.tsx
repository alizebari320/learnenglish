import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Flashcard } from "@/components/flashcard";
import { cn } from "@/lib/utils";
import { VOCABULARY_CATEGORIES } from "@/lib/constants";
import type { Vocabulary } from "@shared/schema";

export default function Vocabulary() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"flashcard" | "list">("flashcard");

  const { data: vocabulary = [], isLoading } = useQuery<Vocabulary[]>({
    queryKey: ["/api/vocabulary"],
  });

  const filteredVocabulary = vocabulary.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      item.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kurdish.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredVocabulary.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredVocabulary.length) % filteredVocabulary.length);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(45,78%,53%)] mx-auto mb-4"></div>
          <p className="text-gray-600 font-kurdish">چاوەڕوان بە...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 rtl-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 font-kurdish">فەرهەنگا تەئاڵیک</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-kurdish text-sm md:text-base">
            وشان ب دەنگ و وێنە فێربە - هەر وشەکێ ب کوردی ڕوونکراوەتەوە
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="w-full lg:w-1/3">
              <Input
                type="text"
                placeholder="گەڕان ب ئینگلیزی یان کوردی..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="font-kurdish text-sm md:text-base"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-white rounded-lg p-1 shadow-sm">
              <Button
                variant={viewMode === "flashcard" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("flashcard")}
                className={cn(
                  "font-kurdish text-xs md:text-sm",
                  viewMode === "flashcard" ? "bg-[hsl(45,78%,53%)] text-white" : ""
                )}
              >
                <i className="fas fa-clone mr-1 md:mr-2"></i>
                فلاش کارد
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={cn(
                  "font-kurdish text-xs md:text-sm",
                  viewMode === "list" ? "bg-[hsl(45,78%,53%)] text-white" : ""
                )}
              >
                <i className="fas fa-list mr-1 md:mr-2"></i>
                لیست
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "font-kurdish",
                selectedCategory === "all" ? "bg-[hsl(45,78%,53%)] text-white" : ""
              )}
            >
              هەموو
            </Button>
            {VOCABULARY_CATEGORIES.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "font-kurdish",
                  selectedCategory === category.id ? "bg-[hsl(45,78%,53%)] text-white" : ""
                )}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Content */}
        {filteredVocabulary.length > 0 ? (
          <>
            {viewMode === "flashcard" ? (
              <div className="mb-8">
                <div className="text-center mb-4">
                  <span className="text-gray-600 font-kurdish">
                    {currentIndex + 1} لە {filteredVocabulary.length}
                  </span>
                </div>
                <Flashcard
                  vocabulary={filteredVocabulary[currentIndex]}
                  onNext={currentIndex < filteredVocabulary.length - 1 ? handleNext : undefined}
                  onPrevious={currentIndex > 0 ? handlePrevious : undefined}
                />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVocabulary.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-lg p-6">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.english}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                    )}
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-1 font-english ltr-text">
                        {item.english}
                      </h3>
                      <p className="text-lg text-[hsl(45,78%,53%)] font-bold mb-2 font-kurdish">
                        {item.kurdish}
                      </p>
                      <p className="text-sm text-gray-600 mb-3 font-english ltr-text">
                        {item.pronunciation}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={cn("px-2 py-1 rounded-full text-xs font-medium", 
                          VOCABULARY_CATEGORIES.find(c => c.id === item.category)?.color || "bg-gray-100 text-gray-800"
                        )}>
                          {VOCABULARY_CATEGORIES.find(c => c.id === item.category)?.name || item.category}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            // TODO: Add audio playback
                            console.log("Play audio for:", item.english);
                          }}
                        >
                          <i className="fas fa-volume-up"></i>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-search text-gray-400 text-3xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-600 mb-2 font-kurdish">هیچ وشەیەک نەدۆزرایەوە</h3>
            <p className="text-gray-500 font-kurdish">
              تکایە کلیلەوشەیەکی تر بنووسە یان بەشێکی تر هەڵبژێرە
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
