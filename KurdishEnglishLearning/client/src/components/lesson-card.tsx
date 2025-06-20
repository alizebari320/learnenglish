import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn, getLevelColor } from "@/lib/utils";
import type { Lesson } from "@shared/schema";

interface LessonCardProps {
  lesson: Lesson;
  onStart: () => void;
  completed?: boolean;
  progress?: number;
}

export function LessonCard({ lesson, onStart, completed = false, progress = 0 }: LessonCardProps) {
  const levelIcons = {
    beginner: "fas fa-seedling",
    intermediate: "fas fa-tree",
    advanced: "fas fa-mountain"
  };

  const levelColors = {
    beginner: "from-[hsl(45,78%,53%)] to-yellow-400",
    intermediate: "from-[hsl(120,60%,35%)] to-green-500",
    advanced: "from-[hsl(25,50%,35%)] to-amber-700"
  };

  const categoryIcons = {
    basics: "fas fa-abc",
    grammar: "fas fa-spell-check",
    vocabulary: "fas fa-language",
    conversation: "fas fa-comments"
  };

  return (
    <Card className="lesson-card bg-white rounded-xl shadow-lg overflow-hidden">
      <div className={cn("h-32 bg-gradient-to-r", levelColors[lesson.level as keyof typeof levelColors])}></div>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center",
            lesson.level === 'beginner' ? "bg-[hsl(45,78%,53%)]" :
            lesson.level === 'intermediate' ? "bg-[hsl(120,60%,35%)]" :
            "bg-[hsl(25,50%,35%)]"
          )}>
            <i className={cn(levelIcons[lesson.level as keyof typeof levelIcons], "text-white text-xl")}></i>
          </div>
          <div className="mr-4 flex-1">
            <h3 className="text-xl font-bold text-gray-800 font-kurdish">
              {lesson.titleKu}
            </h3>
            <p className="text-gray-500 text-sm font-english ltr-text">
              {lesson.title}
            </p>
          </div>
          {completed && (
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <i className="fas fa-check text-white"></i>
            </div>
          )}
        </div>

        <p className="text-gray-600 mb-4 font-kurdish">
          {lesson.descriptionKu}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-reverse space-x-2">
            <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getLevelColor(lesson.level))}>
              {lesson.level === 'beginner' ? 'سەرەتایی' : 
               lesson.level === 'intermediate' ? 'ناوەند' : 'پێشکەوتوو'}
            </span>
            <span className="text-gray-500 text-xs font-kurdish">
              <i className={cn(categoryIcons[lesson.category as keyof typeof categoryIcons], "mr-1")}></i>
              {lesson.category === 'basics' ? 'بنەڕەتەکان' :
               lesson.category === 'grammar' ? 'ڕێزمان' :
               lesson.category === 'vocabulary' ? 'وشەکان' : 'گفتووگۆ'}
            </span>
          </div>
        </div>

        {progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span className="font-kurdish">پێشکەوتن</span>
              <span>{progress}%</span>
            </div>
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="progress-bar h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        <Button 
          onClick={onStart}
          className={cn(
            "w-full text-white py-3 rounded-lg font-semibold transition-colors font-kurdish",
            completed ? "bg-green-600 hover:bg-green-700" :
            lesson.level === 'beginner' ? "bg-[hsl(45,78%,53%)] hover:bg-yellow-500" :
            lesson.level === 'intermediate' ? "bg-[hsl(120,60%,35%)] hover:bg-green-600" :
            "bg-[hsl(25,50%,35%)] hover:bg-amber-800"
          )}
        >
          {completed ? "دووبارە بکەرەوە" : 
           progress > 0 ? "درێژەپێدان" : "دەستپێکردن"}
        </Button>
      </CardContent>
    </Card>
  );
}
