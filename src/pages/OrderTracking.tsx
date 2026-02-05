import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  ChefHat, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Clock,
  Search,
  Phone,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface OrderStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  time?: string;
  status: 'completed' | 'current' | 'pending';
}

interface OrderDetails {
  orderId: string;
  orderDate: string;
  estimatedDelivery: string;
  status: string;
  items: { name: string; quantity: number; image: string }[];
  deliveryAddress: string;
  driverName?: string;
  driverPhone?: string;
  steps: OrderStep[];
}

// Mock order data
const mockOrders: Record<string, OrderDetails> = {
  'ORD-2024-001': {
    orderId: 'ORD-2024-001',
    orderDate: 'Feb 1, 2024, 10:30 AM',
    estimatedDelivery: 'Feb 3, 2024, 2:00 PM - 4:00 PM',
    status: 'In Transit',
    items: [
      { name: 'Belgian Chocolate Dream', quantity: 1, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100' },
      { name: 'Red Velvet Supreme', quantity: 1, image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=100' },
    ],
    deliveryAddress: '123 Sweet Lane, Cake Town, CT 12345',
    driverName: 'Rahul Kumar',
    driverPhone: '+91 98765 43210',
    steps: [
      { id: '1', title: 'Order Placed', description: 'Your order has been confirmed', icon: <Package className="w-6 h-6" />, time: 'Feb 1, 10:30 AM', status: 'completed' },
      { id: '2', title: 'Preparing', description: 'Our bakers are crafting your cake', icon: <ChefHat className="w-6 h-6" />, time: 'Feb 2, 8:00 AM', status: 'completed' },
      { id: '3', title: 'Out for Delivery', description: 'Your order is on the way', icon: <Truck className="w-6 h-6" />, time: 'Feb 3, 12:30 PM', status: 'current' },
      { id: '4', title: 'Delivered', description: 'Order successfully delivered', icon: <MapPin className="w-6 h-6" />, status: 'pending' },
    ],
  },
  'ORD-2024-002': {
    orderId: 'ORD-2024-002',
    orderDate: 'Jan 28, 2024, 3:45 PM',
    estimatedDelivery: 'Jan 30, 2024',
    status: 'Delivered',
    items: [
      { name: 'Strawberry Bliss', quantity: 2, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=100' },
    ],
    deliveryAddress: '456 Bakery Blvd, Pastry City, PC 67890',
    steps: [
      { id: '1', title: 'Order Placed', description: 'Your order has been confirmed', icon: <Package className="w-6 h-6" />, time: 'Jan 28, 3:45 PM', status: 'completed' },
      { id: '2', title: 'Preparing', description: 'Our bakers are crafting your cake', icon: <ChefHat className="w-6 h-6" />, time: 'Jan 29, 6:00 AM', status: 'completed' },
      { id: '3', title: 'Out for Delivery', description: 'Your order is on the way', icon: <Truck className="w-6 h-6" />, time: 'Jan 30, 10:00 AM', status: 'completed' },
      { id: '4', title: 'Delivered', description: 'Order successfully delivered', icon: <MapPin className="w-6 h-6" />, time: 'Jan 30, 2:15 PM', status: 'completed' },
    ],
  },
};

export default function OrderTracking() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      const foundOrder = mockOrders[orderId.toUpperCase()];
      if (foundOrder) {
        setOrder(foundOrder);
        setError('');
      } else {
        setOrder(null);
        setError('Order not found. Please check your order ID and try again.');
      }
      setIsSearching(false);
    }, 800);
  };

  const getStepColor = (status: OrderStep['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'current':
        return 'bg-primary text-white animate-pulse';
      case 'pending':
        return 'bg-muted text-muted-foreground';
    }
  };

  const getLineColor = (status: OrderStep['status'], nextStatus?: OrderStep['status']) => {
    if (status === 'completed' && nextStatus !== 'pending') {
      return 'bg-green-500';
    }
    if (status === 'current') {
      return 'bg-gradient-to-b from-green-500 to-muted';
    }
    return 'bg-muted';
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="gradient-hero py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6">
              <Truck className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Track Your Order
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Enter your order ID to see real-time updates on your sweet delivery
            </p>

            {/* Search Box */}
            <div className="flex gap-3 max-w-md mx-auto">
              <Input
                type="text"
                placeholder="Enter Order ID (e.g., ORD-2024-001)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button
                onClick={handleSearch}
                disabled={!orderId.trim() || isSearching}
                className="gradient-primary text-white"
              >
                {isSearching ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Clock className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <Search className="w-5 h-5" />
                )}
              </Button>
            </div>

            {/* Demo hint */}
            <p className="text-xs text-muted-foreground mt-3">
              Try: ORD-2024-001 or ORD-2024-002
            </p>
          </motion.div>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="container-custom mt-8"
        >
          <div className="max-w-2xl mx-auto bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
            <p className="text-destructive">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Order Details */}
      {order && (
        <section className="container-custom py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Order Header */}
            <div className="glass-card p-6 mb-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-muted-foreground">Order ID:</span>
                    <span className="font-semibold">{order.orderId}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {order.orderDate}
                    </span>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                  order.status === 'Delivered' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-primary/10 text-primary'
                }`}>
                  {order.status}
                </div>
              </div>

              {/* Order Items */}
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-semibold mb-4">Order Items</h3>
                <div className="flex flex-wrap gap-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 bg-secondary/50 rounded-lg p-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="glass-card p-6 mb-8">
              <h3 className="font-serif text-xl font-bold mb-8">Order Progress</h3>
              
              <div className="relative">
                {order.steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.15 }}
                    className="relative flex gap-4 pb-8 last:pb-0"
                  >
                    {/* Timeline Line */}
                    {index < order.steps.length - 1 && (
                      <div
                        className={`absolute left-6 top-12 w-0.5 h-[calc(100%-3rem)] ${getLineColor(step.status, order.steps[index + 1]?.status)}`}
                      />
                    )}

                    {/* Icon */}
                    <div
                      className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${getStepColor(step.status)}`}
                    >
                      {step.status === 'completed' ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        step.icon
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className={`font-semibold ${step.status === 'pending' ? 'text-muted-foreground' : ''}`}>
                            {step.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                        {step.time && (
                          <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                            {step.time}
                          </span>
                        )}
                      </div>

                      {/* Current step extra info */}
                      {step.status === 'current' && order.driverName && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 bg-secondary/50 rounded-lg p-4"
                        >
                          <p className="text-sm font-medium mb-2">Your delivery partner</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold">{order.driverName}</p>
                              <p className="text-sm text-muted-foreground">{order.driverPhone}</p>
                            </div>
                            <Button variant="outline" size="sm" className="gap-2">
                              <Phone className="w-4 h-4" />
                              Call
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="glass-card p-6">
              <h3 className="font-serif text-xl font-bold mb-4">Delivery Details</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Delivery Address</p>
                  <p className="font-medium flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                    {order.deliveryAddress}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                  <p className="font-medium flex items-start gap-2">
                    <Clock className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                    {order.estimatedDelivery}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Help Section */}
      {!order && !error && (
        <section className="container-custom py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="font-serif text-2xl font-bold mb-4">Need Help?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find your order? Check your email for your order confirmation 
              or contact our support team.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" asChild>
                <a href="/contact">Contact Support</a>
              </Button>
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
}
