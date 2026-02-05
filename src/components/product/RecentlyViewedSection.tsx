import { motion } from 'framer-motion';
import { Clock, X } from 'lucide-react';
import { useRecentlyViewed } from '@/context/RecentlyViewedContext';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';

interface RecentlyViewedSectionProps {
  excludeProductId?: string;
}

export default function RecentlyViewedSection({ excludeProductId }: RecentlyViewedSectionProps) {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();

  // Filter out the current product if on a product page
  const displayProducts = excludeProductId
    ? recentlyViewed.filter((p) => p.id !== excludeProductId)
    : recentlyViewed;

  if (displayProducts.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-pastel-cream">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold">
                Recently Viewed
              </h2>
              <p className="text-muted-foreground text-sm">
                Continue where you left off
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearRecentlyViewed}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
          {displayProducts.slice(0, 6).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ProductCard product={product} compact />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
