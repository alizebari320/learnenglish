import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressCard } from "@/components/progress-card";
import { formatNumber, formatPercentage } from "@/lib/utils";
import { MOCK_USER_ID } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Achievement } from "@shared/schema";

export default function Progress() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/stats", MOCK_USER_ID],
  });

  const { data: achievements = [], isLoading: achievementsLoading } = useQuery<Achievement[]>({
    queryKey: ["/api/achievements"],
  });

  const { data: userAchievements = [], isLoading: userAchievementsLoading } = useQuery({
    queryKey: ["/api/user-achievements", MOCK_USER_ID],
  });

  const isLoading = statsLoading || achievementsLoading || userAchievementsLoading;

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

  const unlockedAchievementIds = new Set(userAchievements.map(ua => ua.achievementId));

  return (
    <div className="min-h-screen bg-gray-50 rtl-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 font-kurdish">پێشکەوتن و دەستکەوتەکان</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-kurdish">
            بدوێن چەندەی پێشکەوتوویت و دەستکەوتەکانت ببینە
          </p>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <ProgressCard
              title="ڕۆژی یەکجار"
              value={stats.streakDays}
              icon="fas fa-calendar-day"
              color="bg-[hsl(45,78%,53%)]"
              description="ڕۆژانەی لەدوای یەک"
            />
            <ProgressCard
              title="وانەی تەواو"
              value={stats.completedLessons}
              icon="fas fa-book"
              color="bg-[hsl(120,60%,35%)]"
              description="لە کۆی وانەکان"
            />
            <ProgressCard
              title="وشەی فێربوو"
              value={stats.masteredVocabulary}
              icon="fas fa-brain"
              color="bg-[hsl(14,100%,60%)]"
              description="لە کۆی وشەکان"
            />
            <ProgressCard
              title="دەستکەوت"
              value={stats.totalAchievements}
              icon="fas fa-trophy"
              color="bg-[hsl(25,50%,35%)]"
              description="دەستکەوتی بەدەستهاتوو"
            />
          </div>
        )}

        {/* Detailed Progress */}
        {stats && (
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Learning Progress */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="font-kurdish">پێشکەوتنی فێربوون</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span className="font-kurdish">وانەکان</span>
                      <span>{stats.completedLessons} لە ٣٠</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3">
                      <div 
                        className="progress-bar h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(stats.completedLessons / 30) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span className="font-kurdish">وشەکان</span>
                      <span>{stats.masteredVocabulary} لە {stats.totalVocabulary}</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-[hsl(120,60%,35%)] h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(stats.masteredVocabulary / stats.totalVocabulary) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span className="font-kurdish">نمرەی گشتی</span>
                      <span>{formatNumber(stats.averageScore)}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-[hsl(14,100%,60%)] h-3 rounded-full transition-all duration-500"
                        style={{ width: `${stats.averageScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Activity */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="font-kurdish">چالاکی هەفتانە</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {["ش", "ی", "د", "س", "چ", "پ", "ه"].map((day, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-gray-600 mb-2 font-kurdish">{day}</div>
                      <div className={cn(
                        "w-full h-8 rounded-md",
                        index < 5 ? "bg-[hsl(45,78%,53%)]" : "bg-gray-200"
                      )}></div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600 font-kurdish">
                    ٥ ڕۆژ لەم هەفتەیەدا فێرت بووە
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Achievements */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="font-kurdish text-center">دەستکەوتەکان</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => {
                const isUnlocked = unlockedAchievementIds.has(achievement.id);
                
                return (
                  <div 
                    key={achievement.id}
                    className={cn(
                      "text-center p-6 rounded-xl border-2 transition-all duration-300",
                      isUnlocked 
                        ? "border-[hsl(45,78%,53%)] bg-gradient-to-b from-yellow-50 to-yellow-100" 
                        : "border-gray-300 bg-gray-50"
                    )}
                  >
                    <div className={cn(
                      "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3",
                      isUnlocked ? "bg-[hsl(45,78%,53%)]" : "bg-gray-400"
                    )}>
                      <i className={cn(achievement.icon, "text-white text-2xl")}></i>
                    </div>
                    <h4 className={cn(
                      "font-bold mb-2 font-kurdish",
                      isUnlocked ? "text-gray-800" : "text-gray-600"
                    )}>
                      {achievement.nameKu}
                    </h4>
                    <p className={cn(
                      "text-sm font-kurdish",
                      isUnlocked ? "text-gray-600" : "text-gray-500"
                    )}>
                      {achievement.descriptionKu}
                    </p>
                    {isUnlocked && (
                      <div className="mt-3">
                        <span className="inline-block px-3 py-1 bg-[hsl(45,78%,53%)] text-white text-xs rounded-full font-kurdish">
                          بەدەستهاتوو
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
