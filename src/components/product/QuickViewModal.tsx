import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Heart, ShoppingBag, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import RatingStars from '@/components/common/RatingStars';
import { cn } from '@/lib/utils';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedFlavor, setSelectedFlavor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);
  const currentPrice = product.sizes[selectedSize]?.price || product.price;
  const totalPrice = currentPrice * quantity;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[0],
      quantity,
      size: product.sizes[selectedSize]?.weight || '1kg',
      flavor: product.flavors[selectedFlavor] || 'Classic',
      price: currentPrice,
      subtotal: totalPrice,
    });
    onClose();
  };

  const handleToggleWishlist = () => {
    toggleItem(product.id, product.name);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-background rounded-2xl shadow-elevated max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2 max-h-[90vh] overflow-y-auto">
              {/* Image Section */}
              <div className="relative bg-muted p-6">
                {/* Main Image */}
                <div className="aspect-square rounded-xl overflow-hidden mb-4">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Thumbnails */}
                {product.images.length > 1 && (
                  <div className="flex gap-2 justify-center">
                    {product.images.slice(0, 4).map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={cn(
                          'w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors',
                          selectedImage === idx ? 'border-primary' : 'border-transparent'
                        )}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-8 left-8 flex flex-col gap-2">
                  {product.discount && (
                    <span className="badge-discount">{product.discount}% OFF</span>
                  )}
                  {product.dietary.includes('eggless') && (
                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                      Eggless
                    </span>
                  )}
                </div>
              </div>

              {/* Details Section */}
              <div className="p-6 md:p-8 flex flex-col">
                {/* Category */}
                <span className="badge-category mb-2 inline-block w-fit capitalize">
                  {product.category}
                </span>

                {/* Name */}
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <RatingStars rating={product.rating} size="md" />
                  <span className="text-sm text-muted-foreground">
                    ({product.reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-3xl font-bold text-primary">₹{currentPrice}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {product.description}
                </p>

                {/* Size Selection */}
                <div className="mb-4">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, idx) => (
                      <button
                        key={size.weight}
                        onClick={() => setSelectedSize(idx)}
                        className={cn(
                          'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                          selectedSize === idx
                            ? 'gradient-primary text-white'
                            : 'bg-secondary text-foreground hover:bg-primary/10'
                        )}
                      >
                        {size.weight} - ₹{size.price}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Flavor Selection */}
                <div className="mb-4">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Flavor
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.flavors.map((flavor, idx) => (
                      <button
                        key={flavor}
                        onClick={() => setSelectedFlavor(idx)}
                        className={cn(
                          'px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize',
                          selectedFlavor === idx
                            ? 'gradient-primary text-white'
                            : 'bg-secondary text-foreground hover:bg-primary/10'
                        )}
                      >
                        {flavor}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-border rounded-full">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center hover:bg-muted rounded-l-full transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-medium">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-muted rounded-r-full transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-lg font-semibold text-foreground">
                      Total: ₹{totalPrice}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-6 gradient-primary text-white rounded-full font-semibold flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleToggleWishlist}
                    className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
                      isWishlisted
                        ? 'bg-primary text-white'
                        : 'bg-secondary text-foreground hover:bg-primary/10'
                    )}
                  >
                    <Heart className={cn('w-5 h-5', isWishlisted && 'fill-current')} />
                  </motion.button>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
                  <div className="flex flex-col items-center text-center gap-1">
                    <Truck className="w-5 h-5 text-primary" />
                    <span className="text-xs text-muted-foreground">Free Delivery</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-1">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="text-xs text-muted-foreground">Quality Assured</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-1">
                    <RotateCcw className="w-5 h-5 text-primary" />
                    <span className="text-xs text-muted-foreground">Easy Returns</span>
                  </div>
                </div>

                {/* View Full Details Link */}
                <Link
                  to={`/product/${product.slug}`}
                  onClick={onClose}
                  className="mt-4 text-center text-primary font-medium hover:underline"
                >
                  View Full Details →
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
