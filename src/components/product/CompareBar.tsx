import { motion, AnimatePresence } from 'framer-motion';
import { X, GitCompareArrows } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function CompareBar() {
  const { compareItems, removeFromCompare, clearCompare, setCompareOpen } = useCompare();

  if (compareItems.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border shadow-elevated"
      >
        <div className="container-custom py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <GitCompareArrows className="w-5 h-5 text-primary" />
              <span className="font-medium">
                Compare ({compareItems.length}/3)
              </span>
            </div>

            {/* Product Thumbnails */}
            <div className="flex items-center gap-3 flex-1 justify-center">
              {[0, 1, 2].map((index) => {
                const product = compareItems[index];
                return (
                  <div
                    key={index}
                    className={cn(
                      'relative w-16 h-16 rounded-lg border-2 overflow-hidden transition-all',
                      product ? 'border-primary' : 'border-dashed border-border bg-muted'
                    )}
                  >
                    {product ? (
                      <>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removeFromCompare(product.id)}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white rounded-full flex items-center justify-center"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <span className="text-xs">Empty</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={clearCompare}>
                Clear All
              </Button>
              <Button
                size="sm"
                onClick={() => setCompareOpen(true)}
                disabled={compareItems.length < 2}
                className="gradient-primary text-white"
              >
                Compare Now
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}