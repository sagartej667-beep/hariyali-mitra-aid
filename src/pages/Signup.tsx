import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Phone, MapPin, Lock, Sprout, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    state: '',
    district: '',
    pin: ''
  });
  const [pinStrength, setPinStrength] = useState(0);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'pin') {
      // Calculate PIN strength
      const strength = value.length * 25;
      setPinStrength(Math.min(strength, 100));
    }
  };

  const formatMobile = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{5})(\d{5})/, '$1-$2');
    return formatted;
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatMobile(e.target.value);
    handleInputChange('mobile', formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.mobile || !formData.state || !formData.pin) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
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
      localStorage.setItem('kisanmitra_user', JSON.stringify({
        name: formData.name,
        mobile: formData.mobile,
        state: formData.state,
        district: formData.district,
        registeredAt: new Date().toISOString()
      }));
      
      toast({
        title: "Welcome to KisanMitra! 🌱",
        description: "Your account has been created successfully",
      });
      
      setLoading(false);
      navigate('/home');
    }, 2000);
  };

  return (
    <div className="mobile-container">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-agri-cream overflow-hidden">
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 gradient-mesh opacity-20" />
        
        {/* Floating shapes */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-agri-primary/10 float-animation"
            style={{
              width: Math.random() * 60 + 20 + 'px',
              height: Math.random() * 60 + 20 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 4 + 's',
              animationDuration: (Math.random() * 3 + 3) + 's',
            }}
          />
        ))}
        
        {/* Crop silhouettes */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-agri-primary/5 to-transparent" />
      </div>

      <div className="relative z-10 min-h-screen">
        {/* Header Section */}
        <div className="text-center pt-12 pb-8 px-6">
          <div className="mb-6 relative">
            <Sprout className="w-16 h-16 text-agri-primary mx-auto mb-4 grow-animation" />
            <div className="absolute -top-2 -right-8 animate-pulse">
              <Sparkles className="w-6 h-6 text-agri-warning" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-agri-accent mb-2 bg-gradient-to-r from-agri-primary to-agri-secondary bg-clip-text text-transparent">
            Welcome to the Future of Farming
          </h1>
          
          <div className="flex items-center justify-center space-x-2 text-agri-secondary">
            <span className="text-sm font-medium">Join</span>
            <div className="bg-agri-primary px-3 py-1 rounded-full">
              <span className="text-white font-bold text-sm">50,000+</span>
            </div>
            <span className="text-sm font-medium">Smart Farmers</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="px-6">
          <div className="glass-card rounded-3xl p-8 border border-agri-primary/20 shadow-large">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Farmer Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-agri-accent flex items-center">
                  <User className="w-4 h-4 mr-2 text-agri-primary" />
                  Farmer Name
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter your full name (e.g., Ramesh Kumar)"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="pl-12 h-14 border-agri-primary/20 focus:border-agri-primary transition-all duration-300"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-6 h-6 rounded-full bg-agri-light flex items-center justify-center">
                      <User className="w-3 h-3 text-agri-primary" />
                    </div>
                  </div>
                  {formData.name && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-6 h-6 rounded-full bg-agri-success flex items-center justify-center grow-animation">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Number */}
              <div className="space-y-2">
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
                    className="pl-20 h-14 border-agri-primary/20 focus:border-agri-primary transition-all duration-300"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <Phone className="w-5 h-5 text-agri-primary animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Location Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-agri-accent flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-agri-primary pulse-glow" />
                    State
                  </label>
                  <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                    <SelectTrigger className="h-14 border-agri-primary/20 focus:border-agri-primary">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-agri-accent">
                    District
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter district"
                    value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    className="h-14 border-agri-primary/20 focus:border-agri-primary transition-all duration-300"
                  />
                </div>
              </div>

              {/* PIN Setup */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-agri-accent flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-agri-primary" />
                  Create Secure PIN
                  <Shield className="w-4 h-4 ml-2 text-agri-success" />
                </label>
                <div className="relative">
                  <Input
                    type={showPin ? "text" : "password"}
                    placeholder="Enter 4-digit PIN"
                    value={formData.pin}
                    onChange={(e) => handleInputChange('pin', e.target.value.replace(/\D/g, '').slice(0, 4))}
                    maxLength={4}
                    className="pl-12 pr-12 h-14 border-agri-primary/20 focus:border-agri-primary transition-all duration-300 text-center tracking-widest text-lg font-bold"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Lock className="w-5 h-5 text-agri-primary" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  >
                    {showPin ? (
                      <EyeOff className="w-5 h-5 text-agri-gray" />
                    ) : (
                      <Eye className="w-5 h-5 text-agri-gray" />
                    )}
                  </button>
                </div>
                
                {/* PIN Strength Indicator */}
                {formData.pin && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-agri-accent">PIN Strength</span>
                      <span className={`font-semibold ${pinStrength >= 100 ? 'text-agri-success' : 'text-agri-warning'}`}>
                        {pinStrength >= 100 ? 'Strong' : pinStrength >= 75 ? 'Good' : 'Weak'}
                      </span>
                    </div>
                    <div className="w-full bg-agri-light-gray rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          pinStrength >= 100 ? 'bg-agri-success' : 
                          pinStrength >= 75 ? 'bg-agri-warning' : 'bg-agri-danger'
                        }`}
                        style={{ width: `${pinStrength}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 btn-primary text-lg font-semibold bg-agri-primary hover:bg-agri-secondary text-white"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <Sprout className="w-5 h-5 animate-spin" />
                    <span>Creating Your Account...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Create My Account</span>
                  </div>
                )}
              </Button>

              {/* Login Link */}
              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-agri-primary font-medium hover:text-agri-secondary transition-colors"
                >
                  Already growing with us? Login here →
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

export default Signup;