import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { LessonCard } from "@/components/lesson-card";
import { cn } from "@/lib/utils";
import type { Lesson } from "@shared/schema";

const levels = [
  { id: "all", name: "هەمی", nameEn: "All" },
  { id: "beginner", name: "دەستپێکەر", nameEn: "Beginner" },
  { id: "intermediate", name: "ناڤەند", nameEn: "Intermediate" },
  { id: "advanced", name: "پێشکەڤتی", nameEn: "Advanced" }
];

export default function Lessons() {
  const [selectedLevel, setSelectedLevel] = useState("all");
  
  const { data: lessons = [], isLoading } = useQuery<Lesson[]>({
    queryKey: ["/api/lessons"],
  });

  const filteredLessons = selectedLevel === "all" 
    ? lessons 
    : lessons.filter(lesson => lesson.level === selectedLevel);

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
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 font-kurdish">وانان</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-kurdish text-sm md:text-base">
            ژ دەستپێکەرییەوە تا پیشەیی - هەر وانەکێ ب کوردی ڕوونکراوەتەوە
          </p>
        </div>

        {/* Level Filter */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            {levels.map((level) => (
              <Button
                key={level.id}
                variant={selectedLevel === level.id ? "default" : "ghost"}
                className={cn(
                  "px-4 py-2 mx-1 font-kurdish",
                  selectedLevel === level.id 
                    ? "bg-[hsl(45,78%,53%)] text-white" 
                    : "text-gray-600 hover:text-gray-800"
                )}
                onClick={() => setSelectedLevel(level.id)}
              >
                {level.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Lessons Grid */}
        {filteredLessons.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                onStart={() => {
                  console.log("Starting lesson:", lesson.id);
                  // TODO: Navigate to lesson detail or start lesson flow
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-book-open text-gray-400 text-3xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-600 mb-2 font-kurdish">هیچ وانەیەک نەدۆزرایەوە</h3>
            <p className="text-gray-500 font-kurdish">
              تکایە پاڵێوەرێکی تر هەڵبژێرە یان دواتر دووبارە بکەرەوە
            </p>
          </div>
        )}

        {/* Level Description Cards */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-[hsl(45,78%,53%)] to-yellow-400"></div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[hsl(45,78%,53%)] rounded-lg flex items-center justify-center">
                  <i className="fas fa-seedling text-white text-xl"></i>
                </div>
                <div className="mr-4">
                  <h3 className="text-xl font-bold text-gray-800 font-kurdish">سەرەتایی</h3>
                  <p className="text-gray-500 text-sm font-kurdish">١-١٠ وانە</p>
                </div>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600 font-kurdish">
                  <i className="fas fa-check-circle text-[hsl(120,60%,35%)] mr-3"></i>
                  پیتەکانی ئینگلیزی
                </li>
                <li className="flex items-center text-gray-600 font-kurdish">
                  <i className="fas fa-check-circle text-[hsl(120,60%,35%)] mr-3"></i>
                  وشە بنەڕەتییەکان
                </li>
                <li className="flex items-center text-gray-600 font-kurdish">
                  <i className="fas fa-check-circle text-[hsl(120,60%,35%)] mr-3"></i>
                  ڕستە سادەکان
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-[hsl(120,60%,35%)] to-green-500"></div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[hsl(120,60%,35%)] rounded-lg flex items-center justify-center">
                  <i className="fas fa-tree text-white text-xl"></i>
                </div>
                <div className="mr-4">
                  <h3 className="text-xl font-bold text-gray-800 font-kurdish">ناوەند</h3>
                  <p className="text-gray-500 text-sm font-kurdish">١١-٢٠ وانە</p>
                </div>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600 font-kurdish">
                  <i className="fas fa-check-circle text-[hsl(120,60%,35%)] mr-3"></i>
                  ڕێزمانی پێشکەوتوو
                </li>
                <li className="flex items-center text-gray-600 font-kurdish">
                  <i className="fas fa-check-circle text-[hsl(120,60%,35%)] mr-3"></i>
                  گفتووگۆی ڕۆژانە
                </li>
                <li className="flex items-center text-gray-600 font-kurdish">
                  <i className="fas fa-check-circle text-[hsl(120,60%,35%)] mr-3"></i>
                  خوێندنەوە و نووسین
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-[hsl(25,50%,35%)] to-amber-700"></div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[hsl(25,50%,35%)] rounded-lg flex items-center justify-center">
                  <i className="fas fa-mountain text-white text-xl"></i>
                </div>
                <div className="mr-4">
                  <h3 className="text-xl font-bold text-gray-800 font-kurdish">پێشکەوتوو</h3>
                  <p className="text-gray-500 text-sm font-kurdish">٢١-٣٠ وانە</p>
                </div>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600 font-kurdish">
                  <i className="fas fa-check-circle text-[hsl(120,60%,35%)] mr-3"></i>
                  ئینگلیزی کاری
                </li>
                <li className="flex items-center text-gray-600 font-kurdish">
                  <i className="fas fa-check-circle text-[hsl(120,60%,35%)] mr-3"></i>
                  ئەدەبیات و شیعر
                </li>
                <li className="flex items-center text-gray-600 font-kurdish">
                  <i className="fas fa-check-circle text-[hsl(120,60%,35%)] mr-3"></i>
                  پەخشان و وتار
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
