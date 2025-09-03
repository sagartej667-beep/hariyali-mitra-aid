import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, User, Phone, MapPin, Lock, Sprout } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate, Link } from "react-router-dom";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    state: "",
    district: "",
    pin: ""
  });
  const [loading, setLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    if (field === "mobile") {
      value = formatMobile(value);
    }
    if (field === "pin" && value.length > 4) {
      return;
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatMobile = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    return cleaned.slice(0, 10);
  };

  const isFormValid = () => {
    return formData.name.trim() !== "" &&
           formData.mobile.length === 10 &&
           formData.state !== "" &&
           formData.district.trim() !== "" &&
           formData.pin.length === 4;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required to create your account",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Account created successfully! 🎉",
        description: `Welcome to KisanMitra, ${formData.name}! You can now access all farming features.`,
      });
      
      // Navigate to home or login
      setTimeout(() => {
        navigate("/");
      }, 1500);
      
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-light to-background relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-agri-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-agri-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md">
          {/* Header with Farming Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-agri-primary rounded-2xl mb-6 shadow-lg">
              <Sprout className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Create Your Account
            </h1>
            <p className="text-muted-foreground text-lg">
              Join thousands of smart farmers
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-card rounded-2xl p-8 shadow-large border border-border/50">
              {/* Name Field */}
              <div className="space-y-3 mb-6">
                <Label htmlFor="name" className="text-base font-medium text-foreground">
                  Full Name
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="pl-12 h-14 text-base rounded-xl border-2 border-input focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              {/* Mobile Field */}
              <div className="space-y-3 mb-6">
                <Label htmlFor="mobile" className="text-base font-medium text-foreground">
                  Mobile Number
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-muted-foreground text-base font-medium">+91</span>
                    <Phone className="w-5 h-5 text-muted-foreground ml-2" />
                  </div>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange("mobile", e.target.value)}
                    className="pl-20 h-14 text-base rounded-xl border-2 border-input focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              {/* State Field */}
              <div className="space-y-3 mb-6">
                <Label htmlFor="state" className="text-base font-medium text-foreground">
                  State
                </Label>
                <Select onValueChange={(value) => handleInputChange("state", value)}>
                  <SelectTrigger className="h-14 text-base rounded-xl border-2 border-input focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-muted-foreground mr-3" />
                      <SelectValue placeholder="Select your state" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border shadow-large rounded-lg">
                    {indianStates.map((state) => (
                      <SelectItem 
                        key={state} 
                        value={state}
                        className="text-base py-3 px-4 hover:bg-accent focus:bg-accent"
                      >
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* District Field */}
              <div className="space-y-3 mb-6">
                <Label htmlFor="district" className="text-base font-medium text-foreground">
                  District
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <Input
                    id="district"
                    type="text"
                    placeholder="Enter your district"
                    value={formData.district}
                    onChange={(e) => handleInputChange("district", e.target.value)}
                    className="pl-12 h-14 text-base rounded-xl border-2 border-input focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              {/* PIN Field */}
              <div className="space-y-3 mb-8">
                <Label htmlFor="pin" className="text-base font-medium text-foreground">
                  4-Digit PIN
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <Input
                    id="pin"
                    type={showPin ? "text" : "password"}
                    placeholder="Create 4-digit PIN"
                    value={formData.pin}
                    onChange={(e) => handleInputChange("pin", e.target.value)}
                    className="pl-12 pr-12 h-14 text-base rounded-xl border-2 border-input focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-mono tracking-wider text-center"
                    maxLength={4}
                    inputMode="numeric"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform"
                  >
                    {showPin ? (
                      <EyeOff className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                    ) : (
                      <Eye className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!isFormValid() || loading}
                className="w-full h-16 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg rounded-xl shadow-medium hover:shadow-large transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-foreground mr-3"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create My Account"
                )}
              </Button>
            </div>
          </form>

          {/* Login Link */}
          <div className="text-center mt-8">
            <p className="text-muted-foreground text-base">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:text-primary/80 font-semibold hover:underline transition-colors text-base"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;