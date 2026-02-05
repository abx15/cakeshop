import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye, GitCompareArrows } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCompare } from '@/context/CompareContext';
import RatingStars from '@/components/common/RatingStars';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
  onQuickView?: (product: Product) => void;
  compact?: boolean;
}

export default function ProductCard({ product, index = 0, onQuickView, compact = false }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { addToCompare, isInCompare } = useCompare();
  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[0],
      quantity: 1,
      size: product.sizes[0]?.weight || '1kg',
      flavor: product.flavors[0] || 'Classic',
      price: product.price,
      subtotal: product.price,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product.id, product.name);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCompare(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/product/${product.slug}`} className="group block">
        <div className={cn("glass-card overflow-hidden card-hover", compact && "rounded-xl")}>
          {/* Image Container */}
          <div className="relative aspect-square img-zoom">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            
            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 bg-white rounded-full text-sm font-semibold text-foreground flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleQuickView}
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-secondary transition-colors"
                  title="Quick View"
                >
                  <Eye className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCompare}
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
                    isCompared
                      ? 'bg-primary text-white'
                      : 'bg-white hover:bg-secondary'
                  )}
                  title="Compare"
                >
                  <GitCompareArrows className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Wishlist Button */}
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleWishlist}
              className={cn(
                'absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all',
                isWishlisted
                  ? 'bg-primary text-white'
                  : 'bg-white/90 text-foreground hover:bg-primary hover:text-white'
              )}
            >
              <Heart className={cn('w-5 h-5', isWishlisted && 'fill-current')} />
            </motion.button>

            {/* Discount Badge */}
            {product.discount && (
              <div className="absolute top-4 left-4 badge-discount">
                {product.discount}% OFF
              </div>
            )}
          </div>

          {/* Content */}
          <div className={cn("p-5", compact && "p-3")}>
            {/* Category Badge - hide in compact mode */}
            {!compact && (
              <span className="badge-category mb-3 inline-block capitalize">
                {product.category}
              </span>
            )}

            {/* Name */}
            <h3 className={cn(
              "font-serif font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors",
              compact ? "text-sm mb-1" : "text-lg mb-2"
            )}>
              {product.name}
            </h3>

            {/* Short Description - hide in compact mode */}
            {!compact && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                {product.shortDescription}
              </p>
            )}

            {/* Rating - smaller in compact mode */}
            <div className={cn("flex items-center gap-2", compact ? "mb-2" : "mb-3")}>
              <RatingStars rating={product.rating} size="sm" />
              {!compact && (
                <span className="text-xs text-muted-foreground">
                  ({product.reviewCount})
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className={cn("font-bold text-primary", compact ? "text-base" : "text-2xl")}>
                ₹{product.price}
              </span>
              {product.originalPrice && !compact && (
                <span className="price-original">₹{product.originalPrice}</span>
              )}
            </div>

            {/* Dietary Tags - hide in compact mode */}
            {!compact && product.dietary.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {product.dietary.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full capitalize"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
