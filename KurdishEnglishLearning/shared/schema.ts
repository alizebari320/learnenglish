import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleKu: text("title_ku").notNull(),
  description: text("description").notNull(),
  descriptionKu: text("description_ku").notNull(),
  level: text("level").notNull(), // "beginner", "intermediate", "advanced"
  category: text("category").notNull(), // "grammar", "vocabulary", "conversation"
  content: jsonb("content").notNull(), // lesson content structure
  order: integer("order").notNull(),
  isActive: boolean("is_active").default(true),
});

export const vocabulary = pgTable("vocabulary", {
  id: serial("id").primaryKey(),
  english: text("english").notNull(),
  kurdish: text("kurdish").notNull(),
  pronunciation: text("pronunciation").notNull(),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(), // "easy", "medium", "hard"
  imageUrl: text("image_url"),
  audioUrl: text("audio_url"),
  example: text("example"),
  exampleKu: text("example_ku"),
  isActive: boolean("is_active").default(true),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  lessonId: integer("lesson_id").notNull(),
  completed: boolean("completed").default(false),
  score: integer("score").default(0),
  completedAt: timestamp("completed_at"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userVocabulary = pgTable("user_vocabulary", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  vocabularyId: integer("vocabulary_id").notNull(),
  mastered: boolean("mastered").default(false),
  correctCount: integer("correct_count").default(0),
  incorrectCount: integer("incorrect_count").default(0),
  lastReviewed: timestamp("last_reviewed"),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameKu: text("name_ku").notNull(),
  description: text("description").notNull(),
  descriptionKu: text("description_ku").notNull(),
  icon: text("icon").notNull(),
  requirement: jsonb("requirement").notNull(), // achievement criteria
  isActive: boolean("is_active").default(true),
});

export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  achievementId: integer("achievement_id").notNull(),
  unlockedAt: timestamp("unlocked_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertLessonSchema = createInsertSchema(lessons).omit({ id: true });
export const insertVocabularySchema = createInsertSchema(vocabulary).omit({ id: true });
export const insertUserProgressSchema = createInsertSchema(userProgress).omit({ id: true, updatedAt: true });
export const insertUserVocabularySchema = createInsertSchema(userVocabulary).omit({ id: true });
export const insertAchievementSchema = createInsertSchema(achievements).omit({ id: true });
export const insertUserAchievementSchema = createInsertSchema(userAchievements).omit({ id: true, unlockedAt: true });

// Types
export type User = typeof users.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
export type Vocabulary = typeof vocabulary.$inferSelect;
export type UserProgress = typeof userProgress.$inferSelect;
export type UserVocabulary = typeof userVocabulary.$inferSelect;
export type Achievement = typeof achievements.$inferSelect;
export type UserAchievement = typeof userAchievements.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type InsertVocabulary = z.infer<typeof insertVocabularySchema>;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type InsertUserVocabulary = z.infer<typeof insertUserVocabularySchema>;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type InsertUserAchievement = z.infer<typeof insertUserAchievementSchema>;
