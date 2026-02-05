import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { 
  Award, 
  Heart, 
  Lightbulb, 
  Leaf, 
  ChefHat,
  Users,
  Cake,
  Star
} from 'lucide-react';
import { teamMembers } from '@/data/mockData';

const values = [
  {
    icon: Award,
    title: "Quality First",
    description: "We use only the finest ingredients, sourced from trusted suppliers to ensure every bite is perfect."
  },
  {
    icon: Heart,
    title: "Made with Passion",
    description: "Every cake is crafted with love and dedication by our skilled pastry chefs."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We constantly experiment with new flavors and designs to bring you unique creations."
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "We're committed to eco-friendly practices and sustainable sourcing."
  }
];

const milestones = [
  { year: '2015', title: 'The Beginning', description: 'Sweet Delights was born in a small home kitchen with a dream to spread joy through cakes.' },
  { year: '2017', title: 'First Store', description: 'We opened our first physical store in the heart of the city.' },
  { year: '2019', title: 'Award Winner', description: 'Won "Best Bakery" award at the National Pastry Championship.' },
  { year: '2021', title: 'Going Digital', description: 'Launched our online ordering platform to reach customers nationwide.' },
  { year: '2023', title: 'Expansion', description: 'Opened 5 new stores across major cities and hired 50+ talented team members.' },
  { year: '2024', title: 'New Heights', description: 'Celebrating serving over 100,000 happy customers and counting!' }
];

const stats = [
  { icon: Cake, value: '50,000+', label: 'Cakes Delivered' },
  { icon: Users, value: '100,000+', label: 'Happy Customers' },
  { icon: ChefHat, value: '25+', label: 'Expert Chefs' },
  { icon: Star, value: '4.9/5', label: 'Customer Rating' }
];

export default function About() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1920&q=80"
            alt="Our Kitchen"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center z-10 px-4"
        >
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm mb-6">
            Est. 2015
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Our Sweet Story
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            From a small home kitchen to your favorite bakery - a journey of passion, love, and endless creativity.
          </p>
        </motion.div>
      </section>

      {/* Brand Story */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
                alt="Founder baking"
                className="rounded-2xl shadow-elevated"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <span className="badge-category">Our Story</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">
                Where Every Cake Tells a Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Sweet Delights began in 2015 when our founder, Priya Kapoor, started baking cakes for family and friends from her home kitchen. What started as a passionate hobby quickly grew into something much bigger.
                </p>
                <p>
                  Word spread about her incredible creations - moist red velvet cakes, decadent chocolate truffles, and stunning custom designs that were almost too beautiful to eat. Soon, orders were pouring in from all over the city.
                </p>
                <p>
                  Today, Sweet Delights is more than just a bakery. We're a team of 50+ passionate individuals dedicated to making every celebration sweeter. From intimate birthday parties to grand weddings, we've been privileged to be part of countless special moments.
                </p>
                <p>
                  Our philosophy remains the same: use the finest ingredients, pour love into every creation, and never stop innovating. Because at Sweet Delights, we believe that the best cakes are made with passion, not just recipes.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge-category">What We Stand For</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from ingredient selection to customer service.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center group hover:shadow-elevated transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-secondary/30" ref={timelineRef}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-category">Our Journey</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 mb-4">
              Milestones & Achievements
            </h2>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block">
              <motion.div
                style={{ height: lineHeight }}
                className="w-full bg-primary origin-top"
              />
            </div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="glass-card p-6">
                      <span className="text-primary font-bold text-lg">{milestone.year}</span>
                      <h3 className="font-serif text-xl font-bold mt-2 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="relative hidden md:block">
                    <div className="w-4 h-4 rounded-full gradient-primary z-10" />
                  </div>
                  
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge-category">Meet the Team</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 mb-4">
              The Faces Behind the Magic
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our talented team of pastry chefs, designers, and cake artists bring creativity and expertise to every creation.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-[3/4] object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white text-sm">{member.bio}</p>
                    </div>
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold">{member.name}</h3>
                <p className="text-primary font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge-category">Recognition</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 mb-4">
              Awards & Certifications
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'FSSAI Certified', year: '2016' },
              { name: 'ISO 22000', year: '2018' },
              { name: 'Best Bakery Award', year: '2019' },
              { name: 'Excellence in Taste', year: '2023' }
            ].map((award, index) => (
              <motion.div
                key={award.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <Award className="w-12 h-12 text-primary mx-auto mb-3" />
                <h4 className="font-semibold mb-1">{award.name}</h4>
                <p className="text-sm text-muted-foreground">{award.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
