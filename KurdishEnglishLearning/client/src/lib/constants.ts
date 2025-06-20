export const KURDISH_TRANSLATIONS = {
  // Navigation
  home: "ماڵەوە",
  lessons: "وانان",
  vocabulary: "وشان",
  progress: "پێشڤەچوون",
  quiz: "ئیمتحان",
  
  // Levels
  beginner: "دەستپێکەر",
  intermediate: "ناڤەند",
  advanced: "پێشکەڤتی",
  
  // Categories
  grammar: "ڕێزمان",
  vocabularyCategory: "وشان",
  conversation: "گوتوگۆ",
  basics: "بنچینەیی",
  
  // Common phrases
  start: "دەستپێک",
  continue: "بەردەوام بە",
  complete: "تەواوکرن",
  next: "پاشتر",
  previous: "پێشتر",
  save: "پاراستن",
  cancel: "بەتاڵکرن",
  
  // Progress
  completed: "تەمام",
  inProgress: "لە ڕێگەدایە",
  notStarted: "دەست پێنەکریە",
  
  // Time
  today: "ئەڤرۆ",
  yesterday: "دوێرۆ",
  thisWeek: "ئەڤ هەفتێ",
  
  // Statistics
  lessonsCompleted: "وانێن تەواو",
  vocabularyLearned: "وشێن فێربووی",
  currentStreak: "زنجیرەیا ئێستا",
  totalPoints: "کۆما خالان"
};

export const LESSON_CATEGORIES = [
  { id: 'basics', name: 'بنچینەیی', icon: 'fas fa-seedling' },
  { id: 'grammar', name: 'ڕێزمان', icon: 'fas fa-spell-check' },
  { id: 'vocabulary', name: 'وشان', icon: 'fas fa-language' },
  { id: 'conversation', name: 'گوتوگۆ', icon: 'fas fa-comments' },
  { id: 'pronunciation', name: 'دەنگبەرکرن', icon: 'fas fa-volume-up' },
  { id: 'writing', name: 'نڤیسین', icon: 'fas fa-pen' }
];

export const VOCABULARY_CATEGORIES = [
  { id: 'food', name: 'خارن', color: 'bg-orange-100 text-orange-800' },
  { id: 'family', name: 'مال', color: 'bg-pink-100 text-pink-800' },
  { id: 'home', name: 'خانی', color: 'bg-blue-100 text-blue-800' },
  { id: 'work', name: 'کار', color: 'bg-purple-100 text-purple-800' },
  { id: 'travel', name: 'گەشت', color: 'bg-green-100 text-green-800' },
  { id: 'health', name: 'تەندروستی', color: 'bg-red-100 text-red-800' },
  { id: 'education', name: 'پەروەردە', color: 'bg-indigo-100 text-indigo-800' },
  { id: 'nature', name: 'سروشت', color: 'bg-emerald-100 text-emerald-800' }
];

export const ACHIEVEMENT_TYPES = {
  LESSONS_COMPLETED: 'lessons_completed',
  VOCABULARY_LEARNED: 'vocabulary_learned',
  DAILY_STREAK: 'daily_streak',
  PERFECT_SCORE: 'perfect_score',
  CATEGORY_MASTER: 'category_master'
};

export const MOCK_USER_ID = 1; // For demo purposes
