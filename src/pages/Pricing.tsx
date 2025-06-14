
import { Check, Star, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with focus management",
      icon: <Star className="h-6 w-6" />,
      features: [
        "Basic app blocking",
        "Simple focus sessions",
        "Daily statistics",
        "5 custom app blocks",
        "Basic scheduling",
      ],
      limitations: [
        "Limited to 3 focus sessions per day",
        "Basic analytics only",
      ],
      buttonText: "Get Started Free",
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "per month",
      description: "For serious focus enthusiasts who want more control",
      icon: <Zap className="h-6 w-6" />,
      popular: true,
      features: [
        "Unlimited app blocking",
        "Advanced focus sessions",
        "Detailed analytics & insights",
        "Unlimited custom schedules",
        "Website blocking",
        "Focus music & sounds",
        "Productivity reports",
        "Calendar integration",
      ],
      buttonText: "Start Pro Trial",
    },
    {
      name: "Premium",
      price: "$19.99",
      period: "per month",
      description: "Ultimate productivity suite for teams and power users",
      icon: <Crown className="h-6 w-6" />,
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Admin dashboard",
        "Advanced AI insights",
        "Custom integrations",
        "Priority support",
        "White-label options",
        "API access",
        "Advanced reporting",
      ],
      buttonText: "Go Premium",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="text-2xl font-bold focus-gradient-text cursor-pointer"
              onClick={() => navigate('/')}
            >
              focusEdge
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button 
                className="focus-button"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Choose Your <span className="focus-gradient-text">Focus</span> Plan
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Unlock your productivity potential with plans designed for every focus journey
          </p>
          <div className="flex items-center justify-center space-x-4 mb-12">
            <Badge variant="secondary" className="px-4 py-2">
              <Check className="h-4 w-4 mr-2" />
              30-day money-back guarantee
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Check className="h-4 w-4 mr-2" />
              Cancel anytime
            </Badge>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                plan.popular 
                  ? 'border-2 border-blue-500 shadow-xl scale-105' 
                  : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-2">
                <div className="flex items-center justify-center mb-4">
                  <div className={`p-3 rounded-full ${
                    plan.popular 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {plan.icon}
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-sm text-gray-600 mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center pb-2">
                <div className="mb-6">
                  <div className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </div>
                  <div className="text-sm text-gray-500">
                    {plan.period}
                  </div>
                </div>

                <div className="space-y-3 text-left">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations && plan.limitations.map((limitation, limitIndex) => (
                    <div key={limitIndex} className="flex items-start space-x-3 opacity-60">
                      <div className="h-5 w-5 rounded-full border-2 border-gray-300 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-500">{limitation}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'focus-button' 
                      : plan.name === 'Free'
                      ? 'bg-gray-600 hover:bg-gray-700 text-white'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                  onClick={() => navigate(plan.name === 'Free' ? '/signup' : '/signup')}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6 text-left">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-gray-600">Yes! Pro and Premium plans come with a 14-day free trial. No credit card required to start.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold mb-2">What's your refund policy?</h3>
              <p className="text-gray-600">We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, we'll refund your payment.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Focus?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who have already improved their productivity with focusEdge
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3"
            onClick={() => navigate('/signup')}
          >
            Start Your Free Trial Today
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
