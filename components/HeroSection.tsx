/**
 * ═══════════════════════════════════════════════════════════════════════════
 * HERO SECTION COMPONENT
 * Massive serif headline with floating 3D elements and glass navbar
 * Inspired by Shopify Editions Winter 2026 (The RenAIssance Edition)
 * ═══════════════════════════════════════════════════════════════════════════
 */

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface HeroSectionProps {
  label?: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  variant?: 'centered' | 'left' | 'split';
  showFloatingElements?: boolean;
  className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING 3D SHAPES
// ─────────────────────────────────────────────────────────────────────────────

const FloatingShapes: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large floating sphere - gold gradient */}
      <motion.div
        className="absolute top-[10%] right-[15%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px]"
        animate={{
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
      >
        <motion.div
          className="w-full h-full rounded-full opacity-30"
          animate={{
            y: [0, -30, 0],
            rotateZ: [0, 5, -5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(197, 160, 89, 0.4) 0%, rgba(197, 160, 89, 0.1) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </motion.div>

      {/* Medium floating torus - azure gradient */}
      <motion.div
        className="absolute bottom-[20%] left-[10%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px]"
        animate={{
          x: mousePosition.x * -0.3,
          y: mousePosition.y * -0.3,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
      >
        <motion.div
          className="w-full h-full rounded-full opacity-25"
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          style={{
            background: 'radial-gradient(circle at 70% 70%, rgba(74, 158, 255, 0.3) 0%, rgba(74, 158, 255, 0.08) 40%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </motion.div>

      {/* Small floating accent - rose gradient */}
      <motion.div
        className="absolute top-[40%] left-[25%] w-[15vw] h-[15vw] max-w-[200px] max-h-[200px]"
        animate={{
          x: mousePosition.x * 0.8,
          y: mousePosition.y * 0.8,
        }}
        transition={{ type: 'spring', stiffness: 80, damping: 20 }}
      >
        <motion.div
          className="w-full h-full rounded-full opacity-20"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          style={{
            background: 'radial-gradient(circle, rgba(255, 107, 157, 0.35) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </motion.div>

      {/* Geometric wireframe decoration */}
      <motion.svg
        className="absolute top-[15%] left-[60%] w-[200px] h-[200px] opacity-10"
        viewBox="0 0 200 200"
        animate={{
          rotate: [0, 360],
          x: mousePosition.x * 0.2,
          y: mousePosition.y * 0.2,
        }}
        transition={{
          rotate: { duration: 60, repeat: Infinity, ease: 'linear' },
          x: { type: 'spring', stiffness: 50 },
          y: { type: 'spring', stiffness: 50 },
        }}
      >
        <polygon
          points="100,10 190,80 160,180 40,180 10,80"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.5"
        />
        <polygon
          points="100,40 150,80 130,140 70,140 50,80"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
        />
      </motion.svg>

      {/* Floating ring */}
      <motion.div
        className="absolute bottom-[30%] right-[20%] w-[150px] h-[150px]"
        animate={{
          rotate: [0, -360],
          x: mousePosition.x * -0.4,
          y: mousePosition.y * -0.4,
        }}
        transition={{
          rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
          x: { type: 'spring', stiffness: 40 },
          y: { type: 'spring', stiffness: 40 },
        }}
      >
        <div 
          className="w-full h-full rounded-full border border-white/10"
          style={{
            boxShadow: 'inset 0 0 40px rgba(255,255,255,0.03)',
          }}
        />
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED TEXT
// ─────────────────────────────────────────────────────────────────────────────

const AnimatedHeadline: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  // Split by line breaks to handle multi-line titles
  const lines = text.split('\n');
  
  return (
    <motion.h1 
      className="heading-hero text-center"
      initial="hidden"
      animate="visible"
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: delay + lineIndex * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line.includes('*') ? (
              // Handle emphasis with asterisks: *text* becomes muted
              line.split(/(\*[^*]+\*)/).map((part, i) => (
                part.startsWith('*') && part.endsWith('*') ? (
                  <span key={i} className="text-white/20">{part.slice(1, -1)}</span>
                ) : (
                  <span key={i}>{part}</span>
                )
              ))
            ) : (
              line
            )}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// HERO SECTION COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export const HeroSection: React.FC<HeroSectionProps> = ({
  label = 'The RenAIssance Edition',
  title = 'Digital\n*Renaissance*\nAwakens',
  subtitle,
  ctaText = 'Begin Experience',
  onCtaClick,
  variant = 'centered',
  showFloatingElements = true,
  className = '',
}) => {
  const { scrollY } = useScroll();
  
  // Parallax effects
  const titleY = useTransform(scrollY, [0, 500], [0, 100]);
  const titleOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const labelY = useTransform(scrollY, [0, 500], [0, 50]);
  const springConfig = { stiffness: 100, damping: 30 };
  const titleYSpring = useSpring(titleY, springConfig);

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Floating 3D Elements */}
      {showFloatingElements && <FloatingShapes />}
      
      {/* Grid overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <motion.div 
          className="text-center"
          style={variant === 'centered' ? { y: titleYSpring, opacity: titleOpacity } : undefined}
        >
          {/* Label Badge */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: labelY }}
            className="inline-block mb-10"
          >
            <div className="glass px-6 py-2 rounded-full">
              <span className="label-micro">{label}</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <AnimatedHeadline text={title} delay={0.4} />

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-10 text-white/40 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          {/* CTA Button */}
          {ctaText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-16"
            >
              <motion.button
                onClick={onCtaClick}
                className="glass px-14 py-6 text-[10px] font-mono uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 rounded-full group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-4">
                  {ctaText}
                  <motion.svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </motion.svg>
                </span>
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-px h-16 bg-gradient-to-b from-white/0 via-white/20 to-white/0"
          animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// GLASS NAVBAR (Bottom)
// ─────────────────────────────────────────────────────────────────────────────

export interface NavItem {
  id: string;
  label: string;
}

export interface GlassNavbarProps {
  items: NavItem[];
  activeItem?: string;
  onItemClick?: (id: string) => void;
  ctaLabel?: string;
  onCtaClick?: () => void;
  className?: string;
}

export const GlassNavbar: React.FC<GlassNavbarProps> = ({
  items,
  activeItem,
  onItemClick,
  ctaLabel = 'Get Started',
  onCtaClick,
  className = '',
}) => {
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const navBlur = useTransform(scrollY, [0, 100], [24, 40]);

  return (
    <motion.nav 
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] ${className}`}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ opacity: navOpacity }}
    >
      <motion.div
        className="glass-navbar px-3 py-2.5 rounded-full flex items-center gap-1"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Nav Items */}
        {items.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onItemClick?.(item.id)}
            className={`
              px-6 py-2.5 
              text-[10px] font-mono tracking-[0.15em] uppercase 
              transition-all duration-500 
              rounded-full
              ${activeItem === item.id 
                ? 'bg-white text-black' 
                : 'text-white/40 hover:text-white hover:bg-white/5'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.label}
          </motion.button>
        ))}

        {/* Divider */}
        <div className="w-px h-6 bg-white/10 mx-2" />

        {/* CTA Button */}
        <motion.button
          onClick={onCtaClick}
          className="bg-white text-black px-6 py-2.5 text-[10px] font-mono tracking-[0.15em] uppercase rounded-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {ctaLabel}
        </motion.button>
      </motion.div>
    </motion.nav>
  );
};

export default HeroSection;

