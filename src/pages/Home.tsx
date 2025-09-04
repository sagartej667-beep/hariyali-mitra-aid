
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
  Droplets,
  Activity,
  TestTube,
  Beaker,
  IndianRupee,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import NotificationPanel from '@/components/NotificationPanel';

const Home = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Get user data
  const userData = JSON.parse(localStorage.getItem('kisanmitra_user') || '{}');
  const userName = userData.name || 'Farmer';
  
  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '🌱 Good Morning';
    if (hour < 17) return '🌞 Good Afternoon';
    return '🌙 Good Evening';
  };

  // Market prices data
  const marketPrices = [
    { crop: 'Tomato', price: '₹16/kg', trend: 'up' },
    { crop: 'Paddy', price: '₹1,850/qtl', trend: 'down' },
    { crop: 'Onion', price: '₹25/kg', trend: 'up' },
  ];

  const quickActions = [
    {
      id: 'sell',
      title: 'Sell Produce',
      subtitle: 'Post your harvest',
      icon: TrendingUp,
      bgColor: 'bg-agri-light',
      iconColor: 'text-agri-primary',
      badge: 'NEW',
      action: () => navigate('/sell')
    },
    {
      id: 'fertilizers',
      title: 'Order Fertilizers',
      subtitle: 'Shop nutrients',
      icon: ShoppingCart,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
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
      subtitle: 'Track orders',
      icon: Package,
      bgColor: 'bg-agri-light-blue',
      iconColor: 'text-agri-info',
      action: () => navigate('/orders')
    }
  ];

  const farmActions = [
    {
      id: 'treatments',
      title: 'Active Treatments',
      subtitle: '2 ongoing',
      icon: Activity,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      badge: 2,
      action: () => navigate('/treatments')
    },
    {
      id: 'guides',
      title: 'Cultivation Guides',
      subtitle: 'Growing tips',
      icon: Sprout,
      bgColor: 'bg-agri-light',
      iconColor: 'text-agri-primary',
      action: () => navigate('/guides')
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
          <LanguageSwitcher />
          
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
        {/* Weather & Advisory Section */}
        <div className="space-y-4">
          {/* Weather Alert Banner */}
          <div className="bg-orange-50 border-l-4 border-orange-400 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              <div>
                <h3 className="font-bold text-orange-900 text-sm">Weather Alert</h3>
                <p className="text-orange-800 text-sm">Rain expected – avoid spraying today</p>
              </div>
            </div>
          </div>

          {/* Weather Card */}
          <Card className="weather-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/50 rounded-2xl flex items-center justify-center">
                    <Cloud className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-900">28°C</div>
                    <div className="text-lg text-blue-800">Partly Cloudy</div>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="flex items-center space-x-2">
                    <Sun className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-blue-700">32°/24°</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Droplets className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-700">15%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Farming Tip */}
        <Card className="tip-card border-0">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-amber-900 text-lg mb-1">Today's Farming Tip</h3>
                <p className="text-amber-800 text-sm leading-relaxed">
                  Early morning (6-8 AM) is optimal for pesticide application - calm winds reduce drift.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Soil & Fertilizer Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-text-secondary">Soil & Fertilizer</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card className="plant-card cursor-pointer" onClick={() => navigate('/soil-health')}>
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-brown-50 rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <TestTube className="w-6 h-6 text-amber-700" />
                </div>
                <h3 className="font-semibold text-text-secondary text-sm mb-1">Soil Health</h3>
                <p className="text-agri-gray text-xs">Check soil →</p>
              </CardContent>
            </Card>
            
            <Card className="plant-card cursor-pointer" onClick={() => navigate('/fertilizer-guide')}>
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-agri-light rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <Beaker className="w-6 h-6 text-agri-primary" />
                </div>
                <h3 className="font-semibold text-text-secondary text-sm mb-1">Fertilizer Guide</h3>
                <p className="text-agri-gray text-xs">Get advice →</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Marketplace Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-text-secondary">Marketplace</h2>
          
          {/* Market Prices */}
          <Card className="plant-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-text-secondary">Today's Mandi Prices</h3>
                <TrendingUp className="w-5 h-5 text-agri-success" />
              </div>
              <div className="space-y-2">
                {marketPrices.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-agri-gray">{item.crop}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-text-secondary">{item.price}</span>
                      <div className={`w-2 h-2 rounded-full ${item.trend === 'up' ? 'bg-agri-success' : 'bg-agri-danger'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Marketplace Actions */}
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <Card
                key={action.id}
                className="plant-card cursor-pointer transition-all duration-300 transform hover:scale-105"
                onClick={action.action}
              >
                <CardContent className="p-4 text-center relative">
                  {action.badge && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <div className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {action.badge}
                      </div>
                    </div>
                  )}
                  
                  <div className={`w-12 h-12 ${action.bgColor} rounded-xl flex items-center justify-center mb-3 mx-auto`}>
                    <action.icon className={`w-6 h-6 ${action.iconColor}`} />
                  </div>
                  
                  <h3 className="font-semibold text-text-secondary text-sm mb-1">{action.title}</h3>
                  <p className="text-agri-gray text-xs">{action.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* My Farm Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-text-secondary">My Farm</h2>
          
          {/* AI Diagnosis Feature */}
          <div className="relative overflow-hidden rounded-2xl bg-agri-primary p-6 text-white shadow-large">
            <div className="absolute top-4 left-4">
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-xs font-semibold">AI Powered</span>
              </div>
            </div>
            
            <div className="relative z-10 mt-8">
              <h3 className="text-xl font-bold mb-2">AI Plant Diagnosis</h3>
              <p className="text-white/90 mb-6">Upload Photo → Detect Disease</p>
              
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
          </div>
          
          {/* Farm Actions */}
          <div className="grid grid-cols-2 gap-4">
            {farmActions.map((action) => (
              <Card
                key={action.id}
                className="plant-card cursor-pointer transition-all duration-300 transform hover:scale-105"
                onClick={action.action}
              >
                <CardContent className="p-4 text-center relative">
                  {action.badge && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <div className="bg-agri-danger text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] h-6 flex items-center justify-center">
                        {action.badge}
                      </div>
                    </div>
                  )}
                  
                  <div className={`w-12 h-12 ${action.bgColor} rounded-xl flex items-center justify-center mb-3 mx-auto`}>
                    <action.icon className={`w-6 h-6 ${action.iconColor}`} />
                  </div>
                  
                  <h3 className="font-semibold text-text-secondary text-sm mb-1">{action.title}</h3>
                  <p className="text-agri-gray text-xs">{action.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>


        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-text-secondary">Recent Activity</h2>
          
          <div className="space-y-3">
            <Card className="plant-card">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-agri-light rounded-lg flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-agri-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-text-secondary">Tomato disease diagnosed</p>
                    <p className="text-sm text-agri-gray">2 hours ago</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-agri-gray" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="plant-card">
              <CardContent className="p-4">
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Only 4 Tabs */}
      <div className="mobile-bottom-nav">
        <div className="flex items-center justify-around py-4">
          <button className="flex flex-col items-center space-y-1 px-4 py-2">
            <HomeIcon className="w-7 h-7 text-agri-primary" />
            <span className="text-xs font-medium text-agri-primary">Home</span>
          </button>
          
          <button 
            onClick={() => navigate('/diagnose')}
            className="flex flex-col items-center space-y-1 px-4 py-2 transition-all duration-200 hover:bg-agri-light rounded-lg"
          >
            <Camera className="w-7 h-7 text-agri-gray" />
            <span className="text-xs text-agri-gray">Diagnose</span>
          </button>
          
          <button 
            onClick={() => navigate('/shop')}
            className="flex flex-col items-center space-y-1 px-4 py-2 transition-all duration-200 hover:bg-agri-light rounded-lg"
          >
            <Store className="w-7 h-7 text-agri-gray" />
            <span className="text-xs text-agri-gray">Shop</span>
          </button>
          
          <button 
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center space-y-1 px-4 py-2 transition-all duration-200 hover:bg-agri-light rounded-lg"
          >
            <User className="w-7 h-7 text-agri-gray" />
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
