import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Mail, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface LeadMagnetPopupProps {
  lang: Language;
}

const CONTENT = {
  en: {
    title: 'Milan Spring/Summer 2026',
    subtitle: 'Trend Report',
    description: 'Get exclusive insights into the upcoming Milan fashion trends. Our curated report includes must-have pieces, emerging designers, and insider shopping tips.',
    emailPlaceholder: 'Enter your email',
    buttonText: 'Get Free Report',
    successTitle: 'Check Your Inbox!',
    successMessage: 'Your trend report is on its way. While you wait, explore our experiences.',
    features: [
      'Top 10 Investment Pieces',
      'Hidden Boutiques Guide',
      'Color & Style Forecast'
    ]
  },
  tr: {
    title: 'Milano İlkbahar/Yaz 2026',
    subtitle: 'Trend Raporu',
    description: 'Yaklaşan Milano moda trendleri hakkında özel içgörüler edinin. Küratörlü raporumuz olmazsa olmaz parçalar, yükselen tasarımcılar ve içeriden alışveriş ipuçları içerir.',
    emailPlaceholder: 'E-postanızı girin',
    buttonText: 'Ücretsiz Raporu Al',
    successTitle: 'Gelen Kutunuzu Kontrol Edin!',
    successMessage: 'Trend raporunuz yolda. Beklerken deneyimlerimizi keşfedin.',
    features: [
      'En İyi 10 Yatırım Parçası',
      'Gizli Butikler Rehberi',
      'Renk & Stil Tahmini'
    ]
  },
  it: {
    title: 'Milano Primavera/Estate 2026',
    subtitle: 'Report Tendenze',
    description: 'Ottieni approfondimenti esclusivi sulle prossime tendenze della moda milanese. Il nostro report curato include pezzi must-have, designer emergenti e consigli per lo shopping.',
    emailPlaceholder: 'Inserisci la tua email',
    buttonText: 'Ottieni Report Gratuito',
    successTitle: 'Controlla la Tua Inbox!',
    successMessage: 'Il tuo report tendenze è in arrivo. Nel frattempo, esplora le nostre esperienze.',
    features: [
      'Top 10 Pezzi di Investimento',
      'Guida alle Boutique Nascoste',
      'Previsioni Colori & Stile'
    ]
  }
};

export const LeadMagnetPopup: React.FC<LeadMagnetPopupProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const content = CONTENT[lang];

  // Show popup after 30 seconds or 50% scroll
  useEffect(() => {
    // Check if already shown/dismissed
    const hasSeenPopup = localStorage.getItem('seenLeadMagnet');
    if (hasSeenPopup) return;

    const showPopupTimeout = setTimeout(() => {
      setIsOpen(true);
    }, 30000);

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 50) {
        setIsOpen(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(showPopupTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('seenLeadMagnet', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check
    if (honeypot) {
      handleClose();
      return;
    }

    if (!email || !email.includes('@')) return;
    
    // Here you would normally send to your email service
    console.log('Lead captured:', email);
    setIsSubmitted(true);
    
    // Close after showing success
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#1a1a1a]/40 backdrop-blur-sm" 
            onClick={handleClose} 
          />
          
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#FAF8F5] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Decorative Header */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C4A484] rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#D4A5A5] rounded-full blur-2xl" />
              </div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-16 h-16 rounded-full bg-[#C4A484]/20 flex items-center justify-center mx-auto mb-4"
              >
                <Sparkles size={28} className="text-[#C4A484]" />
              </motion.div>
              
              <h3 className="text-2xl font-serif italic text-white mb-1">
                {content.title}
              </h3>
              <p className="text-[#C4A484] text-sm font-mono uppercase tracking-[0.2em]">
                {content.subtitle}
              </p>
            </div>

            {/* Content */}
            <div className="p-8">
              <button 
                onClick={handleClose} 
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              {!isSubmitted ? (
                <>
                  <p className="text-[#4a4542] text-sm leading-relaxed mb-6">
                    {content.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {content.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check size={14} className="text-[#C4A484]" />
                        <span className="text-xs text-[#7a746c]">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Honeypot */}
                    <div className="absolute -left-[9999px]" aria-hidden="true">
                      <input
                        type="text"
                        name="website"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9e968c]" size={16} />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={content.emailPlaceholder}
                          required
                          className="w-full bg-white border border-[#1a1a1a]/10 rounded-xl pl-11 pr-4 py-4 text-sm outline-none focus:border-[#C4A484] transition-colors placeholder:text-[#9e968c]"
                        />
                      </div>
                      <button 
                        type="submit"
                        className="bg-[#1a1a1a] text-[#FAF8F5] px-6 py-4 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-[#C4A484] transition-all flex items-center gap-2"
                      >
                        <Download size={14} />
                      </button>
                    </div>
                  </form>

                  <p className="text-[10px] text-[#9e968c] mt-4 text-center">
                    No spam. Unsubscribe anytime.
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#C4A484]/10 flex items-center justify-center mx-auto mb-4">
                    <Check size={24} className="text-[#C4A484]" />
                  </div>
                  <h4 className="text-xl font-serif italic text-[#1a1a1a] mb-2">
                    {content.successTitle}
                  </h4>
                  <p className="text-sm text-[#7a746c]">
                    {content.successMessage}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

