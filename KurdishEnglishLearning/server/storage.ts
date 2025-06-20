import { 
  users, lessons, vocabulary, userProgress, userVocabulary, achievements, userAchievements,
  type User, type Lesson, type Vocabulary, type UserProgress, type UserVocabulary, 
  type Achievement, type UserAchievement,
  type InsertUser, type InsertLesson, type InsertVocabulary, type InsertUserProgress,
  type InsertUserVocabulary, type InsertAchievement, type InsertUserAchievement
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Lesson methods
  getAllLessons(): Promise<Lesson[]>;
  getLesson(id: number): Promise<Lesson | undefined>;
  getLessonsByLevel(level: string): Promise<Lesson[]>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  
  // Vocabulary methods
  getAllVocabulary(): Promise<Vocabulary[]>;
  getVocabulary(id: number): Promise<Vocabulary | undefined>;
  getVocabularyByCategory(category: string): Promise<Vocabulary[]>;
  createVocabulary(vocabulary: InsertVocabulary): Promise<Vocabulary>;
  
  // User Progress methods
  getUserProgress(userId: number): Promise<UserProgress[]>;
  getUserLessonProgress(userId: number, lessonId: number): Promise<UserProgress | undefined>;
  updateUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  
  // User Vocabulary methods
  getUserVocabulary(userId: number): Promise<UserVocabulary[]>;
  updateUserVocabulary(userVoc: InsertUserVocabulary): Promise<UserVocabulary>;
  
  // Achievement methods
  getAllAchievements(): Promise<Achievement[]>;
  getUserAchievements(userId: number): Promise<UserAchievement[]>;
  addUserAchievement(userAchievement: InsertUserAchievement): Promise<UserAchievement>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private lessons: Map<number, Lesson> = new Map();
  private vocabulary: Map<number, Vocabulary> = new Map();
  private userProgress: Map<string, UserProgress> = new Map();
  private userVocabulary: Map<string, UserVocabulary> = new Map();
  private achievements: Map<number, Achievement> = new Map();
  private userAchievements: Map<string, UserAchievement> = new Map();
  
  private currentId = {
    users: 1,
    lessons: 1,
    vocabulary: 1,
    userProgress: 1,
    userVocabulary: 1,
    achievements: 1,
    userAchievements: 1,
  };

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed lessons
    const lessonData = [
      {
        title: "The English Alphabet",
        titleKu: "پیتێن ئینگلیزی",
        description: "Learn the 26 letters of the English alphabet",
        descriptionKu: "فێربوونا ٢٦ پیتێن ئەلفوبێیا ئینگلیزی",
        level: "beginner",
        category: "basics",
        content: { type: "alphabet", letters: ["A", "B", "C"] },
        order: 1,
        isActive: true
      },
      {
        title: "Basic Greetings",
        titleKu: "سلاڤکرنا سەرەتایی",
        description: "Common ways to greet people in English",
        descriptionKu: "ڕێگێن باو یێن سلاڤکرنێ ب ئینگلیزی",
        level: "beginner",
        category: "conversation",
        content: { type: "greetings", phrases: ["Hello", "Good morning", "How are you?"] },
        order: 2,
        isActive: true
      },
      {
        title: "Present Tense",
        titleKu: "کاتا ئێستا",
        description: "Understanding and using present tense",
        descriptionKu: "تێگەهشتن و بکارهێنانا کاتا ئێستا",
        level: "intermediate",
        category: "grammar",
        content: { type: "grammar", rules: ["I am", "You are", "He/She is"] },
        order: 3,
        isActive: true
      }
    ];

    lessonData.forEach((lesson, index) => {
      const id = this.currentId.lessons++;
      this.lessons.set(id, { ...lesson, id, isActive: true });
    });

    // Seed vocabulary
    const vocabularyData = [
      {
        english: "Apple",
        kurdish: "سێڤ",
        pronunciation: "/ˈæpəl/",
        category: "food",
        difficulty: "easy",
        imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200&h=200&fit=crop",
        example: "I eat an apple every day",
        exampleKu: "ئەز هەر ڕۆژێ سێڤەکێ دخۆم",
        isActive: true
      },
      {
        english: "House",
        kurdish: "خانی",
        pronunciation: "/haʊs/",
        category: "home",
        difficulty: "easy",
        example: "This is my house",
        exampleKu: "ئەڤە خانیا منە",
        imageUrl: null,
        isActive: true
      },
      {
        english: "Beautiful",
        kurdish: "جوان",
        pronunciation: "/ˈbjuːtɪfəl/",
        category: "adjectives",
        difficulty: "medium",
        example: "She is beautiful",
        exampleKu: "ئەو جوانە",
        imageUrl: null,
        isActive: true
      }
    ];

    vocabularyData.forEach((vocab, index) => {
      const id = this.currentId.vocabulary++;
      this.vocabulary.set(id, { ...vocab, id, audioUrl: null, isActive: true });
    });

    // Seed achievements
    const achievementData = [
      {
        name: "First Steps",
        nameKu: "یەکەم هەنگاو",
        description: "Complete your first lesson",
        descriptionKu: "یەکەم وانا خۆ تەواو بکە",
        icon: "fas fa-baby",
        requirement: { type: "lessons_completed", count: 1 },
        isActive: true
      },
      {
        name: "Vocabulary Master",
        nameKu: "مامۆستایێ وشان",
        description: "Learn 100 new words",
        descriptionKu: "١٠٠ وشا نوێ فێربە",
        icon: "fas fa-brain",
        requirement: { type: "vocabulary_learned", count: 100 },
        isActive: true
      },
      {
        name: "Streak Champion",
        nameKu: "پاڵەوانێ یەکجار",
        description: "Study for 15 consecutive days",
        descriptionKu: "١٥ ڕۆژێ یەکجار فێربە",
        icon: "fas fa-fire",
        requirement: { type: "daily_streak", count: 15 },
        isActive: true
      }
    ];

    achievementData.forEach((achievement, index) => {
      const id = this.currentId.achievements++;
      this.achievements.set(id, { ...achievement, id, isActive: true });
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  // Lesson methods
  async getAllLessons(): Promise<Lesson[]> {
    return Array.from(this.lessons.values()).filter(lesson => lesson.isActive);
  }

  async getLesson(id: number): Promise<Lesson | undefined> {
    return this.lessons.get(id);
  }

  async getLessonsByLevel(level: string): Promise<Lesson[]> {
    return Array.from(this.lessons.values()).filter(lesson => 
      lesson.level === level && lesson.isActive
    );
  }

  async createLesson(insertLesson: InsertLesson): Promise<Lesson> {
    const id = this.currentId.lessons++;
    const lesson: Lesson = { ...insertLesson, id };
    this.lessons.set(id, lesson);
    return lesson;
  }

  // Vocabulary methods
  async getAllVocabulary(): Promise<Vocabulary[]> {
    return Array.from(this.vocabulary.values()).filter(vocab => vocab.isActive);
  }

  async getVocabulary(id: number): Promise<Vocabulary | undefined> {
    return this.vocabulary.get(id);
  }

  async getVocabularyByCategory(category: string): Promise<Vocabulary[]> {
    return Array.from(this.vocabulary.values()).filter(vocab => 
      vocab.category === category && vocab.isActive
    );
  }

  async createVocabulary(insertVocabulary: InsertVocabulary): Promise<Vocabulary> {
    const id = this.currentId.vocabulary++;
    const vocabulary: Vocabulary = { ...insertVocabulary, id };
    this.vocabulary.set(id, vocabulary);
    return vocabulary;
  }

  // User Progress methods
  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values()).filter(progress => 
      progress.userId === userId
    );
  }

  async getUserLessonProgress(userId: number, lessonId: number): Promise<UserProgress | undefined> {
    const key = `${userId}-${lessonId}`;
    return this.userProgress.get(key);
  }

  async updateUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const key = `${insertProgress.userId}-${insertProgress.lessonId}`;
    const existing = this.userProgress.get(key);
    
    if (existing) {
      const updated: UserProgress = {
        ...existing,
        ...insertProgress,
        updatedAt: new Date()
      };
      this.userProgress.set(key, updated);
      return updated;
    } else {
      const id = this.currentId.userProgress++;
      const progress: UserProgress = {
        ...insertProgress,
        id,
        updatedAt: new Date(),
        completedAt: insertProgress.completed ? new Date() : null
      };
      this.userProgress.set(key, progress);
      return progress;
    }
  }

  // User Vocabulary methods
  async getUserVocabulary(userId: number): Promise<UserVocabulary[]> {
    return Array.from(this.userVocabulary.values()).filter(userVoc => 
      userVoc.userId === userId
    );
  }

  async updateUserVocabulary(insertUserVoc: InsertUserVocabulary): Promise<UserVocabulary> {
    const key = `${insertUserVoc.userId}-${insertUserVoc.vocabularyId}`;
    const existing = this.userVocabulary.get(key);
    
    if (existing) {
      const updated: UserVocabulary = {
        ...existing,
        ...insertUserVoc,
        lastReviewed: new Date()
      };
      this.userVocabulary.set(key, updated);
      return updated;
    } else {
      const id = this.currentId.userVocabulary++;
      const userVoc: UserVocabulary = {
        ...insertUserVoc,
        id,
        lastReviewed: new Date()
      };
      this.userVocabulary.set(key, userVoc);
      return userVoc;
    }
  }

  // Achievement methods
  async getAllAchievements(): Promise<Achievement[]> {
    return Array.from(this.achievements.values()).filter(achievement => achievement.isActive);
  }

  async getUserAchievements(userId: number): Promise<UserAchievement[]> {
    return Array.from(this.userAchievements.values()).filter(userAch => 
      userAch.userId === userId
    );
  }

  async addUserAchievement(insertUserAchievement: InsertUserAchievement): Promise<UserAchievement> {
    const id = this.currentId.userAchievements++;
    const key = `${insertUserAchievement.userId}-${insertUserAchievement.achievementId}`;
    const userAchievement: UserAchievement = {
      ...insertUserAchievement,
      id,
      unlockedAt: new Date()
    };
    this.userAchievements.set(key, userAchievement);
    return userAchievement;
  }
}

export const storage = new MemStorage();
