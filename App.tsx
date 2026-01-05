
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Instagram, 
  Mail,
  ChevronRight,
  Globe,
  MapPin,
  Clock,
  Star,
  Heart,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { FEATURED_STORES, DISTRICTS } from './constants';
import { StoreCard } from './components/StoreCard';
import { FashionMuseChat } from './components/FashionMuseChat';
import { BookingModal } from './components/BookingModal';
import { ImageSliderCrossfade, ImageSliderKenBurns } from './components/ImageSlider';
import { generatePersonalizedGuide } from './services/geminiService';
import { UserPreferences, StyleGuide, Language } from './types';
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
  galleria: 'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&q=85&w=1200',
  brera: 'https://images.unsplash.com/photo-1534445867742-43195f401b6c?auto=format&fit=crop&q=85&w=1200',
  quadrilatero: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=85&w=1200',
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
}> = ({ label, title, description }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mb-16 md:mb-20"
    >
      <span className="label-micro block mb-4 text-[#C4A484]">{label}</span>
      <h2 className="heading-display text-[#2C2825] mb-6">{title}</h2>
      {description && (
        <p className="body-elegant max-w-xl">{description}</p>
      )}
    </motion.div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<'home' | 'stores' | 'guide'>('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
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

  // Guide State
  const [guideStep, setGuideStep] = useState(1);
  const [prefs, setPrefs] = useState<UserPreferences>({
    vibe: 'Minimalist',
    budget: 'Mid-Range',
    occasion: 'Vacation',
    gender: 'Female'
  });
  const [generatedGuide, setGeneratedGuide] = useState<StyleGuide | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateGuide = async () => {
    setIsGenerating(true);
    try {
      const guide = await generatePersonalizedGuide(prefs, lang);
      setGeneratedGuide(guide);
      setGuideStep(3);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const NavButton = ({ tab, label }: { tab: typeof activeTab, label: string }) => (
    <button 
      onClick={() => setActiveTab(tab)}
      className={`px-5 py-2.5 text-[10px] font-mono tracking-[0.15em] uppercase transition-all duration-500 rounded-full ${
        activeTab === tab 
          ? 'bg-[#2C2825] text-[#FAF8F5]' 
          : 'text-[#5C554D] hover:text-[#2C2825]'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2825]">
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
                        className="flex flex-wrap gap-4"
                      >
                        <button 
                          onClick={() => setActiveTab('guide')}
                          className="bg-[#2C2825] text-[#FAF8F5] px-10 py-4 text-[10px] font-mono uppercase tracking-[0.2em] rounded-full hover:bg-[#C4A484] transition-all duration-500 flex items-center gap-3"
                        >
                          {t.hero.cta1}
                          <ArrowRight size={14} />
                        </button>
                        <button 
                          onClick={() => setIsBookingModalOpen(true)}
                          className="border border-[#2C2825]/20 px-10 py-4 text-[10px] font-mono uppercase tracking-[0.2em] rounded-full hover:border-[#2C2825] hover:bg-[#2C2825] hover:text-[#FAF8F5] transition-all duration-500"
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
                          className="absolute -bottom-6 -left-6 glass-warm p-6 rounded-2xl max-w-[220px] z-20"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Star size={14} className="text-[#C5A059] fill-[#C5A059]" />
                            <span className="text-[11px] font-mono text-[#5C554D]">{t.hero.trustedBy}</span>
                          </div>
                          <p className="text-lg font-serif italic text-[#2C2825] leading-tight">{t.hero.satisfiedClients}</p>
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
                      <ParallaxImage 
                        src={IMAGES.quadrilatero}
                        alt="Quadrilatero della Moda shopping district"
                        className="absolute inset-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2C2825]/90 via-[#2C2825]/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-10 md:p-12">
                        <span className="label-micro block mb-4 text-[#C4A484]">{t.services.premium}</span>
                        <h3 className="text-3xl md:text-4xl font-serif italic text-white mb-4">
                          {t.services.shoppingTours}
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed max-w-lg mb-6">
                          {t.services.shoppingToursDesc}
                        </p>
                        <button className="text-[10px] font-mono uppercase tracking-[0.2em] text-white flex items-center gap-2 hover:gap-4 transition-all">
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
                          <Sparkles size={20} className="text-[#D4A5A5]" />
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

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        name: t.districts.galleria.name,
                        description: t.districts.galleria.description,
                        image: IMAGES.galleria,
                        stores: t.districts.galleria.stores,
                      },
                      {
                        name: t.districts.brera.name,
                        description: t.districts.brera.description,
                        image: IMAGES.brera,
                        stores: t.districts.brera.stores,
                      },
                      {
                        name: t.districts.montenapoleone.name,
                        description: t.districts.montenapoleone.description,
                        image: IMAGES.quadrilatero,
                        stores: t.districts.montenapoleone.stores,
                      },
                    ].map((district, index) => (
                      <motion.div
                        key={district.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group cursor-pointer"
                      >
                        <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-6 relative">
                          <img 
                            src={district.image}
                            alt={district.name}
                            className="w-full h-full object-cover img-editorial group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#2C2825]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-white/80">
                              <MapPin size={12} className="inline mr-1" />
                              {district.stores}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-xl font-serif italic mb-2 group-hover:text-[#C4A484] transition-colors">
                          {district.name}
                        </h3>
                        <p className="text-[#5C554D] text-sm leading-relaxed">
                          {district.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Testimonial Section */}
              <section className="py-24 px-6 bg-[#2C2825]">
                <div className="max-w-4xl mx-auto text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <span className="label-micro block mb-8 text-[#C4A484]">{t.testimonial.label}</span>
                    <blockquote className="text-3xl md:text-4xl font-serif italic text-white/90 leading-relaxed mb-10">
                      {t.testimonial.quote}
                    </blockquote>
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#C4A484]/20" />
                      <div className="text-left">
                        <p className="text-white font-medium">{t.testimonial.author}</p>
                        <p className="text-white/50 text-sm">{t.testimonial.role}</p>
                      </div>
                    </div>
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
                    <StoreCard store={store} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {activeTab === 'guide' && (
            <motion.section 
              key="guide"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-6 pt-32"
            >
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                  <span className="label-micro block mb-4 text-[#C4A484]">{t.guidePage.label}</span>
                  <h2 className="heading-display mb-6">{t.ai.title}</h2>
                  <p className="body-elegant max-w-xl mx-auto">{t.ai.desc}</p>
                </div>

                {guideStep === 1 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="card p-10 lg:p-16 rounded-3xl"
                  >
                    <div className="space-y-12">
                      <div>
                        <label className="label-small block mb-8 text-center text-[#8C847A]">{t.ai.vibe}</label>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                          {['Minimalist', 'Avant-garde', 'Romantic', 'Streetwear'].map(v => (
                            <button 
                              key={v}
                              onClick={() => setPrefs({...prefs, vibe: v})}
                              className={`px-4 py-6 text-[10px] font-mono tracking-[0.15em] uppercase transition-all rounded-xl border ${
                                prefs.vibe === v 
                                  ? 'bg-[#2C2825] text-[#FAF8F5] border-[#2C2825]' 
                                  : 'bg-transparent text-[#5C554D] border-[#2C2825]/10 hover:border-[#2C2825]/30'
                              }`}
                            >
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid lg:grid-cols-2 gap-6">
                        <div>
                          <label className="label-small block mb-4 text-[#8C847A]">{t.guidePage.budgetLabel}</label>
                          <select 
                            className="w-full"
                            value={prefs.budget}
                            onChange={(e) => setPrefs({...prefs, budget: e.target.value as any})}
                          >
                            <option value="Accessible">{t.guidePage.budgetAccessible}</option>
                            <option value="Mid-Range">{t.guidePage.budgetMidRange}</option>
                            <option value="Luxury">{t.guidePage.budgetLuxury}</option>
                          </select>
                        </div>
                        <div>
                          <label className="label-small block mb-4 text-[#8C847A]">{t.guidePage.identityLabel}</label>
                          <select 
                            className="w-full"
                            value={prefs.gender}
                            onChange={(e) => setPrefs({...prefs, gender: e.target.value as any})}
                          >
                            <option value="Female">{t.guidePage.genderFemale}</option>
                            <option value="Male">{t.guidePage.genderMale}</option>
                            <option value="Non-binary">{t.guidePage.genderNonBinary}</option>
                          </select>
                        </div>
                      </div>

                      <button 
                        onClick={() => setGuideStep(2)}
                        className="w-full bg-[#2C2825] text-[#FAF8F5] py-5 text-[11px] font-mono uppercase tracking-[0.2em] rounded-xl hover:bg-[#C4A484] transition-all duration-500"
                      >
                        {t.ai.next}
                      </button>
                    </div>
                  </motion.div>
                )}

                {guideStep === 2 && (
                  <div className="card p-16 text-center rounded-3xl">
                    <motion.div 
                      animate={{ height: [0, 80, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-px bg-[#C4A484] mx-auto mb-10" 
                    />
                    <h3 className="text-2xl font-serif italic mb-8 text-[#2C2825]">{t.ai.loading}</h3>
                    <button 
                      onClick={handleGenerateGuide}
                      disabled={isGenerating}
                      className="bg-[#2C2825] text-[#FAF8F5] px-12 py-5 text-[10px] font-mono tracking-[0.2em] uppercase rounded-xl disabled:opacity-50 hover:bg-[#C4A484] transition-all"
                    >
                      {isGenerating ? t.ai.generating : t.guidePage.generateBtn}
                    </button>
                  </div>
                )}

                {guideStep === 3 && generatedGuide && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="card p-10 lg:p-16 rounded-3xl relative overflow-hidden"
                  >
                    <div className="mb-12 text-center">
                      <h3 className="text-3xl font-serif italic mb-4 text-[#2C2825]">{generatedGuide.title}</h3>
                      <p className="text-[#5C554D] italic text-lg leading-relaxed max-w-2xl mx-auto">
                        "{generatedGuide.summary}"
                      </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                      <div>
                        <h4 className="label-small mb-8 text-[#C4A484] flex items-center gap-3">
                          <div className="w-8 h-px bg-[#C4A484]" /> {t.guidePage.yourJourney}
                        </h4>
                        <div className="space-y-6">
                          {generatedGuide.recommendations.map((item, idx) => (
                            <div key={idx} className="flex gap-6 group">
                              <span className="text-[#C4A484]/50 font-mono text-2xl group-hover:text-[#C4A484] transition-colors">0{idx + 1}</span>
                              <p className="text-[#5C554D] text-sm leading-relaxed pt-1">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-10">
                        <div>
                          <h4 className="label-small mb-6 text-[#C4A484]">{t.guidePage.recommendedDest}</h4>
                          <div className="space-y-2">
                            {generatedGuide.mustVisitStores.map((s, idx) => (
                              <div key={idx} className="bg-[#F5F0EA] p-4 text-sm rounded-lg border-l-2 border-[#C4A484]">{s}</div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="label-small mb-6 text-[#C4A484]">{t.guidePage.styleNotes}</h4>
                          <div className="space-y-3">
                            {generatedGuide.suggestedOutfits.map((outfit, idx) => (
                              <p key={idx} className="text-[#5C554D] text-sm flex items-start gap-3">
                                <ChevronRight size={14} className="mt-1 text-[#C4A484]" />
                                {outfit}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setGuideStep(1)} 
                      className="mt-12 block mx-auto text-[#8C847A] text-[10px] font-mono uppercase tracking-[0.2em] hover:text-[#2C2825] transition-colors"
                    >
                      {t.guidePage.startOver}
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Glass Navbar */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]">
        <div className="glass px-3 py-2.5 rounded-full flex items-center gap-1 shadow-lg">
          <NavButton tab="home" label={t.nav.aperitivo} />
          <NavButton tab="stores" label={t.nav.stores} />
          <NavButton tab="guide" label={t.nav.guide} />
          <div className="w-px h-5 bg-[#2C2825]/10 mx-2" />
          <button 
            onClick={() => setIsBookingModalOpen(true)}
            className="bg-[#2C2825] text-[#FAF8F5] px-5 py-2.5 text-[10px] font-mono tracking-[0.15em] uppercase rounded-full hover:bg-[#C4A484] transition-all"
          >
            {t.nav.book}
          </button>
          
          <div className="hidden sm:flex gap-2 px-3 border-l border-[#2C2825]/10 ml-2">
            {(['en', 'tr', 'it'] as Language[]).map(l => (
              <button 
                key={l}
                onClick={() => changeLanguage(l)}
                className={`text-[9px] font-mono uppercase ${lang === l ? 'text-[#2C2825]' : 'text-[#8C847A] hover:text-[#2C2825]'} transition-colors`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <footer className="bg-[#2C2825] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-10 mb-12">
            <div className="col-span-12 md:col-span-4">
              <h2 className="text-2xl font-serif italic text-[#FAF8F5] mb-4">Gülizar Ermiş</h2>
              <p className="text-[#FAF8F5]/50 text-sm leading-relaxed">
                {t.footer.desc}
              </p>
            </div>
            <div className="col-span-6 md:col-span-2 md:col-start-7">
              <h4 className="label-small text-[#C4A484] mb-4">{t.footer.contact}</h4>
              <div className="space-y-2 text-sm text-[#FAF8F5]/60">
                <p>gulizarermis20@gmail.com</p>
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
                <a href="mailto:gulizarermis20@gmail.com">
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

      <FashionMuseChat lang={lang} />
      <BookingModal 
        lang={lang}
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </div>
  );
};

export default App;
