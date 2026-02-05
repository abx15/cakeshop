import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ArrowLeft, ArrowRightLeft, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/mockData';
import RatingStars from '@/components/common/RatingStars';
import { toast } from 'sonner';

export default function Wishlist() {
  const { items, removeItem, clearAll } = useWishlist();
  const { addItem } = useCart();

  const wishlistProducts = products.filter((product) => items.includes(product.id));

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[0],
      quantity: 1,
      size: product.sizes[0].weight,
      flavor: product.flavors[0],
      price: product.price,
      subtotal: product.price,
    });
    toast.success(`${product.name} added to cart`);
  };

  const handleMoveToCart = (product: typeof products[0]) => {
    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[0],
      quantity: 1,
      size: product.sizes[0].weight,
      flavor: product.flavors[0],
      price: product.price,
      subtotal: product.price,
    });
    removeItem(product.id);
    toast.success(`${product.name} moved to cart`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486427944544-d2c6e5e9a200?w=1920')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heart className="w-16 h-16 mx-auto mb-4 text-accent fill-accent/20" />
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              My Wishlist
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your saved favorites, ready to order
            </p>
          </motion.div>
        </div>
      </section>

      {/* Wishlist Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {wishlistProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <Heart className="w-24 h-24 mx-auto mb-6 text-muted-foreground/30" />
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                Your wishlist is empty
              </h2>
              <p className="text-muted-foreground mb-8">
                Start adding your favorite cakes and treats!
              </p>
              <Link to="/menu">
                <Button className="bg-accent hover:bg-accent/90 text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Browse Menu
                </Button>
              </Link>
            </motion.div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-muted-foreground">
                  {wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''} saved
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAll}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                  <Link to="/menu">
                    <Button variant="outline" size="sm">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all duration-300"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.discount && (
                        <span className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">
                          -{product.discount}%
                        </span>
                      )}
                      <button
                        onClick={() => removeItem(product.id)}
                        className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      <Link to={`/product/${product.slug}`}>
                        <h3 className="font-display font-bold text-lg text-foreground mb-2 hover:text-accent transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {product.shortDescription}
                      </p>

                      <div className="flex items-center gap-2 mb-4">
                        <RatingStars rating={product.rating} size="sm" />
                        <span className="text-sm text-muted-foreground">
                          ({product.reviewCount})
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-accent">
                            ₹{product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button
                          onClick={() => handleAddToCart(product)}
                          size="sm"
                          variant="outline"
                          className="flex-1"
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                        <Button
                          onClick={() => handleMoveToCart(product)}
                          size="sm"
                          className="flex-1 bg-accent hover:bg-accent/90 text-white"
                        >
                          <ArrowRightLeft className="w-4 h-4 mr-1" />
                          Move
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
