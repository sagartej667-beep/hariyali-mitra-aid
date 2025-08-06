import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin,
  Phone,
  Star,
  RotateCcw,
  Download,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Orders = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('all');

  // Get orders from localStorage (in real app, this would be from API)
  const getStoredOrders = () => {
    const stored = localStorage.getItem('farmer_orders');
    return stored ? JSON.parse(stored) : [];
  };

  const defaultOrders = [
    {
      id: 'ORD001',
      status: 'delivered',
      items: [
        { name: 'Organic NPK Fertilizer', quantity: 2, price: 245 },
        { name: 'Tomato Seeds', quantity: 1, price: 120 }
      ],
      total: 610,
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-17',
      address: 'Village Rampur, Dist. Hardoi, UP',
      trackingId: 'KM12345',
      paymentMethod: 'UPI'
    },
    {
      id: 'ORD002',
      status: 'shipped',
      items: [
        { name: 'Copper Fungicide Spray', quantity: 1, price: 180 }
      ],
      total: 180,
      orderDate: '2024-01-20',
      estimatedDelivery: '2024-01-22',
      address: 'Village Rampur, Dist. Hardoi, UP',
      trackingId: 'KM12346',
      paymentMethod: 'COD'
    }
  ];

  const [orders, setOrders] = useState(() => {
    const storedOrders = getStoredOrders();
    return storedOrders.length > 0 ? storedOrders : defaultOrders;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-agri-success text-white';
      case 'shipped': return 'bg-agri-info text-white';
      case 'processing': return 'bg-agri-warning text-white';
      case 'cancelled': return 'bg-agri-danger text-white';
      default: return 'bg-agri-gray text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return CheckCircle;
      case 'shipped': return Truck;
      case 'processing': return Clock;
      default: return Package;
    }
  };

  const filteredOrders = selectedTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedTab);

  return (
    <div className="mobile-container bg-agri-light-gray">
      {/* Header */}
      <div className="mobile-header">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate('/home')}>
            <ArrowLeft className="w-6 h-6 text-agri-gray" />
          </button>
          <h1 className="text-xl font-bold text-text-secondary">My Orders</h1>
        </div>
      </div>

      {/* Content */}
      <div className="mobile-content space-y-6 pt-4">
        {/* Order Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 text-center shadow-soft">
            <div className="w-12 h-12 bg-agri-light rounded-xl flex items-center justify-center mx-auto mb-2">
              <Package className="w-6 h-6 text-agri-primary" />
            </div>
            <p className="text-2xl font-bold text-text-secondary">{orders.length}</p>
            <p className="text-sm text-agri-gray">Total Orders</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 text-center shadow-soft">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-6 h-6 text-agri-success" />
            </div>
            <p className="text-2xl font-bold text-text-secondary">
              {orders.filter(o => o.status === 'delivered').length}
            </p>
            <p className="text-sm text-agri-gray">Delivered</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 text-center shadow-soft">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Truck className="w-6 h-6 text-agri-info" />
            </div>
            <p className="text-2xl font-bold text-text-secondary">
              ₹{orders.reduce((sum, order) => sum + order.total, 0)}
            </p>
            <p className="text-sm text-agri-gray">Total Spent</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white rounded-xl p-1">
            <TabsTrigger value="all" className="text-sm">All</TabsTrigger>
            <TabsTrigger value="processing" className="text-sm">Processing</TabsTrigger>
            <TabsTrigger value="shipped" className="text-sm">Shipped</TabsTrigger>
            <TabsTrigger value="delivered" className="text-sm">Delivered</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="space-y-4 mt-4">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => {
                const StatusIcon = getStatusIcon(order.status);
                return (
                  <div key={order.id} className="bg-white rounded-2xl p-6 shadow-soft border border-agri-light-gray">
                    {/* Order Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-agri-light rounded-xl flex items-center justify-center">
                          <StatusIcon className="w-6 h-6 text-agri-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-text-secondary">Order #{order.id}</h3>
                          <p className="text-sm text-agri-gray">Placed on {new Date(order.orderDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3 mb-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-agri-light-gray last:border-b-0">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-agri-light rounded-lg flex items-center justify-center">
                              <Package className="w-5 h-5 text-agri-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-text-secondary text-sm">{item.name}</p>
                              <p className="text-xs text-agri-gray">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-semibold text-text-secondary">₹{item.price}</p>
                        </div>
                      ))}
                    </div>

                    {/* Order Total */}
                    <div className="flex items-center justify-between py-3 border-t border-agri-light-gray">
                      <p className="font-semibold text-text-secondary">Total Amount</p>
                      <p className="text-lg font-bold text-agri-primary">₹{order.total}</p>
                    </div>

                    {/* Delivery Info */}
                    <div className="bg-agri-light rounded-xl p-4 mt-4">
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-agri-primary mt-0.5" />
                        <div className="flex-1">
                          <p className="font-medium text-text-secondary text-sm">Delivery Address</p>
                          <p className="text-sm text-agri-gray">
                            {typeof order.address === 'string' 
                              ? order.address 
                              : order.address?.address || 'Address not available'
                            }
                          </p>
                          {order.deliveryDate && (
                            <p className="text-sm text-agri-success mt-1">
                              Delivered on {new Date(order.deliveryDate).toLocaleDateString()}
                            </p>
                          )}
                          {order.estimatedDelivery && order.status !== 'delivered' && (
                            <p className="text-sm text-agri-info mt-1">
                              Expected by {new Date(order.estimatedDelivery).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 mt-4">
                      {order.status === 'shipped' || order.status === 'processing' ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 border-agri-primary text-agri-primary hover:bg-agri-light"
                        >
                          <Truck className="w-4 h-4 mr-2" />
                          Track Order
                        </Button>
                      ) : null}
                      
                      {order.status === 'delivered' ? (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 border-agri-primary text-agri-primary hover:bg-agri-light"
                          >
                            <Star className="w-4 h-4 mr-2" />
                            Rate & Review
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-agri-gray text-agri-gray hover:bg-agri-light-gray"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                        </>
                      ) : null}

                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-agri-gray text-agri-gray hover:bg-agri-light-gray"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Order Details Link */}
                    <button 
                      onClick={() => navigate(`/orders/${order.id}`)}
                      className="w-full mt-4 p-3 bg-agri-light rounded-xl flex items-center justify-between hover:bg-agri-light-gray transition-colors"
                    >
                      <span className="text-sm font-medium text-agri-primary">View Order Details</span>
                      <ChevronRight className="w-4 h-4 text-agri-primary" />
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-agri-gray mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-secondary mb-2">No orders found</h3>
                <p className="text-agri-gray mb-6">You haven't placed any orders yet</p>
                <Button 
                  onClick={() => navigate('/shop')}
                  className="bg-agri-primary hover:bg-agri-secondary text-white"
                >
                  Start Shopping
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Support Section */}
        <div className="bg-white rounded-2xl p-6 shadow-soft">
          <h3 className="text-lg font-semibold text-text-secondary mb-4">Need Help?</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-agri-light rounded-xl hover:bg-agri-light-gray transition-colors">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-agri-primary" />
                <span className="font-medium text-text-secondary">Contact Support</span>
              </div>
              <ChevronRight className="w-5 h-5 text-agri-gray" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-agri-light rounded-xl hover:bg-agri-light-gray transition-colors">
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-5 h-5 text-agri-primary" />
                <span className="font-medium text-text-secondary">Return Policy</span>
              </div>
              <ChevronRight className="w-5 h-5 text-agri-gray" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;