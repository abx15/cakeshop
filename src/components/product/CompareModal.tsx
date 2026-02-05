import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCompare } from '@/context/CompareContext';
import { useCart } from '@/context/CartContext';
import RatingStars from '@/components/common/RatingStars';
import { Button } from '@/components/ui/button';

export default function CompareModal() {
  const { compareItems, isCompareOpen, setCompareOpen, removeFromCompare } = useCompare();
  const { addItem } = useCart();

  if (!isCompareOpen) return null;

  const handleAddToCart = (product: typeof compareItems[0]) => {
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

  // Comparison attributes
  const attributes = [
    { key: 'price', label: 'Price', render: (p: typeof compareItems[0]) => `₹${p.price}` },
    { key: 'originalPrice', label: 'Original Price', render: (p: typeof compareItems[0]) => p.originalPrice ? `₹${p.originalPrice}` : '-' },
    { key: 'rating', label: 'Rating', render: (p: typeof compareItems[0]) => <RatingStars rating={p.rating} size="sm" showValue /> },
    { key: 'reviewCount', label: 'Reviews', render: (p: typeof compareItems[0]) => `${p.reviewCount} reviews` },
    { key: 'category', label: 'Category', render: (p: typeof compareItems[0]) => <span className="capitalize">{p.category}</span> },
    { key: 'sizes', label: 'Available Sizes', render: (p: typeof compareItems[0]) => p.sizes.map(s => s.weight).join(', ') },
    { key: 'flavors', label: 'Flavors', render: (p: typeof compareItems[0]) => p.flavors.slice(0, 3).join(', ') },
    { key: 'dietary', label: 'Dietary', render: (p: typeof compareItems[0]) => p.dietary.length > 0 ? (
      <div className="flex flex-wrap gap-1">
        {p.dietary.map(d => (
          <span key={d} className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full capitalize">{d}</span>
        ))}
      </div>
    ) : '-' },
    { key: 'deliveryTime', label: 'Delivery Time', render: (p: typeof compareItems[0]) => p.deliveryTime },
    { key: 'customizable', label: 'Customizable', render: (p: typeof compareItems[0]) => p.customizable ? <Check className="w-5 h-5 text-green-600" /> : <Minus className="w-5 h-5 text-muted-foreground" /> },
    { key: 'inStock', label: 'In Stock', render: (p: typeof compareItems[0]) => p.inStock ? <Check className="w-5 h-5 text-green-600" /> : <Minus className="w-5 h-5 text-destructive" /> },
    { key: 'calories', label: 'Calories (per 100g)', render: (p: typeof compareItems[0]) => `${p.nutritionalInfo.calories} kcal` },
  ];

  return (
    <AnimatePresence>
      {isCompareOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setCompareOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-background rounded-2xl shadow-elevated w-full max-w-5xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-serif text-2xl font-bold">Compare Products</h2>
              <button
                onClick={() => setCompareOpen(false)}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comparison Table */}
            <div className="overflow-auto max-h-[calc(90vh-80px)]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-4 text-left font-medium text-muted-foreground w-40">Feature</th>
                    {compareItems.map((product) => (
                      <th key={product.id} className="p-4 text-center min-w-[200px]">
                        <div className="relative">
                          <button
                            onClick={() => removeFromCompare(product.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-white rounded-full flex items-center justify-center hover:bg-destructive/90 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <div className="w-24 h-24 mx-auto rounded-xl overflow-hidden mb-3">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <Link
                            to={`/product/${product.slug}`}
                            onClick={() => setCompareOpen(false)}
                            className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2"
                          >
                            {product.name}
                          </Link>
                        </div>
                      </th>
                    ))}
                    {/* Empty slots */}
                    {Array.from({ length: 3 - compareItems.length }).map((_, idx) => (
                      <th key={`empty-${idx}`} className="p-4 text-center min-w-[200px]">
                        <div className="w-24 h-24 mx-auto rounded-xl bg-muted flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">Add product</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {attributes.map((attr, idx) => (
                    <tr key={attr.key} className={idx % 2 === 0 ? 'bg-muted/30' : ''}>
                      <td className="p-4 font-medium text-muted-foreground">{attr.label}</td>
                      {compareItems.map((product) => (
                        <td key={product.id} className="p-4 text-center">
                          {attr.render(product)}
                        </td>
                      ))}
                      {Array.from({ length: 3 - compareItems.length }).map((_, idx) => (
                        <td key={`empty-${idx}`} className="p-4 text-center text-muted-foreground">
                          -
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* Add to Cart Row */}
                  <tr className="border-t border-border">
                    <td className="p-4"></td>
                    {compareItems.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <Button
                          onClick={() => handleAddToCart(product)}
                          className="gradient-primary text-white"
                        >
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </td>
                    ))}
                    {Array.from({ length: 3 - compareItems.length }).map((_, idx) => (
                      <td key={`empty-${idx}`} className="p-4"></td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}