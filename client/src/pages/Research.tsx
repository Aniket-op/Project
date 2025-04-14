import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Search, Plus, FileText, ExternalLink } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";
import { ResearchArticle, ResearchPaper } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";
import { GlassMorphism } from "@/components/ui/GlassMorphism";

const Research = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [, navigate] = useLocation();

  // Fetch research articles
  const { data: articles, isLoading: articlesLoading } = useQuery<ResearchArticle[]>({
    queryKey: ["/api/research/articles"],
  });

  // Fetch research papers with search functionality
  const { data: papers, isLoading: papersLoading } = useQuery<ResearchPaper[]>({
    queryKey: ["/api/research/papers", searchTerm],
    queryFn: async () => {
      const url = searchTerm 
        ? `/api/research/papers?q=${encodeURIComponent(searchTerm)}`
        : "/api/research/papers";
      const res = await apiRequest("GET", url);
      return res.json();
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchQuery);
  };

  // Format the date in a human-readable format
  const formatDate = (date: Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return (
    <div className="pt-16 bg-background">
      <div className="bg-gradient-to-b from-white to-gray-50 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with action buttons */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h1 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
                Research
              </h1>
              <p className="mt-4 max-w-2xl text-xl text-text-secondary">
                Explore our latest research findings and knowledge articles.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => navigate("/submit-research")}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Submit Paper
              </Button>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                View All Papers
              </Button>
            </div>
          </div>

          {/* Featured Research Articles */}
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articlesLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                  <div className="w-full h-48 bg-gray-200 animate-pulse" />
                  <CardContent className="p-6">
                    <div className="h-4 w-16 bg-gray-200 animate-pulse mb-2" />
                    <div className="h-6 w-full bg-gray-200 animate-pulse mb-4" />
                    <div className="h-16 w-full bg-gray-200 animate-pulse mb-4" />
                    <div className="flex items-center mt-4">
                      <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
                      <div className="ml-3">
                        <div className="h-4 w-24 bg-gray-200 animate-pulse mb-1" />
                        <div className="h-3 w-32 bg-gray-200 animate-pulse" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              articles?.map((article, index) => (
                <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 overflow-hidden">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105" 
                  />
                  <CardContent className="p-6">
                    <span className="text-xs font-semibold text-accent uppercase tracking-wide">
                      {article.category}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold text-text-primary">
                      {article.title}
                    </h3>
                    <p className="mt-3 text-text-secondary">
                      {article.summary}
                    </p>
                    <div className="mt-4 flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          {article.authorName.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-text-primary">
                          {article.authorName}
                        </p>
                        <p className="text-sm text-text-secondary">
                          Published: {new Date(article.publishedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button 
                        variant="link" 
                        className="p-0 text-primary font-medium hover:text-primary/80"
                      >
                        Read full article <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Endless Paper Section */}
          <div className="mt-20 bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-text-primary">Endless Paper</h2>
                <p className="mt-2 text-text-secondary">A collection of our ongoing research notes and ideas.</p>
              </div>
              <div className="mt-4 md:mt-0">
                <form onSubmit={handleSearch} className="relative">
                  <GlassMorphism className="rounded-full" intensity="light">
                    <Input
                      type="text"
                      placeholder="Search papers..."
                      className="w-full md:w-64 pr-9 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button 
                      type="submit" 
                      variant="ghost" 
                      size="icon" 
                      className="absolute inset-y-0 right-0"
                    >
                      <Search className="h-4 w-4 text-gray-400" />
                    </Button>
                  </GlassMorphism>
                </form>
              </div>
            </div>

            <div className="space-y-6">
              {papersLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-start">
                      <div className="flex-1">
                        <div className="h-5 w-2/3 bg-gray-200 animate-pulse mb-3" />
                        <div className="h-16 w-full bg-gray-200 animate-pulse mb-4" />
                        <div className="flex flex-wrap gap-2">
                          <div className="h-6 w-16 bg-gray-200 animate-pulse rounded-full" />
                          <div className="h-6 w-24 bg-gray-200 animate-pulse rounded-full" />
                          <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-full" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="h-4 w-32 bg-gray-200 animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))
              ) : papers?.length === 0 ? (
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                  <p className="text-gray-500">No research papers found.</p>
                </div>
              ) : (
                papers?.map((paper, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 cursor-pointer"
                    onClick={() => navigate(`/research/paper/${paper.id}`)}
                  >
                    <div className="flex items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-text-primary group-hover:text-primary">
                          {paper.title}
                          <ExternalLink className="ml-2 h-4 w-4 inline-block opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h3>
                        <p className="mt-2 text-text-secondary">
                          {paper.summary}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {paper.tags?.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="bg-primary/10 text-primary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="ml-4">
                        <span className="text-sm text-text-secondary">
                          Last updated: {formatDate(paper.lastUpdated)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-8 text-center">
              <Button 
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5"
              >
                Load More Papers
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;
