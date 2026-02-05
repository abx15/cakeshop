import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import ScrollToTop from "@/components/common/ScrollToTop";
import CompareBar from "@/components/product/CompareBar";
import CompareModal from "@/components/product/CompareModal";
import { useLenis } from "@/hooks/useLenis";
import { CompareProvider } from "@/context/CompareContext";

interface LayoutProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: "tween" as const,
  ease: "anticipate" as const,
  duration: 0.4,
};

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  useLenis();

  return (
    <CompareProvider>
      <div className="min-h-screen w-full flex flex-col overflow-x-hidden">
        <Header />
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="flex-grow"
          >
            {children}
          </motion.main>
        </AnimatePresence>
        <Footer />
        <WhatsAppButton />
        <ScrollToTop />
        <CompareBar />
        <CompareModal />
      </div>
    </CompareProvider>
  );
}
