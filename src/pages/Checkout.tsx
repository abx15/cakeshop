import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addDays } from 'date-fns';
import {
  MapPin, Phone, Mail, User, Home, CreditCard, Wallet,
  Truck, Clock, ChevronLeft, ChevronRight, Check, ShoppingBag,
  Calendar, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const timeSlots = [
  { id: 'morning', name: 'Morning', time: '9:00 AM - 12:00 PM' },
  { id: 'afternoon', name: 'Afternoon', time: '12:00 PM - 4:00 PM' },
  { id: 'evening', name: 'Evening', time: '4:00 PM - 8:00 PM' },
];

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, RuPay' },
  { id: 'upi', name: 'UPI', icon: Wallet, description: 'Google Pay, PhonePe, Paytm' },
  { id: 'cod', name: 'Cash on Delivery', icon: Truck, description: 'Pay when you receive' },
];

const steps = [
  { id: 1, title: 'Delivery', icon: MapPin },
  { id: 2, title: 'Schedule', icon: Calendar },
  { id: 3, title: 'Payment', icon: CreditCard },
  { id: 4, title: 'Review', icon: Check },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    // Delivery Details
    name: '',
    phone: '',
    email: '',
    address: '',
    landmark: '',
    pincode: '',
    city: '',
    saveAddress: false,
    // Schedule
    deliveryDate: undefined as Date | undefined,
    timeSlot: 'afternoon',
    instructions: '',
    // Payment
    paymentMethod: 'card',
    // Terms
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const deliveryCharge = totalPrice >= 500 ? 0 : 50;
  const finalTotal = totalPrice + deliveryCharge;

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
      else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Invalid pincode';
    }

    if (step === 2) {
      if (!formData.deliveryDate) newErrors.deliveryDate = 'Please select a delivery date';
    }

    if (step === 4) {
      if (!formData.agreeTerms) newErrors.agreeTerms = 'Please agree to terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handlePlaceOrder = async () => {
    if (!validateStep(4)) return;

    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    clearCart();
    toast({
      title: 'Order Placed Successfully! 🎉',
      description: 'You will receive a confirmation email shortly.',
    });
    navigate('/');
  };

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-muted-foreground/30" />
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-8">
            Add some delicious items to proceed to checkout
          </p>
          <Link to="/menu">
            <Button className="bg-accent hover:bg-accent/90">
              Browse Menu
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 py-8">
        <div className="container mx-auto max-w-6xl px-4">
          <Link to="/cart" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Cart
          </Link>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Checkout
          </h1>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => {
                    if (step.id < currentStep) setCurrentStep(step.id);
                  }}
                  disabled={step.id > currentStep}
                  className={`flex flex-col items-center min-w-[80px] ${
                    currentStep === step.id
                      ? 'text-accent'
                      : currentStep > step.id
                      ? 'text-green-500 cursor-pointer'
                      : 'text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                      currentStep === step.id
                        ? 'bg-accent text-white'
                        : currentStep > step.id
                        ? 'bg-green-500 text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </div>
                  <span className="text-sm font-medium">{step.title}</span>
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 w-12 md:w-20 mx-2 ${
                      currentStep > step.id ? 'bg-green-500' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
                <AnimatePresence mode="wait">
                  {/* Step 1: Delivery Details */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                        <MapPin className="w-6 h-6 text-accent" />
                        Delivery Details
                      </h2>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                            <User className="w-4 h-4" /> Full Name *
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => updateFormData('name', e.target.value)}
                            placeholder="John Doe"
                            className={errors.name ? 'border-red-500' : ''}
                          />
                          {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                            <Phone className="w-4 h-4" /> Phone Number *
                          </Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => updateFormData('phone', e.target.value)}
                            placeholder="9876543210"
                            className={errors.phone ? 'border-red-500' : ''}
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                            <Mail className="w-4 h-4" /> Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateFormData('email', e.target.value)}
                            placeholder="john@example.com"
                            className={errors.email ? 'border-red-500' : ''}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <Label htmlFor="address" className="flex items-center gap-2 mb-2">
                            <Home className="w-4 h-4" /> Delivery Address *
                          </Label>
                          <Textarea
                            id="address"
                            value={formData.address}
                            onChange={(e) => updateFormData('address', e.target.value)}
                            placeholder="House/Flat No., Building, Street..."
                            className={errors.address ? 'border-red-500' : ''}
                          />
                          {errors.address && (
                            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="landmark" className="mb-2 block">Landmark</Label>
                          <Input
                            id="landmark"
                            value={formData.landmark}
                            onChange={(e) => updateFormData('landmark', e.target.value)}
                            placeholder="Near..."
                          />
                        </div>

                        <div>
                          <Label htmlFor="pincode" className="mb-2 block">Pincode *</Label>
                          <Input
                            id="pincode"
                            value={formData.pincode}
                            onChange={(e) => updateFormData('pincode', e.target.value)}
                            placeholder="400001"
                            className={errors.pincode ? 'border-red-500' : ''}
                          />
                          {errors.pincode && (
                            <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="saveAddress"
                              checked={formData.saveAddress}
                              onCheckedChange={(checked) => updateFormData('saveAddress', checked)}
                            />
                            <Label htmlFor="saveAddress" className="cursor-pointer">
                              Save this address for future orders
                            </Label>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Schedule */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-accent" />
                        Delivery Schedule
                      </h2>

                      <div className="space-y-6">
                        <div>
                          <Label className="mb-3 block">Select Delivery Date *</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  'w-full justify-start text-left font-normal',
                                  !formData.deliveryDate && 'text-muted-foreground',
                                  errors.deliveryDate && 'border-red-500'
                                )}
                              >
                                <Calendar className="mr-2 h-4 w-4" />
                                {formData.deliveryDate
                                  ? format(formData.deliveryDate, 'PPP')
                                  : 'Pick a date'}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={formData.deliveryDate}
                                onSelect={(date) => updateFormData('deliveryDate', date)}
                                disabled={(date) => date < addDays(new Date(), 2)}
                                initialFocus
                                className="pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                          {errors.deliveryDate && (
                            <p className="text-red-500 text-sm mt-1">{errors.deliveryDate}</p>
                          )}
                          <p className="text-sm text-muted-foreground mt-2">
                            <AlertCircle className="w-4 h-4 inline mr-1" />
                            Minimum 2 days advance booking required
                          </p>
                        </div>

                        <div>
                          <Label className="mb-3 block">Select Time Slot *</Label>
                          <RadioGroup
                            value={formData.timeSlot}
                            onValueChange={(value) => updateFormData('timeSlot', value)}
                            className="grid md:grid-cols-3 gap-4"
                          >
                            {timeSlots.map((slot) => (
                              <div key={slot.id}>
                                <RadioGroupItem
                                  value={slot.id}
                                  id={slot.id}
                                  className="peer sr-only"
                                />
                                <Label
                                  htmlFor={slot.id}
                                  className={cn(
                                    'flex flex-col items-center justify-center rounded-xl border-2 p-4 cursor-pointer transition-all',
                                    'hover:border-accent/50',
                                    formData.timeSlot === slot.id
                                      ? 'border-accent bg-accent/10'
                                      : 'border-border'
                                  )}
                                >
                                  <Clock className="w-6 h-6 mb-2" />
                                  <span className="font-medium">{slot.name}</span>
                                  <span className="text-sm text-muted-foreground">{slot.time}</span>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>

                        <div>
                          <Label htmlFor="instructions" className="mb-2 block">
                            Special Instructions (Optional)
                          </Label>
                          <Textarea
                            id="instructions"
                            value={formData.instructions}
                            onChange={(e) => updateFormData('instructions', e.target.value)}
                            placeholder="Any special delivery instructions..."
                            rows={3}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Payment */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                        <CreditCard className="w-6 h-6 text-accent" />
                        Payment Method
                      </h2>

                      <RadioGroup
                        value={formData.paymentMethod}
                        onValueChange={(value) => updateFormData('paymentMethod', value)}
                        className="space-y-4"
                      >
                        {paymentMethods.map((method) => (
                          <div key={method.id}>
                            <RadioGroupItem
                              value={method.id}
                              id={method.id}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={method.id}
                              className={cn(
                                'flex items-center gap-4 rounded-xl border-2 p-4 cursor-pointer transition-all',
                                'hover:border-accent/50',
                                formData.paymentMethod === method.id
                                  ? 'border-accent bg-accent/10'
                                  : 'border-border'
                              )}
                            >
                              <div className={cn(
                                'w-12 h-12 rounded-full flex items-center justify-center',
                                formData.paymentMethod === method.id
                                  ? 'bg-accent text-white'
                                  : 'bg-muted'
                              )}>
                                <method.icon className="w-6 h-6" />
                              </div>
                              <div>
                                <span className="font-medium block">{method.name}</span>
                                <span className="text-sm text-muted-foreground">{method.description}</span>
                              </div>
                              {formData.paymentMethod === method.id && (
                                <Check className="w-5 h-5 text-accent ml-auto" />
                              )}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>

                      {formData.paymentMethod === 'card' && (
                        <div className="mt-6 p-4 bg-muted/30 rounded-xl">
                          <p className="text-sm text-muted-foreground">
                            You will be redirected to our secure payment gateway to complete the transaction.
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Step 4: Review */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                        <Check className="w-6 h-6 text-accent" />
                        Review Your Order
                      </h2>

                      <div className="space-y-6">
                        {/* Delivery Info */}
                        <div className="border border-border rounded-xl p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-accent" />
                              Delivery Address
                            </h3>
                            <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)}>
                              Edit
                            </Button>
                          </div>
                          <p className="text-muted-foreground">{formData.name}</p>
                          <p className="text-muted-foreground">{formData.address}</p>
                          {formData.landmark && <p className="text-muted-foreground">Near {formData.landmark}</p>}
                          <p className="text-muted-foreground">Pincode: {formData.pincode}</p>
                          <p className="text-muted-foreground mt-2">📞 {formData.phone}</p>
                          <p className="text-muted-foreground">✉️ {formData.email}</p>
                        </div>

                        {/* Schedule Info */}
                        <div className="border border-border rounded-xl p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-accent" />
                              Delivery Schedule
                            </h3>
                            <Button variant="ghost" size="sm" onClick={() => setCurrentStep(2)}>
                              Edit
                            </Button>
                          </div>
                          <p className="text-muted-foreground">
                            📅 {formData.deliveryDate ? format(formData.deliveryDate, 'EEEE, MMMM d, yyyy') : '-'}
                          </p>
                          <p className="text-muted-foreground">
                            🕐 {timeSlots.find((s) => s.id === formData.timeSlot)?.time}
                          </p>
                          {formData.instructions && (
                            <p className="text-muted-foreground mt-2">
                              📝 {formData.instructions}
                            </p>
                          )}
                        </div>

                        {/* Payment Info */}
                        <div className="border border-border rounded-xl p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold flex items-center gap-2">
                              <CreditCard className="w-4 h-4 text-accent" />
                              Payment Method
                            </h3>
                            <Button variant="ghost" size="sm" onClick={() => setCurrentStep(3)}>
                              Edit
                            </Button>
                          </div>
                          <p className="text-muted-foreground">
                            {paymentMethods.find((m) => m.id === formData.paymentMethod)?.name}
                          </p>
                        </div>

                        {/* Terms */}
                        <div className="flex items-start gap-2">
                          <Checkbox
                            id="agreeTerms"
                            checked={formData.agreeTerms}
                            onCheckedChange={(checked) => updateFormData('agreeTerms', checked)}
                          />
                          <Label htmlFor="agreeTerms" className="cursor-pointer text-sm">
                            I agree to the Terms & Conditions and Privacy Policy. I understand that my order is subject to the store's cancellation policy.
                          </Label>
                        </div>
                        {errors.agreeTerms && (
                          <p className="text-red-500 text-sm">{errors.agreeTerms}</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  {currentStep < 4 ? (
                    <Button onClick={handleNext} className="bg-accent hover:bg-accent/90">
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="bg-accent hover:bg-accent/90 min-w-[150px]"
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            ⏳
                          </motion.div>
                          Processing...
                        </span>
                      ) : (
                        <>
                          Place Order
                          <Check className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-2xl p-6 shadow-lg border border-border">
                <h3 className="font-display font-bold text-lg mb-4">Order Summary</h3>

                {/* Items */}
                <div className="space-y-3 max-h-[300px] overflow-y-auto mb-4">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.size} • {item.flavor}
                        </p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-sm">₹{item.subtotal}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className={deliveryCharge === 0 ? 'text-green-500' : ''}>
                      {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-accent">₹{finalTotal}</span>
                  </div>
                </div>

                {totalPrice < 500 && (
                  <p className="text-sm text-muted-foreground mt-4 p-3 bg-accent/10 rounded-lg">
                    Add ₹{500 - totalPrice} more for FREE delivery!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
