import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  Camera, 
  MapPin, 
  Calendar,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Star,
  MessageCircle,
  Phone,
  Heart,
  Share2,
  MoreVertical,
  Package,
  Truck,
  DollarSign,
  ShoppingCart,
  Bell,
  CheckCircle,
  Clock,
  User,
  Navigation,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

const SellProduce = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('sell-now');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSellDialog, setShowSellDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pricePerKg, setPricePerKg] = useState('');
  const [description, setDescription] = useState('');
  const [showMarketRequests, setShowMarketRequests] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
  const [farmerLocation, setFarmerLocation] = useState('');

  const products = [
    { id: 'tomatoes', name: 'Tomatoes', category: 'Vegetables', avgPrice: 25 },
    { id: 'wheat', name: 'Wheat', category: 'Grains', avgPrice: 22 },
    { id: 'onions', name: 'Onions', category: 'Vegetables', avgPrice: 18 },
    { id: 'rice', name: 'Rice', category: 'Grains', avgPrice: 35 },
    { id: 'potatoes', name: 'Potatoes', category: 'Vegetables', avgPrice: 12 },
    { id: 'chili', name: 'Green Chilies', category: 'Spices', avgPrice: 80 },
    { id: 'sugarcane', name: 'Sugarcane', category: 'Cash Crops', avgPrice: 3 },
    { id: 'cotton', name: 'Cotton', category: 'Cash Crops', avgPrice: 55 }
  ];

  const marketRequests = [
    {
      id: '1',
      marketName: 'FreshMart Wholesale',
      location: 'Lucknow, UP - 15km away',
      requestedQuantity: '500 kg',
      offeredPrice: 27,
      responseTime: '2 hours ago',
      status: 'pending',
      rating: 4.5,
      established: '2018'
    },
    {
      id: '2',
      marketName: 'Green Valley Market',
      location: 'Hardoi, UP - 8km away',
      requestedQuantity: '300 kg',
      offeredPrice: 26,
      responseTime: '4 hours ago',
      status: 'pending',
      rating: 4.2,
      established: '2020'
    },
    {
      id: '3',
      marketName: 'Kisan Bazaar',
      location: 'Sitapur, UP - 25km away',
      requestedQuantity: '800 kg',
      offeredPrice: 25,
      responseTime: '6 hours ago',
      status: 'pending',
      rating: 4.7,
      established: '2015'
    }
  ];

  const transportOptions = [
    {
      id: '1',
      vehicleType: 'Pickup Truck',
      capacity: '1000 kg',
      rate: '₹5 per km',
      estimatedTime: '30-45 mins',
      driverName: 'Rajesh Kumar',
      rating: 4.8,
      phone: '+91 98765 43210'
    },
    {
      id: '2',
      vehicleType: 'Mini Truck',
      capacity: '2000 kg',
      rate: '₹8 per km',
      estimatedTime: '45-60 mins',
      driverName: 'Suresh Singh',
      rating: 4.6,
      phone: '+91 98765 43211'
    }
  ];

  const myListings = [
    {
      id: '1',
      title: 'Fresh Organic Tomatoes',
      category: 'Vegetables',
      quantity: '500 kg',
      price: 25,
      unit: 'per kg',
      location: 'Village Rampur, Hardoi, UP',
      postedDate: '2024-01-20',
      status: 'active',
      views: 156,
      inquiries: 8,
      image: '/placeholder.svg',
      description: 'Premium quality organic tomatoes, freshly harvested',
      harvestDate: '2024-01-19',
      grade: 'A+',
      features: ['Organic', 'Fresh', 'Premium Quality']
    },
    {
      id: '2',
      title: 'Premium Wheat - Grade A',
      category: 'Grains',
      quantity: '2000 kg',
      price: 22,
      unit: 'per kg',
      location: 'Village Rampur, Hardoi, UP',
      postedDate: '2024-01-18',
      status: 'sold',
      views: 234,
      inquiries: 15,
      image: '/placeholder.svg',
      description: 'High quality wheat grain, proper moisture content',
      harvestDate: '2024-01-15',
      grade: 'A',
      soldPrice: 23,
      soldDate: '2024-01-21',
      features: ['Premium', 'Grade A', 'Bulk Available']
    },
    {
      id: '3',
      title: 'Fresh Green Chilies',
      category: 'Spices',
      quantity: '100 kg',
      price: 80,
      unit: 'per kg',
      location: 'Village Rampur, Hardoi, UP',
      postedDate: '2024-01-22',
      status: 'pending',
      views: 89,
      inquiries: 4,
      image: '/placeholder.svg',
      description: 'Spicy fresh green chilies, perfect for cooking',
      harvestDate: '2024-01-21',
      grade: 'A',
      features: ['Spicy', 'Fresh', 'Local Variety']
    }
  ];

  const marketPrices = [
    { product: 'Tomatoes', currentPrice: 25, change: +2, trend: 'up' },
    { product: 'Wheat', currentPrice: 22, change: -1, trend: 'down' },
    { product: 'Onions', currentPrice: 18, change: +3, trend: 'up' },
    { product: 'Potatoes', currentPrice: 12, change: 0, trend: 'stable' }
  ];

  const buyerRequirements = [
    {
      id: '1',
      buyer: 'FreshMart Wholesale',
      product: 'Organic Vegetables',
      quantity: '1000 kg',
      budget: '₹20-30 per kg',
      location: 'Lucknow, UP',
      posted: '2 hours ago',
      urgent: true
    },
    {
      id: '2',
      buyer: 'Grain Traders Co.',
      product: 'Premium Wheat',
      quantity: '5000 kg',
      budget: '₹21-25 per kg',
      location: 'Kanpur, UP',
      posted: '1 day ago',
      urgent: false
    },
    {
      id: '3',
      buyer: 'Spice House',
      product: 'Green Chilies',
      quantity: '200 kg',
      budget: '₹75-85 per kg',
      location: 'Delhi',
      posted: '3 days ago',
      urgent: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-agri-success text-white';
      case 'sold': return 'bg-agri-primary text-white';
      case 'pending': return 'bg-agri-warning text-white';
      case 'expired': return 'bg-agri-danger text-white';
      default: return 'bg-agri-gray text-white';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      default: return '→';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-agri-success';
      case 'down': return 'text-agri-danger';
      default: return 'text-agri-gray';
    }
  };

  return (
    <div className="mobile-container bg-agri-light-gray">
      {/* Header */}
      <div className="mobile-header">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate('/home')}>
            <ArrowLeft className="w-6 h-6 text-agri-gray" />
          </button>
          <h1 className="text-xl font-bold text-text-secondary">Sell Produce</h1>
        </div>
        
        <button onClick={() => navigate('/sell/new')}>
          <Plus className="w-6 h-6 text-agri-primary" />
        </button>
      </div>

      {/* Content */}
      <div className="mobile-content space-y-6 pt-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 text-center shadow-soft">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-text-secondary">{myListings.length}</p>
            <p className="text-sm text-agri-gray">Total Listings</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 text-center shadow-soft">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-text-secondary">
              {myListings.reduce((sum, listing) => sum + listing.views, 0)}
            </p>
            <p className="text-sm text-agri-gray">Total Views</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 text-center shadow-soft">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-text-secondary">
              {myListings.filter(l => l.status === 'sold').length}
            </p>
            <p className="text-sm text-agri-gray">Sold</p>
          </div>
        </div>

        {/* Add New Listing Banner */}
        <div className="gradient-primary rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-2">Sell Your Fresh Produce</h2>
            <p className="text-white/90 mb-4">Reach thousands of buyers across India</p>
            <Button 
              onClick={() => navigate('/sell/new')}
              className="bg-white text-agri-primary hover:bg-white/90 font-semibold flex items-center space-x-2"
            >
              <Camera className="w-5 h-5" />
              <span>Create New Listing</span>
            </Button>
          </div>
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute -right-8 -top-8 w-20 h-20 bg-white/5 rounded-full" />
        </div>

        {/* Navigation Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white rounded-xl p-1">
            <TabsTrigger value="sell-now" className="text-sm">Sell Now</TabsTrigger>
            <TabsTrigger value="my-listings" className="text-sm">My Listings</TabsTrigger>
            <TabsTrigger value="market-prices" className="text-sm">Prices</TabsTrigger>
            <TabsTrigger value="buyer-requirements" className="text-sm">Buyers</TabsTrigger>
          </TabsList>

          {/* Sell Now Tab - New Primary Tab */}
          <TabsContent value="sell-now" className="space-y-4 mt-4">
            <Card className="bg-white rounded-2xl shadow-soft border border-agri-light-gray">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-text-secondary flex items-center space-x-2">
                  <ShoppingCart className="w-6 h-6 text-agri-primary" />
                  <span>Start Selling</span>
                </CardTitle>
                <CardDescription>Choose what you want to sell and get connected with nearby markets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Product Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-text-secondary mb-3">Select Your Product</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {products.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => setSelectedProduct(product.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedProduct === product.id
                            ? 'border-agri-primary bg-agri-light'
                            : 'border-agri-light-gray bg-white hover:border-agri-primary/50'
                        }`}
                      >
                        <div className="text-left">
                          <p className="font-medium text-text-secondary">{product.name}</p>
                          <p className="text-sm text-agri-gray">{product.category}</p>
                          <p className="text-sm text-agri-primary font-semibold">₹{product.avgPrice}/kg avg</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedProduct && (
                  <>
                    {/* Quantity & Price */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">Quantity (kg)</label>
                        <Input
                          type="number"
                          placeholder="Enter quantity"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          className="text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">Price per kg (₹)</label>
                        <Input
                          type="number"
                          placeholder="Your price"
                          value={pricePerKg}
                          onChange={(e) => setPricePerKg(e.target.value)}
                          className="text-base"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Product Description</label>
                      <Textarea
                        placeholder="Describe your product quality, harvest date, etc."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="text-base"
                        rows={3}
                      />
                    </div>

                    {/* Total Estimate */}
                    {quantity && pricePerKg && (
                      <div className="bg-agri-light rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-text-secondary font-medium">Total Estimated Value:</span>
                          <span className="text-2xl font-bold text-agri-primary">₹{(parseInt(quantity) * parseInt(pricePerKg)).toLocaleString()}</span>
                        </div>
                      </div>
                    )}

                    {/* Submit Request */}
                    <Button 
                      onClick={() => setShowMarketRequests(true)}
                      disabled={!quantity || !pricePerKg}
                      className="w-full bg-agri-primary hover:bg-agri-primary/90 text-white py-3 text-lg font-semibold"
                    >
                      <Bell className="w-5 h-5 mr-2" />
                      Send Request to Markets
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Market Requests Dialog */}
            <Dialog open={showMarketRequests} onOpenChange={setShowMarketRequests}>
              <DialogContent className="max-w-md mx-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-agri-primary" />
                    <span>Market Responses</span>
                  </DialogTitle>
                  <DialogDescription>
                    Markets near you are interested in your {products.find(p => p.id === selectedProduct)?.name}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {marketRequests.map((request) => (
                    <div key={request.id} className="border border-agri-light-gray rounded-xl p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-text-secondary">{request.marketName}</h4>
                          <p className="text-sm text-agri-gray flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {request.location}
                          </p>
                        </div>
                        <Badge className="bg-agri-primary text-white">
                          ⭐ {request.rating}
                        </Badge>
                      </div>
                      
                      <div className="bg-agri-light rounded-lg p-3 mb-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-agri-gray">Quantity:</span>
                            <p className="font-semibold">{request.requestedQuantity}</p>
                          </div>
                          <div>
                            <span className="text-agri-gray">Price Offered:</span>
                            <p className="font-semibold text-agri-primary">₹{request.offeredPrice}/kg</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-agri-success hover:bg-agri-success/90"
                          onClick={() => {
                            setSelectedRequest(request);
                            setShowDeliveryOptions(true);
                            setShowMarketRequests(false);
                          }}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Accept
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            {/* Delivery Options Dialog */}
            <Dialog open={showDeliveryOptions} onOpenChange={setShowDeliveryOptions}>
              <DialogContent className="max-w-md mx-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <Truck className="w-5 h-5 text-agri-primary" />
                    <span>Choose Delivery Method</span>
                  </DialogTitle>
                  <DialogDescription>
                    How would you like to deliver your produce to {selectedRequest?.marketName}?
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  {/* Self Delivery */}
                  <div className="border border-agri-light-gray rounded-xl p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-secondary">Self Delivery</h4>
                        <p className="text-sm text-agri-gray">Take your produce to the market yourself</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 mb-3">
                      <p className="text-sm"><strong>Market Address:</strong> {selectedRequest?.location}</p>
                      <p className="text-sm text-agri-gray mt-1">No additional transport cost</p>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Navigation className="w-4 h-4 mr-2" />
                      Choose Self Delivery
                    </Button>
                  </div>

                  {/* Transport Service */}
                  <div className="border border-agri-light-gray rounded-xl p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Truck className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-secondary">Transport Service</h4>
                        <p className="text-sm text-agri-gray">Vehicle will come to your location</p>
                      </div>
                    </div>
                    
                    {/* Location Input */}
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-text-secondary mb-2">Your Location</label>
                      <Input
                        placeholder="Enter your complete address"
                        value={farmerLocation}
                        onChange={(e) => setFarmerLocation(e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    
                    {/* Transport Options */}
                    <div className="space-y-2 mb-3">
                      {transportOptions.map((transport) => (
                        <div key={transport.id} className="bg-green-50 rounded-lg p-3 border border-green-200">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium text-text-secondary">{transport.vehicleType}</p>
                              <p className="text-sm text-agri-gray">Driver: {transport.driverName} ⭐ {transport.rating}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold text-agri-primary">{transport.rate}</p>
                              <p className="text-xs text-agri-gray">{transport.estimatedTime}</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="w-full border-green-600 text-green-600">
                            <Phone className="w-3 h-3 mr-1" />
                            Book {transport.vehicleType}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setShowDeliveryOptions(false)}
                  >
                    Choose Later
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* My Listings Tab */}
          <TabsContent value="my-listings" className="space-y-4 mt-4">
            {myListings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-2xl p-6 shadow-soft border border-agri-light-gray">
                {/* Listing Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-16 h-16 bg-agri-light rounded-xl flex items-center justify-center">
                      <Package className="w-8 h-8 text-agri-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-text-secondary">{listing.title}</h3>
                      <p className="text-sm text-agri-gray">{listing.category} • {listing.quantity}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="w-3 h-3 text-agri-gray" />
                        <span className="text-xs text-agri-gray">{listing.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(listing.status)}>
                      {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                    </Badge>
                    <button>
                      <MoreVertical className="w-5 h-5 text-agri-gray" />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="bg-agri-light rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-agri-primary">₹{listing.price}</p>
                      <p className="text-sm text-agri-gray">{listing.unit}</p>
                    </div>
                    {listing.status === 'sold' && listing.soldPrice && (
                      <div className="text-right">
                        <p className="text-lg font-semibold text-agri-success">Sold for ₹{listing.soldPrice}</p>
                        <p className="text-xs text-agri-gray">on {new Date(listing.soldDate!).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Eye className="w-4 h-4 text-agri-gray" />
                      <span className="font-semibold text-text-secondary">{listing.views}</span>
                    </div>
                    <p className="text-xs text-agri-gray">Views</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <MessageCircle className="w-4 h-4 text-agri-gray" />
                      <span className="font-semibold text-text-secondary">{listing.inquiries}</span>
                    </div>
                    <p className="text-xs text-agri-gray">Inquiries</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Calendar className="w-4 h-4 text-agri-gray" />
                      <span className="font-semibold text-text-secondary">{new Date(listing.postedDate).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-agri-gray">Posted</p>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {listing.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs px-2 py-1 border-agri-primary text-agri-primary">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  {listing.status === 'active' && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-agri-primary text-agri-primary hover:bg-agri-light"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-agri-gray text-agri-gray hover:bg-agri-light-gray"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  
                  {listing.status === 'sold' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-agri-success text-agri-success hover:bg-green-50"
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Rate Buyer
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-agri-danger text-agri-danger hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Market Prices Tab */}
          <TabsContent value="market-prices" className="space-y-4 mt-4">
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-text-secondary mb-4">Today's Market Prices</h3>
              <div className="space-y-4">
                {marketPrices.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-agri-light rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-agri-primary rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-text-secondary">{item.product}</p>
                        <p className="text-sm text-agri-gray">per kg</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold text-text-secondary">₹{item.currentPrice}</p>
                      <div className={`flex items-center space-x-1 ${getTrendColor(item.trend)}`}>
                        <span className="text-sm">{getTrendIcon(item.trend)}</span>
                        <span className="text-sm font-medium">
                          {item.change > 0 ? '+' : ''}{item.change}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-4 border-agri-primary text-agri-primary hover:bg-agri-light"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                View Detailed Market Trends
              </Button>
            </div>
          </TabsContent>

          {/* Buyer Requirements Tab */}
          <TabsContent value="buyer-requirements" className="space-y-4 mt-4">
            <div className="relative mb-4">
              <Input
                placeholder="Search buyer requirements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 py-3 text-base bg-white border-agri-light-gray rounded-xl"
              />
            </div>

            {buyerRequirements.map((requirement) => (
              <div key={requirement.id} className="bg-white rounded-2xl p-6 shadow-soft border border-agri-light-gray">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-text-secondary">{requirement.buyer}</h3>
                      {requirement.urgent && (
                        <Badge className="bg-agri-danger text-white text-xs">Urgent</Badge>
                      )}
                    </div>
                    <p className="text-sm text-agri-gray mb-1">Looking for: {requirement.product}</p>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3 h-3 text-agri-gray" />
                      <span className="text-xs text-agri-gray">{requirement.location}</span>
                    </div>
                  </div>
                  
                  <span className="text-xs text-agri-gray">{requirement.posted}</span>
                </div>

                <div className="bg-agri-light rounded-xl p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-text-secondary">Quantity Needed</p>
                      <p className="text-lg font-bold text-agri-primary">{requirement.quantity}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-secondary">Budget Range</p>
                      <p className="text-lg font-bold text-agri-primary">{requirement.budget}</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-agri-primary hover:bg-agri-secondary text-white"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Buyer
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-agri-primary text-agri-primary hover:bg-agri-light"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        {/* Help Section */}
        <div className="bg-white rounded-2xl p-6 shadow-soft">
          <h3 className="text-lg font-semibold text-text-secondary mb-4">Selling Tips</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-agri-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <p className="text-sm text-agri-gray">Take clear, well-lit photos of your produce</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-agri-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <p className="text-sm text-agri-gray">Set competitive prices based on market rates</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-agri-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <p className="text-sm text-agri-gray">Respond quickly to buyer inquiries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellProduce;