import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const pricingPlans = [
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
    buttonVariant: "outline" as const
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
    buttonVariant: "default" as const
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
    buttonVariant: "outline" as const
  }
];

const faqs = [
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

const Courses = () => {
  return (
    <div className="pt-16 bg-background">
      <div className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
              Our Courses
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-text-secondary">
              Choose the right plan that fits your learning needs and goals.
            </p>
          </div>

          {/* Pricing Plans */}
          <div className="mt-12 space-y-12 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`rounded-lg shadow-lg overflow-hidden ${
                  plan.isPopular ? "border-2 border-primary relative" : "border border-gray-200"
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 -mr-6 -mt-6 w-40 h-40 overflow-hidden">
                    <div className="absolute transform rotate-45 bg-accent text-white text-xs font-semibold py-1 right-[-30px] top-[32px] w-[170px] text-center">
                      Popular
                    </div>
                  </div>
                )}
                <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-text-primary">{plan.name}</h3>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-4xl font-extrabold text-primary">{plan.price}</span>
                      <span className="ml-1 text-xl font-medium text-text-secondary">{plan.period}</span>
                    </div>
                    <p className="mt-5 text-lg text-text-secondary">{plan.description}</p>
                  </div>
                </div>
                <div className="px-6 pt-6 pb-8 bg-gray-50 sm:p-10">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="flex-shrink-0">
                          <Check className="text-primary h-5 w-5" />
                        </div>
                        <p className="ml-3 text-sm text-text-secondary">{feature}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button 
                      className="w-full" 
                      variant={plan.buttonVariant}
                    >
                      {plan.buttonText}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mt-20">
            <h2 className="text-3xl font-bold text-text-primary text-center mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="bg-white shadow">
                  <CardContent className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-text-primary">{faq.question}</h3>
                    <div className="mt-2 text-text-secondary">
                      <p>{faq.answer}</p>
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

export default Courses;
