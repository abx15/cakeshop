import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { products } from '@/data/mockData';
import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import QuickViewModal from '@/components/product/QuickViewModal';
import { Slider } from '@/components/ui/slider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Get price bounds from products
  const priceBounds = useMemo(() => {
    const prices = products.map((p) => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesSearch && matchesPrice;
    });

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result = [...result].reverse();
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy, priceRange]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (priceRange[0] > priceBounds.min || priceRange[1] < priceBounds.max) count++;
    return count;
  }, [selectedCategory, priceRange, priceBounds]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([priceBounds.min, priceBounds.max]);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Banner */}
      <section className="relative h-[40vh] bg-gradient-to-r from-pastel-pink via-pastel-cream to-pastel-peach flex items-center">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4"
          >
            Our Delicious Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            Explore our handcrafted collection of cakes, pastries, and treats
          </motion.p>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="sticky top-20 z-30 bg-background/95 backdrop-blur-md border-b border-border py-4">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Left: Search + Filter Toggle */}
            <div className="flex gap-3 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-border focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Filter Toggle (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  'lg:hidden flex items-center gap-2 px-4 py-3 rounded-full border transition-colors',
                  showFilters ? 'border-primary bg-primary/10' : 'border-border'
                )}
              >
                <SlidersHorizontal className="w-5 h-5" />
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 rounded-full gradient-primary text-white text-xs flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>

            {/* Center: Category Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto scrollbar-hide">
              <button
                onClick={() => setSelectedCategory('all')}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                  selectedCategory === 'all'
                    ? 'gradient-primary text-white'
                    : 'bg-secondary text-foreground hover:bg-primary/10'
                )}
              >
                All
              </button>
              {['cake', 'pastry', 'cupcake', 'brownie', 'cookie'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap capitalize transition-colors',
                    selectedCategory === cat
                      ? 'gradient-primary text-white'
                      : 'bg-secondary text-foreground hover:bg-primary/10'
                  )}
                >
                  {cat}s
                </button>
              ))}
            </div>

            {/* Right: Sort + Price Filter */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Price Range */}
              <div className="flex items-center gap-3 px-4 py-2 bg-secondary rounded-full">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  ₹{priceRange[0]} - ₹{priceRange[1]}
                </span>
                <Slider
                  value={priceRange}
                  min={priceBounds.min}
                  max={priceBounds.max}
                  step={50}
                  onValueChange={setPriceRange}
                  className="w-32"
                />
              </div>

              {/* Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm font-medium hover:bg-primary/10 transition-colors">
                  Sort: {sortOptions.find((o) => o.value === sortBy)?.label}
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={cn(sortBy === option.value && 'bg-primary/10 text-primary')}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-primary hover:underline"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden mt-4 pt-4 border-t border-border space-y-4"
            >
              {/* Price Range */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                </label>
                <Slider
                  value={priceRange}
                  min={priceBounds.min}
                  max={priceBounds.max}
                  step={50}
                  onValueChange={setPriceRange}
                  className="w-full"
                />
              </div>

              {/* Sort */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Sort By</label>
                <div className="flex flex-wrap gap-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-sm transition-colors',
                        sortBy === option.value
                          ? 'gradient-primary text-white'
                          : 'bg-muted text-foreground hover:bg-primary/10'
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="w-full py-2 text-center text-primary font-medium hover:underline"
                >
                  Clear All Filters
                </button>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Results Count */}
      <section className="container-custom py-4">
        <p className="text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span>{' '}
          {filteredProducts.length === 1 ? 'product' : 'products'}
          {searchQuery && (
            <>
              {' '}
              for "<span className="text-primary">{searchQuery}</span>"
            </>
          )}
        </p>
      </section>

      {/* Products Grid */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">
                No products found matching your criteria.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 gradient-primary text-white rounded-full font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

export default Menu;
