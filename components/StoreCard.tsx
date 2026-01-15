
import React from 'react';
import { Store } from '../types';
import { MapPin, ArrowUpRight } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

interface StoreCardProps {
  store: Store;
  onBookConsultation?: () => void;
}

export const StoreCard: React.FC<StoreCardProps> = ({ store, onBookConsultation }) => {
  const handleArrowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBookConsultation) {
      onBookConsultation();
    }
  };

  return (
    <motion.div 
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#2C2825]/5 shadow-sm hover:shadow-xl transition-all duration-700"
      whileHover={{ y: -4 }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={store.image} 
          alt={store.name} 
          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
          style={{ filter: 'saturate(0.92) contrast(1.02)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C2825]/70 via-transparent to-transparent opacity-80" />
        
        {/* Clickable Arrow - Book Consultation */}
        <div className="absolute top-5 right-5">
          <button
            onClick={handleArrowClick}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 hover:bg-[#C4A484] hover:scale-110"
            title="Book a consultation for this boutique"
          >
            <ArrowUpRight size={16} className="text-[#2C2825]" />
          </button>
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <div className="flex items-center gap-2 text-white/80 mb-2">
            <MapPin size={12} />
            <span className="text-[9px] font-mono uppercase tracking-wider">{store.district}</span>
          </div>
          <h3 className="text-2xl font-serif italic text-white">{store.name}</h3>
        </div>
      </div>
      
      <div className="p-6 bg-white">
        <p className="text-[#5C554D] text-sm leading-relaxed mb-4 line-clamp-2">
          {store.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {store.tags.slice(0, 2).map(tag => (
              <span 
                key={tag} 
                className="text-[9px] font-mono uppercase tracking-wider text-[#C4A484] bg-[#C4A484]/10 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-[9px] font-mono uppercase tracking-wider text-[#8C847A] italic">
            {store.vibe}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
