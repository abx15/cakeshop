import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/919876543210?text=Hi! I'd like to order a cake"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: 'spring' }}
    >
      <div className="relative">
        <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-elevated animate-pulse-glow">
          <MessageCircle className="w-7 h-7 text-white" />
        </div>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-ping" />
      </div>
    </motion.a>
  );
}
