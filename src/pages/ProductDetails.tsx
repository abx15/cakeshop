import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { 
  Heart, 
  ShoppingBag, 
  Share2, 
  Truck, 
  Shield, 
  Clock,
  Minus,
  Plus,
  ChevronRight,
  Check,
  GitCompareArrows
} from 'lucide-react';
import { products, reviews } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCompare } from '@/context/CompareContext';
import { useRecentlyViewed } from '@/context/RecentlyViewedContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import RatingStars from '@/components/common/RatingStars';
import ProductCard from '@/components/product/ProductCard';
import ProductReviews from '@/components/product/ProductReviews';
import RecentlyViewedSection from '@/components/product/RecentlyViewedSection';

import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

export default function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { addToCompare, isInCompare } = useCompare();
  const { addToRecentlyViewed } = useRecentlyViewed();
  
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || null);
  const [selectedFlavor, setSelectedFlavor] = useState(product?.flavors[0] || '');
  const [selectedShape, setSelectedShape] = useState(product?.shapes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [cakeMessage, setCakeMessage] = useState('');
  const [pincode, setPincode] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedFlavor(product.flavors[0]);
      setSelectedShape(product.shapes?.[0] || '');
      // Track viewed product
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">Product Not Found</h1>
          <Link to="/menu">
            <Button className="gradient-primary text-white">Browse Menu</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);
  const productReviews = reviews.filter((r) => r.productId === product.id);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[0],
      quantity,
      size: selectedSize?.weight || '1kg',
      flavor: selectedFlavor,
      message: cakeMessage,
      price: selectedSize?.price || product.price,
      subtotal: (selectedSize?.price || product.price) * quantity,
    });
  };

  const handleCheckPincode = () => {
    if (pincode.length === 6) {
      setDeliveryInfo(`Delivery available to ${pincode}. Estimated: ${product.deliveryTime}`);
    } else {
      setDeliveryInfo('Please enter a valid 6-digit pincode');
    }
  };

  const handleCompare = () => {
    addToCompare(product);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Breadcrumb */}
      <div className="container-custom py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/menu" className="hover:text-primary transition-colors">Menu</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
        </nav>
      </div>

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main Image Swiper */}
            <div className="rounded-2xl overflow-hidden mb-4">
              <Swiper
                spaceBetween={10}
                navigation
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="aspect-square"
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Thumbnail Swiper */}
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode
              watchSlidesProgress
              modules={[FreeMode, Thumbs]}
              className="thumbs-swiper"
            >
              {product.images.map((image, index) => (
                <SwiperSlide key={index} className="cursor-pointer">
                  <div className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-colors">
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Name & Rating */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.dietary.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full capitalize">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <RatingStars rating={product.rating} showValue />
                <span className="text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="font-serif text-4xl font-bold text-primary">
                ₹{selectedSize?.price || product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="badge-discount">{product.discount}% OFF</span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="text-muted-foreground text-lg">
              {product.shortDescription}
            </p>

            {/* Size Selector */}
            <div>
              <h3 className="font-semibold mb-3">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <motion.button
                    key={size.weight}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full border-2 transition-all ${
                      selectedSize?.weight === size.weight
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {size.weight} - ₹{size.price}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Flavor Selector */}
            <div>
              <h3 className="font-semibold mb-3">Select Flavor</h3>
              <div className="flex flex-wrap gap-3">
                {product.flavors.map((flavor) => (
                  <motion.button
                    key={flavor}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedFlavor(flavor)}
                    className={`px-4 py-2 rounded-full border-2 transition-all ${
                      selectedFlavor === flavor
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {flavor}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Shape Selector */}
            {product.shapes && product.shapes.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Select Shape</h3>
                <div className="flex flex-wrap gap-3">
                  {product.shapes.map((shape) => (
                    <motion.button
                      key={shape}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedShape(shape)}
                      className={`px-4 py-2 rounded-full border-2 transition-all ${
                        selectedShape === shape
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      {shape}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Cake Message */}
            {product.customizable && (
              <div>
                <h3 className="font-semibold mb-3">Message on Cake (Optional)</h3>
                <Input
                  type="text"
                  placeholder="e.g., Happy Birthday John!"
                  value={cakeMessage}
                  onChange={(e) => setCakeMessage(e.target.value)}
                  maxLength={50}
                  className="max-w-md"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {50 - cakeMessage.length} characters remaining
                </p>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Quantity */}
              <div className="flex items-center gap-3">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center hover:border-primary transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </motion.button>
                <span className="w-8 text-center font-semibold text-lg">{quantity}</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center hover:border-primary transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Add to Cart */}
              <Button
                onClick={handleAddToCart}
                className="flex-1 gradient-primary text-white py-6 rounded-full"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>

              {/* Wishlist */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleItem(product.id, product.name)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  isWishlisted
                    ? 'bg-primary text-white'
                    : 'border-2 border-border hover:border-primary'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </motion.button>

              {/* Compare */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCompare}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  isCompared
                    ? 'bg-secondary text-primary'
                    : 'border-2 border-border hover:border-primary'
                }`}
                title="Add to Compare"
              >
                <GitCompareArrows className="w-5 h-5" />
              </motion.button>

              {/* Share */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center hover:border-primary transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Delivery Info */}
            <div className="glass-card p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                Check Delivery
              </h3>
              <div className="flex gap-2 mb-3">
                <Input
                  type="text"
                  placeholder="Enter Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="max-w-[150px]"
                />
                <Button onClick={handleCheckPincode} variant="outline">
                  Check
                </Button>
              </div>
              {deliveryInfo && (
                <p className="text-sm text-muted-foreground">{deliveryInfo}</p>
              )}
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {product.deliveryTime}
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  Quality Assured
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-8">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="ingredients"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                Ingredients
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                Reviews ({product.reviewCount})
              </TabsTrigger>
              <TabsTrigger
                value="delivery"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                Delivery Info
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-0">
              <div className="glass-card p-6 md:p-8">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Best For</h4>
                  <p className="text-muted-foreground">
                    Perfect for birthdays, anniversaries, celebrations, and any special occasion that calls for something sweet.
                  </p>
                </div>
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Storage Instructions</h4>
                  <p className="text-muted-foreground">
                    Store in a cool, dry place. Refrigerate after opening. Best consumed within 2-3 days for optimal freshness.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ingredients" className="mt-0">
              <div className="glass-card p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-4">Ingredients</h4>
                    <ul className="space-y-2">
                      {product.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-center gap-2 text-muted-foreground">
                          <Check className="w-4 h-4 text-primary" />
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Allergen Information</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.allergens.map((allergen) => (
                        <span key={allergen} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                          {allergen}
                        </span>
                      ))}
                    </div>
                    <h4 className="font-semibold mb-4">Nutritional Info (per 100g)</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-secondary rounded-lg text-center">
                        <span className="block text-2xl font-bold text-primary">
                          {product.nutritionalInfo.calories}
                        </span>
                        <span className="text-sm text-muted-foreground">Calories</span>
                      </div>
                      <div className="p-3 bg-secondary rounded-lg text-center">
                        <span className="block text-2xl font-bold text-primary">
                          {product.nutritionalInfo.protein}g
                        </span>
                        <span className="text-sm text-muted-foreground">Protein</span>
                      </div>
                      <div className="p-3 bg-secondary rounded-lg text-center">
                        <span className="block text-2xl font-bold text-primary">
                          {product.nutritionalInfo.carbs}g
                        </span>
                        <span className="text-sm text-muted-foreground">Carbs</span>
                      </div>
                      <div className="p-3 bg-secondary rounded-lg text-center">
                        <span className="block text-2xl font-bold text-primary">
                          {product.nutritionalInfo.fat}g
                        </span>
                        <span className="text-sm text-muted-foreground">Fat</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-0">
              <ProductReviews 
                reviews={productReviews}
                productRating={product.rating}
                reviewCount={product.reviewCount}
              />
            </TabsContent>

            <TabsContent value="delivery" className="mt-0">
              <div className="glass-card p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-4">Delivery Areas</h4>
                    <p className="text-muted-foreground mb-4">
                      We currently deliver across all major cities. Enter your pincode to check availability.
                    </p>
                    <h4 className="font-semibold mb-4 mt-6">Delivery Time Slots</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Morning: 9:00 AM - 12:00 PM</li>
                      <li>• Afternoon: 12:00 PM - 4:00 PM</li>
                      <li>• Evening: 4:00 PM - 8:00 PM</li>
                      <li>• Midnight: Available on special request</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Return & Refund Policy</h4>
                    <p className="text-muted-foreground mb-4">
                      Due to the perishable nature of our products, we do not accept returns. However, if you're not satisfied with your order, please contact us within 24 hours and we'll make it right.
                    </p>
                    <h4 className="font-semibold mb-4 mt-6">Free Delivery</h4>
                    <p className="text-muted-foreground">
                      Enjoy free delivery on orders above ₹500. Standard delivery charges of ₹49 apply for smaller orders.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-3xl font-bold mb-8">You May Also Like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed Section */}
        <RecentlyViewedSection excludeProductId={product.id} />
      </div>
    </div>
  );
}
