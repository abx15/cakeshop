import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Heart, MessageCircle, X } from 'lucide-react';

const instagramPosts = [
  { id: 1, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80', likes: 1234, comments: 56 },
  { id: 2, image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600&q=80', likes: 987, comments: 42 },
  { id: 3, image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&q=80', likes: 2341, comments: 89 },
  { id: 4, image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12f2e?w=600&q=80', likes: 1567, comments: 67 },
  { id: 5, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80', likes: 876, comments: 34 },
  { id: 6, image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600&q=80', likes: 1890, comments: 78 },
  { id: 7, image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=80', likes: 1123, comments: 45 },
  { id: 8, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80', likes: 2056, comments: 92 },
];

export default function InstagramSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="section-padding bg-pastel-peach overflow-hidden w-full">
      <div className="container-custom w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold mb-6"
          >
            <Instagram className="w-5 h-5" />
            Follow @sweetdelights
          </motion.a>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Sweet Moments on Instagram
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Tag us in your sweet celebrations! #SweetDelights #BakedWithLove
          </p>
        </motion.div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(post.image)}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
            >
              <img
                src={post.image}
                alt={`Instagram post ${post.id}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-white">
                  <Heart className="w-5 h-5 fill-white" />
                  <span className="font-semibold">{post.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span className="font-semibold">{post.comments}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-6 right-6 text-white hover:text-primary transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </motion.button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={selectedImage}
              alt="Selected post"
              className="max-w-full max-h-[90vh] rounded-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
