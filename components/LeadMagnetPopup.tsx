import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Mail, ArrowRight, Check, Sparkles, FileText, Loader2 } from 'lucide-react';
import { Language } from '../types';
import { TermsAndConditions } from './TermsAndConditions';
import { sendTrendReport } from '../services/emailService';

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
    ],
    termsLabel: 'I agree to the',
    termsLink: 'Terms & Conditions and Privacy Notice',
    termsRequired: 'Please accept the terms to continue',
    sending: 'Sending...',
    noSpam: 'No spam. Unsubscribe anytime.',
    errorMessage: 'Something went wrong. Please try again.'
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
    ],
    termsLabel: 'Kabul ediyorum:',
    termsLink: 'Şartlar & Koşullar ve Gizlilik Bildirimi',
    termsRequired: 'Devam etmek için şartları kabul edin',
    sending: 'Gönderiliyor...',
    noSpam: 'Spam yok. İstediğiniz zaman abonelikten çıkın.',
    errorMessage: 'Bir şeyler yanlış gitti. Lütfen tekrar deneyin.'
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
    ],
    termsLabel: 'Accetto i',
    termsLink: 'Termini e Condizioni e l\'Informativa sulla Privacy',
    termsRequired: 'Accetta i termini per continuare',
    sending: 'Invio in corso...',
    noSpam: 'Niente spam. Cancellati quando vuoi.',
    errorMessage: 'Qualcosa è andato storto. Riprova.'
  }
};

export const LeadMagnetPopup: React.FC<LeadMagnetPopupProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Honeypot check
    if (honeypot) {
      handleClose();
      return;
    }

    if (!email || !email.includes('@')) return;
    
    // Check terms acceptance
    if (!termsAccepted) {
      setShowTermsError(true);
      return;
    }

    setIsLoading(true);

    try {
      // Send trend report via email service
      const result = await sendTrendReport({
        email,
        language: lang,
        consentDate: new Date().toISOString(),
      });

      if (result.success) {
        setIsSubmitted(true);
        // Close after showing success
        setTimeout(() => {
          handleClose();
        }, 4000);
      } else {
        setError(content.errorMessage);
      }
    } catch (err) {
      console.error('Error submitting lead:', err);
      setError(content.errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTermsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowTermsModal(true);
  };

  /* ═══════════════════════════════════════════════════════════════════════════
     LEAD MAGNET POPUP - Mobile Optimized
     
     Fixes:
     - z-index increased to z-[115] to layer properly with other modals
     - Close button enlarged to 48x48px for touch targets
     - Padding reduced on mobile
     - Form layout optimized for small screens
     - Uses dvh for iOS Safari address bar handling
     ═══════════════════════════════════════════════════════════════════════════ */
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div 
            className="fixed inset-0 z-[115] flex items-center justify-center"
            style={{
              padding: 'clamp(0.75rem, 3vw, 1rem)',
              paddingTop: 'max(clamp(0.75rem, 3vw, 1rem), env(safe-area-inset-top))',
              paddingBottom: 'max(clamp(0.75rem, 3vw, 1rem), env(safe-area-inset-bottom))',
            }}
            role="dialog"
            aria-modal="true"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#2C2825]/50" 
              onClick={handleClose} 
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-[#FAF8F5] w-full max-w-md rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
              style={{
                maxHeight: 'min(92dvh, calc(100vh - 2rem))',
              }}
            >
              {/* Close button - positioned on header with 48x48px touch target */}
              <button 
                onClick={handleClose}
                aria-label="Close popup"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/70 active:bg-white/20 sm:hover:bg-white/20 transition-colors z-10"
              >
                <X size={20} />
              </button>
              
              {/* Decorative Header */}
              <div className="bg-gradient-to-br from-[#2C2825] to-[#3a3632] p-6 sm:p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#C4A484] rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#D4A5A5] rounded-full blur-2xl" />
                </div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#C4A484]/20 flex items-center justify-center mx-auto mb-4"
                >
                  <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-[#C4A484]" />
                </motion.div>
                
                <h3 className="text-xl sm:text-2xl font-serif italic text-white mb-1 pr-8">
                  {content.title}
                </h3>
                <p className="text-[#C4A484] text-xs sm:text-sm font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                  {content.subtitle}
                </p>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-8 overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
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

                      {/* Email form - stacks on small screens */}
                      <div className="flex flex-col sm:flex-row gap-2 mb-4">
                        <div className="relative flex-1">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9e968c]" size={16} />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={content.emailPlaceholder}
                            required
                            disabled={isLoading}
                            className="w-full bg-white border border-[#2C2825]/10 rounded-xl pl-11 pr-4 py-4 text-base sm:text-sm outline-none focus:border-[#C4A484] transition-colors placeholder:text-[#9e968c] disabled:opacity-50"
                          />
                        </div>
                        <button 
                          type="submit"
                          disabled={isLoading}
                          className="bg-[#2C2825] text-[#FAF8F5] px-6 py-4 rounded-xl text-xs font-mono uppercase tracking-wider active:bg-[#C4A484] sm:hover:bg-[#C4A484] transition-all flex items-center justify-center gap-2 disabled:opacity-50 min-h-[52px] w-full sm:w-auto"
                        >
                          {isLoading ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <>
                              <Download size={16} />
                              <span className="sm:hidden">{content.buttonText}</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Terms & Conditions Checkbox */}
                      <div className="mb-4">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <div className="relative flex-shrink-0 mt-0.5">
                            <input
                              type="checkbox"
                              checked={termsAccepted}
                              onChange={(e) => {
                                setTermsAccepted(e.target.checked);
                                if (e.target.checked) setShowTermsError(false);
                              }}
                              className="sr-only"
                            />
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                              termsAccepted 
                                ? 'bg-[#C4A484] border-[#C4A484]' 
                                : showTermsError 
                                  ? 'border-red-400 bg-red-50' 
                                  : 'border-[#2C2825]/20 group-hover:border-[#C4A484]'
                            }`}>
                              {termsAccepted && <Check size={12} className="text-white" />}
                            </div>
                          </div>
                          <span className="text-xs text-[#7a746c] leading-relaxed">
                            {content.termsLabel}{' '}
                            <button
                              type="button"
                              onClick={handleTermsClick}
                              className="text-[#C4A484] underline hover:text-[#2C2825] transition-colors inline-flex items-center gap-1"
                            >
                              <FileText size={10} />
                              {content.termsLink}
                            </button>
                          </span>
                        </label>
                        {showTermsError && (
                          <p className="text-xs text-red-500 mt-2 ml-8">{content.termsRequired}</p>
                        )}
                      </div>

                      {/* Error Message */}
                      {error && (
                        <p className="text-xs text-red-500 mb-4 text-center">{error}</p>
                      )}
                    </form>

                    <p className="text-[10px] text-[#9e968c] mt-2 text-center">
                      {content.noSpam}
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
                    <h4 className="text-xl font-serif italic text-[#2C2825] mb-2">
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

      {/* Terms & Conditions Modal */}
      <TermsAndConditions
        lang={lang}
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />
    </>
  );
};
