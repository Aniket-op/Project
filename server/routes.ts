import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      const formData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(formData);
      res.status(201).json({
        message: "Form submitted successfully",
        submission
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.message 
        });
      } else {
        console.error("Contact form submission error:", error);
        res.status(500).json({ 
          message: "Internal server error" 
        });
      }
    }
  });

  // API routes for research articles
  app.get("/api/research/articles", async (req, res) => {
    try {
      const articles = await storage.getAllResearchArticles();
      res.json(articles);
    } catch (error) {
      console.error("Error fetching research articles:", error);
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  app.get("/api/research/articles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const article = await storage.getResearchArticle(id);
      
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      res.json(article);
    } catch (error) {
      console.error("Error fetching research article:", error);
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  // API routes for research papers
  app.get("/api/research/papers", async (req, res) => {
    try {
      const searchQuery = req.query.q as string | undefined;
      
      if (searchQuery && searchQuery.trim()) {
        const papers = await storage.searchResearchPapers(searchQuery.trim());
        return res.json(papers);
      }
      
      const papers = await storage.getAllResearchPapers();
      res.json(papers);
    } catch (error) {
      console.error("Error fetching research papers:", error);
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  app.get("/api/research/papers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const paper = await storage.getResearchPaper(id);
      
      if (!paper) {
        return res.status(404).json({ message: "Paper not found" });
      }
      
      res.json(paper);
    } catch (error) {
      console.error("Error fetching research paper:", error);
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
