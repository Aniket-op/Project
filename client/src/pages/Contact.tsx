import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

// Extend the schema to add validation
const contactFormSchema = insertContactSubmissionSchema.extend({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your message has been sent successfully.",
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
      console.error("Contact form error:", error);
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    mutate(data);
  };

  return (
    <div className="pt-16 bg-background">
      <div className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
              Contact Us
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-text-secondary">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gray-50 shadow-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 sm:p-8 bg-primary text-white">
                  <h3 className="text-lg font-medium">Contact Information</h3>
                  <p className="mt-2">Fill out the form and our team will get back to you within 24 hours.</p>
                  
                  <div className="mt-8 space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <MapPin className="h-5 w-5 text-white/80" />
                      </div>
                      <div className="ml-3 text-white/80">
                        <p>123 Education Avenue</p>
                        <p>San Francisco, CA 94103</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Mail className="h-5 w-5 text-white/80" />
                      </div>
                      <div className="ml-3">
                        <a href="mailto:info@eduplatform.com" className="text-white/80 hover:text-white">
                          info@eduplatform.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Phone className="h-5 w-5 text-white/80" />
                      </div>
                      <div className="ml-3">
                        <a href="tel:+14155552671" className="text-white/80 hover:text-white">
                          +1 (415) 555-2671
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-12">
                    <div className="flex space-x-4">
                      <a href="#" className="text-white/80 hover:text-white">
                        <Twitter size={20} />
                      </a>
                      <a href="#" className="text-white/80 hover:text-white">
                        <Facebook size={20} />
                      </a>
                      <a href="#" className="text-white/80 hover:text-white">
                        <Instagram size={20} />
                      </a>
                      <a href="#" className="text-white/80 hover:text-white">
                        <Linkedin size={20} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName">First name</Label>
                        <Input 
                          id="firstName" 
                          {...form.register("firstName")} 
                          className="mt-1"
                        />
                        {form.formState.errors.firstName && (
                          <p className="text-sm text-red-500 mt-1">
                            {form.formState.errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last name</Label>
                        <Input 
                          id="lastName" 
                          {...form.register("lastName")} 
                          className="mt-1"
                        />
                        {form.formState.errors.lastName && (
                          <p className="text-sm text-red-500 mt-1">
                            {form.formState.errors.lastName.message}
                          </p>
                        )}
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          {...form.register("email")} 
                          className="mt-1"
                        />
                        {form.formState.errors.email && (
                          <p className="text-sm text-red-500 mt-1">
                            {form.formState.errors.email.message}
                          </p>
                        )}
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input 
                          id="subject" 
                          {...form.register("subject")} 
                          className="mt-1"
                        />
                        {form.formState.errors.subject && (
                          <p className="text-sm text-red-500 mt-1">
                            {form.formState.errors.subject.message}
                          </p>
                        )}
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea 
                          id="message" 
                          rows={4} 
                          {...form.register("message")} 
                          className="mt-1"
                        />
                        {form.formState.errors.message && (
                          <p className="text-sm text-red-500 mt-1">
                            {form.formState.errors.message.message}
                          </p>
                        )}
                      </div>
                      <div className="sm:col-span-2">
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={isPending}
                        >
                          {isPending ? "Sending..." : "Send Message"}
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </Card>
          </div>

          {/* Map Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <Card className="bg-white shadow-md overflow-hidden">
              <CardContent className="p-1 bg-gray-100">
                <div className="h-96 bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-10 w-10 text-gray-400 mb-4 mx-auto" />
                    <p className="text-gray-500">Interactive Map Would Appear Here</p>
                    <p className="text-gray-400 text-sm mt-2">
                      (Would be implemented with Google Maps or similar service)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
