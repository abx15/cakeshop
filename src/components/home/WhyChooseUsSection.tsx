import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Leaf, Palette, Truck, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: 'Fresh Ingredients Daily',
    description: 'We source the finest ingredients every morning for the freshest taste.',
    count: 100,
    suffix: '%',
    label: 'Fresh',
  },
  {
    icon: Palette,
    title: 'Custom Cake Design',
    description: 'Our artists create stunning custom designs for your special occasions.',
    count: 500,
    suffix: '+',
    label: 'Designs',
  },
  {
    icon: Truck,
    title: 'Same Day Delivery',
    description: 'Order before 2 PM and receive your cake the same day.',
    count: 2,
    suffix: 'hr',
    label: 'Delivery',
  },
  {
    icon: ShieldCheck,
    title: '100% Hygiene Certified',
    description: 'FSSAI certified kitchen with strict quality standards.',
    count: 50000,
    suffix: '+',
    label: 'Happy Customers',
  },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function WhyChooseUsSection() {
  return (
    <section className="section-padding bg-pastel-pink relative overflow-hidden w-full">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-secondary text-primary text-sm font-medium mb-4">
            Why Sweet Delights
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Choose Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We're committed to delivering not just cakes, but experiences that create lasting memories.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-card rounded-3xl p-8 h-full text-center shadow-card hover:shadow-elevated transition-all duration-500"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6"
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Count */}
                <div className="font-serif text-4xl font-bold text-primary mb-2">
                  <AnimatedCounter target={feature.count} suffix={feature.suffix} />
                </div>
                <p className="text-sm text-muted-foreground mb-4">{feature.label}</p>

                {/* Title */}
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
