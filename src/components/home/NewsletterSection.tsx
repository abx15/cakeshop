import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Gift, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';

const emailSchema = z.string().email({ message: 'Please enter a valid email address' });

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate email
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSubscribed(true);
    setEmail('');

    toast({
      title: '🎉 Welcome to Sweet Delights!',
      description: 'You\'ve been subscribed. Check your inbox for a special 10% off coupon!',
    });
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/10 to-secondary/20" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486427944544-d2c6e5e9a200?w=1920')] bg-cover bg-center opacity-10" />
      
      {/* Decorative elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-10 left-10 w-20 h-20 rounded-full bg-accent/10 blur-xl"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-primary/10 blur-xl"
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
              <Mail className="w-4 h-4" />
              <span className="text-sm font-medium">Newsletter</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Get Sweet Updates &
              <span className="text-accent"> Exclusive Offers</span>
            </h2>

            <p className="text-muted-foreground mb-8 max-w-md mx-auto lg:mx-0">
              Subscribe to our newsletter and be the first to know about new flavors, 
              seasonal specials, and get an exclusive 10% off your first order!
            </p>

            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 justify-center lg:justify-start text-green-600 bg-green-50 dark:bg-green-900/20 p-4 rounded-xl"
              >
                <CheckCircle className="w-6 h-6" />
                <span className="font-medium">You're subscribed! Check your inbox.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      className={`h-12 px-5 rounded-full bg-background border-2 ${
                        error ? 'border-red-500' : 'border-border focus:border-accent'
                      }`}
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-2 ml-4">{error}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-12 px-8 rounded-full bg-accent hover:bg-accent/90 text-white font-medium"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Sparkles className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      'Subscribe'
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
                </p>
              </form>
            )}
          </motion.div>

          {/* Right: Special Offer Banner */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-accent to-primary rounded-3xl p-8 text-white overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Gift className="w-10 h-10" />
                  <span className="text-lg font-medium">Special Offer</span>
                </div>

                <h3 className="text-4xl md:text-5xl font-display font-bold mb-2">
                  10% OFF
                </h3>
                <p className="text-xl font-medium mb-4">Your First Order</p>

                <p className="text-white/80 mb-6">
                  Use code <span className="font-bold bg-white/20 px-2 py-1 rounded">SWEETFIRST</span> at checkout
                </p>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Free Delivery Above ₹500</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Same Day Delivery</span>
                  </div>
                </div>
              </div>

              {/* Floating cake image */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-4 -bottom-4 w-32 h-32 md:w-40 md:h-40"
              >
                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200"
                  alt="Delicious cake"
                  className="w-full h-full object-cover rounded-full border-4 border-white/30 shadow-lg"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
