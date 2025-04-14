import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, FlaskRound, Users, Star } from "lucide-react";

const features = [
  {
    icon: <GraduationCap className="text-primary text-xl" />,
    title: "Expert-Led Courses",
    description:
      "Learn from industry professionals and academic experts with years of experience.",
  },
  {
    icon: <FlaskRound className="text-primary text-xl" />,
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

const testimonials = [
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

const Home = () => {
  return (
    <div className="pt-16 bg-background">
      {/* Hero Section */}
      <div className="relative bg-gray-50">
        <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl md:text-6xl">
                <span className="block">Learn and Grow with</span>
                <span className="block text-primary">World-Class Education</span>
              </h1>
              <p className="mt-6 text-base text-text-secondary sm:text-lg md:text-xl max-w-3xl">
                Access high-quality courses, groundbreaking research, and a
                supportive community designed to help you achieve your goals.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/courses">Explore Courses</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/research">View Research</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-64 sm:h-72 md:h-96 overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Students collaborating in a modern environment"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl">
              Why Choose Our Platform
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-text-secondary">
              We offer a unique approach to education that combines expert
              knowledge with practical application.
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="bg-gray-50">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-primary/10 rounded-md p-3">
                        {feature.icon}
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <h3 className="text-lg font-medium text-text-primary">
                          {feature.title}
                        </h3>
                        <p className="mt-2 text-sm text-text-secondary">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl">
              What Our Students Say
            </h2>
          </div>
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="text-primary flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-text-secondary">{testimonial.content}</p>
                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={testimonial.authorImage}
                          alt={testimonial.authorName}
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-text-primary">
                          {testimonial.authorName}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {testimonial.authorRole}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
