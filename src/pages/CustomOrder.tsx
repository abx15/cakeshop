import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cake, Layers, Circle, Square, Heart, Palette, Sparkles, 
  MessageSquare, Upload, ChevronLeft, ChevronRight, ShoppingCart,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

const cakeTypes = [
  { id: 'fondant', name: 'Fondant Cake', price: 800, image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=200' },
  { id: 'cream', name: 'Cream Cake', price: 600, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200' },
  { id: 'photo', name: 'Photo Cake', price: 700, image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=200' },
  { id: 'theme', name: 'Theme Cake', price: 1000, image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=200' },
];

const tierOptions = [
  { id: 1, name: '1 Tier', multiplier: 1 },
  { id: 2, name: '2 Tiers', multiplier: 2.2 },
  { id: 3, name: '3 Tiers', multiplier: 3.5 },
];

const shapeOptions = [
  { id: 'round', name: 'Round', icon: Circle },
  { id: 'square', name: 'Square', icon: Square },
  { id: 'heart', name: 'Heart', icon: Heart },
];

const sizeOptions = [
  { id: '500g', name: '500g (4-6 servings)', price: 0 },
  { id: '1kg', name: '1 Kg (8-10 servings)', price: 400 },
  { id: '2kg', name: '2 Kg (16-20 servings)', price: 900 },
  { id: '3kg', name: '3 Kg (24-30 servings)', price: 1400 },
];

const flavorOptions = [
  { id: 'chocolate', name: 'Chocolate', color: '#3E2723' },
  { id: 'vanilla', name: 'Vanilla', color: '#FFF8DC' },
  { id: 'strawberry', name: 'Strawberry', color: '#FFB6C1' },
  { id: 'redvelvet', name: 'Red Velvet', color: '#8B0000' },
  { id: 'butterscotch', name: 'Butterscotch', color: '#E6AA68' },
  { id: 'blackforest', name: 'Black Forest', color: '#2C1810' },
];

const colorThemes = [
  { id: 'pink', name: 'Pink & White', colors: ['#FFB6C1', '#FFFFFF'] },
  { id: 'blue', name: 'Blue & Gold', colors: ['#87CEEB', '#FFD700'] },
  { id: 'purple', name: 'Purple & Silver', colors: ['#9370DB', '#C0C0C0'] },
  { id: 'rainbow', name: 'Rainbow', colors: ['#FF6B6B', '#FFE66D', '#4ECDC4', '#45B7D1'] },
  { id: 'elegant', name: 'Black & Gold', colors: ['#1A1A1A', '#FFD700'] },
  { id: 'pastel', name: 'Pastel Mix', colors: ['#FFE5E5', '#E5FFE5', '#E5E5FF'] },
];

const decorationOptions = [
  { id: 'flowers', name: 'Fresh Flowers', price: 200 },
  { id: 'figurines', name: 'Figurines', price: 300 },
  { id: 'toppers', name: 'Cake Toppers', price: 150 },
  { id: 'sprinkles', name: 'Sprinkles', price: 50 },
  { id: 'macarons', name: 'Macarons', price: 250 },
  { id: 'chocolates', name: 'Chocolates', price: 200 },
];

const pastOrders = [
  { id: 1, image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400', occasion: 'Birthday' },
  { id: 2, image: 'https://images.unsplash.com/photo-1560180474-e8563fd75bab?w=400', occasion: 'Wedding' },
  { id: 3, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', occasion: 'Anniversary' },
  { id: 4, image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400', occasion: 'Birthday' },
  { id: 5, image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400', occasion: 'Corporate' },
  { id: 6, image: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?w=400', occasion: 'Wedding' },
];

const steps = [
  { id: 1, title: 'Type & Tiers', icon: Cake },
  { id: 2, title: 'Shape & Size', icon: Circle },
  { id: 3, title: 'Flavor', icon: Palette },
  { id: 4, title: 'Theme & Decor', icon: Sparkles },
  { id: 5, title: 'Message', icon: MessageSquare },
];

export default function CustomOrder() {
  const { addItem } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [order, setOrder] = useState({
    type: '',
    tiers: 1,
    shape: 'round',
    size: '1kg',
    flavor: 'chocolate',
    colorTheme: 'pink',
    decorations: [] as string[],
    message: '',
    photoUrl: '',
  });
  const [occasionFilter, setOccasionFilter] = useState('All');

  const calculatePrice = () => {
    const baseType = cakeTypes.find((t) => t.id === order.type);
    const tier = tierOptions.find((t) => t.id === order.tiers);
    const size = sizeOptions.find((s) => s.id === order.size);
    const decorPrice = order.decorations.reduce((sum, d) => {
      const dec = decorationOptions.find((opt) => opt.id === d);
      return sum + (dec?.price || 0);
    }, 0);

    const basePrice = baseType?.price || 0;
    const tierMultiplier = tier?.multiplier || 1;
    const sizePrice = size?.price || 0;

    return Math.round(basePrice * tierMultiplier + sizePrice + decorPrice);
  };

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleAddToCart = () => {
    if (!order.type) {
      toast({ title: 'Please select a cake type', variant: 'destructive' });
      return;
    }

    const typeInfo = cakeTypes.find((t) => t.id === order.type);
    addItem({
      productId: `custom-${Date.now()}`,
      name: `Custom ${typeInfo?.name} - ${order.tiers} Tier`,
      image: typeInfo?.image || '',
      quantity: 1,
      size: order.size,
      flavor: order.flavor,
      message: order.message,
      price: calculatePrice(),
      subtotal: calculatePrice(),
    });

    toast({
      title: 'Custom order added to cart!',
      description: 'Your custom cake has been added to your cart.',
    });
  };

  const toggleDecoration = (id: string) => {
    setOrder((prev) => ({
      ...prev,
      decorations: prev.decorations.includes(id)
        ? prev.decorations.filter((d) => d !== id)
        : [...prev.decorations, id],
    }));
  };

  const filteredPastOrders = occasionFilter === 'All' 
    ? pastOrders 
    : pastOrders.filter((o) => o.occasion === occasionFilter);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=1920')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Cake className="w-16 h-16 mx-auto mb-4 text-accent" />
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Custom Cake Builder
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Design your dream cake, exactly how you imagine it
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cake Builder */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Builder Form */}
            <div className="lg:col-span-2">
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <button
                      onClick={() => setCurrentStep(step.id)}
                      className={`flex flex-col items-center min-w-[80px] ${
                        currentStep === step.id
                          ? 'text-accent'
                          : currentStep > step.id
                          ? 'text-green-500'
                          : 'text-muted-foreground'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                          currentStep === step.id
                            ? 'bg-accent text-white'
                            : currentStep > step.id
                            ? 'bg-green-500 text-white'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {currentStep > step.id ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <step.icon className="w-5 h-5" />
                        )}
                      </div>
                      <span className="text-xs font-medium hidden sm:block">{step.title}</span>
                    </button>
                    {index < steps.length - 1 && (
                      <div
                        className={`h-0.5 w-8 sm:w-12 mx-1 ${
                          currentStep > step.id ? 'bg-green-500' : 'bg-muted'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Step Content */}
              <div className="bg-card rounded-2xl p-6 shadow-lg border border-border min-h-[400px]">
                <AnimatePresence mode="wait">
                  {/* Step 1: Type & Tiers */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-2xl font-display font-bold mb-6">Choose Cake Type & Tiers</h2>
                      
                      <div className="mb-8">
                        <Label className="text-base mb-4 block">Cake Type</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {cakeTypes.map((type) => (
                            <button
                              key={type.id}
                              onClick={() => setOrder({ ...order, type: type.id })}
                              className={`p-4 rounded-xl border-2 transition-all ${
                                order.type === type.id
                                  ? 'border-accent bg-accent/10'
                                  : 'border-border hover:border-accent/50'
                              }`}
                            >
                              <img
                                src={type.image}
                                alt={type.name}
                                className="w-full aspect-square object-cover rounded-lg mb-2"
                              />
                              <p className="font-medium text-sm">{type.name}</p>
                              <p className="text-xs text-muted-foreground">From ₹{type.price}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-base mb-4 block">Number of Tiers</Label>
                        <div className="flex gap-4">
                          {tierOptions.map((tier) => (
                            <button
                              key={tier.id}
                              onClick={() => setOrder({ ...order, tiers: tier.id })}
                              className={`flex-1 py-4 px-6 rounded-xl border-2 transition-all ${
                                order.tiers === tier.id
                                  ? 'border-accent bg-accent/10'
                                  : 'border-border hover:border-accent/50'
                              }`}
                            >
                              <Layers className="w-6 h-6 mx-auto mb-2" />
                              <p className="font-medium">{tier.name}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Shape & Size */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-2xl font-display font-bold mb-6">Select Shape & Size</h2>
                      
                      <div className="mb-8">
                        <Label className="text-base mb-4 block">Shape</Label>
                        <div className="flex gap-4">
                          {shapeOptions.map((shape) => (
                            <button
                              key={shape.id}
                              onClick={() => setOrder({ ...order, shape: shape.id })}
                              className={`flex-1 py-6 rounded-xl border-2 transition-all ${
                                order.shape === shape.id
                                  ? 'border-accent bg-accent/10'
                                  : 'border-border hover:border-accent/50'
                              }`}
                            >
                              <shape.icon className="w-10 h-10 mx-auto mb-2" />
                              <p className="font-medium">{shape.name}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-base mb-4 block">Size</Label>
                        <div className="grid grid-cols-2 gap-4">
                          {sizeOptions.map((size) => (
                            <button
                              key={size.id}
                              onClick={() => setOrder({ ...order, size: size.id })}
                              className={`py-4 px-4 rounded-xl border-2 text-left transition-all ${
                                order.size === size.id
                                  ? 'border-accent bg-accent/10'
                                  : 'border-border hover:border-accent/50'
                              }`}
                            >
                              <p className="font-medium">{size.id}</p>
                              <p className="text-sm text-muted-foreground">{size.name}</p>
                              {size.price > 0 && (
                                <p className="text-xs text-accent mt-1">+₹{size.price}</p>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Flavor */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-2xl font-display font-bold mb-6">Choose Your Flavor</h2>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {flavorOptions.map((flavor) => (
                          <button
                            key={flavor.id}
                            onClick={() => setOrder({ ...order, flavor: flavor.id })}
                            className={`py-6 px-4 rounded-xl border-2 transition-all ${
                              order.flavor === flavor.id
                                ? 'border-accent bg-accent/10'
                                : 'border-border hover:border-accent/50'
                            }`}
                          >
                            <div
                              className="w-12 h-12 rounded-full mx-auto mb-3 border-2 border-border"
                              style={{ backgroundColor: flavor.color }}
                            />
                            <p className="font-medium">{flavor.name}</p>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Theme & Decor */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-2xl font-display font-bold mb-6">Theme & Decorations</h2>
                      
                      <div className="mb-8">
                        <Label className="text-base mb-4 block">Color Theme</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {colorThemes.map((theme) => (
                            <button
                              key={theme.id}
                              onClick={() => setOrder({ ...order, colorTheme: theme.id })}
                              className={`py-4 px-4 rounded-xl border-2 transition-all ${
                                order.colorTheme === theme.id
                                  ? 'border-accent bg-accent/10'
                                  : 'border-border hover:border-accent/50'
                              }`}
                            >
                              <div className="flex gap-1 justify-center mb-2">
                                {theme.colors.map((color, i) => (
                                  <div
                                    key={i}
                                    className="w-6 h-6 rounded-full border border-border"
                                    style={{ backgroundColor: color }}
                                  />
                                ))}
                              </div>
                              <p className="font-medium text-sm">{theme.name}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-base mb-4 block">Decorations (Optional)</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {decorationOptions.map((decor) => (
                            <button
                              key={decor.id}
                              onClick={() => toggleDecoration(decor.id)}
                              className={`py-4 px-4 rounded-xl border-2 transition-all ${
                                order.decorations.includes(decor.id)
                                  ? 'border-accent bg-accent/10'
                                  : 'border-border hover:border-accent/50'
                              }`}
                            >
                              <p className="font-medium">{decor.name}</p>
                              <p className="text-sm text-accent">+₹{decor.price}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 5: Message */}
                  {currentStep === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-2xl font-display font-bold mb-6">Add Message & Photo</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="message" className="text-base mb-2 block">
                            Message on Cake (Optional)
                          </Label>
                          <Textarea
                            id="message"
                            placeholder="Happy Birthday! 🎂"
                            value={order.message}
                            onChange={(e) => setOrder({ ...order, message: e.target.value })}
                            className="min-h-[100px]"
                          />
                          <p className="text-sm text-muted-foreground mt-1">
                            Max 50 characters recommended
                          </p>
                        </div>

                        <div>
                          <Label className="text-base mb-2 block">Upload Photo (For Photo Cakes)</Label>
                          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-accent/50 transition-colors cursor-pointer">
                            <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                            <p className="text-muted-foreground">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              PNG, JPG up to 5MB
                            </p>
                            <Input type="file" className="hidden" accept="image/*" />
                          </div>
                        </div>
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
                  {currentStep < 5 ? (
                    <Button onClick={handleNext} className="bg-accent hover:bg-accent/90">
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleAddToCart}
                      className="bg-accent hover:bg-accent/90"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Preview & Price */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Preview Card */}
                <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
                  <h3 className="font-display font-bold text-lg mb-4">Your Custom Cake</h3>
                  
                  {/* Preview Image */}
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-primary/20 to-accent/20">
                    {order.type ? (
                      <img
                        src={cakeTypes.find((t) => t.id === order.type)?.image}
                        alt="Cake Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Cake className="w-16 h-16 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="font-display font-bold">
                        {order.type ? cakeTypes.find((t) => t.id === order.type)?.name : 'Select a type'}
                      </p>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tiers:</span>
                      <span className="font-medium">{order.tiers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shape:</span>
                      <span className="font-medium capitalize">{order.shape}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size:</span>
                      <span className="font-medium">{order.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Flavor:</span>
                      <span className="font-medium capitalize">{order.flavor}</span>
                    </div>
                    {order.decorations.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Decorations:</span>
                        <span className="font-medium">{order.decorations.length} selected</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-border mt-4 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-display font-bold">Total Price:</span>
                      <span className="text-2xl font-bold text-accent">₹{calculatePrice()}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="bg-accent/10 rounded-xl p-4 text-sm">
                  <p className="text-muted-foreground">
                    <strong>Note:</strong> Custom orders require 48 hours advance notice. 
                    Final price may vary based on complexity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Past Custom Orders Gallery */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Our Past Creations
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get inspired by our previous custom orders
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {['All', 'Birthday', 'Wedding', 'Anniversary', 'Corporate'].map((occasion) => (
              <Button
                key={occasion}
                variant={occasionFilter === occasion ? 'default' : 'outline'}
                size="sm"
                onClick={() => setOccasionFilter(occasion)}
                className={occasionFilter === occasion ? 'bg-accent hover:bg-accent/90' : ''}
              >
                {occasion}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredPastOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
              >
                <img
                  src={order.image}
                  alt={`Custom ${order.occasion} cake`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-3 py-1 bg-accent rounded-full text-sm font-medium">
                    {order.occasion}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
