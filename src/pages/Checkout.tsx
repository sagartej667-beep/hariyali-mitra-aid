import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Edit3,
  CreditCard,
  Smartphone,
  Banknote,
  CheckCircle,
  Clock,
  Shield,
  Truck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

const Checkout = () => {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState('home');
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const addresses = [
    {
      id: 'home',
      type: 'Home',
      name: 'Ramu Ji',
      address: 'Village Rampur, Dist. Hardoi, UP 241001',
      phone: '+91 98765 43210'
    },
    {
      id: 'farm',
      type: 'Farm',
      name: 'Ramu Ji',
      address: 'Plot No. 45, Sector 12, Village Rampur, UP 241001',
      phone: '+91 98765 43210'
    }
  ];

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI Payment',
      description: 'Pay using PhonePe, Google Pay, Paytm',
      icon: Smartphone,
      recommended: true
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, RuPay',
      icon: CreditCard,
      recommended: false
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      description: 'Pay when you receive',
      icon: Banknote,
      recommended: false
    }
  ];

  const orderSummary = {
    items: [
      { name: 'Organic NPK Fertilizer', quantity: 2, price: 490 },
      { name: 'Tomato Hybrid Seeds', quantity: 1, price: 120 }
    ],
    subtotal: 610,
    discount: 61,
    delivery: 0,
    total: 549
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create order data
    const orderData = {
      id: `ORD${Date.now()}`,
      status: 'processing',
      items: orderSummary.items,
      total: orderSummary.total,
      address: addresses.find(addr => addr.id === selectedAddress),
      paymentMethod: selectedPayment.toUpperCase(),
      orderDate: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
    };

    // Store order (in real app, this would be API call)
    const existingOrders = JSON.parse(localStorage.getItem('farmer_orders') || '[]');
    localStorage.setItem('farmer_orders', JSON.stringify([orderData, ...existingOrders]));
    
    // Clear cart
    localStorage.removeItem('cart_items');
    
    setIsProcessing(false);
    navigate('/order-success', { state: { orderId: orderData.id } });
  };

  return (
    <div className="mobile-container bg-background">
      {/* Header */}
      <div className="mobile-header">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate('/cart')}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-text-secondary">Checkout</h1>
        </div>
      </div>

      <div className="mobile-content space-y-6 pt-4 pb-32">
        {/* Delivery Address */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Delivery Address</h3>
            </div>
            <button className="text-green-600 text-sm font-medium">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
            {addresses.map((address) => (
              <div key={address.id} className="space-y-2">
                <div className="flex items-center space-x-3 p-3 border rounded-xl hover:bg-gray-50">
                  <RadioGroupItem value={address.id} id={address.id} />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={address.id} className="font-medium text-gray-900">
                        {address.name}
                      </Label>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {address.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{address.address}</p>
                    <p className="text-sm text-gray-500">{address.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>

          <button className="w-full mt-4 p-3 border-2 border-dashed border-gray-300 rounded-xl text-green-600 font-medium hover:border-green-300">
            + Add New Address
          </button>
        </div>

        {/* Delivery Time */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2 mb-4">
            <Truck className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-gray-900">Delivery Time</h3>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Expected Delivery</p>
                <p className="text-sm text-green-600">Tomorrow by 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2 mb-4">
            <CreditCard className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-gray-900">Payment Method</h3>
          </div>

          <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
            {paymentMethods.map((method) => (
              <div key={method.id} className="space-y-2">
                <div className="flex items-center space-x-3 p-4 border rounded-xl hover:bg-gray-50">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <method.icon className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={method.id} className="font-medium text-gray-900">
                        {method.name}
                      </Label>
                      {method.recommended && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{method.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
          
          <div className="space-y-3">
            {orderSummary.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-600">{item.name} (×{item.quantity})</span>
                <span className="font-medium">₹{item.price}</span>
              </div>
            ))}
            
            <Separator />
            
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{orderSummary.subtotal}</span>
            </div>
            
            <div className="flex justify-between text-green-600">
              <span>Discount (FARMER10)</span>
              <span className="font-medium">-₹{orderSummary.discount}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery</span>
              <span className="font-medium text-green-600">FREE</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-xl font-bold text-green-600">₹{orderSummary.total}</span>
            </div>
          </div>
        </div>

        {/* Security Info */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-green-800">100% Secure Payment</p>
              <p className="text-sm text-green-600">Your payment information is protected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Button 
          onClick={handlePlaceOrder}
          disabled={isProcessing}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-semibold disabled:opacity-50"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 animate-spin" />
              <span>Processing Payment...</span>
            </div>
          ) : (
            `Place Order • ₹${orderSummary.total}`
          )}
        </Button>
      </div>
    </div>
  );
};

export default Checkout;