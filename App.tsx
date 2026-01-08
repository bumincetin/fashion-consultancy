
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Instagram, 
  Mail,
  ChevronRight,
  Globe,
  MapPin,
  Star,
  Heart,
  Sparkles,
  Users,
  Compass,
  Palette,
  MessageCircle,
  CheckCircle2,
  Scissors,
  Crown,
  Gem,
  Camera,
  Clock,
  Ticket,
  Map
} from 'lucide-react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { FEATURED_STORES } from './constants';
import { StoreCard } from './components/StoreCard';
import { BookingModal } from './components/BookingModal';
import { ImageSliderCrossfade, ImageSliderKenBurns } from './components/ImageSlider';
import { SEOHead } from './components/SEOHead';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ExperiencesPage } from './components/ExperiencesPage';
import { LeadMagnetPopup } from './components/LeadMagnetPopup';
import { Language } from './types';
import { TRANSLATIONS } from './translations';

// Gülizar's actual photos
const GULIZAR_IMAGES = [
  '/gulizar1.jpg',
  '/gulizar2.jpg',
  '/gulizar3.jpg',
  '/gulizar4.jpg',
  '/gulizar5.jpg',
  '/gulizar6.jpg',
  '/gulizar7.jpg',
];

// Hero images (select best ones for hero)
const HERO_IMAGES = [
  '/gulizar1.jpg',
  '/gulizar3.jpg',
  '/gulizar5.jpg',
  '/gulizar7.jpg',
];

// About section images
const ABOUT_IMAGES = [
  '/gulizar2.jpg',
  '/gulizar4.jpg',
  '/gulizar6.jpg',
];

// Milan fashion district images
const IMAGES = {
  galleria: 'galleria.jpg',
  brera: 'brera.jpg',
  quadrilatero: 'monte.jpg',
  serravalle: 'seravalle.jpg',
  luxuryShopping: 'luxur.jpg',
};

// Luxury shopping tour images (cycling through luxur1, luxur2, etc.)
const LUXURY_SHOPPING_IMAGES = [
  '/luxur1.jpg',
  '/luxur2.jpg',
  '/luxur3.jpg',
  '/luxur4.jpg',
  '/luxur5.jpg',
  '/luxur6.jpg',
  '/luxur7.jpg',
];

// Luxury Image Slider Component
const LuxuryImageSlider: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="absolute inset-0 w-full h-full">
      {images.map((src, index) => (
        <motion.img
          key={index}
          src={src}
          alt={`Luxury Shopping Experience in Milan ${index + 1}`}
          initial={false}
          animate={{ 
            opacity: index === currentIndex ? 1 : 0,
            scale: index === currentIndex ? 1 : 1.05
          }}
          transition={{ 
            duration: 1,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ))}
    </div>
  );
};

// Animated Image Component with Parallax
const ParallaxImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);
  
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-[115%] object-cover img-editorial"
        style={{ y }}
      />
    </div>
  );
};

// Section Header Component
const SectionHeader: React.FC<{
  label: string;
  title: string;
  description?: string;
  centered?: boolean;
}> = ({ label, title, description, centered = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-16 md:mb-20 ${centered ? 'text-center' : ''}`}
    >
      <span className="label-micro block mb-4 text-[#C4A484]">{label}</span>
      <h2 className="heading-display text-[#2C2825] mb-6">{title}</h2>
      {description && (
        <p className={`body-elegant ${centered ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>{description}</p>
      )}
    </motion.div>
  );
};

// Testimonial Slider Component
const TestimonialSlider: React.FC<{ testimonials: any[] }> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="relative h-[300px] md:h-[350px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex flex-col justify-center"
        >
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-white/90 leading-relaxed mb-10 px-4">
            {testimonials[currentIndex].quote}
          </blockquote>
          <div className="flex items-center justify-center">
            <div className="text-left">
              <p className="text-white font-medium">{testimonials[currentIndex].author}</p>
              <p className="text-white/50 text-sm">{testimonials[currentIndex].role}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Indicator dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-[#C4A484] w-8' : 'bg-white/30'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<'home' | 'stores' | 'methodology' | 'experiences'>('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const path = window.location.pathname.replace(/^\/|\/$/g, '');
    if (path === 'tr') setLang('tr');
    else if (path === 'it') setLang('it');
    else setLang('en');
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    const newPath = newLang === 'en' ? '/' : `/${newLang}`;
    window.history.pushState({}, '', newPath);
  };

  const NavButton = ({ tab, label }: { tab: typeof activeTab, label: string }) => (
    <button 
      onClick={() => setActiveTab(tab)}
      className={`px-2.5 sm:px-5 py-2 sm:py-2.5 text-[8px] sm:text-[10px] font-mono tracking-[0.1em] sm:tracking-[0.15em] uppercase transition-all duration-500 rounded-full whitespace-nowrap ${
        activeTab === tab 
          ? 'bg-[#2C2825] text-[#FAF8F5]' 
          : 'text-[#5C554D] hover:text-[#2C2825]'
      }`}
    >
      {label}
    </button>
  );

  // Methodology steps icons - 3-Step Style DNA Method
  const methodologyIcons = [
    <MessageCircle key="1" size={24} />, // Discovery - Psychology
    <Compass key="2" size={24} />,       // Curation - Architecture
    <Sparkles key="3" size={24} />,      // Integration - Wardrobe
  ];

  const handleBookExperience = (serviceId: string) => {
    setSelectedService(serviceId);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2825]">
      {/* SEO Head - Dynamic meta tags per language */}
      <SEOHead lang={lang} />
      
      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
      
      {/* Lead Magnet Popup - Trend Report */}
      <LeadMagnetPopup lang={lang} />
      
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] bg-[#C4A484]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] bg-[#D4A5A5]/5 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 pb-40">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Hero Section */}
              <section className="min-h-screen flex flex-col justify-center px-6 pt-20 pb-32">
                <div className="max-w-7xl mx-auto w-full">
                  <div className="grid grid-cols-12 gap-6 lg:gap-10 items-center">
                    {/* Text Content */}
                    <div className="col-span-12 lg:col-span-6 order-2 lg:order-1">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8"
                      >
                        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif italic text-[#2C2825] leading-none mb-2">
                          Gülizar Ermiş
                        </h2>
                      </motion.div>
                      
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="label-micro block mb-6 text-[#C4A484]"
                      >
                        {t.hero.subtitle}
                      </motion.span>
                      
                      <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="heading-hero mb-8"
                      >
                        {t.hero.title1}<br />
                        <span className="text-[#8C847A]">{t.hero.title2}</span><br />
                        {t.hero.title3}
                      </motion.h1>
                      
                      <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="body-elegant max-w-md mb-10"
                      >
                        {t.hero.desc}
                      </motion.p>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
                      >
                        <button 
                          onClick={() => setActiveTab('methodology')}
                          className="bg-[#2C2825] text-[#FAF8F5] px-6 sm:px-10 py-3.5 sm:py-4 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] rounded-full hover:bg-[#C4A484] transition-all duration-500 flex items-center justify-center gap-2 sm:gap-3"
                        >
                          {t.hero.cta1}
                          <ArrowRight size={14} />
                        </button>
                        <button 
                          onClick={() => setIsBookingModalOpen(true)}
                          className="border border-[#2C2825]/20 px-6 sm:px-10 py-3.5 sm:py-4 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] rounded-full hover:border-[#2C2825] hover:bg-[#2C2825] hover:text-[#FAF8F5] transition-all duration-500"
                        >
                          {t.hero.cta2}
                        </button>
                      </motion.div>
                    </div>

                    {/* Hero Image Slider */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 1 }}
                      className="col-span-12 lg:col-span-6 order-1 lg:order-2"
                    >
                      <div className="relative">
                        <div className="rounded-3xl overflow-hidden shadow-2xl">
                          <ImageSliderCrossfade 
                            images={HERO_IMAGES}
                            interval={4000}
                            alt="Gülizar Ermiş - Fashion Designer"
                            aspectRatio="aspect-[4/5]"
                            showIndicators={true}
                          />
                        </div>
                        {/* Floating accent card */}
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1 }}
                          className="absolute -bottom-4 sm:-bottom-6 -left-2 sm:-left-6 glass-warm p-4 sm:p-6 rounded-2xl max-w-[180px] sm:max-w-[220px] z-20"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Star size={14} className="text-[#C5A059] fill-[#C5A059] flex-shrink-0" />
                            <span className="text-[10px] sm:text-[11px] font-mono text-[#5C554D] truncate">{t.hero.trustedBy}</span>
                          </div>
                          <p className="text-base sm:text-lg font-serif italic text-[#2C2825] leading-tight">{t.hero.satisfiedClients}</p>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* Services Bento Grid */}
              <section className="py-24 px-6 bg-[#F5F0EA]">
                <div className="max-w-7xl mx-auto">
                  <SectionHeader 
                    label={t.services.label}
                    title={t.services.title}
                    description={t.services.desc}
                  />

                  <div className="grid grid-cols-12 gap-4 md:gap-6">
                    {/* Large Featured Card */}
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="col-span-12 md:col-span-8 relative overflow-hidden rounded-3xl group min-h-[500px]"
                    >
                      <LuxuryImageSlider images={LUXURY_SHOPPING_IMAGES} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2C2825]/90 via-[#2C2825]/30 to-transparent z-10" />
                      <div className="absolute bottom-0 left-0 right-0 p-10 md:p-12 z-20">
                        <span className="label-micro block mb-4 text-[#C4A484]">{t.services.premium}</span>
                        <h3 className="text-3xl md:text-4xl font-serif italic text-white mb-4">
                          {t.services.shoppingTours}
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed max-w-lg mb-6">
                          {t.services.shoppingToursDesc}
                        </p>
                        <button 
                          onClick={() => setActiveTab('methodology')}
                          className="text-[10px] font-mono uppercase tracking-[0.2em] text-white flex items-center gap-2 hover:gap-4 transition-all"
                        >
                          {t.services.learnMore} <ArrowRight size={14} />
                        </button>
                      </div>
                    </motion.div>

                    {/* Side Cards */}
                    <div className="col-span-12 md:col-span-4 grid gap-4 md:gap-6">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="card p-8 flex flex-col"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-[#C4A484]/10 flex items-center justify-center mb-6">
                          <Heart size={20} className="text-[#C4A484]" />
                        </div>
                        <h4 className="label-small mb-3 text-[#2C2825]">{t.services.wardrobeCuration}</h4>
                        <p className="text-[#5C554D] text-sm leading-relaxed">
                          {t.services.wardrobeCurationDesc}
                        </p>
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="card p-8 flex flex-col"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-[#D4A5A5]/10 flex items-center justify-center mb-6">
                          <Crown size={20} className="text-[#D4A5A5]" />
                        </div>
                        <h4 className="label-small mb-3 text-[#2C2825]">{t.services.styleIntelligence}</h4>
                        <p className="text-[#5C554D] text-sm leading-relaxed">
                          {t.services.styleIntelligenceDesc}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Districts Section */}
              <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                  <SectionHeader 
                    label={t.districts.label}
                    title={t.districts.title}
                    description={t.districts.desc}
                  />

                  <div className="space-y-16">
                    {[
                      {
                        name: t.districts.galleria.name,
                        description: t.districts.galleria.description,
                        image: IMAGES.galleria,
                        stores: t.districts.galleria.stores,
                        brands: t.districts.galleria.brands,
                        history: t.districts.galleria.history,
                        philosophy: t.districts.galleria.philosophy,
                        vibe: t.districts.galleria.vibe,
                      },
                      {
                        name: t.districts.brera.name,
                        description: t.districts.brera.description,
                        image: IMAGES.brera,
                        stores: t.districts.brera.stores,
                        brands: t.districts.brera.brands,
                        history: t.districts.brera.history,
                        philosophy: t.districts.brera.philosophy,
                        vibe: t.districts.brera.vibe,
                      },
                      {
                        name: t.districts.montenapoleone.name,
                        description: t.districts.montenapoleone.description,
                        image: IMAGES.quadrilatero,
                        stores: t.districts.montenapoleone.stores,
                        brands: t.districts.montenapoleone.brands,
                        history: t.districts.montenapoleone.history,
                        philosophy: t.districts.montenapoleone.philosophy,
                        vibe: t.districts.montenapoleone.vibe,
                      },
                      {
                        name: t.districts.serravalle.name,
                        description: t.districts.serravalle.description,
                        image: IMAGES.serravalle,
                        stores: t.districts.serravalle.stores,
                        brands: t.districts.serravalle.brands,
                        history: t.districts.serravalle.history,
                        philosophy: t.districts.serravalle.philosophy,
                        vibe: t.districts.serravalle.vibe,
                      },
                    ].map((district, index) => (
                      <motion.div
                        key={district.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                      >
                        {/* Image */}
                        <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                            <img 
                              src={district.image}
                              alt={district.name}
                              className="w-full h-full object-cover img-editorial hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                          {/* Vibe Badge */}
                          <div className="absolute top-4 left-4 glass-warm px-3 sm:px-4 py-2 rounded-full max-w-[calc(100%-2rem)]">
                            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#2C2825] truncate block">
                              {district.vibe}
                            </span>
                          </div>
                          {/* Stores Count */}
                          <div className="absolute bottom-4 right-4 bg-[#2C2825] px-3 sm:px-4 py-2 rounded-full max-w-[calc(100%-2rem)]">
                            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#FAF8F5] flex items-center gap-2 truncate">
                              <MapPin size={12} className="flex-shrink-0" />
                              <span className="truncate">{district.stores}</span>
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                          <div>
                            <h3 className="text-2xl md:text-3xl font-serif italic text-[#2C2825] mb-3">
                              {district.name}
                            </h3>
                            <p className="text-[#5C554D] text-base leading-relaxed">
                              {district.description}
                            </p>
                          </div>

                          {/* History */}
                          <div className="bg-[#F5F0EA] p-5 rounded-xl">
                            <h4 className="text-[10px] font-mono uppercase tracking-wider text-[#C4A484] mb-2">History</h4>
                            <p className="text-[#5C554D] text-sm leading-relaxed">
                              {district.history}
                            </p>
                          </div>

                          {/* Philosophy */}
                          <div className="border-l-2 border-[#C4A484] pl-5">
                            <p className="text-[#2C2825] italic text-sm leading-relaxed">
                              "{district.philosophy}"
                            </p>
                          </div>

                          {/* Brands */}
                          <div>
                            <h4 className="text-[10px] font-mono uppercase tracking-wider text-[#8C847A] mb-3">Featured Brands</h4>
                            <p className="text-[#5C554D] text-sm leading-relaxed">
                              {district.brands}
                            </p>
                          </div>

                          {/* CTA Button */}
                          <button 
                            onClick={() => setIsBookingModalOpen(true)}
                            className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.15em] text-[#2C2825] border border-[#2C2825]/20 px-6 py-3 rounded-full hover:bg-[#2C2825] hover:text-[#FAF8F5] transition-all duration-300"
                          >
                            {t.districts.bookTour}
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Testimonial Section with Sliding Animation */}
              <section className="py-24 px-6 bg-[#2C2825]">
                <div className="max-w-4xl mx-auto text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <span className="label-micro block mb-8 text-[#C4A484]">{t.testimonial.label}</span>
                    <TestimonialSlider testimonials={t.testimonial.testimonials} />
                  </motion.div>
                </div>
              </section>

              {/* About Section */}
              <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                  <div className="grid grid-cols-12 gap-10 items-center">
                    <motion.div 
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="col-span-12 lg:col-span-5"
                    >
                      <div className="rounded-3xl overflow-hidden">
                        <ImageSliderKenBurns 
                          images={ABOUT_IMAGES}
                          interval={5000}
                          alt="Gülizar Ermiş"
                          aspectRatio="aspect-[3/4]"
                          showIndicators={false}
                        />
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="col-span-12 lg:col-span-6 lg:col-start-7"
                    >
                      <span className="label-micro block mb-4 text-[#C4A484]">{t.about.label}</span>
                      <h2 className="heading-display mb-6">Gülizar Ermiş</h2>
                      <div className="space-y-4 body-elegant">
                        <p>
                          {t.about.bio1}
                        </p>
                        <p>
                          {t.about.bio2}
                        </p>
                        <p>
                          {t.about.bio3}
                        </p>
                      </div>
                      <div className="flex gap-8 mt-8 pt-8 border-t border-[#2C2825]/10">
                        <div>
                          <p className="text-3xl font-serif italic text-[#C4A484]">{t.about.stat1Value}</p>
                          <p className="text-[10px] font-mono uppercase tracking-wider text-[#8C847A]">{t.about.stat1Label}</p>
                        </div>
                        <div>
                          <p className="text-3xl font-serif italic text-[#C4A484]">{t.about.stat2Value}</p>
                          <p className="text-[10px] font-mono uppercase tracking-wider text-[#8C847A]">{t.about.stat2Label}</p>
                        </div>
                        <div>
                          <p className="text-3xl font-serif italic text-[#C4A484]">{t.about.stat3Value}</p>
                          <p className="text-[10px] font-mono uppercase tracking-wider text-[#8C847A]">{t.about.stat3Label}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'stores' && (
            <motion.section 
              key="stores"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-6 pt-32"
            >
              <SectionHeader 
                label={t.storesPage.label}
                title={t.storesPage.title}
                description={t.storesPage.desc}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {FEATURED_STORES(lang).map((store, i) => (
                  <motion.div
                    key={store.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <StoreCard 
                      store={store} 
                      onBookConsultation={() => setIsBookingModalOpen(true)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {activeTab === 'experiences' && (
            <motion.section 
              key="experiences"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <ExperiencesPage lang={lang} onBookExperience={handleBookExperience} />
            </motion.section>
          )}

          {activeTab === 'methodology' && (
            <motion.section 
              key="methodology"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="pt-32 pb-20"
            >
              {/* Methodology Hero */}
              <div className="max-w-7xl mx-auto px-6 mb-24">
                <div className="text-center">
                  <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="label-micro block mb-4 text-[#C4A484]"
                  >
                    {t.methodology.label}
                  </motion.span>
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="heading-display mb-6"
                  >
                    {t.methodology.title}
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="body-elegant max-w-2xl mx-auto"
                  >
                    {t.methodology.intro}
                  </motion.p>
                </div>
              </div>

              {/* Methodology Steps - 3-Step Style DNA Method */}
              <div className="max-w-7xl mx-auto px-6 mb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {t.methodology.steps.slice(0, 3).map((step: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="relative"
                    >
                      {/* Connector Line */}
                      {index < 2 && (
                        <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-[#C4A484]/30 to-transparent" />
                      )}
                      
                      <div className="card p-8 h-full relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                        {/* Step Number */}
                        <div className="absolute top-4 right-4 text-[80px] font-serif italic text-[#C4A484]/10 leading-none">
                          {index + 1}
                        </div>
                        
                        {/* Icon */}
                        <motion.div 
                          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C4A484]/20 to-[#D4A5A5]/20 flex items-center justify-center mb-6 text-[#C4A484] group-hover:scale-110 transition-transform duration-500"
                          whileHover={{ rotate: 5 }}
                        >
                          {methodologyIcons[index]}
                        </motion.div>
                        
                        {/* Content */}
                        <h3 className="text-lg font-serif italic text-[#2C2825] mb-3">{step.title}</h3>
                        <p className="text-[#5C554D] text-sm leading-relaxed">{step.description}</p>
                        
                        {/* Hover Accent */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C4A484] to-[#D4A5A5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Philosophy Section */}
              <div className="bg-[#2C2825] py-24 px-6 mb-24">
                <div className="max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <span className="label-micro block mb-6 text-[#C4A484]">{t.methodology.philosophyLabel}</span>
                    <h2 className="text-3xl md:text-4xl font-serif italic text-white/90 leading-relaxed mb-8">
                      "{t.methodology.philosophy}"
                    </h2>
                    <div className="w-16 h-px bg-[#C4A484] mx-auto mb-8" />
                    <p className="text-white/60 text-sm leading-relaxed max-w-2xl mx-auto">
                      {t.methodology.philosophyDesc}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* What Makes It Special */}
              <div className="max-w-7xl mx-auto px-6 mb-24">
                <SectionHeader 
                  label={t.methodology.specialLabel}
                  title={t.methodology.specialTitle}
                  description={t.methodology.specialDesc}
                  centered={true}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {t.methodology.specialFeatures.map((feature: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <motion.div 
                        className="w-20 h-20 rounded-full bg-[#F5F0EA] flex items-center justify-center mx-auto mb-6"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {index === 0 && <Users size={28} className="text-[#C4A484]" />}
                        {index === 1 && <Gem size={28} className="text-[#C4A484]" />}
                        {index === 2 && <Heart size={28} className="text-[#C4A484]" />}
                      </motion.div>
                      <h3 className="text-xl font-serif italic text-[#2C2825] mb-3">{feature.title}</h3>
                      <p className="text-[#5C554D] text-sm leading-relaxed">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Process Timeline */}
              <div className="bg-[#F5F0EA] py-24 px-6 mb-24">
                <div className="max-w-5xl mx-auto">
                  <SectionHeader 
                    label={t.methodology.processLabel}
                    title={t.methodology.processTitle}
                    centered={true}
                  />

                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#C4A484]/30 hidden md:block" />

                    {t.methodology.process.map((item: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15, duration: 0.6 }}
                        className={`flex items-center gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                      >
                        {/* Content */}
                        <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                          <div className={`card p-6 inline-block ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#C4A484] block mb-2">
                              {item.time}
                            </span>
                            <h4 className="text-lg font-serif italic text-[#2C2825] mb-2">{item.title}</h4>
                            <p className="text-[#5C554D] text-sm leading-relaxed">{item.description}</p>
                          </div>
                        </div>

                        {/* Timeline Dot */}
                        <div className="hidden md:flex w-12 h-12 rounded-full bg-[#C4A484] items-center justify-center flex-shrink-0 z-10">
                          <CheckCircle2 size={20} className="text-white" />
                        </div>

                        {/* Spacer */}
                        <div className="flex-1 hidden md:block" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-4xl font-serif italic text-[#2C2825] mb-6">
                    {t.methodology.ctaTitle}
                  </h2>
                  <p className="text-[#5C554D] text-lg mb-10 max-w-xl mx-auto">
                    {t.methodology.ctaDesc}
                  </p>
                  <button 
                    onClick={() => setIsBookingModalOpen(true)}
                    className="bg-[#2C2825] text-[#FAF8F5] px-12 py-5 text-[11px] font-mono uppercase tracking-[0.2em] rounded-full hover:bg-[#C4A484] transition-all duration-500 inline-flex items-center gap-3"
                  >
                    {t.methodology.ctaButton}
                    <ArrowRight size={16} />
                  </button>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Glass Navbar */}
      <nav className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-[100]">
        <div className="glass px-4 sm:px-5 py-2.5 sm:py-3 rounded-full flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg">
          <img 
            src="/logogulizar.png" 
            alt="Gülizar Ermiş Logo" 
            className="hidden xl:block h-10 w-10 rounded-full object-contain flex-shrink-0 mr-2 sm:mr-3"
          />
          <NavButton tab="home" label={t.nav.aperitivo} />
          <NavButton tab="experiences" label={t.nav.experiences || 'Experiences'} />
          <NavButton tab="stores" label={t.nav.stores} />
          <NavButton tab="methodology" label={t.nav.methodology} />
          <div className="w-px h-5 sm:h-6 bg-[#2C2825]/10 mx-1 sm:mx-2" />
          <button 
            onClick={() => setIsBookingModalOpen(true)}
            className="bg-[#2C2825] text-[#FAF8F5] px-3 sm:px-5 py-2 sm:py-2.5 text-[8px] sm:text-[10px] font-mono tracking-[0.1em] sm:tracking-[0.15em] uppercase rounded-full hover:bg-[#C4A484] transition-all whitespace-nowrap"
          >
            <span className="hidden sm:inline">{t.nav.book}</span>
            <span className="sm:hidden">Book</span>
          </button>
          
          <div className="hidden md:flex gap-1.5 px-3 border-l border-[#2C2825]/10 ml-2 items-center">
            {(['en', 'tr', 'it'] as Language[]).map(l => (
              <button 
                key={l}
                onClick={() => changeLanguage(l)}
                className={`text-[10px] font-mono uppercase px-3 py-1.5 rounded-full transition-all min-w-[36px] text-center ${
                  lang === l 
                    ? 'bg-[#2C2825] text-[#FAF8F5]' 
                    : 'text-[#5C554D] hover:text-[#2C2825] hover:bg-[#2C2825]/5'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        
        {/* Mobile Language Selector */}
        <div className="md:hidden flex justify-center gap-3 mt-2">
          {(['en', 'tr', 'it'] as Language[]).map(l => (
            <button 
              key={l}
              onClick={() => changeLanguage(l)}
              className={`text-[9px] font-mono uppercase px-2 py-1 rounded-full ${lang === l ? 'bg-[#2C2825] text-white' : 'bg-white/80 text-[#8C847A]'} transition-all shadow-sm`}
            >
              {l}
            </button>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <footer className="bg-[#2C2825] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-10 mb-12">
            <div className="col-span-12 md:col-span-4">
              <h2 className="text-2xl font-serif italic text-[#FAF8F5] mb-4">VESTILIZA, Gülizar Ermiş</h2>
              <p className="text-[#FAF8F5]/50 text-sm leading-relaxed">
                {t.footer.desc}
              </p>
            </div>
            <div className="col-span-6 md:col-span-2 md:col-start-7">
              <h4 className="label-small text-[#C4A484] mb-4">{t.footer.contact}</h4>
              <div className="space-y-2 text-sm text-[#FAF8F5]/60">
                <p>vestilizamilano@gmail.com</p>
                <p>+39 351 302 5810</p>
              </div>
            </div>
            <div className="col-span-6 md:col-span-2">
              <h4 className="label-small text-[#C4A484] mb-4">{t.footer.location}</h4>
              <div className="space-y-2 text-sm text-[#FAF8F5]/60">
                <p>{t.footer.remote}</p>
                <p>Milano, Italy</p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-2">
              <h4 className="label-small text-[#C4A484] mb-4">{t.footer.follow}</h4>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/gulizarermiss/" target="_blank" rel="noopener noreferrer">
                  <Instagram size={18} className="text-[#FAF8F5]/60 hover:text-[#FAF8F5] transition-colors cursor-pointer" />
                </a>
                <a href="mailto:vestilizamilano@gmail.com">
                  <Mail size={18} className="text-[#FAF8F5]/60 hover:text-[#FAF8F5] transition-colors cursor-pointer" />
                </a>
                <Globe size={18} className="text-[#FAF8F5]/60 hover:text-[#FAF8F5] transition-colors cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="border-t border-[#FAF8F5]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#FAF8F5]/30">
              {t.footer.reserved}
            </p>
            <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#FAF8F5]/30">
              {t.footer.crafted}
            </p>
          </div>
        </div>
      </footer>

      <BookingModal 
        lang={lang}
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </div>
  );
};

export default App;
