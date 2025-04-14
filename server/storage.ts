import { 
  users, 
  type User, 
  type InsertUser,
  contactSubmissions,
  type ContactSubmission,
  type InsertContactSubmission,
  researchArticles,
  type ResearchArticle,
  type InsertResearchArticle,
  researchPapers,
  type ResearchPaper,
  type InsertResearchPaper
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact submissions methods
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  
  // Research articles methods
  getAllResearchArticles(): Promise<ResearchArticle[]>;
  getResearchArticle(id: number): Promise<ResearchArticle | undefined>;
  createResearchArticle(article: InsertResearchArticle): Promise<ResearchArticle>;
  
  // Research papers methods
  getAllResearchPapers(): Promise<ResearchPaper[]>;
  searchResearchPapers(query: string): Promise<ResearchPaper[]>;
  getResearchPaper(id: number): Promise<ResearchPaper | undefined>;
  createResearchPaper(paper: InsertResearchPaper): Promise<ResearchPaper>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private researchArticles: Map<number, ResearchArticle>;
  private researchPapers: Map<number, ResearchPaper>;
  
  currentUserId: number;
  currentContactSubmissionId: number;
  currentResearchArticleId: number;
  currentResearchPaperId: number;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.researchArticles = new Map();
    this.researchPapers = new Map();
    
    this.currentUserId = 1;
    this.currentContactSubmissionId = 1;
    this.currentResearchArticleId = 1;
    this.currentResearchPaperId = 1;
    
    // Initialize with sample research articles and papers
    this.initializeData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Contact submissions methods
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentContactSubmissionId++;
    const contactSubmission: ContactSubmission = { 
      ...submission, 
      id, 
      createdAt: new Date()
    };
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }
  
  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }
  
  // Research articles methods
  async getAllResearchArticles(): Promise<ResearchArticle[]> {
    return Array.from(this.researchArticles.values());
  }
  
  async getResearchArticle(id: number): Promise<ResearchArticle | undefined> {
    return this.researchArticles.get(id);
  }
  
  async createResearchArticle(article: InsertResearchArticle): Promise<ResearchArticle> {
    const id = this.currentResearchArticleId++;
    const researchArticle: ResearchArticle = { ...article, id };
    this.researchArticles.set(id, researchArticle);
    return researchArticle;
  }
  
  // Research papers methods
  async getAllResearchPapers(): Promise<ResearchPaper[]> {
    return Array.from(this.researchPapers.values());
  }
  
  async searchResearchPapers(query: string): Promise<ResearchPaper[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.researchPapers.values()).filter(paper => 
      paper.title.toLowerCase().includes(lowerQuery) || 
      paper.summary.toLowerCase().includes(lowerQuery) ||
      paper.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }
  
  async getResearchPaper(id: number): Promise<ResearchPaper | undefined> {
    return this.researchPapers.get(id);
  }
  
  async createResearchPaper(paper: InsertResearchPaper): Promise<ResearchPaper> {
    const id = this.currentResearchPaperId++;
    const researchPaper: ResearchPaper = { ...paper, id };
    this.researchPapers.set(id, researchPaper);
    return researchPaper;
  }
  
  // Initialize with sample data for research articles and papers
  private initializeData() {
    // Sample research articles
    const articles: InsertResearchArticle[] = [
      {
        title: "The Impact of Digital Learning on Knowledge Retention",
        category: "Cognitive Science",
        summary: "An exploration of how digital learning environments affect long-term knowledge retention compared to traditional methods.",
        content: "Long-form content about digital learning and knowledge retention...",
        authorName: "Prof. Michael Chen",
        authorTitle: "Research Analyst",
        publishedDate: new Date("2023-06-12"),
        imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Adaptive Learning Systems: A Comprehensive Review",
        category: "Educational Technology",
        summary: "This paper examines the effectiveness of adaptive learning technologies and their impact on student outcomes.",
        content: "Long-form content about adaptive learning systems...",
        authorName: "Dr. Emily Rodriguez",
        authorTitle: "Head of Research",
        publishedDate: new Date("2023-05-08"),
        imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Neuroplasticity and Learning: New Perspectives",
        category: "Neuroscience",
        summary: "Recent discoveries in neuroplasticity and their implications for educational approaches and learning methodologies.",
        content: "Long-form content about neuroplasticity and learning...",
        authorName: "Dr. David Wilson",
        authorTitle: "Founder & CEO",
        publishedDate: new Date("2023-04-22"),
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ];
    
    // Add research articles
    articles.forEach(article => {
      this.createResearchArticle(article);
    });
    
    // Sample research papers
    const papers: InsertResearchPaper[] = [
      {
        title: "The Role of AI in Personalized Learning Experiences",
        summary: "A preliminary analysis of how artificial intelligence can enhance personalized learning paths based on individual student needs.",
        tags: ["AI", "Personalization", "EdTech"],
        lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      },
      {
        title: "Interactive Visualization Tools for Complex Concepts",
        summary: "Exploring how interactive visualizations can help students understand complex scientific and mathematical concepts.",
        tags: ["Visualization", "STEM", "Learning Tools"],
        lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 1 week ago
      },
      {
        title: "Mindfulness Practices in Education: Current Evidence",
        summary: "Examining the growing body of evidence supporting the integration of mindfulness practices in educational settings.",
        tags: ["Mindfulness", "Mental Health", "Pedagogy"],
        lastUpdated: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) // 2 weeks ago
      }
    ];
    
    // Add research papers
    papers.forEach(paper => {
      this.createResearchPaper(paper);
    });
  }
}

export const storage = new MemStorage();
