import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Phone, 
  MapPin, 
  Calendar,
  Globe,
  Activity,
  Droplets,
  TrendingUp,
  ShoppingBag,
  Plus,
  Share,
  MessageCircle,
  Settings,
  Bell,
  WifiOff,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: 'Ramu Ji',
    phone: '+91 98765 43210',
    birthDate: '15 March 1985',
    location: 'Hyderabad',
    state: 'Telangana',
    pincode: '500001',
    language: 'English',
    avatar: null
  });

  const [notifications, setNotifications] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);

  const farmingStats = [
    { 
      icon: Activity, 
      value: '12', 
      label: 'Disease Scans',
      subtitle: 'scans this month',
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      progress: 70
    },
    { 
      icon: Droplets, 
      value: '3', 
      label: 'Active Treatments',
      subtitle: 'crops under treatment',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      progress: 50
    },
    { 
      icon: TrendingUp, 
      value: '₹12,450', 
      label: 'Total Revenue',
      subtitle: 'earned this month',
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      progress: 85
    },
    { 
      icon: ShoppingBag, 
      value: '2', 
      label: 'Orders',
      subtitle: 'Pending delivery',
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      progress: 40
    }
  ];

  const produceListings = [
    {
      id: 1,
      name: 'Fresh Tomatoes',
      status: 'Live',
      quantity: '40kg',
      pricePerKg: '₹20/kg',
      totalPrice: '₹800',
      inquiries: 5,
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 2,
      name: 'Organic Potatoes',
      status: 'Sold',
      quantity: '25kg',
      pricePerKg: '₹15/kg',
      totalPrice: '₹375',
      inquiries: 3,
      statusColor: 'bg-gray-100 text-gray-800'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('kisanmitra_user');
    navigate('/login');
  };

  return (
    <div className="mobile-container bg-background">
      {/* Header */}
      <div className="mobile-header">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate('/home')}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-text-secondary">Profile</h1>
        </div>
      </div>

      <div className="mobile-content space-y-6 pt-4">
        {/* Profile Header Card */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
                RJ
              </div>
              <div>
                <h2 className="text-2xl font-bold">{userData.name}</h2>
                <div className="flex items-center space-x-2 mt-1">
                  <Phone className="w-4 h-4" />
                  <span className="text-green-100">{userData.phone}</span>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/profile/edit')}
              className="bg-green-400 hover:bg-green-300 text-green-800 border-0"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{userData.birthDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{userData.pincode}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{userData.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{userData.state}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>{userData.language}</span>
            </div>
          </div>
        </div>

        {/* Farming Summary */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="text-xl font-bold text-gray-900">Farming Summary</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {farmingStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-2xl flex items-center justify-center mb-4`}>
                  <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500 mb-3">{stat.subtitle}</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${stat.color}`}
                    style={{ width: `${stat.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Your Produce for Sale */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-orange-600" />
              <h3 className="text-xl font-bold text-gray-900">Your Produce for Sale</h3>
            </div>
            <Button 
              onClick={() => navigate('/sell-produce')}
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </Button>
          </div>

          <div className="space-y-4">
            {produceListings.map((produce) => (
              <div key={produce.id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <h4 className="text-lg font-semibold text-gray-900">{produce.name}</h4>
                    <Badge className={produce.statusColor}>
                      {produce.status}
                    </Badge>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Share className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span>{produce.quantity}</span>
                  <span>{produce.pricePerKg}</span>
                  <span className="text-green-600 font-semibold">{produce.totalPrice}</span>
                </div>
                
                <div className="flex items-center space-x-2 mt-2">
                  <MessageCircle className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-blue-500">{produce.inquiries} inquiries</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings & Support */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-6">
            <Settings className="w-5 h-5 text-gray-600" />
            <h3 className="text-xl font-bold text-gray-900">Settings & Support</h3>
          </div>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Contact Support</span>
              </div>
            </button>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Notifications</div>
                  <div className="text-sm text-gray-500">Receive alerts and updates</div>
                </div>
              </div>
              <div className={`w-12 h-6 rounded-full ${notifications ? 'bg-green-500' : 'bg-gray-300'} relative transition-colors`}>
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                <span className={`text-xs font-bold absolute inset-0 flex items-center justify-center text-white ${notifications ? 'pl-1' : 'pr-1'}`}>
                  {notifications ? 'On' : 'Off'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <WifiOff className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Offline Mode</div>
                  <div className="text-sm text-gray-500">Work without internet connection</div>
                </div>
              </div>
              <span className="text-gray-500 font-medium">Off</span>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-3 p-4 hover:bg-red-50 rounded-xl transition-colors"
          >
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <LogOut className="w-5 h-5 text-red-600" />
            </div>
            <span className="font-medium text-red-600">Logout</span>
          </button>
        </div>

        {/* Bottom spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default Profile;