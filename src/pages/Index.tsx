
import { useState } from "react";
import { Shield, Brain, Smartphone, Lock, Target, Calendar, Download, Menu, X, Star, Users, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Focus Assistant",
      description: "Smart recommendations based on your productivity patterns and habits",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Target,
      title: "Intelligent App Blocking",
      description: "AI learns your distraction patterns and proactively suggests optimal focus sessions",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "AI analyzes your calendar and suggests the best times for deep work sessions",
      color: "from-pink-500 to-red-600"
    },
    {
      icon: Clock,
      title: "Predictive Focus Analytics",
      description: "AI predicts your most productive hours and helps optimize your daily schedule",
      color: "from-green-500 to-blue-600"
    },
    {
      icon: Zap,
      title: "Adaptive Learning",
      description: "The more you use focusEdge, the smarter it gets at helping you stay focused",
      color: "from-yellow-500 to-orange-600"
    },
    {
      icon: Users,
      title: "AI Chat Support",
      description: "24/7 AI assistant for productivity tips, FAQs, and personalized guidance",
      color: "from-indigo-500 to-purple-600"
    }
  ];

  const stats = [
    { number: "500K+", label: "Active Users", icon: Users },
    { number: "2.5M", label: "Hours Focused", icon: Clock },
    { number: "4.9", label: "App Store Rating", icon: Star },
    { number: "95%", label: "Success Rate", icon: Target }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-mint-50">
      {/* Navigation */}
      <nav className="relative z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                focusEdge
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <Button variant="outline" onClick={() => navigate("/login")}>Sign In</Button>
              <Button onClick={() => navigate("/signup")} className="bg-gradient-to-r from-blue-600 to-purple-600">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-3">
              <a href="#features" className="block text-gray-600 hover:text-gray-900">Features</a>
              <a href="#pricing" className="block text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#about" className="block text-gray-600 hover:text-gray-900">About</a>
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="outline" onClick={() => navigate("/login")}>Sign In</Button>
                <Button onClick={() => navigate("/signup")} className="bg-gradient-to-r from-blue-600 to-purple-600">
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
                  🚀 AI-Powered Focus Revolution
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Regain Control of Your
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Time & Attention
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  focusEdge is your calm, intelligent productivity companion powered by AI. 
                  Block distracting apps, schedule smart focus sessions, and build better habits 
                  without feeling restricted.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate("/signup")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-6 text-lg h-auto"
                >
                  Start Your Free Trial
                </Button>
                <Button 
                  variant="outline" 
                  className="px-8 py-6 text-lg h-auto"
                  onClick={() => navigate("/login")}
                >
                  <Brain className="h-5 w-5 mr-2" />
                  See AI in Action
                </Button>
              </div>

              {/* Download Buttons */}
              <div className="space-y-4">
                <p className="text-sm text-gray-500 font-medium">DOWNLOAD FOR:</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="bg-black text-white hover:bg-gray-800 border-0">
                    <Download className="h-4 w-4 mr-2" />
                    Download for iOS
                  </Button>
                  <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700 border-0">
                    <Download className="h-4 w-4 mr-2" />
                    Get it on Android
                  </Button>
                </div>
              </div>
            </div>

            {/* Hero Image/Mockup */}
            <div className="relative">
              <div className="relative z-10 bg-gradient-to-br from-white to-gray-100 rounded-3xl p-8 shadow-2xl border border-gray-200">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Focus Dashboard</h3>
                    <Badge className="bg-green-100 text-green-800">AI Active</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
                      <CardContent className="p-4">
                        <p className="text-blue-100 text-sm">Focus Streak</p>
                        <p className="text-2xl font-bold">12 days</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
                      <CardContent className="p-4">
                        <p className="text-purple-100 text-sm">Time Saved</p>
                        <p className="text-2xl font-bold">4.2h</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">📱</span>
                        <span className="font-medium">Instagram</span>
                      </div>
                      <Lock className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">📺</span>
                        <span className="font-medium">YouTube</span>
                      </div>
                      <span className="text-sm text-gray-500">Allowed</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Background decoration */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white mb-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2">
              🤖 AI-Powered Features
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Intelligence That Adapts to 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Your Needs
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI doesn't just block apps—it learns your patterns, predicts your needs, 
              and evolves with your productivity journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 space-y-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg text-white group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Ready to Transform Your Focus?
          </h2>
          <p className="text-xl text-blue-100">
            Join thousands of users who've already regained control of their digital lives with AI-powered focus.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate("/signup")}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg h-auto font-semibold"
            >
              Start Free Trial - No Credit Card Required
            </Button>
            <Button 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-6 text-lg h-auto"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          </div>
          
          {/* Download buttons in CTA */}
          <div className="pt-8 space-y-4">
            <p className="text-blue-100">Also available on mobile:</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Download className="h-4 w-4 mr-2" />
                App Store
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Download className="h-4 w-4 mr-2" />
                Google Play
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">focusEdge</span>
              </div>
              <p className="text-gray-400">
                AI-powered focus and productivity for the modern world.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">Features</a>
                <a href="#" className="block hover:text-white transition-colors">Pricing</a>
                <a href="#" className="block hover:text-white transition-colors">Download</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">About</a>
                <a href="#" className="block hover:text-white transition-colors">Blog</a>
                <a href="#" className="block hover:text-white transition-colors">Careers</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block hover:text-white transition-colors">Contact</a>
                <a href="#" className="block hover:text-white transition-colors">Privacy</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 focusEdge. All rights reserved. Powered by AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
