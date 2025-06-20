import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserProgressSchema, insertUserVocabularySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Lessons routes
  app.get("/api/lessons", async (req, res) => {
    try {
      const lessons = await storage.getAllLessons();
      res.json(lessons);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch lessons" });
    }
  });

  app.get("/api/lessons/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const lesson = await storage.getLesson(id);
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      res.json(lesson);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch lesson" });
    }
  });

  app.get("/api/lessons/level/:level", async (req, res) => {
    try {
      const level = req.params.level;
      const lessons = await storage.getLessonsByLevel(level);
      res.json(lessons);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch lessons by level" });
    }
  });

  // Vocabulary routes
  app.get("/api/vocabulary", async (req, res) => {
    try {
      const vocabulary = await storage.getAllVocabulary();
      res.json(vocabulary);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vocabulary" });
    }
  });

  app.get("/api/vocabulary/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const vocabulary = await storage.getVocabulary(id);
      if (!vocabulary) {
        return res.status(404).json({ message: "Vocabulary not found" });
      }
      res.json(vocabulary);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vocabulary" });
    }
  });

  app.get("/api/vocabulary/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const vocabulary = await storage.getVocabularyByCategory(category);
      res.json(vocabulary);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vocabulary by category" });
    }
  });

  // User progress routes
  app.get("/api/progress/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progress = await storage.getUserProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });

  app.post("/api/progress", async (req, res) => {
    try {
      const validatedData = insertUserProgressSchema.parse(req.body);
      const progress = await storage.updateUserProgress(validatedData);
      res.json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update progress" });
    }
  });

  // User vocabulary progress routes
  app.get("/api/user-vocabulary/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const userVocabulary = await storage.getUserVocabulary(userId);
      res.json(userVocabulary);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user vocabulary" });
    }
  });

  app.post("/api/user-vocabulary", async (req, res) => {
    try {
      const validatedData = insertUserVocabularySchema.parse(req.body);
      const userVocabulary = await storage.updateUserVocabulary(validatedData);
      res.json(userVocabulary);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update user vocabulary" });
    }
  });

  // Achievements routes
  app.get("/api/achievements", async (req, res) => {
    try {
      const achievements = await storage.getAllAchievements();
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch achievements" });
    }
  });

  app.get("/api/user-achievements/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const userAchievements = await storage.getUserAchievements(userId);
      res.json(userAchievements);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user achievements" });
    }
  });

  // Statistics route
  app.get("/api/stats/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const [progress, userVocabulary, userAchievements] = await Promise.all([
        storage.getUserProgress(userId),
        storage.getUserVocabulary(userId),
        storage.getUserAchievements(userId)
      ]);

      const completedLessons = progress.filter(p => p.completed).length;
      const totalVocabulary = userVocabulary.length;
      const masteredVocabulary = userVocabulary.filter(v => v.mastered).length;
      const totalAchievements = userAchievements.length;

      const stats = {
        completedLessons,
        totalVocabulary,
        masteredVocabulary,
        totalAchievements,
        streakDays: 15, // This would be calculated from actual usage data
        averageScore: progress.length > 0 ? 
          Math.round(progress.reduce((sum, p) => sum + p.score, 0) / progress.length) : 0
      };

      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
