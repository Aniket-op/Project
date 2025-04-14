import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { ResearchPaper } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";
import { apiRequest } from "@/lib/queryClient";
import { ArrowLeft, Calendar, Tag, Download, Share2, Bookmark } from "lucide-react";

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
    <div className="pt-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Floating action buttons */}
          <div className="fixed right-8 top-32 z-10 hidden lg:block">
            <GlassMorphism className="p-4 flex flex-col gap-4 rounded-xl" intensity="medium">
              <Button variant="ghost" size="icon" title="Share Paper">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" title="Download Paper">
                <Download className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" title="Bookmark Paper">
                <Bookmark className="h-5 w-5" />
              </Button>
            </GlassMorphism>
          </div>

          {/* Back to Research navigation */}
          <Button 
            onClick={() => setLocation("/research")} 
            variant="ghost"
            className="mb-6 hover:bg-gray-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Research
          </Button>

          {/* Paper title and metadata */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-text-primary leading-tight">{paper.title}</h1>
            <div className="flex items-center mt-4 text-text-secondary">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Last updated {formatDate(paper.lastUpdated)}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {paper.tags?.map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-primary/10 text-primary px-3 py-1 text-sm">
                <Tag className="mr-1 h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>

          <Separator className="my-6" />

          {/* Summary card */}
          <Card className="bg-white border border-gray-200 shadow-sm mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Summary</h2>
              <p className="text-text-secondary whitespace-pre-line">{paper.summary}</p>
            </CardContent>
          </Card>

          {/* Paper content */}
          <div className="prose prose-lg max-w-none bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <h2>Introduction</h2>
            <p>
              This section would contain the full content of the research paper. Currently, our schema only stores the summary, 
              but in a real-world application, this would contain the complete paper content with sections like Introduction, 
              Methodology, Results, Discussion, and Conclusion.
            </p>
            <p>
              The content would be formatted with proper headings, paragraphs, and possibly images, tables, or other data 
              visualizations relevant to the research.
            </p>

            <h2>Methodology</h2>
            <p>
              A detailed description of the research methods, processes, and techniques used in the study would be presented here.
            </p>

            <h2>Results</h2>
            <p>
              This section would present the findings and outcomes of the research, potentially including data visualizations, 
              statistics, and analysis.
            </p>

            <h2>Discussion</h2>
            <p>
              An interpretation of the results, their implications, and how they relate to existing knowledge in the field 
              would be discussed in this section.
            </p>

            <h2>Conclusion</h2>
            <p>
              A summary of the key findings, limitations of the study, and suggestions for future research would conclude 
              the paper.
            </p>

            <h2>References</h2>
            <ul>
              <li>Example Reference 1</li>
              <li>Example Reference 2</li>
              <li>Example Reference 3</li>
            </ul>
          </div>

          {/* Mobile action buttons */}
          <div className="flex justify-center gap-4 mt-8 lg:hidden">
            <Button variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" className="flex-1">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" className="flex-1">
              <Bookmark className="mr-2 h-4 w-4" />
              Bookmark
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}