import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import BestsellerSection from '@/components/home/BestsellerSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import InstagramSection from '@/components/home/InstagramSection';
import NewsletterSection from '@/components/home/NewsletterSection';

const Index = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <HeroSection />
      <CategoriesSection />
      <BestsellerSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <NewsletterSection />
      <InstagramSection />
    </div>
  );
};

export default Index;
