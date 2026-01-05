/**
 * ═══════════════════════════════════════════════════════════════════════════
 * FEATURE CARD COMPONENT
 * Glassmorphic card with icon, title, description and hover glow effects
 * Inspired by Shopify Editions Winter 2026 (The RenAIssance Edition)
 * ═══════════════════════════════════════════════════════════════════════════
 */

import React, { useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface FeatureCardProps {
  icon: LucideIcon | ReactNode;
  title: string;
  description: string;
  label?: string;
  variant?: 'default' | 'glass' | 'solid' | 'gradient';
  glowColor?: 'white' | 'gold' | 'azure' | 'rose' | 'emerald';
  iconBackground?: boolean;
  className?: string;
  onClick?: () => void;
  href?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// STYLING MAPS
// ─────────────────────────────────────────────────────────────────────────────

const variantStyles = {
  default: 'bg-zinc-900 border-white/[0.06]',
  glass: 'glass border-white/[0.06]',
  solid: 'bg-zinc-800 border-white/[0.08]',
  gradient: 'bg-gradient-to-br from-zinc-900 to-zinc-800 border-white/[0.08]',
};

const glowStyles = {
  white: {
    hover: 'hover:border-white/20 hover:shadow-[0_0_60px_rgba(255,255,255,0.08)]',
    icon: 'text-white',
    iconBg: 'bg-white/5',
  },
  gold: {
    hover: 'hover:border-[#C5A059]/30 hover:shadow-[0_0_80px_rgba(197,160,89,0.12)]',
    icon: 'text-[#C5A059]',
    iconBg: 'bg-[#C5A059]/10',
  },
  azure: {
    hover: 'hover:border-[#4A9EFF]/30 hover:shadow-[0_0_60px_rgba(74,158,255,0.1)]',
    icon: 'text-[#4A9EFF]',
    iconBg: 'bg-[#4A9EFF]/10',
  },
  rose: {
    hover: 'hover:border-[#FF6B9D]/30 hover:shadow-[0_0_60px_rgba(255,107,157,0.1)]',
    icon: 'text-[#FF6B9D]',
    iconBg: 'bg-[#FF6B9D]/10',
  },
  emerald: {
    hover: 'hover:border-[#10B981]/30 hover:shadow-[0_0_60px_rgba(16,185,129,0.1)]',
    icon: 'text-[#10B981]',
    iconBg: 'bg-[#10B981]/10',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// FEATURE CARD COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  label,
  variant = 'default',
  glowColor = 'white',
  iconBackground = true,
  className = '',
  onClick,
  href,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track mouse position for radial glow effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty('--mouse-x', `${x}%`);
    cardRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  const content = (
    <>
      {/* Radial glow overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.04), transparent 40%)`,
        }}
      />
      
      {/* Inner highlight */}
      <div className="absolute inset-0 rounded-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] pointer-events-none" />
      
      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">
        {/* Icon */}
        <div className={`
          w-14 h-14 
          flex items-center justify-center 
          rounded-2xl
          ${iconBackground ? glowStyles[glowColor].iconBg : ''}
          ${glowStyles[glowColor].icon}
          transition-transform duration-500 
          group-hover:scale-110
        `}>
          {typeof Icon === 'function' ? <Icon size={24} strokeWidth={1.5} /> : Icon}
        </div>
        
        {/* Text Content */}
        <div className="mt-auto pt-8">
          {label && (
            <span className="block text-[9px] font-mono tracking-[0.4em] uppercase text-white/30 mb-3">
              {label}
            </span>
          )}
          <h3 className="text-[10px] font-mono tracking-[0.2em] uppercase text-white mb-3 group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="text-white/40 text-xs leading-relaxed group-hover:text-white/60 transition-colors">
            {description}
          </p>
        </div>
        
        {/* Hover Arrow Indicator */}
        {(onClick || href) && (
          <motion.div 
            className="absolute bottom-8 right-8 text-white/20 group-hover:text-white/60 transition-colors"
            initial={{ x: 0, opacity: 0.5 }}
            whileHover={{ x: 5, opacity: 1 }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        )}
      </div>
    </>
  );

  const cardClasses = `
    relative
    ${variantStyles[variant]}
    border
    rounded-3xl
    overflow-hidden
    transition-all duration-500
    ${glowStyles[glowColor].hover}
    hover:-translate-y-1
    group
    ${onClick || href ? 'cursor-pointer' : ''}
    ${className}
  `;

  // Render as link if href is provided
  if (href) {
    return (
      <motion.a
        ref={cardRef as any}
        href={href}
        onMouseMove={handleMouseMove}
        className={cardClasses}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className={cardClasses}
      whileHover={{ scale: onClick ? 1.02 : 1 }}
      whileTap={onClick ? { scale: 0.98 } : undefined}
    >
      {content}
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// FEATURE CARD VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Large Feature Card - For hero features
 */
export const FeatureCardLarge: React.FC<FeatureCardProps & { 
  image?: string;
  imageAlt?: string;
}> = ({
  icon: Icon,
  title,
  description,
  label,
  image,
  imageAlt = '',
  glowColor = 'white',
  className = '',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty('--mouse-x', `${x}%`);
    cardRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className={`
        relative
        bg-zinc-900
        border border-white/[0.06]
        rounded-3xl
        overflow-hidden
        transition-all duration-500
        ${glowStyles[glowColor].hover}
        hover:-translate-y-1
        group
        min-h-[400px]
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      whileHover={{ scale: onClick ? 1.01 : 1 }}
    >
      {/* Background Image */}
      {image && (
        <>
          <img 
            src={image} 
            alt={imageAlt}
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[3s]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </>
      )}
      
      {/* Radial glow overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.04), transparent 40%)`,
        }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-12 z-10">
        {/* Icon */}
        <div className={`
          w-12 h-12 
          flex items-center justify-center 
          rounded-xl
          bg-white/10 backdrop-blur-sm
          ${glowStyles[glowColor].icon}
          mb-6
        `}>
          {typeof Icon === 'function' ? <Icon size={22} strokeWidth={1.5} /> : Icon}
        </div>
        
        {label && (
          <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-white/50 mb-4">
            {label}
          </span>
        )}
        
        <h3 className="text-3xl md:text-4xl font-serif italic text-white mb-4 leading-tight">
          {title}
        </h3>
        
        <p className="text-white/50 text-sm leading-relaxed max-w-md">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

/**
 * Compact Feature Card - For feature grids
 */
export const FeatureCardCompact: React.FC<Omit<FeatureCardProps, 'label'>> = ({
  icon: Icon,
  title,
  description,
  glowColor = 'white',
  className = '',
  onClick,
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={`
        relative
        bg-zinc-900/50
        border border-white/[0.06]
        rounded-2xl
        overflow-hidden
        transition-all duration-300
        ${glowStyles[glowColor].hover}
        group
        p-6
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      whileHover={{ y: -2 }}
      whileTap={onClick ? { scale: 0.98 } : undefined}
    >
      <div className="flex items-start gap-4">
        <div className={`
          w-10 h-10 
          flex items-center justify-center 
          rounded-xl
          ${glowStyles[glowColor].iconBg}
          ${glowStyles[glowColor].icon}
          flex-shrink-0
        `}>
          {typeof Icon === 'function' ? <Icon size={18} strokeWidth={1.5} /> : Icon}
        </div>
        
        <div>
          <h4 className="text-[10px] font-mono tracking-[0.15em] uppercase text-white mb-2">
            {title}
          </h4>
          <p className="text-white/40 text-xs leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;

