import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  ShoppingCart, 
  Star, 
  Heart,
  Plus,
  Minus,
  Package,
  Truck,
  Shield,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Shop = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState<{[key: string]: number}>({});

  const categories = [
    { id: 'all', name: 'All Products', icon: Package },
    { id: 'fertilizers', name: 'Fertilizers', icon: Zap },
    { id: 'seeds', name: 'Seeds', icon: Package },
    { id: 'pesticides', name: 'Pesticides', icon: Shield },
    { id: 'tools', name: 'Tools', icon: Package }
  ];

  const products = [
    {
      id: '1',
      name: 'Organic NPK Fertilizer',
      brand: 'FarmGrow',
      price: 245,
      originalPrice: 299,
      rating: 4.5,
      reviews: 1243,
      image: '/placeholder.svg',
      category: 'fertilizers',
      inStock: true,
      bestseller: true,
      description: 'Complete nutrition for all crops',
      size: '1kg',
      features: ['Organic', 'Fast Acting', 'All Crops']
    },
    {
      id: '2',
      name: 'Tomato Hybrid Seeds',
      brand: 'SeedMaster',
      price: 120,
      originalPrice: 150,
      rating: 4.8,
      reviews: 856,
      image: '/placeholder.svg',
      category: 'seeds',
      inStock: true,
      bestseller: false,
      description: 'High yield disease resistant',
      size: '50g',
      features: ['Hybrid', 'Disease Resistant', 'High Yield']
    },
    {
      id: '3',
      name: 'Copper Fungicide Spray',
      brand: 'CropCare',
      price: 180,
      originalPrice: 210,
      rating: 4.3,
      reviews: 634,
      image: '/placeholder.svg',
      category: 'pesticides',
      inStock: true,
      bestseller: false,
      description: 'Effective against fungal diseases',
      size: '500ml',
      features: ['Fungicide', 'Long Lasting', 'Safe']
    },
    {
      id: '4',
      name: 'Premium Garden Spade',
      brand: 'ToolMaster',
      price: 350,
      originalPrice: 420,
      rating: 4.6,
      reviews: 432,
      image: '/placeholder.svg',
      category: 'tools',
      inStock: false,
      bestseller: false,
      description: 'Durable steel construction',
      size: 'Standard',
      features: ['Steel', 'Ergonomic', 'Durable']
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId: string) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 0) - 1, 0)
    }));
  };

  const getTotalItems = () => {
    return Object.values(cartItems).reduce((sum, count) => sum + count, 0);
  };

  return (
    <div className="mobile-container bg-agri-light-gray">
      {/* Header */}
      <div className="mobile-header">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate('/home')}>
            <ArrowLeft className="w-6 h-6 text-agri-gray" />
          </button>
          <h1 className="text-xl font-bold text-text-secondary">Shop</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-agri-gray" />
            {getTotalItems() > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-agri-danger rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">{getTotalItems()}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mobile-content space-y-6 pt-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-agri-gray" />
          <Input
            placeholder="Search fertilizers, seeds, tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-12 py-3 text-base bg-white border-agri-light-gray rounded-xl"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Filter className="w-5 h-5 text-agri-gray" />
          </button>
        </div>

        {/* Categories */}
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-agri-primary text-white'
                  : 'bg-white text-agri-gray border border-agri-light-gray'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Featured Banner */}
        <div className="gradient-primary rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-2">
              <Truck className="w-5 h-5" />
              <span className="text-sm font-semibold">Free Delivery</span>
            </div>
            <h2 className="text-xl font-bold mb-2">Orders above ₹500</h2>
            <p className="text-white/90 text-sm">Get premium agricultural products delivered free to your doorstep</p>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full" />
          <div className="absolute -right-8 -top-8 w-16 h-16 bg-white/5 rounded-full" />
        </div>

        {/* Products Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-text-secondary">
              {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <span className="text-sm text-agri-gray">{filteredProducts.length} products</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl p-4 shadow-soft border border-agri-light-gray">
                <div className="flex space-x-4">
                  {/* Product Image */}
                  <div className="relative">
                    <div className="w-20 h-20 bg-agri-light rounded-xl flex items-center justify-center">
                      <Package className="w-8 h-8 text-agri-primary" />
                    </div>
                    {product.bestseller && (
                      <Badge className="absolute -top-2 -right-2 bg-agri-warning text-white text-xs px-2 py-1">
                        Bestseller
                      </Badge>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-text-secondary text-sm">{product.name}</h3>
                        <p className="text-xs text-agri-gray mt-1">{product.brand} • {product.size}</p>
                        
                        {/* Rating */}
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium">{product.rating}</span>
                          </div>
                          <span className="text-xs text-agri-gray">({product.reviews})</span>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {product.features.slice(0, 2).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs px-2 py-0.5 border-agri-primary text-agri-primary">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <button className="p-2">
                        <Heart className="w-5 h-5 text-agri-gray" />
                      </button>
                    </div>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-text-secondary">₹{product.price}</span>
                        <span className="text-sm text-agri-gray line-through">₹{product.originalPrice}</span>
                      </div>

                      {product.inStock ? (
                        <div className="flex items-center space-x-2">
                          {cartItems[product.id] > 0 ? (
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => removeFromCart(product.id)}
                                className="w-8 h-8 bg-agri-light rounded-lg flex items-center justify-center"
                              >
                                <Minus className="w-4 h-4 text-agri-primary" />
                              </button>
                              <span className="font-semibold text-text-secondary min-w-[20px] text-center">
                                {cartItems[product.id]}
                              </span>
                              <button
                                onClick={() => addToCart(product.id)}
                                className="w-8 h-8 bg-agri-primary rounded-lg flex items-center justify-center"
                              >
                                <Plus className="w-4 h-4 text-white" />
                              </button>
                            </div>
                          ) : (
                            <Button
                              onClick={() => addToCart(product.id)}
                              size="sm"
                              className="bg-agri-primary hover:bg-agri-secondary text-white px-4 py-2 rounded-lg"
                            >
                              Add
                            </Button>
                          )}
                        </div>
                      ) : (
                        <Badge variant="outline" className="text-agri-danger border-agri-danger">
                          Out of Stock
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Cart */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-sm px-4">
          <Button 
            onClick={() => {
              // Store cart items in localStorage for the cart page
              localStorage.setItem('cart_items', JSON.stringify(
                Object.entries(cartItems).map(([id, quantity]) => {
                  const product = products.find(p => p.id === id);
                  return { ...product, quantity };
                }).filter(item => item.quantity > 0)
              ));
              navigate('/cart');
            }}
            className="w-full bg-agri-primary hover:bg-agri-secondary text-white py-4 rounded-xl shadow-large flex items-center justify-between"
          >
            <span className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5" />
              <span>View Cart ({getTotalItems()} items)</span>
            </span>
            <span className="font-bold">₹{Object.entries(cartItems).reduce((total, [id, count]) => {
              const product = products.find(p => p.id === id);
              return total + (product?.price || 0) * count;
            }, 0)}</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Shop;