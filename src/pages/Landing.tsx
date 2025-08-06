import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, ChevronRight, Sparkles, Shield, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Landing = () => {
  const navigate = useNavigate();
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsAnimated(true), 100);
  }, []);

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered',
      description: 'Smart plant diagnosis using advanced AI technology'
    },
    {
      icon: Shield,
      title: 'Expert Support',
      description: 'Get guidance from agricultural experts'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Quick solutions for your farming challenges'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with fellow farmers and share knowledge'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-agri-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-agri-success/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="mobile-header bg-white/80 backdrop-blur-md border-b border-border/50">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-br from-agri-primary to-agri-success rounded-xl flex items-center justify-center transform transition-all duration-1000 ${isAnimated ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl font-bold bg-gradient-to-r from-agri-primary to-agri-success bg-clip-text text-transparent transform transition-all duration-1000 delay-300 ${isAnimated ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
                KisanMitra
              </h1>
              <p className={`text-sm text-muted-foreground transform transition-all duration-1000 delay-500 ${isAnimated ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
                Your Smart Farming Assistant
              </p>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12">
          <div className="text-center space-y-8">
            {/* Main Hero Content */}
            <div className="space-y-6">
              <div className={`transform transition-all duration-1000 delay-700 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-agri-primary via-agri-success to-agri-primary bg-clip-text text-transparent">
                    Smart Farming
                  </span>
                  <br />
                  <span className="text-foreground">Made Simple</span>
                </h2>
              </div>
              
              <div className={`transform transition-all duration-1000 delay-900 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Diagnose plant diseases instantly, get expert advice, and boost your farm's productivity with AI-powered insights.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={`space-y-4 transform transition-all duration-1000 delay-1100 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <Button
                onClick={() => navigate('/signup')}
                className="w-full h-14 bg-gradient-to-r from-agri-primary to-agri-success hover:from-agri-primary/90 hover:to-agri-success/90 text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
              >
                <span>Get Started Free</span>
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <Button
                onClick={() => navigate('/login')}
                variant="outline"
                className="w-full h-14 border-2 border-agri-primary/20 text-agri-primary hover:bg-agri-primary/5 hover:border-agri-primary/30 font-semibold text-lg transform hover:scale-105 transition-all duration-300"
              >
                Sign In to Continue
              </Button>
            </div>

            {/* Features Grid */}
            <div className={`grid grid-cols-2 gap-4 mt-12 transform transition-all duration-1000 delay-1300 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-border/50 hover:bg-white/70 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group`}
                  style={{ animationDelay: `${1500 + index * 200}ms` }}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-agri-primary/20 to-agri-success/20 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-5 h-5 text-agri-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className={`flex items-center justify-center space-x-6 text-muted-foreground mt-8 transform transition-all duration-1000 delay-1500 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-agri-success rounded-full animate-pulse" />
                <span className="text-sm font-medium">10K+ Farmers</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-agri-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                <span className="text-sm font-medium">AI Powered</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                <span className="text-sm font-medium">Expert Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`text-center py-6 px-6 transform transition-all duration-1000 delay-1700 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <p className="text-sm text-muted-foreground">
            Join thousands of farmers already using KisanMitra
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;