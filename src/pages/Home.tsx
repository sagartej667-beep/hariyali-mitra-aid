
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
  ArrowRight,
  Volume2,
  BookOpen,
  BarChart3,
  List,
  ChevronRight,
  CloudRain,
  Thermometer
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
        {/* Weather Card - Compact */}
        <Card className="weather-card border-0 shadow-medium">
          <CardContent className="p-4">
            {/* Header with location and more info */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Pune, Maharashtra</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-blue-700 hover:bg-blue-50 p-1 h-6"
                  onClick={() => {/* Voice function */}}
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="bg-white/70 border-blue-200 hover:bg-white text-blue-700 text-xs h-6 px-2"
                  onClick={() => navigate('/weather')}
                >
                  More
                </Button>
              </div>
            </div>

            {/* Compact weather display */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/60 rounded-xl flex items-center justify-center">
                  <Cloud className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-900">30°C</div>
                  <div className="text-sm text-blue-700">Partly Cloudy</div>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="flex items-center space-x-1">
                  <Thermometer className="w-3 h-3 text-yellow-600" />
                  <span className="text-xs text-blue-700">32°/24°</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Droplets className="w-3 h-3 text-blue-600" />
                  <span className="text-xs text-blue-700">15%</span>
                </div>
              </div>
            </div>

            {/* Compact inline alert */}
            <div className="bg-orange-100 border border-orange-200 rounded-lg p-2 mt-3 flex items-center space-x-2">
              <CloudRain className="w-4 h-4 text-orange-600 flex-shrink-0" />
              <span className="text-xs font-medium text-orange-800">Rain expected today – avoid spraying</span>
            </div>
          </CardContent>
        </Card>

        {/* Today's Farming Tip - Moved up for better visibility */}
        <Card className="tip-card border-0">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-amber-900 text-base mb-1">Today's Farming Tip</h3>
                <p className="text-amber-800 text-sm leading-relaxed">
                  Early morning (6-8 AM) is optimal for pesticide application - calm winds reduce drift.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Plant Diagnosis - Compact Version */}
        <Card className="plant-card cursor-pointer" onClick={() => navigate('/diagnose')}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-agri-primary rounded-xl flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-secondary text-base mb-1">📸 Diagnose Crop Disease</h3>
                  <p className="text-agri-gray text-sm">Upload Photo → Detect Disease</p>
                  <div className="bg-agri-primary/10 text-agri-primary text-xs font-medium px-2 py-1 rounded-full inline-block mt-1">
                    AI Powered
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-agri-gray" />
            </div>
          </CardContent>
        </Card>

        {/* Soil & Fertilizer Cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-text-secondary">🧪 Soil & Fertilizer</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card className="plant-card cursor-pointer" onClick={() => navigate('/soil-health')}>
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <TestTube className="w-6 h-6 text-amber-700" />
                </div>
                <h3 className="font-semibold text-text-secondary text-sm mb-1">Soil Health</h3>
                <p className="text-agri-gray text-xs">Check Soil Health →</p>
              </CardContent>
            </Card>
            
            <Card className="plant-card cursor-pointer" onClick={() => navigate('/fertilizer-guide')}>
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-agri-light rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <Beaker className="w-6 h-6 text-agri-primary" />
                </div>
                <h3 className="font-semibold text-text-secondary text-sm mb-1">Fertilizer Guide</h3>
                <p className="text-agri-gray text-xs">Get Fertilizer Advice →</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Marketplace Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-text-secondary">🛒 Marketplace</h2>
          
          {/* Market Prices Preview */}
          <Card className="plant-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-text-secondary">Today's Mandi Prices</h3>
                <TrendingUp className="w-5 h-5 text-agri-success" />
              </div>
              <div className="space-y-2 mb-4">
                {marketPrices.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-agri-gray">{item.crop}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-text-secondary">{item.price}</span>
                      <div className={`w-2 h-2 rounded-full ${item.trend === 'up' ? 'bg-agri-success' : 'bg-agri-danger'}`} />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Marketplace Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/market-prices')}
                  className="flex items-center space-x-2 justify-center"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>See All Prices</span>
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => navigate('/sell')}
                  className="bg-agri-success hover:bg-agri-success/90 flex items-center space-x-2 justify-center"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Sell Crops</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Additional Marketplace Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="plant-card cursor-pointer" onClick={() => navigate('/shop')}>
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <ShoppingCart className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-text-secondary text-sm mb-1">Order Fertilizers</h3>
                <p className="text-agri-gray text-xs">Shop nutrients</p>
              </CardContent>
            </Card>
            
            <Card className="plant-card cursor-pointer" onClick={() => navigate('/shops')}>
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-agri-light-purple rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <MapPin className="w-6 h-6 text-agri-purple" />
                </div>
                <h3 className="font-semibold text-text-secondary text-sm mb-1">Nearby Shops</h3>
                <p className="text-agri-gray text-xs">Find agri stores</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* My Farm Section - 4 Cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-text-secondary">🌱 My Farm</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="plant-card cursor-pointer" onClick={() => navigate('/treatments')}>
              <CardContent className="p-4 text-center relative">
                <div className="absolute -top-2 -right-2 z-10">
                  <div className="bg-agri-danger text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] h-6 flex items-center justify-center">
                    2
                  </div>
                </div>
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <Activity className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-text-secondary text-sm mb-1">Active Treatments</h3>
                <p className="text-agri-gray text-xs">Track ongoing sprays</p>
              </CardContent>
            </Card>
            
            <Card className="plant-card cursor-pointer" onClick={() => navigate('/guides')}>
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-agri-light rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <BookOpen className="w-6 h-6 text-agri-primary" />
                </div>
                <h3 className="font-semibold text-text-secondary text-sm mb-1">Cultivation Guides</h3>
                <p className="text-agri-gray text-xs">Seasonal practices</p>
              </CardContent>
            </Card>
            
            <Card className="plant-card cursor-pointer" onClick={() => navigate('/orders')}>
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-agri-light-blue rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <Package className="w-6 h-6 text-agri-info" />
                </div>
                <h3 className="font-semibold text-text-secondary text-sm mb-1">My Orders</h3>
                <p className="text-agri-gray text-xs">Track fertilizer purchases</p>
              </CardContent>
            </Card>
            
            <Card className="plant-card cursor-pointer" onClick={() => navigate('/listings')}>
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <List className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-text-secondary text-sm mb-1">My Listings</h3>
                <p className="text-agri-gray text-xs">Track crops for selling</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - 5 Tabs */}
      <div className="mobile-bottom-nav">
        <div className="flex items-center justify-between px-2 py-3">
          <button className="flex flex-col items-center space-y-1 px-3 py-2 min-w-0">
            <HomeIcon className="w-6 h-6 text-agri-primary" />
            <span className="text-xs font-medium text-agri-primary">Home</span>
          </button>
          
          <button 
            onClick={() => navigate('/diagnose')}
            className="flex flex-col items-center space-y-1 px-3 py-2 transition-all duration-200 hover:bg-agri-light rounded-lg min-w-0"
          >
            <Camera className="w-6 h-6 text-agri-gray" />
            <span className="text-xs text-agri-gray">Diagnose</span>
          </button>
          
          <button 
            onClick={() => navigate('/advisory')}
            className="flex flex-col items-center space-y-1 px-3 py-2 transition-all duration-200 hover:bg-agri-light rounded-lg min-w-0"
          >
            <BookOpen className="w-6 h-6 text-agri-gray" />
            <span className="text-xs text-agri-gray">Advisory</span>
          </button>
          
          <button 
            onClick={() => navigate('/shop')}
            className="flex flex-col items-center space-y-1 px-3 py-2 transition-all duration-200 hover:bg-agri-light rounded-lg min-w-0"
          >
            <Store className="w-6 h-6 text-agri-gray" />
            <span className="text-xs text-agri-gray">Shop</span>
          </button>
          
          <button 
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center space-y-1 px-3 py-2 transition-all duration-200 hover:bg-agri-light rounded-lg min-w-0"
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
