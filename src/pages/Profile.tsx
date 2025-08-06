import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Edit, 
  Phone, 
  MapPin, 
  Globe,
  Bell,
  Shield,
  Heart,
  HelpCircle,
  LogOut,
  ChevronRight,
  Camera,
  Star,
  Trophy,
  Leaf,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: 'Ramesh Kumar',
    phone: '+91 98765 43210',
    location: 'Village Rampur, Dist. Hardoi, UP',
    pincode: '241001',
    language: 'Hindi',
    joinDate: '2023-06-15',
    avatar: null
  });

  const stats = [
    { label: 'Orders Placed', value: '24', icon: Trophy, color: 'text-agri-warning' },
    { label: 'Plants Diagnosed', value: '18', icon: Leaf, color: 'text-agri-success' },
    { label: 'Treatments Success', value: '94%', icon: Star, color: 'text-agri-info' }
  ];

  const menuSections = [
    {
      title: 'Account',
      items: [
        { icon: Edit, label: 'Edit Profile', action: () => navigate('/profile/edit') },
        { icon: Phone, label: 'Change Phone Number', action: () => navigate('/profile/phone') },
        { icon: MapPin, label: 'Manage Addresses', action: () => navigate('/profile/addresses') },
        { icon: Globe, label: 'Language Settings', action: () => navigate('/profile/language') }
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notifications', action: () => navigate('/profile/notifications') },
        { icon: Shield, label: 'Privacy & Security', action: () => navigate('/profile/privacy') },
        { icon: Heart, label: 'Wishlist', action: () => navigate('/profile/wishlist') },
        { icon: Settings, label: 'App Settings', action: () => navigate('/profile/settings') }
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help & FAQ', action: () => navigate('/help') },
        { icon: Phone, label: 'Contact Support', action: () => {} },
        { icon: Star, label: 'Rate App', action: () => {} }
      ]
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('kisanmitra_user');
    navigate('/login');
  };

  return (
    <div className="mobile-container bg-agri-light-gray">
      {/* Header */}
      <div className="mobile-header">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate('/home')}>
            <ArrowLeft className="w-6 h-6 text-agri-gray" />
          </button>
          <h1 className="text-xl font-bold text-text-secondary">Profile</h1>
        </div>
        
        <button onClick={() => navigate('/profile/edit')}>
          <Edit className="w-6 h-6 text-agri-gray" />
        </button>
      </div>

      {/* Content */}
      <div className="mobile-content space-y-6 pt-4">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-6 shadow-soft">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <Avatar className="w-16 h-16">
                <AvatarImage src={userData.avatar || ''} />
                <AvatarFallback className="bg-agri-primary text-white text-xl font-bold">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-agri-primary rounded-full flex items-center justify-center shadow-md">
                <Camera className="w-3 h-3 text-white" />
              </button>
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-bold text-text-secondary">{userData.name}</h2>
              <p className="text-agri-gray">{userData.phone}</p>
              <div className="flex items-center space-x-2 mt-1">
                <MapPin className="w-4 h-4 text-agri-gray" />
                <p className="text-sm text-agri-gray">{userData.location}</p>
              </div>
            </div>
          </div>

          {/* Farmer Badge */}
          <div className="flex items-center justify-between p-3 bg-agri-light rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-agri-primary rounded-xl flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-text-secondary">Smart Farmer</p>
                <p className="text-sm text-agri-gray">Member since {new Date(userData.joinDate).getFullYear()}</p>
              </div>
            </div>
            <Badge className="bg-agri-warning text-white">Premium</Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 text-center shadow-soft">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2 ${
                stat.color === 'text-agri-warning' ? 'bg-yellow-100' :
                stat.color === 'text-agri-success' ? 'bg-green-100' : 'bg-blue-100'
              }`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className="text-lg font-bold text-text-secondary">{stat.value}</p>
              <p className="text-xs text-agri-gray">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-white rounded-2xl shadow-soft overflow-hidden">
            <div className="px-6 py-4 border-b border-agri-light-gray">
              <h3 className="font-semibold text-text-secondary">{section.title}</h3>
            </div>
            
            <div className="divide-y divide-agri-light-gray">
              {section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-4 hover:bg-agri-light transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5 text-agri-gray" />
                    <span className="font-medium text-text-secondary">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-agri-gray" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-soft">
          <h3 className="font-semibold text-text-secondary mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/diagnose')}
              className="flex flex-col items-center p-4 bg-agri-light rounded-xl hover:bg-agri-light-gray transition-colors"
            >
              <div className="w-12 h-12 bg-agri-primary rounded-xl flex items-center justify-center mb-2">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-text-secondary">Diagnose Plant</span>
            </button>
            
            <button 
              onClick={() => navigate('/shop')}
              className="flex flex-col items-center p-4 bg-agri-light rounded-xl hover:bg-agri-light-gray transition-colors"
            >
              <div className="w-12 h-12 bg-agri-info rounded-xl flex items-center justify-center mb-2">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-text-secondary">Shop Products</span>
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-white rounded-2xl p-6 shadow-soft">
          <div className="text-center">
            <div className="w-16 h-16 bg-agri-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-text-secondary mb-2">KisanMitra</h3>
            <p className="text-agri-gray text-sm mb-4">Your Smart Farming Companion</p>
            <p className="text-xs text-agri-gray">Version 1.0.0</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-white rounded-2xl p-4 shadow-soft flex items-center justify-center space-x-3 hover:bg-red-50 transition-colors group"
        >
          <LogOut className="w-5 h-5 text-agri-danger group-hover:text-red-600" />
          <span className="font-medium text-agri-danger group-hover:text-red-600">Logout</span>
        </button>

        {/* Bottom Spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default Profile;