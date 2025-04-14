import { Card, CardContent } from "@/components/ui/card";
import { Twitter, Linkedin } from "lucide-react";

const teamMembers = [
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

const About = () => {
  return (
    <div className="pt-16 bg-background">
      <div className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
              About Us
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-text-secondary">
              Learn more about our mission, vision, and the team behind our educational platform.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <Card className="bg-gray-50">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-text-primary mb-4">Our Mission</h2>
                <p className="text-text-secondary">
                  To provide accessible, high-quality education that empowers individuals to achieve their full potential and make meaningful contributions to society.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-50">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-text-primary mb-4">Our Vision</h2>
                <p className="text-text-secondary">
                  To become the leading platform for innovative education and research, fostering a global community of lifelong learners equipped to tackle the challenges of tomorrow.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Team Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-text-primary text-center mb-12">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="bg-white shadow">
                  <CardContent className="p-6 text-center">
                    <img
                      className="h-40 w-40 rounded-full mx-auto object-cover"
                      src={member.image}
                      alt={member.name}
                    />
                    <h3 className="mt-4 text-lg font-medium text-text-primary">{member.name}</h3>
                    <p className="text-accent font-medium">{member.role}</p>
                    <p className="mt-2 text-sm text-text-secondary">
                      {member.bio}
                    </p>
                    <div className="mt-4 flex justify-center space-x-3">
                      <a href="#" className="text-gray-400 hover:text-primary">
                        <Twitter size={18} />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-primary">
                        <Linkedin size={18} />
                      </a>
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

export default About;
