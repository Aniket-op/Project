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
import { FilePlus, FileText, Upload, Plus, X } from "lucide-react";
import { GlassMorphism } from "@/components/ui/GlassMorphism";

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
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Hero section */}
          <div className="mb-12 text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <FilePlus className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Submit Your Research</h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Share your knowledge with the academic community and contribute to our endless paper collection.
            </p>
          </div>

          {/* Main card with glass effect */}
          <div className="relative mb-12">
            {/* Decorative elements */}
            <div className="hidden md:block absolute -top-4 -left-8 w-16 h-16 bg-primary/10 rounded-full"></div>
            <div className="hidden md:block absolute -bottom-6 -right-6 w-24 h-24 bg-primary/5 rounded-full"></div>
            
            <GlassMorphism intensity="light" className="rounded-xl overflow-hidden shadow-xl border border-gray-100">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Research Paper Details</h2>
                    <p className="text-gray-600 text-sm">All fields are required unless marked optional</p>
                  </div>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 gap-8">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-800 font-medium">Paper Title</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter a clear, descriptive title" 
                                className="bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/30" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription className="text-gray-500 text-sm">
                              Choose a title that accurately represents your research (5-100 characters).
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
                            <FormLabel className="text-gray-800 font-medium">Summary</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Provide a concise overview of your research findings and methodology"
                                className="min-h-40 bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/30"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-gray-500 text-sm">
                              Write a brief summary that helps others understand your research (20-500 characters).
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
                            <FormLabel className="text-gray-800 font-medium">Tags</FormLabel>
                            <FormControl>
                              <div className="space-y-3">
                                <div className="relative">
                                  <Input
                                    placeholder="Type a tag and press Enter (e.g., AI, Education, Psychology)"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleAddTag}
                                    className="bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/30 pr-10"
                                  />
                                  {tagInput && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const currentTags = form.getValues("tags") || [];
                                        if (!currentTags.includes(tagInput.trim())) {
                                          form.setValue("tags", [...currentTags, tagInput.trim()]);
                                          setTagInput("");
                                        }
                                      }}
                                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
                                    >
                                      <Plus className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                                
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {(form.watch("tags") || []).length === 0 ? (
                                    <div className="text-gray-400 text-sm italic">No tags added yet</div>
                                  ) : (
                                    form.watch("tags")?.map((tag, index) => (
                                      <div
                                        key={index}
                                        className="bg-primary/10 text-primary px-3 py-1.5 rounded-full flex items-center text-sm shadow-sm"
                                      >
                                        {tag}
                                        <button
                                          type="button"
                                          onClick={() => removeTag(tag)}
                                          className="ml-2 text-primary/70 hover:text-primary focus:outline-none"
                                        >
                                          <X className="h-3 w-3" />
                                        </button>
                                      </div>
                                    ))
                                  )}
                                </div>
                              </div>
                            </FormControl>
                            <FormDescription className="text-gray-500 text-sm">
                              Add relevant tags to help others discover your research. Add at least one tag.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex flex-col sm:flex-row-reverse sm:justify-between sm:items-center gap-3">
                        <Button 
                          type="submit" 
                          disabled={isPending}
                          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white"
                        >
                          {isPending ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Submitting...
                            </span>
                          ) : (
                            <span className="flex items-center justify-center">
                              <Upload className="mr-2 h-4 w-4" />
                              Submit Paper
                            </span>
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setLocation("/research")}
                          className="w-full sm:w-auto border-gray-300 text-gray-700"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
            </GlassMorphism>
          </div>

          <div className="text-center text-gray-500 text-sm">
            <p>Once submitted, your research paper will be available in our endless paper collection.</p>
            <p className="mt-1">All submissions are subject to review before being made public.</p>
          </div>
        </div>
      </div>
    </div>
  );
}