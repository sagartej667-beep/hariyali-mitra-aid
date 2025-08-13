
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
  CheckCircle,
  ChevronDown,
  Badge,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import NotificationPanel from '@/components/NotificationPanel';
import WeatherCard from '@/components/WeatherCard';

const Home = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [showNotifications, setShowNotifications] = useState(false);
  
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
      subtitle: '2 ongoing treatments',
      icon: AlertTriangle,
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
      badge: 2,
      action: () => navigate('/treatments')
    },
    {
      id: 'guides',
      title: 'Cultivation Guides',
      subtitle: 'Growing guides',
      icon: Sprout,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      action: () => navigate('/guides')
    },
    {
      id: 'fertilizers',
      title: 'Order Fertilizers',
      subtitle: 'Shop for nutrients',
      icon: ShoppingCart,
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
      action: () => navigate('/shop')
    },
    {
      id: 'shops',
      title: 'Nearby Shops',
      subtitle: 'Find agri stores',
      icon: MapPin,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      action: () => navigate('/shops')
    },
    {
      id: 'orders',
      title: 'My Orders',
      subtitle: 'Order history',
      icon: Package,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      action: () => navigate('/orders')
    },
    {
      id: 'sell',
      title: 'Sell Produce',
      subtitle: 'Post your harvest',
      icon: Sprout,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
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
              <SelectItem value="KN">🇮🇳 KN</SelectItem>
            </SelectContent>
          </Select>
          
          <button 
            onClick={() => setShowNotifications(true)}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Bell className="w-6 h-6 text-agri-gray" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-xs font-bold text-white">3</span>
            </div>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mobile-content space-y-6 pt-4">
        {/* Enhanced Weather Card */}
        <WeatherCard />

        {/* Daily Farming Tip */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-4 border-l-4 border-yellow-400">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-amber-900 text-lg mb-1">Today's Farming Tip</h3>
              <p className="text-amber-800 text-sm leading-relaxed">
                Early morning (6-8 AM) is optimal for pesticide application - calm winds and cooler temperatures reduce drift and improve effectiveness.
              </p>
            </div>
          </div>
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
            className="flex flex-col items-center space-y-1 px-3 py-2 transition-all duration-200 hover:bg-agri-light rounded-lg"
          >
            <Store className="w-6 h-6 text-agri-gray" />
            <span className="text-xs text-agri-gray">Shop</span>
          </button>
          
          <button 
            onClick={() => navigate('/orders')}
            className="flex flex-col items-center space-y-1 px-3 py-2 transition-all duration-200 hover:bg-agri-light rounded-lg"
          >
            <Package className="w-6 h-6 text-agri-gray" />
            <span className="text-xs text-agri-gray">Orders</span>
          </button>
          
          <button 
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center space-y-1 px-3 py-2 transition-all duration-200 hover:bg-agri-light rounded-lg"
          >
            <User className="w-6 h-6 text-agri-gray" />
            <span className="text-xs text-agri-gray">Profile</span>
          </button>
        </div>
      </div>

      {/* Notification Panel */}
      <NotificationPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </div>
  );
};

export default Home;
