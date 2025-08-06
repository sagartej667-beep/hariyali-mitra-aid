import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Camera, 
  ShoppingCart, 
  MapPin, 
  Package, 
  Sprout, 
  Home as HomeIcon,
  User,
  Lightbulb,
  AlertTriangle,
  TrendingUp,
  Store,
  Leaf,
  Cloud,
  Sun,
  CheckCircle,
  ChevronDown,
  Badge,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Home = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  
  // Get user data
  const userData = JSON.parse(localStorage.getItem('kisanmitra_user') || '{}');
  const userName = userData.name || 'Farmer';
  
  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const quickActions = [
    {
      id: 'treatments',
      title: 'Active Treatments',
      subtitle: '3 ongoing treatments',
      icon: AlertTriangle,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-500',
      badge: 3,
      action: () => navigate('/treatments')
    },
    {
      id: 'guides',
      title: 'Cultivation Guides',
      subtitle: 'Growing guides',
      icon: Sprout,
      bgColor: 'bg-agri-light',
      iconColor: 'text-agri-primary',
      action: () => navigate('/guides')
    },
    {
      id: 'fertilizers',
      title: 'Order Fertilizers',
      subtitle: 'Shop for nutrients',
      icon: ShoppingCart,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-500',
      action: () => navigate('/shop')
    },
    {
      id: 'shops',
      title: 'Nearby Shops',
      subtitle: 'Find agri stores',
      icon: MapPin,
      bgColor: 'bg-agri-light-purple',
      iconColor: 'text-agri-purple',
      action: () => navigate('/shops')
    },
    {
      id: 'orders',
      title: 'My Orders',
      subtitle: 'Order history',
      icon: Package,
      bgColor: 'bg-agri-light-blue',
      iconColor: 'text-agri-info',
      action: () => navigate('/orders')
    },
    {
      id: 'sell',
      title: 'Sell Produce',
      subtitle: 'Post your harvest',
      icon: TrendingUp,
      bgColor: 'bg-agri-light',
      iconColor: 'text-agri-primary',
      badge: 'NEW',
      isNew: true,
      action: () => navigate('/sell')
    }
  ];

  return (
    <div className="mobile-container bg-gray-50">
      {/* Header */}
      <div className="mobile-header bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-agri-primary rounded-lg flex items-center justify-center">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-secondary">KisanMitra</h1>
            <p className="text-sm text-agri-primary font-medium">
              {getGreeting()}, {userName} Ji!
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-20 h-8 border-0 bg-transparent">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EN">🇮🇳 EN</SelectItem>
              <SelectItem value="HI">🇮🇳 HI</SelectItem>
              <SelectItem value="TA">🇮🇳 TA</SelectItem>
              <SelectItem value="TE">🇮🇳 TE</SelectItem>
              <SelectItem value="BN">🇮🇳 BN</SelectItem>
              <SelectItem value="MR">🇮🇳 MR</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="relative">
            <Bell className="w-6 h-6 text-agri-gray" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-agri-danger rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mobile-content space-y-6 pt-4">
        {/* Enhanced Weather Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-100 p-6 shadow-large border border-blue-200">
          <div className="absolute top-4 right-4">
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-xs font-semibold text-blue-800">Live Weather</span>
            </div>
          </div>
          
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Sun className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-900 mb-1">28°C</div>
                <div className="text-blue-700 font-semibold text-lg">Partly Cloudy</div>
                <div className="text-blue-600 text-sm">Feels like 31°C</div>
              </div>
            </div>
            <Cloud className="w-12 h-12 text-blue-400 float-animation opacity-60" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-white/30 rounded-xl p-3 text-center backdrop-blur-sm">
              <div className="text-blue-800 font-bold text-lg">76%</div>
              <div className="text-blue-600 text-xs">Humidity</div>
            </div>
            <div className="bg-white/30 rounded-xl p-3 text-center backdrop-blur-sm">
              <div className="text-blue-800 font-bold text-lg">12 km/h</div>
              <div className="text-blue-600 text-xs">Wind Speed</div>
            </div>
            <div className="bg-white/30 rounded-xl p-3 text-center backdrop-blur-sm">
              <div className="text-blue-800 font-bold text-lg">8 UV</div>
              <div className="text-blue-600 text-xs">UV Index</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold text-green-700">Perfect for field work</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/40 border-white/50 text-blue-700 hover:bg-white/60 backdrop-blur-sm font-medium"
            >
              7-Day Forecast
            </Button>
          </div>
          
          <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-blue-300/20 rounded-full" />
          <div className="absolute -top-8 -right-8 w-16 h-16 bg-cyan-300/20 rounded-full" />
        </div>

        {/* Enhanced Daily Farming Tip */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 p-6 shadow-large border-l-4 border-yellow-400">
          <div className="absolute top-4 right-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full">
              <span className="text-xs font-bold">Expert Tip</span>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Lightbulb className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-3">
                <h3 className="text-xl font-bold text-orange-900">Today's Smart Farming Tip</h3>
              </div>
              <p className="text-orange-800 leading-relaxed font-medium">
                🌅 <strong>Best Practice:</strong> Early morning (6-8 AM) is optimal for pesticide application. Calm winds and cooler temperatures reduce drift and improve effectiveness by 40%.
              </p>
              
              <div className="flex items-center space-x-4 mt-4">
                <div className="bg-orange-100 px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold text-orange-700">💡 Pro Tip</span>
                </div>
                <div className="bg-green-100 px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold text-green-700">✅ Proven Method</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-yellow-200">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">AI</span>
              </div>
              <span className="text-sm font-medium text-orange-700">Powered by KisanMitra AI</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-yellow-100 border-yellow-300 text-yellow-700 hover:bg-yellow-200 font-medium"
            >
              More Tips
            </Button>
          </div>
          
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-yellow-300/20 rounded-full" />
        </div>

        {/* AI Diagnosis Feature */}
        <div className="relative overflow-hidden rounded-2xl bg-agri-primary p-6 text-white shadow-large">
          <div className="absolute top-4 left-4">
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-xs font-semibold">AI Powered</span>
            </div>
          </div>
          
          <div className="relative z-10 mt-8">
            <h2 className="text-2xl font-bold mb-2">Diagnose Plant Health</h2>
            <p className="text-white/90 mb-6">Take a photo to check for diseases</p>
            
            <Button 
              onClick={() => navigate('/diagnose')}
              className="bg-white text-agri-primary hover:bg-white/90 font-semibold flex items-center space-x-2"
            >
              <Camera className="w-5 h-5" />
              <span>Start Diagnosis</span>
            </Button>
          </div>
          
          {/* Background decoration */}
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute -right-8 -top-8 w-20 h-20 bg-white/5 rounded-full" />
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-text-secondary">Quick Actions</h2>
            <div className="flex-1 h-1 bg-agri-primary rounded-full" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={action.action}
                className="plant-card text-left transition-all duration-300 transform hover:scale-105 active:scale-95 relative"
              >
                {action.badge && (
                  <div className="absolute -top-2 -right-2 z-10">
                    {action.isNew ? (
                      <div className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        NEW
                      </div>
                    ) : (
                      <div className="bg-agri-danger text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] h-6 flex items-center justify-center">
                        {action.badge}
                      </div>
                    )}
                  </div>
                )}
                
                <div className={`w-12 h-12 ${action.bgColor} rounded-xl flex items-center justify-center mb-3`}>
                  <action.icon className={`w-6 h-6 ${action.iconColor}`} />
                </div>
                
                <h3 className="font-semibold text-text-secondary text-sm mb-1">{action.title}</h3>
                <p className="text-agri-gray text-xs">{action.subtitle}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-text-secondary">Recent Activity</h2>
          
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 shadow-soft border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-agri-light rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-agri-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-text-secondary">Tomato disease diagnosed</p>
                  <p className="text-sm text-agri-gray">2 hours ago</p>
                </div>
                <ChevronDown className="w-5 h-5 text-agri-gray transform rotate-270" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-soft border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-text-secondary">Fertilizer order delivered</p>
                  <p className="text-sm text-agri-gray">Yesterday</p>
                </div>
                <CheckCircle className="w-5 h-5 text-agri-success" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="mobile-bottom-nav">
        <div className="flex items-center justify-around py-3">
          <button className="flex flex-col items-center space-y-1 px-3 py-2">
            <HomeIcon className="w-6 h-6 text-agri-primary" />
            <span className="text-xs font-medium text-agri-primary">Home</span>
          </button>
          
          <button 
            onClick={() => navigate('/diagnose')}
            className="flex flex-col items-center space-y-1 px-3 py-2"
          >
            <Camera className="w-6 h-6 text-agri-gray" />
            <span className="text-xs text-agri-gray">Diagnose</span>
          </button>
          
          <button 
            onClick={() => navigate('/shop')}
            className="flex flex-col items-center space-y-1 px-3 py-2"
          >
            <Store className="w-6 h-6 text-agri-gray" />
            <span className="text-xs text-agri-gray">Shop</span>
          </button>
          
          <button 
            onClick={() => navigate('/orders')}
            className="flex flex-col items-center space-y-1 px-3 py-2"
          >
            <Package className="w-6 h-6 text-agri-gray" />
            <span className="text-xs text-agri-gray">Orders</span>
          </button>
          
          <button 
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center space-y-1 px-3 py-2"
          >
            <User className="w-6 h-6 text-agri-gray" />
            <span className="text-xs text-agri-gray">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;