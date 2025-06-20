import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProgressCard } from "@/components/progress-card";
import { LessonCard } from "@/components/lesson-card";
import { Link } from "wouter";
import { formatNumber, formatPercentage, getGreeting } from "@/lib/utils";
import { MOCK_USER_ID } from "@/lib/constants";
import type { Lesson } from "@shared/schema";

export default function Home() {
  const { data: lessons = [], isLoading: lessonsLoading } = useQuery<Lesson[]>({
    queryKey: ["/api/lessons"],
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/stats", MOCK_USER_ID],
  });

  const featuredLessons = lessons.slice(0, 3);

  if (lessonsLoading || statsLoading) {
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
    <div className="rtl-text">
      {/* Hero Section */}
      <section className="kurdish-pattern bg-gradient-to-r from-[hsl(45,78%,53%)] to-[hsl(120,60%,35%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-6 font-kurdish">
              {getGreeting()}! بخێر هاتیت بۆ فێربوونا ئینگلیزی
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto font-kurdish">
              ژ کوردی بۆ ئینگلیزی - فێربوونا زمانێ ئینگلیزی ب ڕێکا سادە و کاریگەر
            </p>
            
            {/* Progress Overview */}
            {stats && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 max-w-2xl mx-auto">
                <h3 className="text-white font-semibold mb-4 font-kurdish text-sm md:text-base">پێشڤەچوونا ئێستا</h3>
                <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
                  <div>
                    <div className="text-lg md:text-2xl font-bold text-white">
                      {formatPercentage(stats.completedLessons, lessons.length)}
                    </div>
                    <div className="text-white/80 text-xs md:text-sm font-kurdish">وانان</div>
                  </div>
                  <div>
                    <div className="text-lg md:text-2xl font-bold text-white">
                      {formatNumber(stats.totalVocabulary)}
                    </div>
                    <div className="text-white/80 text-xs md:text-sm font-kurdish">وشان</div>
                  </div>
                  <div>
                    <div className="text-lg md:text-2xl font-bold text-white">
                      {formatNumber(stats.streakDays)}
                    </div>
                    <div className="text-white/80 text-xs md:text-sm font-kurdish">ڕۆژ</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="bg-white/20 rounded-full h-2">
                    <div 
                      className="progress-bar h-2 rounded-full" 
                      style={{ width: `${(stats.completedLessons / lessons.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8 md:mb-12 font-kurdish">کارێن ئەڤرۆ</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Daily Lesson */}
            <Link href="/lessons">
              <Card className="lesson-card bg-gradient-to-br from-[hsl(45,78%,53%)] to-yellow-500 rounded-xl p-6 text-white cursor-pointer">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-4">
                    <i className="fas fa-book-open text-3xl"></i>
                    <span className="bg-white/20 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-kurdish">وانا ئەڤرۆ</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 font-kurdish">وانا نوێ</h3>
                  <p className="text-white/90 mb-4 font-kurdish text-sm md:text-base">دەستپێکا وانا نوێ لە ئینگلیزی</p>
                  <Button className="w-full bg-white text-[hsl(45,78%,53%)] py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors font-kurdish text-sm md:text-base">
                    دەستپێک
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Vocabulary Practice */}
            <Link href="/vocabulary">
              <Card className="lesson-card bg-gradient-to-br from-[hsl(120,60%,35%)] to-green-600 rounded-xl p-6 text-white cursor-pointer">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-4">
                    <i className="fas fa-language text-3xl"></i>
                    <span className="bg-white/20 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-kurdish">وشان</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 font-kurdish">وشا نوێ</h3>
                  <p className="text-white/90 mb-4 font-kurdish text-sm md:text-base">فێربوونا وشێن نوێ ب کوردی</p>
                  <Button className="w-full bg-white text-[hsl(120,60%,35%)] py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors font-kurdish text-sm md:text-base">
                    مەشقکرن
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Progress Check */}
            <Link href="/progress">
              <Card className="lesson-card bg-gradient-to-br from-[hsl(14,100%,60%)] to-red-500 rounded-xl p-6 text-white cursor-pointer">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-4">
                    <i className="fas fa-chart-line text-3xl"></i>
                    <span className="bg-white/20 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-kurdish">پێشڤەچوون</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 font-kurdish">پێشڤەچوونا تە</h3>
                  <p className="text-white/90 mb-4 font-kurdish text-sm md:text-base">دیتنا ئامارێن تە و دەستکەوتان</p>
                  <Button className="w-full bg-white text-[hsl(14,100%,60%)] py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors font-kurdish text-sm md:text-base">
                    دیتن
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Lessons */}
      {featuredLessons.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 font-kurdish">وانە نوێیەکان</h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-kurdish">
                لە سەرەتاییەوە تا پیشەیی - هەر وانەیەک بە کوردی ڕوونکراوەتەوە
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredLessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  onStart={() => console.log("Start lesson:", lesson.id)}
                />
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/lessons">
                <Button className="bg-[hsl(45,78%,53%)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors font-kurdish">
                  هەموو وانەکان ببینە
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Statistics Overview */}
      {stats && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 font-kurdish">ئامارەکانت</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProgressCard
                title="ڕۆژی یەکجار"
                value={stats.streakDays}
                icon="fas fa-calendar-day"
                color="bg-[hsl(45,78%,53%)]"
              />
              <ProgressCard
                title="وانەی تەواو"
                value={stats.completedLessons}
                icon="fas fa-book"
                color="bg-[hsl(120,60%,35%)]"
              />
              <ProgressCard
                title="وشەی نوێ"
                value={stats.totalVocabulary}
                icon="fas fa-brain"
                color="bg-[hsl(14,100%,60%)]"
              />
              <ProgressCard
                title="دەستکەوت"
                value={stats.totalAchievements}
                icon="fas fa-trophy"
                color="bg-[hsl(25,50%,35%)]"
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
