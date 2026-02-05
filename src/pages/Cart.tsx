import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  Tag,
  Truck,
  ShieldCheck,
  Gift
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const deliveryCharge = totalPrice > 500 ? 0 : 49;
  const finalTotal = totalPrice - discount + deliveryCharge;

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast({
        title: "Enter coupon code",
        description: "Please enter a valid coupon code",
        variant: "destructive",
      });
      return;
    }

    setIsApplyingCoupon(true);
    
    // Simulate coupon validation
    setTimeout(() => {
      if (couponCode.toUpperCase() === 'SWEET10') {
        const discountAmount = Math.round(totalPrice * 0.1);
        setDiscount(discountAmount);
        toast({
          title: "Coupon Applied! 🎉",
          description: `You saved ₹${discountAmount} on this order`,
        });
      } else if (couponCode.toUpperCase() === 'FIRST50') {
        setDiscount(50);
        toast({
          title: "Coupon Applied! 🎉",
          description: "You saved ₹50 on this order",
        });
      } else {
        toast({
          title: "Invalid Coupon",
          description: "This coupon code is not valid",
          variant: "destructive",
        });
      }
      setIsApplyingCoupon(false);
    }, 800);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-secondary flex items-center justify-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground" />
          </div>
          <h1 className="font-serif text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any delicious treats to your cart yet. 
            Browse our menu and find something sweet!
          </p>
          <Link to="/menu">
            <Button className="gradient-primary text-white px-8 py-6 text-lg rounded-full">
              Browse Products
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Page Header */}
      <div className="bg-secondary/50 py-12 mb-8">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link 
              to="/menu" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
            <h1 className="font-serif text-4xl md:text-5xl font-bold">
              Shopping Cart
            </h1>
            <p className="text-muted-foreground mt-2">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={`${item.productId}-${item.size}-${item.flavor}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-4 md:p-6"
                >
                  <div className="flex gap-4 md:gap-6">
                    {/* Product Image */}
                    <Link to={`/product/${item.productId}`} className="shrink-0">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.productId}`}>
                        <h3 className="font-serif text-lg md:text-xl font-semibold hover:text-primary transition-colors line-clamp-1">
                          {item.name}
                        </h3>
                      </Link>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-2 py-1 bg-secondary rounded-full text-xs">
                          {item.size}
                        </span>
                        <span className="px-2 py-1 bg-secondary rounded-full text-xs">
                          {item.flavor}
                        </span>
                      </div>

                      {item.message && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-1">
                          Message: "{item.message}"
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </motion.button>
                          <span className="w-8 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </motion.button>
                        </div>

                        {/* Price & Remove */}
                        <div className="flex items-center gap-4">
                          <span className="font-serif text-lg md:text-xl font-bold text-primary">
                            ₹{item.subtotal}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeItem(item.productId)}
                            className="p-2 text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Clear Cart Button */}
            <div className="flex justify-end pt-4">
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-destructive hover:bg-destructive hover:text-white"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6 sticky top-28"
            >
              <h2 className="font-serif text-2xl font-bold mb-6">Order Summary</h2>

              {/* Coupon Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Enter code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button
                    onClick={handleApplyCoupon}
                    disabled={isApplyingCoupon}
                    variant="outline"
                  >
                    {isApplyingCoupon ? 'Applying...' : 'Apply'}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Try: SWEET10, FIRST50
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 border-t border-border pt-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{totalPrice}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-medium">
                    {deliveryCharge === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${deliveryCharge}`
                    )}
                  </span>
                </div>
                
                <div className="border-t border-border pt-4 flex justify-between">
                  <span className="font-serif text-xl font-bold">Total</span>
                  <span className="font-serif text-2xl font-bold text-primary">
                    ₹{finalTotal}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link to="/checkout">
                <Button className="w-full mt-6 gradient-primary text-white py-6 text-lg rounded-full">
                  Proceed to Checkout
                </Button>
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <Truck className="w-5 h-5 text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">Free Delivery</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <ShieldCheck className="w-5 h-5 text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">Secure Pay</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Gift className="w-5 h-5 text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">Gift Wrap</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
