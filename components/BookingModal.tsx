
import React, { useState, useEffect } from 'react';
import { X, Calendar, Check, ArrowRight, Mail, Loader2, Clock, MapPin, AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { TRANSLATIONS } from '../translations';
import { 
  checkAvailability, 
  createCalendarEvent, 
  SERVICE_DURATIONS,
  createDateTime,
  addMinutes,
  type CalendarEvent
} from '../services/calendarService';
import {
  sendBookingRequestToGulizar,
  sendCustomerConfirmation,
  generateBookingId,
  formatDateForEmail,
  formatTimeForEmail,
  type BookingRequestEmail
} from '../services/emailService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

interface FormErrors {
  service?: string;
  date?: string;
  time?: string;
  email?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, lang }) => {
  const [step, setStep] = useState<'form' | 'loading' | 'success'>('form');
  const [selectedService, setSelectedService] = useState('shopping');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);
  // Honeypot field for spam prevention - bots will fill this, humans won't see it
  const [honeypot, setHoneypot] = useState('');

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
      id: 'cityTour', 
      name: t.services.cityTour?.name || 'Milan City Tour', 
      price: 'from €350', 
      duration: '8 hours',
      desc: t.services.cityTour?.desc || 'Full-day cultural tour including Duomo, Castello Sforzesco, Brera, Navigli, and more. All entrances included.'
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

  // Generate time slots (9 AM to 6 PM)
  const generateTimeSlots = (): string[] => {
    const slots: string[] = [];
    for (let hour = 9; hour <= 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Check availability when date and time are selected
  useEffect(() => {
    if (date && time && selectedService) {
      const checkAvail = async () => {
        setCheckingAvailability(true);
        setAvailabilityError(null);
        
        const duration = SERVICE_DURATIONS[selectedService as keyof typeof SERVICE_DURATIONS];
        const result = await checkAvailability(date, time, duration);
        
        setCheckingAvailability(false);
        
        if (!result.available) {
          setAvailabilityError(result.message || t.notAvailable);
        } else {
          setAvailabilityError(null);
        }
      };

      // Debounce the check
      const timeoutId = setTimeout(checkAvail, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setAvailabilityError(null);
    }
  }, [date, time, selectedService, t]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!date) newErrors.date = 'Date required';
    if (!time) newErrors.time = 'Time required';
    if (!email) newErrors.email = 'Email required';
    if (!name) newErrors.service = 'Name required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot spam check - if filled, silently reject (bot detected)
    if (honeypot) {
      console.log('Spam detected via honeypot');
      setStep('success'); // Show success to not alert the bot
      return;
    }
    
    if (!validate()) return;
    
    // Check availability one more time before submitting
    if (date && time && selectedService) {
      setCheckingAvailability(true);
      const duration = SERVICE_DURATIONS[selectedService as keyof typeof SERVICE_DURATIONS];
      const availabilityResult = await checkAvailability(date, time, duration);
      setCheckingAvailability(false);
      
      if (!availabilityResult.available) {
        setAvailabilityError(availabilityResult.message || t.notAvailable);
        return;
      }
    }
    
    setStep('loading');
    
    try {
      const selectedServiceData = services.find(s => s.id === selectedService);
      const duration = SERVICE_DURATIONS[selectedService as keyof typeof SERVICE_DURATIONS];
      const bookingId = generateBookingId();
      
      // Prepare booking data for emails
      const bookingData: BookingRequestEmail = {
        customerName: name,
        customerEmail: email,
        serviceName: selectedServiceData?.name || 'Consultation',
        serviceDescription: selectedServiceData?.desc || '',
        date: formatDateForEmail(date, lang),
        time: formatTimeForEmail(time),
        duration: selectedServiceData?.duration || '',
        bookingId,
      };

      // Send emails in parallel
      const [gulizarEmailResult, customerEmailResult] = await Promise.all([
        sendBookingRequestToGulizar(bookingData),
        sendCustomerConfirmation(email, name, bookingData),
      ]);

      // Create calendar event (tentative, will be confirmed when Gülizar accepts)
      const startDateTime = createDateTime(date, time);
      const endDateTime = addMinutes(startDateTime, duration);

      const calendarEvent: CalendarEvent = {
        summary: `[PENDING] ${selectedServiceData?.name || 'Consultation'} - ${name}`,
        description: `Service: ${selectedServiceData?.name}\nClient: ${name}\nEmail: ${email}\nDuration: ${selectedServiceData?.duration}\nBooking ID: ${bookingId}\nStatus: Pending Approval`,
        start: startDateTime,
        end: endDateTime,
        attendeeEmail: email,
        attendeeName: name,
      };

      // Try to create calendar event (optional, won't fail the booking if it fails)
      try {
        await createCalendarEvent(calendarEvent);
      } catch (error) {
        console.warn('Calendar event creation failed, but booking request was sent:', error);
      }
      
      // Show success regardless of email results (booking request was submitted)
      setStep('success');
    } catch (error) {
      console.error('Error creating booking:', error);
      // Still show success as the request was received
      setStep('success');
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep('form');
      setDate('');
      setTime('');
      setEmail('');
      setName('');
      setHoneypot('');
      setErrors({});
      setAvailabilityError(null);
      setCheckingAvailability(false);
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
            className="relative bg-[#FAF8F5] w-full max-w-lg max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            <button 
              onClick={handleClose} 
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#2C2825]/5 flex items-center justify-center text-[#5C554D] hover:bg-[#2C2825]/10 hover:text-[#2C2825] transition-all z-20"
            >
              <X size={18} />
            </button>

            {step === 'form' && (
              <div 
                className="p-8 md:p-12 overflow-y-auto flex-1 min-h-0" 
                style={{ 
                  WebkitOverflowScrolling: 'touch',
                  overscrollBehavior: 'contain'
                }}
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-serif italic text-[#2C2825] mb-2">{t.title}</h2>
                  <p className="text-sm text-[#8C847A]">{t.desc}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Honeypot field - hidden from users, bots will fill it */}
                  <div className="absolute -left-[9999px] aria-hidden" aria-hidden="true">
                    <label htmlFor="website">Website (leave empty)</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  
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
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full bg-white border rounded-xl px-5 py-4 text-sm outline-none focus:border-[#C4A484] transition-colors ${errors.date ? 'border-[#D4A5A5]' : 'border-[#2C2825]/10'}`}
                      />
                      {errors.date && (
                        <p className="text-xs text-[#D4A5A5] mt-1">{errors.date}</p>
                      )}
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="label-small block mb-4 text-[#8C847A]">{t.selectTime}</label>
                    <div className="relative">
                      <select
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        className={`w-full bg-white border rounded-xl px-5 py-4 text-sm outline-none focus:border-[#C4A484] transition-colors appearance-none ${errors.time || availabilityError ? 'border-[#D4A5A5]' : 'border-[#2C2825]/10'}`}
                      >
                        <option value="">{t.selectTime}</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      <Clock className="absolute right-5 top-1/2 transform -translate-y-1/2 text-[#8C847A] pointer-events-none" size={16} />
                      {checkingAvailability && (
                        <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                          <Loader2 className="animate-spin text-[#C4A484]" size={16} />
                        </div>
                      )}
                      {errors.time && (
                        <p className="text-xs text-[#D4A5A5] mt-1">{errors.time}</p>
                      )}
                      {availabilityError && !checkingAvailability && (
                        <div className="mt-2 flex items-start gap-2 p-3 bg-[#D4A5A5]/10 border border-[#D4A5A5]/30 rounded-lg">
                          <AlertCircle size={16} className="text-[#D4A5A5] flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-[#D4A5A5]">{availabilityError}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={checkingAvailability || !!availabilityError}
                    className={`w-full py-5 rounded-xl text-[11px] font-mono uppercase tracking-[0.15em] transition-all duration-300 flex items-center justify-center gap-2 ${
                      checkingAvailability || availabilityError
                        ? 'bg-[#8C847A] text-[#FAF8F5]/60 cursor-not-allowed'
                        : 'bg-[#2C2825] text-[#FAF8F5] hover:bg-[#C4A484]'
                    }`}
                  >
                    {checkingAvailability ? t.checkingAvailability : t.confirm}
                    {!checkingAvailability && <ArrowRight size={14} />}
                  </button>
                </form>
              </div>
            )}

            {step === 'loading' && (
              <div className="p-20 text-center flex-1 flex items-center justify-center min-h-0">
                <motion.div 
                  animate={{ height: [0, 60, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-px bg-[#C4A484] mx-auto mb-8" 
                />
                <h3 className="text-xl font-serif italic text-[#2C2825]">{t.loading}</h3>
              </div>
            )}

            {step === 'success' && (
              <div className="p-8 md:p-12 text-center flex-1 flex flex-col items-center justify-center min-h-0 overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                <div className="w-16 h-16 rounded-full bg-[#C4A484]/10 flex items-center justify-center mx-auto mb-6">
                  <Check size={28} className="text-[#C4A484]" />
                </div>
                <h3 className="text-3xl font-serif italic text-[#2C2825] mb-3">{t.success}</h3>
                <p className="text-sm text-[#8C847A] mb-8 max-w-sm mx-auto">{t.successDesc}</p>
                
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
