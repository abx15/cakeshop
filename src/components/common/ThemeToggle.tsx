import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative p-2 rounded-full hover:bg-secondary transition-colors overflow-hidden"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 0 : 180,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="relative w-5 h-5"
      >
        {/* Sun Icon */}
        <motion.div
          initial={false}
          animate={{
            opacity: theme === 'light' ? 1 : 0,
            y: theme === 'light' ? 0 : -20,
            rotate: theme === 'light' ? 0 : 180,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="w-5 h-5 text-amber-500" />
        </motion.div>

        {/* Moon Icon */}
        <motion.div
          initial={false}
          animate={{
            opacity: theme === 'dark' ? 1 : 0,
            y: theme === 'dark' ? 0 : 20,
            rotate: theme === 'dark' ? 0 : -180,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>

      {/* Glow effect on toggle */}
      <motion.div
        initial={false}
        animate={{
          scale: [1, 1.5, 0],
          opacity: [0.5, 0.8, 0],
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 rounded-full bg-primary/30"
        key={theme}
      />
    </motion.button>
  );
}
