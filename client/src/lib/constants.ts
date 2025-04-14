import { Feature, Testimonial, TeamMember, PricingPlan, FAQ } from "./types";
import { GraduationCap, Flask, Users } from "lucide-react";

export const FEATURES: Feature[] = [
  {
    icon: <GraduationCap className="text-primary text-xl" />,
    title: "Expert-Led Courses",
    description:
      "Learn from industry professionals and academic experts with years of experience.",
  },
  {
    icon: <Flask className="text-primary text-xl" />,
    title: "Cutting-Edge Research",
    description:
      "Access the latest findings and developments in various fields of study.",
  },
  {
    icon: <Users className="text-primary text-xl" />,
    title: "Supportive Community",
    description:
      "Connect with fellow learners and build a network of like-minded individuals.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    content:
      "The courses offered here have transformed my career path. The instructors are knowledgeable and the content is always up-to-date with industry standards.",
    authorImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    authorName: "Sarah Johnson",
    authorRole: "Software Developer",
  },
  {
    content:
      "I've been able to apply the research findings directly to my work. The platform makes complex topics accessible and engaging.",
    authorImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    authorName: "Michael Chen",
    authorRole: "Research Analyst",
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "David Wilson",
    role: "Founder & CEO",
    bio: "Former professor with 15+ years of experience in education technology.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Research",
    bio: "PhD in Cognitive Science with extensive research background.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "James Taylor",
    role: "Lead Course Developer",
    bio: "Curriculum design expert with background in educational psychology.",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Sophia Kim",
    role: "Technology Director",
    bio: "Former tech lead at a major learning platform with expertise in EdTech.",
    image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Basic Plan",
    price: "$29",
    period: "/month",
    description: "For those just getting started with their educational journey.",
    features: [
      "Access to basic courses",
      "Community forum access",
      "Email support"
    ],
    isPopular: false,
    buttonText: "Get Started",
    buttonVariant: "outline"
  },
  {
    name: "Pro Plan",
    price: "$79",
    period: "/month",
    description: "Our most popular plan, perfect for dedicated learners.",
    features: [
      "All basic features",
      "Access to all courses",
      "Priority support",
      "Monthly webinars"
    ],
    isPopular: true,
    buttonText: "Get Started",
    buttonVariant: "default"
  },
  {
    name: "Enterprise Plan",
    price: "$199",
    period: "/month",
    description: "For organizations and serious learners needing advanced features.",
    features: [
      "All Pro features",
      "Advanced analytics",
      "Dedicated account manager",
      "Custom course development"
    ],
    isPopular: false,
    buttonText: "Contact Sales",
    buttonVariant: "outline"
  }
];

export const FAQS: FAQ[] = [
  {
    question: "How do I access my courses after purchasing?",
    answer: "After your purchase is complete, you'll receive an email with login instructions. You can access all your courses from your account dashboard after logging in."
  },
  {
    question: "Can I switch between plans?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to the new features. When downgrading, the changes will take effect at the start of your next billing cycle."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 14-day money-back guarantee on all our plans. If you're not satisfied with your purchase, you can request a full refund within 14 days of your initial purchase."
  }
];
