import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, FileText, Mail, Clock, Globe } from 'lucide-react';
import { Language } from '../types';

interface TermsAndConditionsProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
}

const CONTENT = {
  en: {
    title: 'Terms & Conditions',
    privacyTitle: 'Privacy Notice',
    lastUpdated: 'Last Updated: January 8, 2026',
    sections: [
      {
        title: '1. Introduction',
        content: `Welcome to Vestiliza, operated by Gülizar Ermiş ("we", "us", "our"). By subscribing to our newsletter and downloading our trend report, you agree to these Terms & Conditions and our Privacy Notice. Please read them carefully before providing your personal information.`
      },
      {
        title: '2. Service Description',
        content: `Our trend report service provides curated fashion insights, including the "Milan Spring/Summer 2026 Trend Report" which includes style forecasts, designer recommendations, and shopping guides. This content is for personal use only and may not be redistributed or sold.`
      },
      {
        title: '3. Subscription & Communications',
        content: `By providing your email address, you consent to receive:\n• The requested trend report\n• Periodic newsletters about fashion trends (maximum 2-4 per month)\n• Special offers and event invitations from Vestiliza\n\nYou may unsubscribe at any time by clicking the unsubscribe link in any email or by contacting us directly.`
      },
      {
        title: '4. Intellectual Property',
        content: `All content in our trend reports, including text, images, and designs, is the intellectual property of Vestiliza and Gülizar Ermiş. You may not reproduce, distribute, or create derivative works without our written permission.`
      },
      {
        title: '5. Limitation of Liability',
        content: `The fashion advice and trend forecasts provided are for informational purposes only. Vestiliza is not responsible for any purchasing decisions made based on our recommendations. Our services are provided "as is" without warranties of any kind.`
      }
    ],
    privacySections: [
      {
        title: '1. Data Controller',
        content: `Vestiliza, operated by Gülizar Ermiş\nMilano, Italy\nEmail: vestilizamilano@gmail.com\nPhone: +39 351 302 5810`
      },
      {
        title: '2. Data We Collect',
        content: `We collect and process the following personal data:\n• Email address (required for newsletter subscription)\n• Name (if provided)\n• Language preference\n• Subscription date and consent record`
      },
      {
        title: '3. Purpose of Processing',
        content: `We process your data for the following purposes:\n• To send you the requested trend report\n• To send periodic newsletters about fashion trends\n• To inform you about our services and special offers\n• To improve our services based on engagement analytics`
      },
      {
        title: '4. Legal Basis (GDPR)',
        content: `We process your data based on:\n• Your consent (Article 6(1)(a) GDPR) - You can withdraw consent at any time\n• Legitimate interest (Article 6(1)(f) GDPR) - For service improvement`
      },
      {
        title: '5. Data Retention',
        content: `We retain your personal data for as long as you remain subscribed to our newsletter. Upon unsubscription, we will delete your data within 30 days, except where we are required by law to retain it longer.`
      },
      {
        title: '6. Your Rights',
        content: `Under GDPR, you have the right to:\n• Access your personal data\n• Rectify inaccurate data\n• Erase your data ("right to be forgotten")\n• Restrict processing\n• Data portability\n• Object to processing\n• Withdraw consent\n\nTo exercise these rights, contact us at vestilizamilano@gmail.com`
      },
      {
        title: '7. Data Security',
        content: `We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.`
      },
      {
        title: '8. Third-Party Services',
        content: `We may use third-party email services (such as SendGrid) to deliver our newsletters. These services process data in accordance with their own privacy policies and GDPR requirements.`
      },
      {
        title: '9. International Transfers',
        content: `Your data may be processed in countries outside the European Economic Area. We ensure appropriate safeguards are in place for such transfers in compliance with GDPR.`
      },
      {
        title: '10. Contact & Complaints',
        content: `For any questions about these terms or our privacy practices, contact us at:\nvestilizamilano@gmail.com\n\nYou also have the right to lodge a complaint with the Italian Data Protection Authority (Garante per la protezione dei dati personali).`
      }
    ],
    acceptButton: 'I Understand',
    scrollHint: 'Scroll to read all terms'
  },
  tr: {
    title: 'Şartlar ve Koşullar',
    privacyTitle: 'Gizlilik Bildirimi',
    lastUpdated: 'Son Güncelleme: 8 Ocak 2026',
    sections: [
      {
        title: '1. Giriş',
        content: `Gülizar Ermiş tarafından işletilen Vestiliza'ya hoş geldiniz ("biz", "bizim"). Bültenimize abone olarak ve trend raporumuzu indirerek, bu Şartlar ve Koşullar ile Gizlilik Bildirimini kabul etmiş olursunuz. Kişisel bilgilerinizi vermeden önce lütfen dikkatlice okuyun.`
      },
      {
        title: '2. Hizmet Açıklaması',
        content: `Trend raporu hizmetimiz, stil tahminleri, tasarımcı önerileri ve alışveriş rehberleri içeren "Milano İlkbahar/Yaz 2026 Trend Raporu" dahil olmak üzere küratörlü moda içgörüleri sunar. Bu içerik yalnızca kişisel kullanım içindir ve yeniden dağıtılamaz veya satılamaz.`
      },
      {
        title: '3. Abonelik ve İletişim',
        content: `E-posta adresinizi vererek aşağıdakileri almayı kabul etmiş olursunuz:\n• Talep edilen trend raporu\n• Moda trendleri hakkında periyodik bültenler (ayda maksimum 2-4)\n• Vestiliza'dan özel teklifler ve etkinlik davetiyeleri\n\nHerhangi bir e-postadaki abonelikten çık bağlantısına tıklayarak veya doğrudan bizimle iletişime geçerek istediğiniz zaman abonelikten çıkabilirsiniz.`
      },
      {
        title: '4. Fikri Mülkiyet',
        content: `Trend raporlarımızdaki metin, görsel ve tasarımlar dahil tüm içerik, Vestiliza ve Gülizar Ermiş'in fikri mülkiyetidir. Yazılı iznimiz olmadan çoğaltamaz, dağıtamaz veya türev eserler oluşturamazsınız.`
      },
      {
        title: '5. Sorumluluk Sınırlaması',
        content: `Sağlanan moda tavsiyeleri ve trend tahminleri yalnızca bilgilendirme amaçlıdır. Vestiliza, önerilerimize dayanarak alınan satın alma kararlarından sorumlu değildir. Hizmetlerimiz herhangi bir garanti olmaksızın "olduğu gibi" sunulmaktadır.`
      }
    ],
    privacySections: [
      {
        title: '1. Veri Sorumlusu',
        content: `Vestiliza, Gülizar Ermiş tarafından işletilmektedir\nMilano, İtalya\nE-posta: vestilizamilano@gmail.com\nTelefon: +39 351 302 5810`
      },
      {
        title: '2. Topladığımız Veriler',
        content: `Aşağıdaki kişisel verileri topluyoruz ve işliyoruz:\n• E-posta adresi (bülten aboneliği için gerekli)\n• İsim (verilirse)\n• Dil tercihi\n• Abonelik tarihi ve onay kaydı`
      },
      {
        title: '3. İşleme Amacı',
        content: `Verilerinizi aşağıdaki amaçlarla işliyoruz:\n• Talep edilen trend raporunu göndermek için\n• Moda trendleri hakkında periyodik bültenler göndermek için\n• Hizmetlerimiz ve özel tekliflerimiz hakkında bilgilendirmek için\n• Etkileşim analizlerine dayalı olarak hizmetlerimizi iyileştirmek için`
      },
      {
        title: '4. Yasal Dayanak (GDPR)',
        content: `Verilerinizi aşağıdaki temellere dayanarak işliyoruz:\n• Onayınız (GDPR Madde 6(1)(a)) - Onayınızı istediğiniz zaman geri çekebilirsiniz\n• Meşru menfaat (GDPR Madde 6(1)(f)) - Hizmet iyileştirme için`
      },
      {
        title: '5. Veri Saklama',
        content: `Kişisel verilerinizi bültenimize abone olduğunuz sürece saklarız. Abonelikten çıktığınızda, yasaların daha uzun süre saklamamızı gerektirdiği durumlar hariç, verilerinizi 30 gün içinde sileriz.`
      },
      {
        title: '6. Haklarınız',
        content: `GDPR kapsamında aşağıdaki haklara sahipsiniz:\n• Kişisel verilerinize erişim\n• Hatalı verilerin düzeltilmesi\n• Verilerinizin silinmesi ("unutulma hakkı")\n• İşlemenin kısıtlanması\n• Veri taşınabilirliği\n• İşlemeye itiraz\n• Onayı geri çekme\n\nBu hakları kullanmak için vestilizamilano@gmail.com adresinden bize ulaşın`
      },
      {
        title: '7. Veri Güvenliği',
        content: `Kişisel verilerinizi yetkisiz erişim, değişiklik, ifşa veya imhaya karşı korumak için uygun teknik ve organizasyonel önlemler uyguluyoruz.`
      },
      {
        title: '8. Üçüncü Taraf Hizmetleri',
        content: `Bültenlerimizi göndermek için üçüncü taraf e-posta hizmetlerini (SendGrid gibi) kullanabiliriz. Bu hizmetler verileri kendi gizlilik politikaları ve GDPR gereksinimlerine uygun olarak işler.`
      },
      {
        title: '9. Uluslararası Transferler',
        content: `Verileriniz Avrupa Ekonomik Alanı dışındaki ülkelerde işlenebilir. Bu tür transferler için GDPR'ye uygun olarak uygun güvencelerin mevcut olmasını sağlıyoruz.`
      },
      {
        title: '10. İletişim ve Şikayetler',
        content: `Bu şartlar veya gizlilik uygulamalarımız hakkında herhangi bir sorunuz için bizimle iletişime geçin:\nvestilizamilano@gmail.com\n\nAyrıca İtalyan Veri Koruma Otoritesi'ne (Garante per la protezione dei dati personali) şikayette bulunma hakkınız da vardır.`
      }
    ],
    acceptButton: 'Anladım',
    scrollHint: 'Tüm şartları okumak için kaydırın'
  },
  it: {
    title: 'Termini e Condizioni',
    privacyTitle: 'Informativa sulla Privacy',
    lastUpdated: 'Ultimo Aggiornamento: 8 Gennaio 2026',
    sections: [
      {
        title: '1. Introduzione',
        content: `Benvenuti su Vestiliza, gestito da Gülizar Ermiş ("noi", "nostro"). Iscrivendoti alla nostra newsletter e scaricando il nostro report sulle tendenze, accetti questi Termini e Condizioni e la nostra Informativa sulla Privacy. Ti preghiamo di leggerli attentamente prima di fornire le tue informazioni personali.`
      },
      {
        title: '2. Descrizione del Servizio',
        content: `Il nostro servizio di report sulle tendenze fornisce approfondimenti curati sulla moda, incluso il "Report Tendenze Milano Primavera/Estate 2026" che include previsioni di stile, raccomandazioni di designer e guide allo shopping. Questo contenuto è solo per uso personale e non può essere ridistribuito o venduto.`
      },
      {
        title: '3. Iscrizione e Comunicazioni',
        content: `Fornendo il tuo indirizzo email, acconsenti a ricevere:\n• Il report sulle tendenze richiesto\n• Newsletter periodiche sulle tendenze della moda (massimo 2-4 al mese)\n• Offerte speciali e inviti a eventi da Vestiliza\n\nPuoi annullare l'iscrizione in qualsiasi momento cliccando sul link di cancellazione in qualsiasi email o contattandoci direttamente.`
      },
      {
        title: '4. Proprietà Intellettuale',
        content: `Tutti i contenuti nei nostri report sulle tendenze, inclusi testo, immagini e design, sono proprietà intellettuale di Vestiliza e Gülizar Ermiş. Non puoi riprodurre, distribuire o creare opere derivate senza il nostro permesso scritto.`
      },
      {
        title: '5. Limitazione di Responsabilità',
        content: `I consigli di moda e le previsioni sulle tendenze fornite sono solo a scopo informativo. Vestiliza non è responsabile per eventuali decisioni di acquisto prese sulla base delle nostre raccomandazioni. I nostri servizi sono forniti "così come sono" senza garanzie di alcun tipo.`
      }
    ],
    privacySections: [
      {
        title: '1. Titolare del Trattamento',
        content: `Vestiliza, gestito da Gülizar Ermiş\nMilano, Italia\nEmail: vestilizamilano@gmail.com\nTelefono: +39 351 302 5810`
      },
      {
        title: '2. Dati che Raccogliamo',
        content: `Raccogliamo e trattiamo i seguenti dati personali:\n• Indirizzo email (necessario per l'iscrizione alla newsletter)\n• Nome (se fornito)\n• Preferenza linguistica\n• Data di iscrizione e record del consenso`
      },
      {
        title: '3. Finalità del Trattamento',
        content: `Trattiamo i tuoi dati per le seguenti finalità:\n• Inviarti il report sulle tendenze richiesto\n• Inviarti newsletter periodiche sulle tendenze della moda\n• Informarti sui nostri servizi e offerte speciali\n• Migliorare i nostri servizi sulla base delle analisi di engagement`
      },
      {
        title: '4. Base Giuridica (GDPR)',
        content: `Trattiamo i tuoi dati sulla base di:\n• Il tuo consenso (Articolo 6(1)(a) GDPR) - Puoi revocare il consenso in qualsiasi momento\n• Interesse legittimo (Articolo 6(1)(f) GDPR) - Per il miglioramento del servizio`
      },
      {
        title: '5. Conservazione dei Dati',
        content: `Conserviamo i tuoi dati personali per tutto il tempo in cui rimani iscritto alla nostra newsletter. Al momento della cancellazione, elimineremo i tuoi dati entro 30 giorni, salvo dove la legge ci richieda di conservarli più a lungo.`
      },
      {
        title: '6. I Tuoi Diritti',
        content: `Ai sensi del GDPR, hai il diritto di:\n• Accedere ai tuoi dati personali\n• Rettificare dati inesatti\n• Cancellare i tuoi dati ("diritto all'oblio")\n• Limitare il trattamento\n• Portabilità dei dati\n• Opporti al trattamento\n• Revocare il consenso\n\nPer esercitare questi diritti, contattaci a vestilizamilano@gmail.com`
      },
      {
        title: '7. Sicurezza dei Dati',
        content: `Implementiamo misure tecniche e organizzative appropriate per proteggere i tuoi dati personali da accessi non autorizzati, alterazioni, divulgazioni o distruzioni.`
      },
      {
        title: '8. Servizi di Terze Parti',
        content: `Potremmo utilizzare servizi email di terze parti (come SendGrid) per consegnare le nostre newsletter. Questi servizi trattano i dati in conformità con le proprie politiche sulla privacy e i requisiti GDPR.`
      },
      {
        title: '9. Trasferimenti Internazionali',
        content: `I tuoi dati potrebbero essere trattati in paesi al di fuori dello Spazio Economico Europeo. Garantiamo che siano in atto adeguate garanzie per tali trasferimenti in conformità con il GDPR.`
      },
      {
        title: '10. Contatti e Reclami',
        content: `Per qualsiasi domanda su questi termini o le nostre pratiche sulla privacy, contattaci a:\nvestilizamilano@gmail.com\n\nHai anche il diritto di presentare un reclamo al Garante per la protezione dei dati personali.`
      }
    ],
    acceptButton: 'Ho Capito',
    scrollHint: 'Scorri per leggere tutti i termini'
  }
};

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ lang, isOpen, onClose }) => {
  const content = CONTENT[lang];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#2C2825]/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#FAF8F5] w-full max-w-2xl max-h-[85vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#2C2825] p-6 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C4A484]/20 flex items-center justify-center">
                  <Shield size={20} className="text-[#C4A484]" />
                </div>
                <div>
                  <h2 className="text-xl font-serif italic text-[#FAF8F5]">{content.title}</h2>
                  <p className="text-xs text-[#FAF8F5]/50">{content.lastUpdated}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scroll Hint */}
            <div className="bg-[#F5F0EA] px-6 py-2 text-center flex-shrink-0">
              <p className="text-xs text-[#7a746c]">{content.scrollHint}</p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Terms Sections */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FileText size={18} className="text-[#C4A484]" />
                  <h3 className="text-lg font-serif italic text-[#2C2825]">{content.title}</h3>
                </div>
                <div className="space-y-4">
                  {content.sections.map((section, i) => (
                    <div key={i}>
                      <h4 className="text-sm font-medium text-[#2C2825] mb-2">{section.title}</h4>
                      <p className="text-sm text-[#5C554D] leading-relaxed whitespace-pre-line">{section.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-[#2C2825]/10" />

              {/* Privacy Sections */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Shield size={18} className="text-[#C4A484]" />
                  <h3 className="text-lg font-serif italic text-[#2C2825]">{content.privacyTitle}</h3>
                </div>
                <div className="space-y-4">
                  {content.privacySections.map((section, i) => (
                    <div key={i}>
                      <h4 className="text-sm font-medium text-[#2C2825] mb-2">{section.title}</h4>
                      <p className="text-sm text-[#5C554D] leading-relaxed whitespace-pre-line">{section.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[#2C2825]/10 flex-shrink-0">
              <button
                onClick={onClose}
                className="w-full bg-[#2C2825] text-[#FAF8F5] py-4 rounded-xl text-sm font-mono uppercase tracking-wider hover:bg-[#C4A484] transition-all"
              >
                {content.acceptButton}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

