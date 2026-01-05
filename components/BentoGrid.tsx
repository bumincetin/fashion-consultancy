/**
 * ═══════════════════════════════════════════════════════════════════════════
 * BENTO GRID COMPONENT
 * Award-winning masonry-style grid layout with Framer Motion animations
 * Inspired by Shopify Editions Winter 2026 (The RenAIssance Edition)
 * ═══════════════════════════════════════════════════════════════════════════
 */

import React, { useRef, ReactNode } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type BentoSize = 
  | '1x1'    // Small square
  | '2x1'    // Wide rectangle
  | '1x2'    // Tall rectangle
  | '2x2'    // Large square
  | '3x1'    // Extra wide
  | '3x2'    // Extra wide tall
  | '4x2';   // Full width

export interface BentoItemProps {
  children: ReactNode;
  size?: BentoSize;
  className?: string;
  glowColor?: 'white' | 'gold' | 'azure' | 'rose';
  delay?: number;
  onClick?: () => void;
}

export interface BentoGridProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Expo ease out
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SIZE MAPPING
// ─────────────────────────────────────────────────────────────────────────────

const sizeClasses: Record<BentoSize, string> = {
  '1x1': 'col-span-6 md:col-span-4 lg:col-span-3 row-span-1',
  '2x1': 'col-span-12 md:col-span-8 lg:col-span-6 row-span-1',
  '1x2': 'col-span-6 md:col-span-4 lg:col-span-3 row-span-2',
  '2x2': 'col-span-12 md:col-span-8 lg:col-span-6 row-span-2',
  '3x1': 'col-span-12 md:col-span-12 lg:col-span-9 row-span-1',
  '3x2': 'col-span-12 md:col-span-12 lg:col-span-9 row-span-2',
  '4x2': 'col-span-12 row-span-2',
};

const glowColors = {
  white: 'hover:shadow-[0_0_60px_rgba(255,255,255,0.08)] hover:border-white/20',
  gold: 'hover:shadow-[0_0_80px_rgba(197,160,89,0.12)] hover:border-[#C5A059]/30',
  azure: 'hover:shadow-[0_0_60px_rgba(74,158,255,0.1)] hover:border-[#4A9EFF]/30',
  rose: 'hover:shadow-[0_0_60px_rgba(255,107,157,0.1)] hover:border-[#FF6B9D]/30',
};

// ─────────────────────────────────────────────────────────────────────────────
// BENTO ITEM COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export const BentoItem: React.FC<BentoItemProps> = ({
  children,
  size = '1x1',
  className = '',
  glowColor = 'white',
  delay = 0,
  onClick,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  // Track mouse position for radial glow effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    itemRef.current.style.setProperty('--mouse-x', `${x}%`);
    itemRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <motion.div
      ref={itemRef}
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`
        ${sizeClasses[size]}
        relative
        bg-zinc-900
        border border-white/[0.06]
        rounded-3xl
        overflow-hidden
        transition-all duration-500
        ${glowColors[glowColor]}
        hover:-translate-y-1
        group
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={{ minHeight: size.includes('2') ? '300px' : '200px' }}
    >
      {/* Radial glow overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.04), transparent 40%)`,
        }}
      />
      
      {/* Inner highlight */}
      <div className="absolute inset-0 rounded-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// BENTO GRID CONTAINER
// ─────────────────────────────────────────────────────────────────────────────

export const BentoGrid: React.FC<BentoGridProps> = ({
  children,
  className = '',
  staggerDelay = 0.08,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { 
    once: true, 
    margin: '-100px',
  });

  return (
    <motion.div
      ref={containerRef}
      variants={{
        ...containerVariants,
        visible: {
          ...containerVariants.visible,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          },
        },
      }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`
        grid
        grid-cols-12
        gap-4 md:gap-5 lg:gap-6
        w-full
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PRESET BENTO LAYOUTS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Classic Bento Layout:
 * ┌─────────────┬───────┐
 * │             │   B   │
 * │      A      ├───────┤
 * │   (2x2)     │   C   │
 * ├───────┬─────┴───────┤
 * │   D   │      E      │
 * └───────┴─────────────┘
 */
export const BentoLayoutClassic: React.FC<{
  items: ReactNode[];
  className?: string;
}> = ({ items, className = '' }) => {
  const sizes: BentoSize[] = ['2x2', '1x1', '1x1', '1x1', '2x1'];
  
  return (
    <BentoGrid className={className}>
      {items.slice(0, 5).map((item, index) => (
        <BentoItem key={index} size={sizes[index]}>
          {item}
        </BentoItem>
      ))}
    </BentoGrid>
  );
};

/**
 * Showcase Bento Layout (Hero + Features):
 * ┌─────────────────────┬───────┐
 * │                     │   B   │
 * │         A           ├───────┤
 * │       (3x2)         │   C   │
 * ├───────┬───────┬─────┴───────┤
 * │   D   │   E   │      F      │
 * └───────┴───────┴─────────────┘
 */
export const BentoLayoutShowcase: React.FC<{
  items: ReactNode[];
  className?: string;
}> = ({ items, className = '' }) => {
  const sizes: BentoSize[] = ['3x2', '1x1', '1x1', '1x1', '1x1', '2x1'];
  
  return (
    <BentoGrid className={className}>
      {items.slice(0, 6).map((item, index) => (
        <BentoItem key={index} size={sizes[index]}>
          {item}
        </BentoItem>
      ))}
    </BentoGrid>
  );
};

export default BentoGrid;

