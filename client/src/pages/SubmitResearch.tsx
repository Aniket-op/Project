import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { insertResearchPaperSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

// UI Components
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FilePlus, FileText, Upload } from "lucide-react";

// Extended schema with validation rules
const formSchema = insertResearchPaperSchema.extend({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title cannot exceed 100 characters"),
  summary: z.string().min(20, "Summary must be at least 20 characters").max(500, "Summary cannot exceed 500 characters"),
  tags: z.array(z.string()).min(1, "Add at least one tag"),
});

type FormValues = z.infer<typeof formSchema>;

export default function SubmitResearch() {
  const [tagInput, setTagInput] = useState("");
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      summary: "",
      tags: [],
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await apiRequest("POST", "/api/research/papers", data);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit research paper");
      }
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch research papers
      queryClient.invalidateQueries({ queryKey: ["/api/research/papers"] });
      toast({
        title: "Success!",
        description: "Your research paper has been submitted.",
      });
      setLocation("/research");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const currentTags = form.getValues("tags") || [];
      if (!currentTags.includes(tagInput.trim())) {
        form.setValue("tags", [...currentTags, tagInput.trim()]);
        setTagInput("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags") || [];
    form.setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove)
    );
  };

  return (
    <div className="pt-20 bg-background min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-10">
            <div className="bg-primary/10 p-4 rounded-full mr-4">
              <FilePlus className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Submit Research Paper</h1>
              <p className="text-text-secondary mt-1">Share your knowledge with the community</p>
            </div>
          </div>

          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Research Paper Details</CardTitle>
              <CardDescription>
                Fill out the form below to submit your research paper to our endless paper collection.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Paper Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter the title of your research paper" 
                            className="bg-white" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Choose a clear and descriptive title for your research paper.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Summary</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write a brief summary of your research paper"
                            className="min-h-32 bg-white"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          A concise overview of your research findings and methodology.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Input
                              placeholder="Add tags and press Enter (e.g., AI, Education, Psychology)"
                              value={tagInput}
                              onChange={(e) => setTagInput(e.target.value)}
                              onKeyDown={handleAddTag}
                              className="bg-white"
                            />
                            <div className="flex flex-wrap gap-2 mt-2">
                              {form.watch("tags")?.map((tag, index) => (
                                <div
                                  key={index}
                                  className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center text-sm"
                                >
                                  {tag}
                                  <button
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    className="ml-2 text-primary/70 hover:text-primary"
                                  >
                                    &times;
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Add relevant tags to help others find your research paper.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setLocation("/research")}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isPending}
                      className="bg-primary hover:bg-primary/90 text-white"
                    >
                      {isPending ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Upload className="mr-2 h-4 w-4" />
                          Submit Paper
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}