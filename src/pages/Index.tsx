
import { useState, useEffect } from "react";
import { Shield, Lock, Smartphone, Clock, Bell, Zap, Users, BarChart3, Star, Check, ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Lock,
      title: "Smart App & Website Blocking",
      description: "Block distracting apps and websites with intelligent scheduling and custom categories."
    },
    {
      icon: Clock,
      title: "Scheduled Focus Sessions",
      description: "Set up recurring blocking sessions with flexible timing and holiday exceptions."
    },
    {
      icon: Bell,
      title: "Notification-Based Unlocking",
      description: "Apps unlock automatically when important notifications arrive, keeping you connected when needed."
    },
    {
      icon: Smartphone,
      title: "Cross-Device Sync",
      description: "Your focus settings sync across all your devices for consistent productivity."
    },
    {
      icon: Zap,
      title: "Strict Mode",
      description: "Optional strict locking that prevents tampering during focus sessions."
    },
    {
      icon: BarChart3,
      title: "Focus Analytics",
      description: "Track your productivity patterns and celebrate your focus achievements."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Designer",
      content: "focusEdge helped me reclaim 3 hours of deep work time daily. The notification-based unlocking is genius!",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Software Engineer",
      content: "Unlike other blockers, focusEdge feels supportive, not restrictive. It's become my productivity companion.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Manager",
      content: "The scheduled sessions feature transformed my work-life balance. I'm more focused and less stressed.",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "Free Trial",
      price: "Free",
      period: "7 days",
      description: "Perfect for trying out focusEdge",
      features: [
        "Block up to 2 apps",
        "2 max sessions",
        "Basic scheduling",
        "Community support"
      ],
      popular: false,
      cta: "Start Free Trial"
    },
    {
      name: "Focus Starter",
      price: "$10",
      period: "month",
      weeklyPrice: "$3/week",
      description: "Great for individuals getting started",
      features: [
        "Block up to 5 apps",
        "5 max sessions",
        "Advanced scheduling",
        "2 device sync",
        "Email support",
        "Focus analytics"
      ],
      popular: true,
      cta: "Get Started"
    },
    {
      name: "Focus Pro",
      price: "$18",
      period: "month",
      weeklyPrice: "$5/week",
      description: "Everything you need for maximum productivity",
      features: [
        "Unlimited app blocking",
        "Unlimited sessions",
        "Cross-device sync",
        "Strict mode",
        "AI chat support",
        "Priority support",
        "Advanced analytics",
        "Team features"
      ],
      popular: false,
      cta: "Go Pro"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-mint-50">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-gray-200' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                focusEdge
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">Reviews</a>
              <Button variant="ghost" onClick={() => navigate('/login')}>Sign In</Button>
              <Button onClick={() => navigate('/signup')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Start Free Trial
              </Button>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-700">Features</a>
              <a href="#pricing" className="block px-3 py-2 text-gray-700">Pricing</a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-700">Reviews</a>
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/login')}>
                Sign In
              </Button>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600" onClick={() => navigate('/signup')}>
                Start Free Trial
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0">
              🚀 Now available on Web, iOS & Android
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Regain Control of Your
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-mint-600 bg-clip-text text-transparent">
                Time & Attention
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              focusEdge is your calm, intelligent productivity companion. Block distractions, 
              schedule focus sessions, and build better habits — without feeling restricted.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/signup')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 text-lg"
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                Watch Demo
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              💝 7-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Features that work
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> with you</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Unlike rigid blockers, focusEdge adapts to your needs while keeping you focused on what matters most.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> thousands</span>
            </h2>
            <p className="text-xl text-gray-600">See what our users are saying about their productivity journey</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple,
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> transparent pricing</span>
            </h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your focus journey</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-500">/{plan.period}</span>
                    {plan.weeklyPrice && (
                      <p className="text-sm text-gray-500 mt-1">or {plan.weeklyPrice}</p>
                    )}
                  </div>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                        : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                    onClick={() => navigate('/signup')}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to transform your productivity?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who've regained control of their time with focusEdge.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/signup')}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg"
          >
            Start Your Free Trial Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-blue-100 mt-4">💪 You've got this!</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">focusEdge</span>
              </div>
              <p className="text-gray-400">
                Your calm, intelligent productivity companion for better focus and time management.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="/help" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="/docs" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="/status" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 focusEdge. Built with 💜 to help you focus better.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
