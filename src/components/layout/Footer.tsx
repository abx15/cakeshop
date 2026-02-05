import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ChevronUp,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";

const quickLinks = [
  { name: "Menu", path: "/menu" },
  { name: "About Us", path: "/about" },
  { name: "Custom Orders", path: "/custom-order" },
  { name: "Order Tracking", path: "/order-tracking" },
  { name: "FAQ", path: "/contact#faq" },
  { name: "Privacy Policy", path: "/privacy" },
  { name: "Terms of Service", path: "/terms" },
];

const categories = [
  { name: "Birthday Cakes", path: "/menu?category=birthday" },
  { name: "Wedding Cakes", path: "/menu?category=wedding" },
  { name: "Cupcakes", path: "/menu?category=cupcakes" },
  { name: "Brownies", path: "/menu?category=brownies" },
  { name: "Cookies", path: "/menu?category=cookies" },
  { name: "Pastries", path: "/menu?category=pastries" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-chocolate text-chocolate-foreground">
      {/* Main Footer */}
      <div className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div>
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img
                    src="/cakeFavicon.png"
                    alt="Sweet Delights Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold">
                    Sweet Delights
                  </h2>
                  <p className="text-xs text-chocolate-foreground/60">
                    Artisan Bakery
                  </p>
                </div>
              </Link>
              <p className="text-chocolate-foreground/80 mb-6 leading-relaxed">
                Crafting moments of joy since 2010. Every cake tells a story,
                and we're here to make yours unforgettable.
              </p>
              <div className="flex gap-4">
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-serif text-lg font-semibold mb-6">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-chocolate-foreground/80 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-serif text-lg font-semibold mb-6">
                Categories
              </h3>
              <ul className="space-y-3">
                {categories.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-chocolate-foreground/80 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-serif text-lg font-semibold mb-6">
                Contact Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-chocolate-foreground/80">
                    123 Baker Street, Sweet Lane
                    <br />
                    Mumbai, Maharashtra 400001
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <a
                    href="tel:+919876543210"
                    className="text-chocolate-foreground/80 hover:text-primary transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <a
                    href="mailto:hello@sweetdelights.com"
                    className="text-chocolate-foreground/80 hover:text-primary transition-colors"
                  >
                    hello@sweetdelights.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-chocolate-foreground/80">
                    Mon - Sat: 9am - 9pm
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-chocolate-foreground/60 text-sm text-center md:text-left">
              © 2024 Sweet Delights. All rights reserved. Made with{" "}
              <Heart className="inline w-4 h-4 text-primary" /> in India
            </p>
            <div className="flex items-center gap-4">
              <img
                src="https://cdn-icons-png.flaticon.com/128/349/349221.png"
                alt="Visa"
                className="h-8 opacity-60 hover:opacity-100 transition-opacity"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/128/349/349228.png"
                alt="Mastercard"
                className="h-8 opacity-60 hover:opacity-100 transition-opacity"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/128/6124/6124998.png"
                alt="UPI"
                className="h-8 opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-6 w-12 h-12 rounded-full gradient-primary text-white shadow-elevated flex items-center justify-center z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        aria-label="Back to top"
      >
        <ChevronUp className="w-6 h-6" />
      </motion.button>
    </footer>
  );
}
