import React from 'react';
import { motion } from 'framer-motion';
import { WhatsappLogo } from '@phosphor-icons/react';

/* ═══════════════════════════════════════════════════════════════════════════
   WHATSAPP FLOATING BUTTON
   
   Mobile fixes:
   - z-index increased to z-[110] to be ABOVE the navbar (z-[100])
   - Bottom position adjusted for mobile navbar + language selector height
   - Touch target is 56x56px (14*4) on mobile, 64x64px on desktop
   - Tooltip hidden on mobile (uses hover which doesn't work on touch)
   ═══════════════════════════════════════════════════════════════════════════ */

export const WhatsAppButton: React.FC = () => {
  const whatsappNumber = '393513025810';
  const message = encodeURIComponent('Ciao! I\'m interested in learning more about your fashion consultancy services in Milan.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed z-[110] group"
      style={{
        // Position: safe distance from edge, above navbar
        right: 'max(0.75rem, env(safe-area-inset-right, 0.75rem))',
        bottom: 'max(7rem, calc(120px + env(safe-area-inset-bottom)))',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 20 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      
      {/* Button - 56x56px on mobile (meets 44px minimum), 64x64px on desktop */}
      <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white shadow-lg active:shadow-md active:scale-95 transition-all">
        <WhatsappLogo className="w-7 h-7 sm:w-8 sm:h-8" weight="fill" />
      </div>
      
      {/* Tooltip - hidden on mobile/touch devices */}
      <div className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#1a1a1a] text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat on WhatsApp
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-[#1a1a1a]" />
      </div>
    </motion.a>
  );
};

