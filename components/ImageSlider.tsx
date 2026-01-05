
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageSliderProps {
  images: string[];
  interval?: number; // in milliseconds
  alt?: string;
  className?: string;
  aspectRatio?: string;
  showIndicators?: boolean;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  interval = 4000, // default 4 seconds
  alt = 'Fashion image',
  className = '',
  aspectRatio = 'aspect-[4/5]',
  showIndicators = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const timer = setInterval(nextImage, interval);
    return () => clearInterval(timer);
  }, [images.length, interval, nextImage]);

  if (images.length === 0) return null;

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${alt} ${currentIndex + 1}`}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1]
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Indicators */}
      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white w-6'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Variant with Ken Burns effect (slow zoom)
export const ImageSliderKenBurns: React.FC<ImageSliderProps> = ({
  images,
  interval = 5000,
  alt = 'Fashion image',
  className = '',
  aspectRatio = 'aspect-[4/5]',
  showIndicators = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const timer = setInterval(nextImage, interval);
    return () => clearInterval(timer);
  }, [images.length, interval, nextImage]);

  if (images.length === 0) return null;

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <motion.img
            src={images[currentIndex]}
            alt={`${alt} ${currentIndex + 1}`}
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ 
              duration: interval / 1000,
              ease: 'linear'
            }}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Indicators */}
      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white w-6'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Crossfade variant (smoother transitions)
export const ImageSliderCrossfade: React.FC<ImageSliderProps> = ({
  images,
  interval = 4000,
  alt = 'Fashion image',
  className = '',
  aspectRatio = 'aspect-[4/5]',
  showIndicators = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const timer = setInterval(nextImage, interval);
    return () => clearInterval(timer);
  }, [images.length, interval, nextImage]);

  if (images.length === 0) return null;

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
      {images.map((src, index) => (
        <motion.img
          key={index}
          src={src}
          alt={`${alt} ${index + 1}`}
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
      
      {/* Indicators */}
      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white w-6'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

