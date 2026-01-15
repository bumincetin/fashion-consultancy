/**
 * ═══════════════════════════════════════════════════════════════════════════
 * RENAISSANCE LANDING PAGE
 * Complete demo showcasing all Digital Renaissance components
 * Inspired by Shopify Editions Winter 2026 (The RenAIssance Edition)
 * ═══════════════════════════════════════════════════════════════════════════
 */

import React, { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { 
  Sparkle, 
  Lightning, 
  Camera, 
  Stack, 
  Globe, 
  Compass, 
  Palette, 
  MagicWand,
  ArrowRight,
  Play
} from '@phosphor-icons/react';

import { HeroSection, GlassNavbar, NavItem } from './HeroSection';
import { BentoGrid, BentoItem } from './BentoGrid';
import { FeatureCard, FeatureCardLarge, FeatureCardCompact } from './FeatureCard';

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED IMAGE CARD
// Images that move/animate on scroll for that Shopify Editions effect
// ─────────────────────────────────────────────────────────────────────────────

interface AnimatedImageCardProps {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

const AnimatedImageCard: React.FC<AnimatedImageCardProps> = ({
  src,
  alt,
  title,
  subtitle,
  className = '',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  
  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-3xl group ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Animated Background Image */}
      <motion.img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ y: imageY, scale }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      
      {/* Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[#C5A059]/20 to-transparent" />
      
      {/* Content */}
      {(title || subtitle) && (
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
          {subtitle && (
            <span className="label-micro block mb-3">{subtitle}</span>
          )}
          {title && (
            <h3 className="text-2xl md:text-3xl font-serif italic text-white">
              {title}
            </h3>
          )}
        </div>
      )}
      
      {/* Border overlay */}
      <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-white/20 transition-colors duration-500" />
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION HEADER
// ─────────────────────────────────────────────────────────────────────────────

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  description,
  align = 'left',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <motion.div
      ref={ref}
      className={`mb-16 md:mb-24 ${align === 'center' ? 'text-center' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="label-micro block mb-6">{label}</span>
      <h2 className="heading-display mb-6">{title}</h2>
      {description && (
        <p className={`text-white/40 text-sm md:text-base leading-relaxed ${align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN LANDING PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export const RenaissanceLanding: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  
  const navItems: NavItem[] = [
    { id: 'home', label: 'Aperitivo' },
    { id: 'features', label: 'Features' },
    { id: 'gallery', label: 'Gallery' },
  ];

  // Feature data
  const features = [
    {
      icon: Lightning,
      title: 'RenAIssance Intelligence',
      description: 'Proprietary AI blending historic fashion archives with contemporary Milanese trends.',
      glowColor: 'gold' as const,
    },
    {
      icon: Camera,
      title: 'Cinematic Curation',
      description: 'Visual storytelling capturing the ephemeral beauty of Italian craftsmanship.',
      glowColor: 'azure' as const,
    },
    {
      icon: Palette,
      title: 'Aesthetic Engine',
      description: 'Advanced color theory and pattern recognition for perfect style matching.',
      glowColor: 'rose' as const,
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Connected to exclusive ateliers across Milan, Paris, and beyond.',
      glowColor: 'emerald' as const,
    },
    {
      icon: Stack,
      title: 'Layered Experience',
      description: 'Multi-dimensional styling that evolves with seasons and occasions.',
      glowColor: 'white' as const,
    },
    {
      icon: MagicWand,
      title: 'Style Alchemy',
      description: 'Transform everyday pieces into extraordinary ensembles.',
      glowColor: 'gold' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-white relative">
      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <HeroSection
        label="The RenAIssance Edition"
        title={`Rediscover\n*The Milanese*\nSoul`}
        subtitle="Where artificial intelligence meets artisanal excellence. A new chapter in digital fashion curation."
        ctaText="Begin Experience"
        onCtaClick={() => setActiveTab('features')}
        showFloatingElements={true}
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          BENTO INTRO SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-40 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <BentoGrid>
            {/* Large Featured Image Card */}
            <BentoItem size="2x2" glowColor="gold">
              <AnimatedImageCard
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200"
                alt="Fashion Model"
                title="A Digital Guide to Timeless Luxury"
                subtitle="Milanese Aesthetic"
                className="h-full min-h-[400px] md:min-h-[600px]"
              />
            </BentoItem>

            {/* Feature Cards */}
            <BentoItem size="1x1" glowColor="gold">
              <FeatureCard
                icon={Lightning}
                title="RenAIssance Intelligence"
                description="Proprietary AI blending historic fashion archives with current Milanese trends."
                glowColor="gold"
                className="h-full"
              />
            </BentoItem>

            <BentoItem size="1x1" glowColor="azure">
              <FeatureCard
                icon={Camera}
                title="Cinematic Curation"
                description="Visual storytelling capturing the ephemeral beauty of Brera."
                glowColor="azure"
                className="h-full"
              />
            </BentoItem>

            {/* Stats Card */}
            <BentoItem size="2x1" glowColor="white">
              <div className="h-full glass rounded-3xl p-8 md:p-12 flex items-center justify-between">
                <div className="flex gap-12 md:gap-20">
                  <div>
                    <span className="text-4xl md:text-5xl font-serif italic text-white">150+</span>
                    <p className="label-micro mt-2">Curated Boutiques</p>
                  </div>
                  <div>
                    <span className="text-4xl md:text-5xl font-serif italic text-white">12</span>
                    <p className="label-micro mt-2">Fashion Districts</p>
                  </div>
                  <div className="hidden md:block">
                    <span className="text-4xl md:text-5xl font-serif italic text-white">∞</span>
                    <p className="label-micro mt-2">Style Possibilities</p>
                  </div>
                </div>
                <motion.div
                  className="hidden lg:flex items-center gap-3 text-white/40 hover:text-white transition-colors cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <span className="label-small">Explore All</span>
                  <ArrowRight size={16} />
                </motion.div>
              </div>
            </BentoItem>
          </BentoGrid>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FEATURES SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section id="features" className="py-24 md:py-40 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            label="Archive 01"
            title="The Digital Atelier"
            description="A suite of AI-powered tools designed to revolutionize your approach to personal style."
            align="center"
          />

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1] 
                }}
              >
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  glowColor={feature.glowColor}
                  className="h-full min-h-[280px]"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          GALLERY SECTION - Animated Images on Scroll
          ═══════════════════════════════════════════════════════════════════════ */}
      <section id="gallery" className="py-24 md:py-40 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            label="Archive 02"
            title="Visual Chronicles"
            description="Immerse yourself in the intersection of tradition and innovation."
          />

          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {/* Large portrait */}
            <div className="col-span-12 md:col-span-7 row-span-2">
              <AnimatedImageCard
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200"
                alt="Fashion Editorial"
                title="The Art of Silhouette"
                subtitle="Editorial Series"
                className="h-[400px] md:h-full min-h-[500px]"
              />
            </div>

            {/* Top right */}
            <div className="col-span-6 md:col-span-5">
              <AnimatedImageCard
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800"
                alt="Texture Detail"
                title="Material Poetry"
                className="h-[250px] md:h-[280px]"
              />
            </div>

            {/* Bottom right */}
            <div className="col-span-6 md:col-span-5">
              <AnimatedImageCard
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800"
                alt="Street Style"
                title="Urban Canvas"
                className="h-[250px] md:h-[280px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CTA SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-40 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass rounded-[3rem] p-12 md:p-20 relative overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[200px] bg-[#C5A059]/10 blur-[100px] rounded-full" />
            
            <div className="relative z-10">
              <span className="label-micro block mb-8">Begin Your Journey</span>
              <h2 className="heading-display mb-8">Ready to Discover<br/>Your Style DNA?</h2>
              <p className="text-white/40 text-sm leading-relaxed max-w-lg mx-auto mb-12">
                Let our AI-powered style engine analyze your preferences and create a personalized fashion journey through Milan's finest offerings.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  className="bg-white text-black px-10 py-5 text-[10px] font-mono uppercase tracking-[0.3em] rounded-full flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkle size={16} />
                  Generate My Style Profile
                </motion.button>
                
                <motion.button
                  className="glass px-10 py-5 text-[10px] font-mono uppercase tracking-[0.3em] rounded-full flex items-center gap-3 text-white/60 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={14} />
                  Watch Demo
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          GLASS NAVBAR
          ═══════════════════════════════════════════════════════════════════════ */}
      <GlassNavbar
        items={navItems}
        activeItem={activeTab}
        onItemClick={setActiveTab}
        ctaLabel="Start"
        onCtaClick={() => console.log('CTA clicked')}
      />
    </div>
  );
};

export default RenaissanceLanding;

