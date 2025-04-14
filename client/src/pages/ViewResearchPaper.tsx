import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { ResearchPaper } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";
import { apiRequest } from "@/lib/queryClient";
import { ArrowLeft, Calendar, Tag, Download, Share2, Bookmark, FileText } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GlassMorphism } from "@/components/ui/GlassMorphism";

export default function ViewResearchPaper() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute<{ id: string }>("/research/paper/:id");
  
  // Format the date in a human-readable format
  const formatDate = (date: Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const { data: paper, isLoading, isError } = useQuery<ResearchPaper>({
    queryKey: ["/api/research/papers", params?.id],
    queryFn: async () => {
      if (!params?.id) throw new Error("Paper ID is required");
      const res = await apiRequest("GET", `/api/research/papers/${params.id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch paper");
      }
      return res.json();
    },
    enabled: !!params?.id,
  });

  if (!match) {
    return (
      <div className="pt-20 min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold text-text-primary">Paper not found</h1>
          <p className="text-text-secondary mt-2">
            The paper you're looking for doesn't exist or has been removed.
          </p>
          <Button 
            onClick={() => setLocation("/research")} 
            className="mt-4"
            variant="outline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Research
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="h-32 w-full mb-6" />
            <div className="flex flex-wrap gap-2 mb-8">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-6 w-16 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !paper) {
    return (
      <div className="pt-20 min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold text-text-primary">Error loading paper</h1>
          <p className="text-text-secondary mt-2">
            There was a problem loading this research paper. Please try again later.
          </p>
          <Button 
            onClick={() => setLocation("/research")} 
            className="mt-4"
            variant="outline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Research
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Floating action buttons */}
          <div className="fixed right-8 top-32 z-10 hidden lg:block">
            <GlassMorphism className="p-4 flex flex-col gap-4 rounded-xl shadow-lg" intensity="medium">
              <Button variant="ghost" size="icon" title="Share Paper" className="hover:bg-primary/10">
                <Share2 className="h-5 w-5 text-primary" />
              </Button>
              <Button variant="ghost" size="icon" title="Download Paper" className="hover:bg-primary/10">
                <Download className="h-5 w-5 text-primary" />
              </Button>
              <Button variant="ghost" size="icon" title="Bookmark Paper" className="hover:bg-primary/10">
                <Bookmark className="h-5 w-5 text-primary" />
              </Button>
            </GlassMorphism>
          </div>

          {/* Navigation and paper header */}
          <div className="mb-10">
            {/* Back to Research navigation */}
            <Button 
              onClick={() => setLocation("/research")} 
              variant="ghost"
              className="mb-6 hover:bg-gray-100 group transition-all"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Research
            </Button>

            {/* Paper title and metadata */}
            <div className="relative">
              {/* Decorative elements */}
              <div className="hidden md:block absolute -top-6 -left-8 w-20 h-20 bg-primary/5 rounded-full"></div>
              
              <div className="relative">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{paper.title}</h1>
                <div className="flex items-center mt-4 text-gray-600">
                  <div className="bg-primary/10 p-1.5 rounded-full mr-2">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <span>Last updated {formatDate(paper.lastUpdated)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {paper.tags?.map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="bg-primary/10 text-primary px-3 py-1.5 text-sm rounded-full shadow-sm hover:shadow-md transition-shadow"
              >
                <Tag className="mr-1.5 h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>

          <Separator className="my-8 bg-gray-200" />

          {/* Summary card */}
          <GlassMorphism intensity="light" className="rounded-xl overflow-hidden shadow-lg border border-gray-100 mb-10">
            <div className="p-6 md:p-8">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-2 rounded-lg mr-3">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Summary</h2>
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{paper.summary}</p>
            </div>
          </GlassMorphism>

          {/* Paper content */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="hidden md:block absolute -top-4 -right-8 w-16 h-16 bg-primary/5 rounded-full"></div>
            
            <div className="relative prose prose-lg max-w-none bg-white p-6 md:p-10 rounded-xl border border-gray-200 shadow-lg">
              <h2 className="text-gray-800 font-bold">Introduction</h2>
              <p className="text-gray-700">
                This section would contain the full content of the research paper. Currently, our schema only stores the summary, 
                but in a real-world application, this would contain the complete paper content with sections like Introduction, 
                Methodology, Results, Discussion, and Conclusion.
              </p>
              <p className="text-gray-700">
                The content would be formatted with proper headings, paragraphs, and possibly images, tables, or other data 
                visualizations relevant to the research.
              </p>

              <h2 className="text-gray-800 font-bold mt-8">Methodology</h2>
              <p className="text-gray-700">
                A detailed description of the research methods, processes, and techniques used in the study would be presented here.
              </p>

              <h2 className="text-gray-800 font-bold mt-8">Results</h2>
              <p className="text-gray-700">
                This section would present the findings and outcomes of the research, potentially including data visualizations, 
                statistics, and analysis.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 my-6">
                <p className="text-gray-600 text-sm italic">
                  Note: The data shown in this paper is for demonstration purposes. In a real application, this would contain actual research content.
                </p>
              </div>

              <h2 className="text-gray-800 font-bold mt-8">Discussion</h2>
              <p className="text-gray-700">
                An interpretation of the results, their implications, and how they relate to existing knowledge in the field 
                would be discussed in this section.
              </p>

              <h2 className="text-gray-800 font-bold mt-8">Conclusion</h2>
              <p className="text-gray-700">
                A summary of the key findings, limitations of the study, and suggestions for future research would conclude 
                the paper.
              </p>

              <h2 className="text-gray-800 font-bold mt-8">References</h2>
              <ul className="text-gray-700 space-y-2">
                <li>Example Reference 1</li>
                <li>Example Reference 2</li>
                <li>Example Reference 3</li>
              </ul>
            </div>
          </div>

          {/* Mobile action buttons */}
          <div className="flex justify-center gap-4 mt-8 lg:hidden">
            <Button variant="outline" className="flex-1 border-gray-300 hover:bg-primary/5 hover:border-primary/80 transition-colors">
              <Download className="mr-2 h-4 w-4 text-primary" />
              Download
            </Button>
            <Button variant="outline" className="flex-1 border-gray-300 hover:bg-primary/5 hover:border-primary/80 transition-colors">
              <Share2 className="mr-2 h-4 w-4 text-primary" />
              Share
            </Button>
            <Button variant="outline" className="flex-1 border-gray-300 hover:bg-primary/5 hover:border-primary/80 transition-colors">
              <Bookmark className="mr-2 h-4 w-4 text-primary" />
              Bookmark
            </Button>
          </div>
          
          {/* Footer section */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm">
              If you found this research paper helpful, consider sharing it with your colleagues or citing it in your work.
            </p>
            <Button 
              variant="link" 
              onClick={() => setLocation("/submit-research")}
              className="mt-2 text-primary hover:text-primary/80" 
            >
              Submit your own research paper
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}