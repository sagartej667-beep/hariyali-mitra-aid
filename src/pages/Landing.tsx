import { useNavigate } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import farmerHero from '@/assets/farmer-hero.jpg';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-light/30 via-background to-agri-primary/5 overflow-hidden">
      {/* Subtle Background Patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-agri-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-agri-success/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col max-w-md mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between p-6">
          {/* Logo and Tagline */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-agri-primary to-agri-success rounded-2xl flex items-center justify-center shadow-medium">
              <Sprout className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-agri-primary to-agri-success bg-clip-text text-transparent">
                KisanMitra
              </h1>
              <p className="text-xs text-muted-foreground font-medium">
                Your Smart Farming Assistant
              </p>
            </div>
          </div>

          {/* Language Switcher */}
          <LanguageSwitcher />
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 space-y-8">
          {/* Hero Image */}
          <div className="relative">
            <div className="w-64 h-64 rounded-full overflow-hidden shadow-large border-4 border-white/80">
              <img 
                src={farmerHero} 
                alt="Happy farmer with crops" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-agri-success rounded-full shadow-medium animate-bounce" style={{ animationDelay: '0.5s' }} />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-agri-primary rounded-full shadow-medium animate-bounce" style={{ animationDelay: '1s' }} />
          </div>

          {/* Tagline */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              Your Pocket Agriculture Expert
            </h2>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
              Get instant crop advice, disease diagnosis, and weather alerts in your local language
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="w-full space-y-4 pt-4">
            <div className="flex space-x-4">
              <Button
                onClick={() => navigate('/login')}
                variant="outline"
                className="flex-1 h-14 font-semibold text-lg border-2 border-agri-primary text-agri-primary hover:bg-agri-primary hover:text-white transition-all duration-300 transform active:scale-95 shadow-soft hover:shadow-medium"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate('/signup')}
                className="flex-1 h-14 bg-gradient-to-r from-agri-primary to-agri-success hover:from-agri-primary/90 hover:to-agri-success/90 text-white font-semibold text-lg shadow-medium hover:shadow-large transition-all duration-300 transform active:scale-95"
              >
                Sign Up
              </Button>
            </div>
            
            <p className="text-center text-xs text-muted-foreground">
              Free to use • Available in 5+ languages
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 text-center">
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-agri-success rounded-full animate-pulse" />
              <span>Trusted by 15K+ farmers</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-agri-primary rounded-full animate-pulse" />
              <span>AI-powered insights</span>
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;