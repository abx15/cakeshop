import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cake, Heart, Cookie, Sparkles, Gift, Package } from 'lucide-react';
import { categories } from '@/data/mockData';

const iconMap: { [key: string]: React.ElementType } = {
  Cake: Cake,
  Heart: Heart,
  Cookie: Cookie,
  Sparkles: Sparkles,
  Gift: Gift,
  Package: Package,
};

export default function CategoriesSection() {
  return (
    <section className="section-padding bg-pastel-cream w-full">
      <div className="container-custom w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-secondary text-primary text-sm font-medium mb-4">
            Our Specialties
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore Our Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From elegant wedding cakes to playful cupcakes, find the perfect sweet treat for every occasion.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const IconComponent = iconMap[category.icon] || Cake;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/menu?category=${category.slug}`} className="group block">
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="relative rounded-3xl overflow-hidden bg-card shadow-card transition-all duration-500 group-hover:shadow-elevated"
                  >
                    {/* Image */}
                    <div className="relative h-64 img-zoom">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-serif text-2xl font-bold text-white mb-1">
                            {category.name}
                          </h3>
                          <p className="text-white/80 text-sm">
                            {category.productCount} Products
                          </p>
                        </div>
                        <motion.div
                          initial={{ x: -10, opacity: 0 }}
                          whileHover={{ x: 0, opacity: 1 }}
                          className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center"
                        >
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </motion.div>
                      </div>
                    </div>

                    {/* Gradient Border Animation */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/30 transition-colors duration-500" />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
