/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TAILWIND CSS CONFIGURATION
 * Digital Renaissance Theme - Award-Winning Landing Page Configuration
 * Inspired by Shopify Editions Winter 2026 (The RenAIssance Edition)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * INSTALLATION NOTES:
 * Since this project uses Tailwind CDN, this config file serves as documentation.
 * To use this config with a proper Tailwind installation:
 * 
 * 1. Install Tailwind CSS:
 *    npm install -D tailwindcss postcss autoprefixer
 *    npx tailwindcss init -p
 * 
 * 2. Replace the generated tailwind.config.js with this file
 * 
 * 3. Add to your main CSS file:
 *    @tailwind base;
 *    @tailwind components;
 *    @tailwind utilities;
 * 
 * 4. Add these Google Fonts to your HTML <head>:
 *    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=JetBrains+Mono:wght@300;400&family=Montserrat:wght@100;200;300;400;500&display=swap" rel="stylesheet">
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  
  theme: {
    extend: {
      // ───────────────────────────────────────────────────────────────────────
      // TYPOGRAPHY - Editorial Serif + Technical Mono System
      // ───────────────────────────────────────────────────────────────────────
      fontFamily: {
        // Primary Serif - Editorial headlines (luxurious, timeless)
        serif: [
          'Cormorant Garamond',
          'Playfair Display',
          'Times New Roman',
          'Georgia',
          'serif',
        ],
        
        // Technical Mono - Labels, captions, body text
        mono: [
          'JetBrains Mono',
          'SF Mono',
          'Fira Code',
          'Monaco',
          'monospace',
        ],
        
        // Clean Sans - UI elements
        sans: [
          'Montserrat',
          'Inter',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      
      // ───────────────────────────────────────────────────────────────────────
      // FONT SIZE SCALE - Massive to Micro
      // ───────────────────────────────────────────────────────────────────────
      fontSize: {
        // Micro labels (9px)
        'micro': ['9px', { lineHeight: '1.4', letterSpacing: '0.4em' }],
        
        // Small labels (10px)
        'label': ['10px', { lineHeight: '1.5', letterSpacing: '0.3em' }],
        
        // Body text (11px)
        'body': ['11px', { lineHeight: '1.8', letterSpacing: '0.15em' }],
        
        // Display sizes
        'display-sm': ['clamp(2rem, 5vw, 3rem)', { lineHeight: '1.1' }],
        'display-md': ['clamp(2.5rem, 6vw, 4rem)', { lineHeight: '1.05' }],
        'display-lg': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '0.95' }],
        'display-xl': ['clamp(4rem, 10vw, 8rem)', { lineHeight: '0.9' }],
        'display-hero': ['clamp(5rem, 12vw, 12rem)', { lineHeight: '0.85' }],
      },
      
      // ───────────────────────────────────────────────────────────────────────
      // COLOR PALETTE - Deep Renaissance Theme
      // ───────────────────────────────────────────────────────────────────────
      colors: {
        // Base backgrounds - deep blacks
        void: '#030303',
        deep: '#080808',
        elevated: '#0f0f0f',
        card: '#121212',
        surface: '#181818',
        
        // Accent colors
        gold: {
          DEFAULT: '#C5A059',
          light: '#D4B574',
          dark: '#A68940',
          glow: 'rgba(197, 160, 89, 0.15)',
        },
        azure: {
          DEFAULT: '#4A9EFF',
          light: '#6FB3FF',
          dark: '#2B7ED9',
          glow: 'rgba(74, 158, 255, 0.12)',
        },
        rose: {
          DEFAULT: '#FF6B9D',
          light: '#FF8BB5',
          dark: '#E54E7D',
          glow: 'rgba(255, 107, 157, 0.12)',
        },
        emerald: {
          DEFAULT: '#10B981',
          light: '#34D399',
          dark: '#059669',
          glow: 'rgba(16, 185, 129, 0.12)',
        },
      },
      
      // ───────────────────────────────────────────────────────────────────────
      // BORDER COLORS - Subtle glass effects
      // ───────────────────────────────────────────────────────────────────────
      borderColor: {
        subtle: 'rgba(255, 255, 255, 0.06)',
        medium: 'rgba(255, 255, 255, 0.1)',
        strong: 'rgba(255, 255, 255, 0.2)',
      },
      
      // ───────────────────────────────────────────────────────────────────────
      // BACKGROUND COLORS - Glass effects
      // ───────────────────────────────────────────────────────────────────────
      backgroundColor: {
        glass: 'rgba(255, 255, 255, 0.03)',
        'glass-medium': 'rgba(255, 255, 255, 0.05)',
        'glass-strong': 'rgba(18, 18, 18, 0.8)',
      },
      
      // ───────────────────────────────────────────────────────────────────────
      // BOX SHADOW - Glow effects
      // ───────────────────────────────────────────────────────────────────────
      boxShadow: {
        'glow-white': '0 0 60px rgba(255, 255, 255, 0.08)',
        'glow-gold': '0 0 80px rgba(197, 160, 89, 0.12)',
        'glow-azure': '0 0 60px rgba(74, 158, 255, 0.1)',
        'glow-rose': '0 0 60px rgba(255, 107, 157, 0.1)',
        'glow-emerald': '0 0 60px rgba(16, 185, 129, 0.1)',
        'glow-intense': '0 0 120px rgba(255, 255, 255, 0.15)',
        'inner-subtle': 'inset 0 1px 0 rgba(255, 255, 255, 0.06)',
        'navbar': '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
      },
      
      // ───────────────────────────────────────────────────────────────────────
      // BACKDROP BLUR - Glassmorphism
      // ───────────────────────────────────────────────────────────────────────
      backdropBlur: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '24px',
        xl: '40px',
        '2xl': '60px',
        '3xl': '100px',
      },
      
      // ───────────────────────────────────────────────────────────────────────
      // BORDER RADIUS - Modern rounded corners
      // ───────────────────────────────────────────────────────────────────────
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      
      // ───────────────────────────────────────────────────────────────────────
      // ANIMATION & TRANSITIONS
      // ───────────────────────────────────────────────────────────────────────
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in': 'cubic-bezier(0.7, 0, 0.84, 0)',
        'expo-in-out': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'bounce-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
        '2000': '2000ms',
        '3000': '3000ms',
      },
      
      animation: {
        'float-slow': 'float-slow 30s ease-in-out infinite',
        'float-medium': 'float-medium 20s ease-in-out infinite',
        'float-fast': 'float-fast 10s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'spin-slow': 'spin-slow 30s linear infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'noise-move': 'noise-move 0.2s infinite',
      },
      
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '33%': { transform: 'translateY(-15px) rotate(2deg)' },
          '66%': { transform: 'translateY(-25px) rotate(-2deg)' },
        },
        'float-medium': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.02)' },
        },
        'float-fast': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'noise-move': {
          '0%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -5%)' },
          '20%': { transform: 'translate(-10%, 5%)' },
          '30%': { transform: 'translate(5%, -10%)' },
          '40%': { transform: 'translate(-5%, 15%)' },
          '50%': { transform: 'translate(-10%, 5%)' },
          '60%': { transform: 'translate(15%, 0)' },
          '70%': { transform: 'translate(0, 10%)' },
          '80%': { transform: 'translate(-15%, 0)' },
          '90%': { transform: 'translate(10%, 5%)' },
          '100%': { transform: 'translate(5%, 0)' },
        },
      },
      
      // ───────────────────────────────────────────────────────────────────────
      // SPACING SCALE - Extended
      // ───────────────────────────────────────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      
      // ───────────────────────────────────────────────────────────────────────
      // Z-INDEX SCALE
      // ───────────────────────────────────────────────────────────────────────
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        'noise': '9999',
        'cursor': '10000',
      },
    },
  },
  
  plugins: [
    // Custom plugin for glass utilities
    function({ addUtilities }) {
      addUtilities({
        '.glass': {
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(24px) saturate(180%)',
          '-webkit-backdrop-filter': 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        },
        '.glass-medium': {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(40px) saturate(200%)',
          '-webkit-backdrop-filter': 'blur(40px) saturate(200%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.glass-strong': {
          background: 'rgba(18, 18, 18, 0.8)',
          backdropFilter: 'blur(60px) saturate(150%)',
          '-webkit-backdrop-filter': 'blur(60px) saturate(150%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.text-gradient-gold': {
          background: 'linear-gradient(135deg, #C5A059 0%, #D4B574 50%, #A68940 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          backgroundClip: 'text',
        },
      })
    },
  ],
};

