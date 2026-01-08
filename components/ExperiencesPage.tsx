import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Clock, 
  MapPin, 
  Check, 
  Star,
  ShoppingBag,
  Sparkles,
  Camera,
  Ticket,
  Video,
  Map
} from 'lucide-react';
import { Language } from '../types';

interface ExperiencesPageProps {
  lang: Language;
  onBookExperience: (serviceId: string) => void;
}

const EXPERIENCES = {
  en: [
    {
      id: 'shopping',
      icon: ShoppingBag,
      name: 'Luxury Shopping Tour',
      tagline: 'Your Personal Gateway to Milan\'s Fashion Elite',
      duration: '4-6 hours',
      price: 'from €250',
      description: 'This isn\'t a tourist shopping trip. This is a carefully orchestrated journey through Milan\'s most exclusive fashion destinations, guided by someone who knows the city\'s hidden fashion secrets.',
      whatToExpect: [
        'Personal pickup from your hotel or preferred location',
        'Curated itinerary based on your style preferences and budget',
        'VIP access to flagship boutiques on Via Montenapoleone',
        'Private appointments at designer showrooms not open to the public',
        'Expert guidance on Italian craftsmanship and investment pieces',
        'Insider access to the private rooms above Galleria Vittorio Emanuele II',
        'Refreshments at Milan\'s most elegant cafés between stops'
      ],
      insiderNote: 'We don\'t just take you to the Galleria; we take you to the private rooms above the Galleria where the real fashion magic happens.',
      image: '/luxur1.jpg',
      locations: ['Via Montenapoleone', 'Galleria Vittorio Emanuele II', 'Brera District', 'Hidden Ateliers']
    },
    {
      id: 'wardrobe',
      icon: Sparkles,
      name: 'Wardrobe Transformation',
      tagline: 'Redefine Your Personal Style DNA',
      duration: '6-8 hours',
      price: 'from €400',
      description: 'A complete wardrobe overhaul that goes beyond organizing clothes. We\'ll analyze your lifestyle, body type, and aspirations to create a cohesive luxury wardrobe that tells your story.',
      whatToExpect: [
        'In-depth style consultation at your residence or hotel suite',
        'Complete closet audit with honest, expert feedback',
        'Color analysis and body type assessment',
        'Strategic shopping plan for investment pieces',
        'Personalized styling guide with outfit combinations',
        'Follow-up session to integrate new pieces',
        'Ongoing support for styling questions'
      ],
      insiderNote: 'True luxury isn\'t about owning more—it\'s about owning better. Every piece we select tells a story of Italian craftsmanship.',
      image: '/gulizar4.jpg',
      locations: ['Your Hotel/Residence', 'Selected Boutiques', 'Tailor Appointments']
    },
    {
      id: 'cityTour',
      icon: Map,
      name: 'Milan Cultural & Fashion Journey',
      tagline: 'Where History Meets Haute Couture',
      duration: 'Full Day (8 hours)',
      price: 'from €350',
      description: 'Experience Milan as only a local can show you. This immersive cultural tour combines the city\'s architectural masterpieces with its fashion heritage, all entrance fees included.',
      whatToExpect: [
        'The magnificent Duomo di Milano - exterior and rooftop access',
        'Castello Sforzesco and its Renaissance art collections',
        'The bohemian streets of Brera and Pinacoteca di Brera',
        'Navigli district\'s artistic canals and vintage boutiques',
        'La Scala opera house exterior and museum (when available)',
        'Parco Sempione and the triumphal Arco della Pace',
        'Galleria Vittorio Emanuele II with fashion history insights'
      ],
      insiderNote: 'All entrance fees for both you and your guide are included. No hidden costs, no surprises—just pure Milanese immersion.',
      image: '/galleria.jpg',
      locations: ['Duomo', 'Castello Sforzesco', 'Brera', 'Navigli', 'La Scala', 'Parco Sempione'],
      includes: ['All museum entrance fees', 'Guide entrance fees', 'All taxes', 'Local transportation guidance']
    },
    {
      id: 'vip',
      icon: Star,
      name: 'Milan Fashion Week Experience',
      tagline: 'Behind the Scenes of Global Fashion',
      duration: '3-7 days',
      price: 'Custom',
      description: 'An exclusive, once-in-a-lifetime experience during Milan Fashion Week. Gain access to shows, showrooms, and after-parties that are normally reserved for industry insiders.',
      whatToExpect: [
        'Curated schedule of runway shows (based on availability)',
        'Private showroom appointments with emerging designers',
        'Fashion industry networking opportunities',
        'Backstage glimpses and photographer introductions',
        'After-party access at exclusive venues',
        'Personal styling for each event',
        'Complete Fashion Week survival guide'
      ],
      insiderNote: 'Fashion Week is chaotic, overwhelming, and magical. Let me be your guide through the glamour and help you make connections that last.',
      image: '/luxur3.jpg',
      locations: ['Various MFW Venues', 'Showrooms', 'Exclusive Parties']
    },
    {
      id: 'virtual',
      icon: Video,
      name: 'Virtual Style Consultation',
      tagline: 'Expert Guidance, Wherever You Are',
      duration: '60-90 minutes',
      price: '€120',
      description: 'Can\'t make it to Milan? Bring Milan\'s fashion expertise to you. A comprehensive virtual consultation that delivers personalized style advice and shopping recommendations.',
      whatToExpect: [
        'Pre-session wardrobe questionnaire',
        'Live video consultation via your preferred platform',
        'Virtual closet review and recommendations',
        'Personalized shopping list with links to pieces',
        'Color and style guide customized for you',
        'Follow-up email with detailed notes',
        '2 weeks of email support for questions'
      ],
      insiderNote: 'Distance shouldn\'t stop you from elevating your style. I\'ll bring Milan\'s fashion wisdom directly to your screen.',
      image: '/gulizar2.jpg',
      locations: ['Online via Zoom/Google Meet']
    }
  ],
  tr: [
    {
      id: 'shopping',
      icon: ShoppingBag,
      name: 'Lüks Alışveriş Turu',
      tagline: 'Milano\'nun Moda Elitine Kişisel Kapınız',
      duration: '4-6 saat',
      price: '€250\'den başlayan',
      description: 'Bu turistik bir alışveriş gezisi değil. Bu, Milano\'nun en özel moda destinasyonları boyunca, şehrin gizli moda sırlarını bilen biri tarafından yönlendirilen, özenle düzenlenmiş bir yolculuktur.',
      whatToExpect: [
        'Otelinizden veya tercih ettiğiniz konumdan kişisel karşılama',
        'Stil tercihlerinize ve bütçenize göre küratörlüğünde güzergah',
        'Via Montenapoleone\'deki amiral butiklere VIP erişim',
        'Halka açık olmayan tasarımcı showroom\'larında özel randevular',
        'İtalyan işçiliği ve yatırım parçaları hakkında uzman rehberliği',
        'Galleria Vittorio Emanuele II\'nin üzerindeki özel odalara içeriden erişim',
        'Duraklar arasında Milano\'nun en zarif kafelerinde ikramlar'
      ],
      insiderNote: 'Sizi sadece Galleria\'ya götürmüyoruz; gerçek moda büyüsünün gerçekleştiği Galleria\'nın üzerindeki özel odalara götürüyoruz.',
      image: '/luxur1.jpg',
      locations: ['Via Montenapoleone', 'Galleria Vittorio Emanuele II', 'Brera Bölgesi', 'Gizli Atölyeler']
    },
    {
      id: 'wardrobe',
      icon: Sparkles,
      name: 'Gardırop Dönüşümü',
      tagline: 'Kişisel Stil DNA\'nızı Yeniden Tanımlayın',
      duration: '6-8 saat',
      price: '€400\'den başlayan',
      description: 'Kıyafetleri düzenlemenin ötesine geçen tam bir gardırop revizyonu. Hikayenizi anlatan tutarlı bir lüks gardırop oluşturmak için yaşam tarzınızı, vücut tipinizi ve hedeflerinizi analiz edeceğiz.',
      whatToExpect: [
        'İkametgahınızda veya otel süitinizde derinlemesine stil danışmanlığı',
        'Dürüst, uzman geri bildirimiyle tam dolap denetimi',
        'Renk analizi ve vücut tipi değerlendirmesi',
        'Yatırım parçaları için stratejik alışveriş planı',
        'Kombin önerileriyle kişiselleştirilmiş stil rehberi',
        'Yeni parçaları entegre etmek için takip seansı',
        'Stil soruları için sürekli destek'
      ],
      insiderNote: 'Gerçek lüks daha fazla sahip olmakla ilgili değil—daha iyi sahip olmakla ilgili. Seçtiğimiz her parça İtalyan işçiliğinin hikayesini anlatıyor.',
      image: '/gulizar4.jpg',
      locations: ['Oteliniz/İkametgahınız', 'Seçilmiş Butikler', 'Terzi Randevuları']
    },
    {
      id: 'cityTour',
      icon: Map,
      name: 'Milano Kültür & Moda Yolculuğu',
      tagline: 'Tarihin Haute Couture ile Buluştuğu Yer',
      duration: 'Tam Gün (8 saat)',
      price: '€350\'den başlayan',
      description: 'Milano\'yu sadece bir yerel olarak gösterebileceğimiz şekilde deneyimleyin. Bu sürükleyici kültür turu, şehrin mimari şaheserlerini moda mirasıyla birleştiriyor, tüm giriş ücretleri dahil.',
      whatToExpect: [
        'Muhteşem Duomo di Milano - dış ve çatı erişimi',
        'Castello Sforzesco ve Rönesans sanat koleksiyonları',
        'Brera\'nın bohem sokakları ve Pinacoteca di Brera',
        'Navigli bölgesinin sanatsal kanalları ve vintage butikleri',
        'La Scala opera binası dış cephesi ve müzesi (mümkün olduğunda)',
        'Parco Sempione ve zafer takı Arco della Pace',
        'Moda tarihi içgörüleriyle Galleria Vittorio Emanuele II'
      ],
      insiderNote: 'Hem sizin hem de rehberinizin tüm giriş ücretleri dahildir. Gizli maliyetler yok, sürprizler yok—sadece saf Milano deneyimi.',
      image: '/galleria.jpg',
      locations: ['Duomo', 'Castello Sforzesco', 'Brera', 'Navigli', 'La Scala', 'Parco Sempione'],
      includes: ['Tüm müze giriş ücretleri', 'Rehber giriş ücretleri', 'Tüm vergiler', 'Yerel ulaşım rehberliği']
    },
    {
      id: 'vip',
      icon: Star,
      name: 'Milano Moda Haftası Deneyimi',
      tagline: 'Küresel Modanın Perde Arkası',
      duration: '3-7 gün',
      price: 'Özel',
      description: 'Milano Moda Haftası sırasında özel, bir kez yaşanacak bir deneyim. Normalde sektör içindekilere ayrılan gösterilere, showroom\'lara ve partilere erişim kazanın.',
      whatToExpect: [
        'Küratörlüğünde podyum gösterileri programı (müsaitliğe bağlı)',
        'Yükselen tasarımcılarla özel showroom randevuları',
        'Moda sektörü ağ kurma fırsatları',
        'Sahne arkası görüntüleri ve fotoğrafçı tanışmaları',
        'Özel mekanlarda after-party erişimi',
        'Her etkinlik için kişisel stil danışmanlığı',
        'Tam Moda Haftası hayatta kalma rehberi'
      ],
      insiderNote: 'Moda Haftası kaotik, bunaltıcı ve büyülü. Gösteriş içinde size rehberlik edeyim ve kalıcı bağlantılar kurmanıza yardım edeyim.',
      image: '/luxur3.jpg',
      locations: ['Çeşitli MFW Mekanları', 'Showroom\'lar', 'Özel Partiler']
    },
    {
      id: 'virtual',
      icon: Video,
      name: 'Sanal Stil Danışmanlığı',
      tagline: 'Uzman Rehberliği, Nerede Olursanız Olun',
      duration: '60-90 dakika',
      price: '€120',
      description: 'Milano\'ya gelemez misiniz? Milano\'nun moda uzmanlığını size getirin. Kişiselleştirilmiş stil tavsiyeleri ve alışveriş önerileri sunan kapsamlı bir sanal danışmanlık.',
      whatToExpect: [
        'Seans öncesi gardırop anketi',
        'Tercih ettiğiniz platform üzerinden canlı video danışmanlığı',
        'Sanal dolap incelemesi ve öneriler',
        'Parçalara bağlantılarla kişiselleştirilmiş alışveriş listesi',
        'Sizin için özelleştirilmiş renk ve stil rehberi',
        'Detaylı notlarla takip e-postası',
        'Sorular için 2 hafta e-posta desteği'
      ],
      insiderNote: 'Mesafe stilinizi yükseltmenizi engellememeli. Milano\'nun moda bilgeliğini doğrudan ekranınıza getireceğim.',
      image: '/gulizar2.jpg',
      locations: ['Zoom/Google Meet üzerinden Çevrimiçi']
    }
  ],
  it: [
    {
      id: 'shopping',
      icon: ShoppingBag,
      name: 'Tour di Shopping di Lusso',
      tagline: 'Il Tuo Accesso Personale all\'Élite della Moda Milanese',
      duration: '4-6 ore',
      price: 'da €250',
      description: 'Questo non è un viaggio di shopping turistico. È un viaggio accuratamente orchestrato attraverso le destinazioni di moda più esclusive di Milano, guidato da qualcuno che conosce i segreti nascosti della moda della città.',
      whatToExpect: [
        'Prelievo personale dal tuo hotel o posizione preferita',
        'Itinerario curato in base alle tue preferenze di stile e budget',
        'Accesso VIP alle boutique flagship di Via Montenapoleone',
        'Appuntamenti privati in showroom di designer non aperti al pubblico',
        'Guida esperta sull\'artigianato italiano e i pezzi di investimento',
        'Accesso interno alle sale private sopra la Galleria Vittorio Emanuele II',
        'Rinfreschi nei caffè più eleganti di Milano tra le tappe'
      ],
      insiderNote: 'Non ti portiamo solo alla Galleria; ti portiamo nelle sale private sopra la Galleria dove avviene la vera magia della moda.',
      image: '/luxur1.jpg',
      locations: ['Via Montenapoleone', 'Galleria Vittorio Emanuele II', 'Quartiere Brera', 'Atelier Nascosti']
    },
    {
      id: 'wardrobe',
      icon: Sparkles,
      name: 'Trasformazione del Guardaroba',
      tagline: 'Ridefinisci il Tuo DNA di Stile Personale',
      duration: '6-8 ore',
      price: 'da €400',
      description: 'Una revisione completa del guardaroba che va oltre l\'organizzazione dei vestiti. Analizzeremo il tuo stile di vita, la tua corporatura e le tue aspirazioni per creare un guardaroba di lusso coeso che racconti la tua storia.',
      whatToExpect: [
        'Consulenza di stile approfondita presso la tua residenza o suite d\'hotel',
        'Audit completo dell\'armadio con feedback onesto ed esperto',
        'Analisi del colore e valutazione del tipo di corpo',
        'Piano di shopping strategico per pezzi di investimento',
        'Guida di stile personalizzata con combinazioni di outfit',
        'Sessione di follow-up per integrare i nuovi pezzi',
        'Supporto continuo per domande sullo styling'
      ],
      insiderNote: 'Il vero lusso non riguarda possedere di più—riguarda possedere meglio. Ogni pezzo che selezioniamo racconta una storia di artigianato italiano.',
      image: '/gulizar4.jpg',
      locations: ['Il Tuo Hotel/Residenza', 'Boutique Selezionate', 'Appuntamenti dal Sarto']
    },
    {
      id: 'cityTour',
      icon: Map,
      name: 'Viaggio Culturale & Moda Milano',
      tagline: 'Dove la Storia Incontra l\'Haute Couture',
      duration: 'Giornata Intera (8 ore)',
      price: 'da €350',
      description: 'Vivi Milano come solo un locale può mostrartela. Questo tour culturale immersivo combina i capolavori architettonici della città con il suo patrimonio della moda, tutti i biglietti d\'ingresso inclusi.',
      whatToExpect: [
        'Il magnifico Duomo di Milano - accesso esterno e terrazza',
        'Castello Sforzesco e le sue collezioni d\'arte rinascimentale',
        'Le strade bohémien di Brera e la Pinacoteca di Brera',
        'I canali artistici del quartiere Navigli e le boutique vintage',
        'Esterno del Teatro alla Scala e museo (quando disponibile)',
        'Parco Sempione e il trionfale Arco della Pace',
        'Galleria Vittorio Emanuele II con approfondimenti sulla storia della moda'
      ],
      insiderNote: 'Tutti i biglietti d\'ingresso per te e la tua guida sono inclusi. Nessun costo nascosto, nessuna sorpresa—solo pura immersione milanese.',
      image: '/galleria.jpg',
      locations: ['Duomo', 'Castello Sforzesco', 'Brera', 'Navigli', 'La Scala', 'Parco Sempione'],
      includes: ['Tutti i biglietti d\'ingresso ai musei', 'Biglietti d\'ingresso della guida', 'Tutte le tasse', 'Guida ai trasporti locali']
    },
    {
      id: 'vip',
      icon: Star,
      name: 'Esperienza Milan Fashion Week',
      tagline: 'Dietro le Quinte della Moda Globale',
      duration: '3-7 giorni',
      price: 'Personalizzato',
      description: 'Un\'esperienza esclusiva e unica nella vita durante la Milan Fashion Week. Ottieni accesso a sfilate, showroom e after-party normalmente riservati agli addetti ai lavori.',
      whatToExpect: [
        'Programma curato di sfilate (in base alla disponibilità)',
        'Appuntamenti privati in showroom con designer emergenti',
        'Opportunità di networking nell\'industria della moda',
        'Scorci del backstage e presentazioni ai fotografi',
        'Accesso agli after-party in location esclusive',
        'Styling personale per ogni evento',
        'Guida completa alla sopravvivenza della Fashion Week'
      ],
      insiderNote: 'La Fashion Week è caotica, travolgente e magica. Lascia che ti guidi attraverso il glamour e ti aiuti a creare connessioni che durano.',
      image: '/luxur3.jpg',
      locations: ['Varie Location MFW', 'Showroom', 'Feste Esclusive']
    },
    {
      id: 'virtual',
      icon: Video,
      name: 'Consulenza di Stile Virtuale',
      tagline: 'Guida Esperta, Ovunque Tu Sia',
      duration: '60-90 minuti',
      price: '€120',
      description: 'Non puoi venire a Milano? Porta l\'esperienza di moda milanese da te. Una consulenza virtuale completa che offre consigli di stile personalizzati e raccomandazioni per gli acquisti.',
      whatToExpect: [
        'Questionario pre-sessione sul guardaroba',
        'Consulenza video live tramite la tua piattaforma preferita',
        'Revisione virtuale dell\'armadio e raccomandazioni',
        'Lista della spesa personalizzata con link ai pezzi',
        'Guida ai colori e allo stile personalizzata per te',
        'Email di follow-up con note dettagliate',
        '2 settimane di supporto via email per domande'
      ],
      insiderNote: 'La distanza non dovrebbe impedirti di elevare il tuo stile. Porterò la saggezza della moda milanese direttamente sul tuo schermo.',
      image: '/gulizar2.jpg',
      locations: ['Online tramite Zoom/Google Meet']
    }
  ]
};

export const ExperiencesPage: React.FC<ExperiencesPageProps> = ({ lang, onBookExperience }) => {
  const experiences = EXPERIENCES[lang];
  const t = {
    en: {
      title: 'Curated Experiences',
      subtitle: 'YOUR JOURNEY',
      intro: 'Each experience is designed to immerse you in the world of Italian luxury. These aren\'t tours—they\'re transformative journeys.',
      whatToExpect: 'What to Expect',
      insiderNote: 'Insider Note',
      bookNow: 'Book This Experience',
      duration: 'Duration',
      locations: 'Locations',
      includes: 'Includes'
    },
    tr: {
      title: 'Küratörlü Deneyimler',
      subtitle: 'YOLCULUĞUNUZ',
      intro: 'Her deneyim sizi İtalyan lüks dünyasına daldırmak için tasarlanmıştır. Bunlar tur değil—dönüştürücü yolculuklardır.',
      whatToExpect: 'Ne Beklenmeli',
      insiderNote: 'İçeriden Not',
      bookNow: 'Bu Deneyimi Rezerve Et',
      duration: 'Süre',
      locations: 'Konumlar',
      includes: 'Dahil Olanlar'
    },
    it: {
      title: 'Esperienze Curate',
      subtitle: 'IL TUO VIAGGIO',
      intro: 'Ogni esperienza è progettata per immergerti nel mondo del lusso italiano. Questi non sono tour—sono viaggi trasformativi.',
      whatToExpect: 'Cosa Aspettarsi',
      insiderNote: 'Nota dall\'Interno',
      bookNow: 'Prenota Questa Esperienza',
      duration: 'Durata',
      locations: 'Località',
      includes: 'Include'
    }
  }[lang];

  return (
    <div className="pt-32 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="label-micro block mb-4 text-[#C4A484]"
        >
          {t.subtitle}
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="heading-display mb-6"
        >
          {t.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="body-elegant max-w-2xl mx-auto"
        >
          {t.intro}
        </motion.p>
      </div>

      {/* Experiences */}
      <div className="max-w-7xl mx-auto px-6 space-y-32">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
          >
            {/* Image */}
            <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={exp.image} 
                  alt={exp.name}
                  loading="lazy"
                  className="w-full h-full object-cover img-editorial hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Price Badge */}
              <div className="absolute top-6 right-6 bg-[#1a1a1a] text-[#FAF8F5] px-5 py-3 rounded-full">
                <span className="text-sm font-serif italic">{exp.price}</span>
              </div>
              {/* Duration Badge */}
              <div className="absolute bottom-6 left-6 glass-warm px-4 py-2 rounded-full flex items-center gap-2">
                <Clock size={14} className="text-[#C4A484]" />
                <span className="text-xs font-mono uppercase tracking-wider">{exp.duration}</span>
              </div>
            </div>

            {/* Content */}
            <div className={`space-y-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#C4A484]/10 flex items-center justify-center">
                    <exp.icon size={22} className="text-[#C4A484]" />
                  </div>
                  <span className="label-micro text-[#C4A484]">{t.duration}: {exp.duration}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif italic text-[#1a1a1a] mb-3">
                  {exp.name}
                </h2>
                <p className="text-lg font-serif italic text-[#7a746c]">
                  {exp.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="body-elegant text-base leading-relaxed">
                {exp.description}
              </p>

              {/* What to Expect */}
              <div>
                <h3 className="label-small text-[#1a1a1a] mb-4">{t.whatToExpect}</h3>
                <ul className="space-y-3">
                  {exp.whatToExpect.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={16} className="text-[#C4A484] flex-shrink-0 mt-1" />
                      <span className="text-sm text-[#4a4542]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Includes (for city tour) */}
              {exp.includes && (
                <div className="bg-[#F5F0EA] p-5 rounded-xl">
                  <h4 className="label-small text-[#C4A484] mb-3">{t.includes}</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.includes.map((item, i) => (
                      <span key={i} className="bg-white px-3 py-1.5 rounded-full text-xs text-[#4a4542]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Insider Note */}
              <div className="border-l-2 border-[#C4A484] pl-5 py-2">
                <span className="label-micro text-[#C4A484] block mb-2">{t.insiderNote}</span>
                <p className="text-[#1a1a1a] italic text-sm leading-relaxed">
                  "{exp.insiderNote}"
                </p>
              </div>

              {/* Locations */}
              <div className="flex items-center gap-2 flex-wrap">
                <MapPin size={14} className="text-[#7a746c]" />
                {exp.locations.map((loc, i) => (
                  <span key={i} className="text-xs text-[#7a746c]">
                    {loc}{i < exp.locations.length - 1 && ' •'}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button 
                onClick={() => onBookExperience(exp.id)}
                className="bg-[#1a1a1a] text-[#FAF8F5] px-8 py-4 text-[11px] font-mono uppercase tracking-[0.2em] rounded-full hover:bg-[#C4A484] transition-all duration-500 flex items-center gap-3"
              >
                {t.bookNow}
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

