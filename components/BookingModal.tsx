
import React, { useState } from 'react';
import { X, Calendar, Check, ArrowRight, Mail, Loader2, Clock, MapPin } from 'lucide-react';
import { generateConfirmationEmail } from '../services/geminiService';
import { Language } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { TRANSLATIONS } from '../translations';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

interface FormErrors {
  service?: string;
  date?: string;
  email?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, lang }) => {
  const [step, setStep] = useState<'form' | 'loading' | 'success'>('form');
  const [selectedService, setSelectedService] = useState('shopping');
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [emailPreview, setEmailPreview] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const t = TRANSLATIONS[lang].booking;

  const services = [
    { 
      id: 'shopping', 
      name: t.services.shopping.name, 
      price: 'from €250', 
      duration: '4 hours',
      desc: t.services.shopping.desc
    },
    { 
      id: 'wardrobe', 
      name: t.services.wardrobe.name, 
      price: 'from €400', 
      duration: '6 hours',
      desc: t.services.wardrobe.desc
    },
    { 
      id: 'vip', 
      name: t.services.vip.name, 
      price: 'Custom', 
      duration: '3-7 days',
      desc: t.services.vip.desc
    },
    { 
      id: 'virtual', 
      name: t.services.virtual.name, 
      price: '€120', 
      duration: '60 min',
      desc: t.services.virtual.desc
    },
  ];

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!date) newErrors.date = 'Date required';
    if (!email) newErrors.email = 'Email required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStep('loading');
    try {
      const serviceName = services.find(s => s.id === selectedService)?.name || 'Fashion Service';
      const preview = await generateConfirmationEmail({ service: serviceName, date, email }, lang);
      setEmailPreview(preview || '');
      setStep('success');
    } catch (error) {
      setStep('success');
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep('form');
      setDate('');
      setEmail('');
      setName('');
      setErrors({});
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#2C2825]/30 backdrop-blur-sm" 
            onClick={handleClose} 
          />
          
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#FAF8F5] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
          >
            <button 
              onClick={handleClose} 
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#2C2825]/5 flex items-center justify-center text-[#5C554D] hover:bg-[#2C2825]/10 hover:text-[#2C2825] transition-all z-10"
            >
              <X size={18} />
            </button>

            {step === 'form' && (
              <div className="p-8 md:p-12">
                <div className="mb-8">
                  <h2 className="text-3xl font-serif italic text-[#2C2825] mb-2">{t.title}</h2>
                  <p className="text-sm text-[#8C847A]">{t.desc}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Services */}
                  <div>
                    <label className="label-small block mb-4 text-[#8C847A]">{t.selectService}</label>
                    <div className="space-y-3">
                      {services.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSelectedService(s.id)}
                          className={`w-full p-5 rounded-xl text-left transition-all ${
                            selectedService === s.id 
                              ? 'bg-[#2C2825] text-[#FAF8F5]' 
                              : 'bg-white text-[#2C2825] border border-[#2C2825]/10 hover:border-[#2C2825]/20'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-mono uppercase tracking-wider font-medium">{s.name}</span>
                            <span className={`text-[10px] font-mono ${selectedService === s.id ? 'text-[#C4A484]' : 'text-[#C4A484]'}`}>{s.price}</span>
                          </div>
                          <p className={`text-xs ${selectedService === s.id ? 'text-[#FAF8F5]/60' : 'text-[#8C847A]'}`}>
                            {s.desc}
                          </p>
                          <div className={`flex items-center gap-2 mt-2 text-[10px] ${selectedService === s.id ? 'text-[#FAF8F5]/40' : 'text-[#AEA69C]'}`}>
                            <Clock size={12} />
                            <span>{s.duration}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Details */}
                  <div>
                    <label className="label-small block mb-4 text-[#8C847A]">{t.yourDetails}</label>
                    <div className="space-y-3">
                      <input 
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={t.yourName}
                        className="w-full bg-white border border-[#2C2825]/10 rounded-xl px-5 py-4 text-sm outline-none focus:border-[#C4A484] transition-colors placeholder:text-[#AEA69C]"
                      />
                      <input 
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        placeholder={t.emailAddress} 
                        className={`w-full bg-white border rounded-xl px-5 py-4 text-sm outline-none focus:border-[#C4A484] transition-colors placeholder:text-[#AEA69C] ${errors.email ? 'border-[#D4A5A5]' : 'border-[#2C2825]/10'}`}
                      />
                      <input 
                        type="date" 
                        value={date} 
                        onChange={e => setDate(e.target.value)} 
                        className={`w-full bg-white border rounded-xl px-5 py-4 text-sm outline-none focus:border-[#C4A484] transition-colors ${errors.date ? 'border-[#D4A5A5]' : 'border-[#2C2825]/10'}`}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#2C2825] text-[#FAF8F5] py-5 rounded-xl text-[11px] font-mono uppercase tracking-[0.15em] hover:bg-[#C4A484] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {t.confirm}
                    <ArrowRight size={14} />
                  </button>
                </form>
              </div>
            )}

            {step === 'loading' && (
              <div className="p-20 text-center">
                <motion.div 
                  animate={{ height: [0, 60, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-px bg-[#C4A484] mx-auto mb-8" 
                />
                <h3 className="text-xl font-serif italic text-[#2C2825]">{t.loading}</h3>
              </div>
            )}

            {step === 'success' && (
              <div className="p-8 md:p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#C4A484]/10 flex items-center justify-center mx-auto mb-6">
                  <Check size={28} className="text-[#C4A484]" />
                </div>
                <h3 className="text-3xl font-serif italic text-[#2C2825] mb-3">{t.success}</h3>
                <p className="text-sm text-[#8C847A] mb-8 max-w-sm mx-auto">{t.successDesc}</p>
                
                {emailPreview && (
                  <div className="bg-white p-6 rounded-xl border border-[#2C2825]/5 mb-8 text-left">
                    <p className="text-xs text-[#5C554D] leading-relaxed whitespace-pre-wrap">{emailPreview}</p>
                  </div>
                )}
                
                <button 
                  onClick={handleClose} 
                  className="w-full border border-[#2C2825] rounded-xl py-4 text-[10px] font-mono uppercase tracking-[0.15em] hover:bg-[#2C2825] hover:text-[#FAF8F5] transition-all"
                >
                  {t.close}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
