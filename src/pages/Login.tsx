import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Phone, Lock, Sunrise, Moon, Sun, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [formData, setFormData] = useState({
    mobile: '',
    pin: ''
  });

  // Get time-based greeting and icon
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return { greeting: 'Good Morning', icon: Sunrise, color: 'text-orange-500' };
    } else if (hour < 17) {
      return { greeting: 'Good Afternoon', icon: Sun, color: 'text-yellow-500' };
    } else {
      return { greeting: 'Good Evening', icon: Moon, color: 'text-blue-500' };
    }
  };

  const { greeting, icon: TimeIcon, color } = getTimeBasedGreeting();

  const formatMobile = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{5})(\d{5})/, '$1-$2');
    return formatted;
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatMobile(e.target.value);
    setFormData(prev => ({ ...prev, mobile: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.mobile || !formData.pin) {
      toast({
        title: "Missing Information",
        description: "Please enter your mobile number and PIN",
        variant: "destructive",
      });
      return;
    }

    if (formData.pin.length !== 4) {
      toast({
        title: "Invalid PIN",
        description: "PIN must be exactly 4 digits",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Check if user exists (basic simulation)
      const existingUser = localStorage.getItem('kisanmitra_user');
      
      if (existingUser) {
        toast({
          title: `Welcome back! 🌾`,
          description: "You're successfully logged in",
        });
        navigate('/home');
      } else {
        toast({
          title: "Account not found",
          description: "Please check your credentials or create a new account",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1500);
  };

  // Get background based on time
  const getTimeBasedBackground = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'bg-gradient-to-br from-orange-50 to-yellow-50';
    } else if (hour < 17) {
      return 'bg-gradient-to-br from-blue-50 to-cyan-50';
    } else {
      return 'bg-gradient-to-br from-purple-50 to-pink-50';
    }
  };

  return (
    <div className="mobile-container">
      {/* Dynamic Background */}
      <div className={`absolute inset-0 ${getTimeBasedBackground()} transition-all duration-1000`}>
        {/* Floating crop illustrations */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-20"
              style={{
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 4 + 's',
              }}
            >
              <Sprout 
                className={`w-8 h-8 text-agri-primary float-animation`}
                style={{ 
                  animationDuration: (Math.random() * 2 + 3) + 's' 
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header Section */}
        <div className="text-center pt-16 pb-12 px-6">
          <div className="mb-6 animate-fade-in">
            <TimeIcon className={`w-16 h-16 ${color} mx-auto mb-4`} />
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-4xl font-bold text-agri-accent mb-3">
              Welcome Back! 👋
            </h1>
            <p className="text-xl text-agri-secondary font-medium">
              {greeting}, Ready to Continue?
            </p>
            <p className="text-agri-secondary/70 mt-2">
              Continue Your Farming Journey
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="flex-1 px-6">
          <div className="glass-card rounded-3xl p-8 border border-agri-primary/20 shadow-large animate-slide-up">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Mobile Number */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-agri-accent flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-agri-primary" />
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
                    <span className="text-agri-accent font-medium">🇮🇳 +91</span>
                  </div>
                  <Input
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    onChange={handleMobileChange}
                    maxLength={11}
                    className="pl-20 h-16 border-agri-primary/20 focus:border-agri-primary transition-all duration-300 text-lg"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-8 h-8 rounded-full bg-agri-light flex items-center justify-center">
                      <Phone className="w-4 h-4 text-agri-primary animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              {/* PIN Entry */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-agri-accent flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-agri-primary" />
                  Secure PIN
                </label>
                <div className="relative">
                  <Input
                    type={showPin ? "text" : "password"}
                    placeholder="Enter your 4-digit PIN"
                    value={formData.pin}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      pin: e.target.value.replace(/\D/g, '').slice(0, 4) 
                    }))}
                    maxLength={4}
                    className="pl-16 pr-16 h-16 border-agri-primary/20 focus:border-agri-primary transition-all duration-300 text-center tracking-[0.5em] text-2xl font-bold"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-8 h-8 rounded-full bg-agri-light flex items-center justify-center">
                      <Lock className="w-4 h-4 text-agri-primary" />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-agri-light transition-colors"
                  >
                    {showPin ? (
                      <EyeOff className="w-5 h-5 text-agri-gray" />
                    ) : (
                      <Eye className="w-5 h-5 text-agri-gray" />
                    )}
                  </button>
                </div>

                {/* PIN dots indicator */}
                <div className="flex justify-center space-x-3 mt-4">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        i < formData.pin.length 
                          ? 'bg-agri-primary shadow-glow scale-125' 
                          : 'bg-agri-light-gray'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-16 btn-primary text-xl font-semibold bg-agri-primary hover:bg-agri-secondary text-white shadow-large"
              >
                {loading ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Logging you in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Sprout className="w-6 h-6" />
                    <span>Welcome Back to KisanMitra</span>
                  </div>
                )}
              </Button>

              {/* Signup Link */}
              <div className="text-center pt-6">
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="text-agri-primary font-semibold hover:text-agri-secondary transition-colors text-lg"
                >
                  New to farming innovation? Join us! 🚀
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Spacing */}
        <div className="h-8" />
      </div>
    </div>
  );
};

export default Login;