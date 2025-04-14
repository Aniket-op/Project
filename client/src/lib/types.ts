// Common types used across components

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Testimonial {
  content: string;
  authorImage: string;
  authorName: string;
  authorRole: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular: boolean;
  buttonText: string;
  buttonVariant: "default" | "outline" | "secondary";
}

export interface FAQ {
  question: string;
  answer: string;
}
