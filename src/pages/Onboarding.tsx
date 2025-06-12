
import { useState } from "react";
import { Shield, ChevronLeft, ChevronRight, Smartphone, Clock, Bell, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [focusGoals, setFocusGoals] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const steps = [
    {
      title: "Welcome to focusEdge! 🎉",
      subtitle: "Let's set up your productivity companion",
      content: "WelcomeStep"
    },
    {
      title: "Which apps distract you most?",
      subtitle: "We'll help you block these during focus sessions",
      content: "AppSelection"
    },
    {
      title: "What are your focus goals?",
      subtitle: "This helps us personalize your experience",
      content: "GoalSelection"
    },
    {
      title: "You're all set! 🚀",
      subtitle: "Ready to start your focus journey",
      content: "Completion"
    }
  ];

  const popularApps = [
    { name: "Instagram", icon: "📷", category: "Social Media" },
    { name: "YouTube", icon: "📺", category: "Entertainment" },
    { name: "WhatsApp", icon: "💬", category: "Messaging" },
    { name: "Twitter", icon: "🐦", category: "Social Media" },
    { name: "TikTok", icon: "🎵", category: "Entertainment" },
    { name: "Facebook", icon: "👥", category: "Social Media" },
    { name: "Reddit", icon: "🤖", category: "Social Media" },
    { name: "Netflix", icon: "🎬", category: "Entertainment" },
    { name: "Spotify", icon: "🎶", category: "Music" },
    { name: "Discord", icon: "🎮", category: "Communication" }
  ];

  const goals = [
    { id: "deep-work", label: "Deep Work Sessions", icon: Target },
    { id: "study", label: "Better Study Habits", icon: "📚" },
    { id: "screen-time", label: "Reduce Screen Time", icon: Smartphone },
    { id: "sleep", label: "Better Sleep Schedule", icon: "😴" },
    { id: "mindfulness", label: "More Mindful Usage", icon: "🧘" },
    { id: "productivity", label: "Increase Productivity", icon: "⚡" }
  ];

  const handleAppToggle = (appName: string) => {
    setSelectedApps(prev => 
      prev.includes(appName) 
        ? prev.filter(app => app !== appName)
        : [...prev, appName]
    );
  };

  const handleGoalToggle = (goalId: string) => {
    setFocusGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(goal => goal !== goalId)
        : [...prev, goalId]
    );
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      toast({
        title: "Welcome to focusEdge! 🎉",
        description: "Your account is ready. Let's start your first focus session!",
      });
      navigate("/dashboard");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedApps.length > 0;
      case 2: return focusGoals.length > 0;
      default: return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🎯</div>
            <div className="space-y-4">
              <p className="text-lg text-gray-600">
                focusEdge is your calm, intelligent productivity companion designed to help you:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-sm">Block distracting apps & websites</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <span className="text-sm">Schedule focused work sessions</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <Bell className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Smart notification management</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                  <Target className="h-5 w-5 text-orange-600" />
                  <span className="text-sm">Track your focus journey</span>
                </div>
              </div>
              <p className="text-gray-600">
                Let's take 2 minutes to personalize your experience! 💪
              </p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <p className="text-center text-gray-600">
              Select the apps that tend to distract you the most. We'll help you block these during your focus sessions.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {popularApps.map((app) => (
                <div
                  key={app.name}
                  onClick={() => handleAppToggle(app.name)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedApps.includes(app.name)
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center space-y-2">
                    <div className="text-2xl">{app.icon}</div>
                    <div>
                      <p className="font-medium text-sm">{app.name}</p>
                      <p className="text-xs text-gray-500">{app.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {selectedApps.length > 0 && (
              <div className="text-center">
                <Badge className="bg-blue-100 text-blue-800">
                  {selectedApps.length} app{selectedApps.length > 1 ? 's' : ''} selected
                </Badge>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <p className="text-center text-gray-600">
              What do you want to achieve with focusEdge? Select all that apply.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  onClick={() => handleGoalToggle(goal.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                    focusGoals.includes(goal.id)
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">
                      {typeof goal.icon === 'string' ? goal.icon : <goal.icon className="h-6 w-6" />}
                    </div>
                    <span className="font-medium">{goal.label}</span>
                  </div>
                </div>
              ))}
            </div>
            {focusGoals.length > 0 && (
              <div className="text-center">
                <Badge className="bg-purple-100 text-purple-800">
                  {focusGoals.length} goal{focusGoals.length > 1 ? 's' : ''} selected
                </Badge>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🚀</div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Perfect! You're ready to focus</h3>
              <p className="text-gray-600">
                We've set up focusEdge based on your preferences:
              </p>
              
              <div className="space-y-4 text-left max-w-md mx-auto">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Apps to Block</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedApps.slice(0, 3).map(app => (
                      <Badge key={app} variant="outline" className="text-blue-700 border-blue-300">
                        {app}
                      </Badge>
                    ))}
                    {selectedApps.length > 3 && (
                      <Badge variant="outline" className="text-blue-700 border-blue-300">
                        +{selectedApps.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">Your Focus Goals</h4>
                  <div className="flex flex-wrap gap-2">
                    {focusGoals.slice(0, 2).map(goalId => {
                      const goal = goals.find(g => g.id === goalId);
                      return (
                        <Badge key={goalId} variant="outline" className="text-purple-700 border-purple-300">
                          {goal?.label}
                        </Badge>
                      );
                    })}
                    {focusGoals.length > 2 && (
                      <Badge variant="outline" className="text-purple-700 border-purple-300">
                        +{focusGoals.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  💡 <strong>Pro tip:</strong> Start with short 15-minute focus sessions and gradually increase the duration as you build the habit!
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-mint-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                focusEdge
              </span>
            </div>
            
            {/* Progress indicator */}
            <div className="flex items-center justify-center space-x-2 mb-6">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-8 rounded-full transition-all duration-300 ${
                    index <= currentStep 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            
            <div>
              <CardTitle className="text-2xl font-bold">{steps[currentStep].title}</CardTitle>
              <p className="text-gray-600 mt-2">{steps[currentStep].subtitle}</p>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="min-h-[400px]">
              {renderStepContent()}
            </div>
            
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>
              
              <span className="text-sm text-gray-500">
                Step {currentStep + 1} of {steps.length}
              </span>
              
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center space-x-2"
              >
                <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
