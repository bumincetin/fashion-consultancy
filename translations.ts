
import { Language } from './types';

export const TRANSLATIONS: Record<Language, any> = {
  en: {
    nav: { 
      aperitivo: 'Aperitivo', 
      stores: 'Store Guide', 
      guide: 'Fashion Guide', 
      book: 'Book Experience' 
    },
    hero: { 
      subtitle: 'Fashion Designer & Style Consultant',
      title1: 'Discover',
      title2: 'Milanese',
      title3: 'Elegance',
      desc: "A fresh perspective on Milan's fashion scene, blending sustainable style with Italian elegance. From hidden boutiques to eco-conscious ateliers, discover fashion that tells a story.",
      cta1: 'Begin Your Journey',
      cta2: 'Book Consultation',
      trustedBy: 'Studying at',
      satisfiedClients: 'Università Cattolica'
    },
    services: {
      label: 'What We Offer',
      title: 'Sustainable Style Experiences',
      desc: 'From personal shopping to sustainable wardrobe transformation, each service combines Italian elegance with eco-conscious fashion choices.',
      premium: 'Signature Experience',
      shoppingTours: 'Sustainable Shopping Tours',
      shoppingToursDesc: "Discover Milan's best sustainable boutiques and eco-conscious designers. From vintage treasures to upcycled fashion, find pieces that are kind to both you and the planet.",
      learnMore: 'Learn More',
      wardrobeCuration: 'Eco Wardrobe Curation',
      wardrobeCurationDesc: 'Transform your closet with sustainable pieces and learn how to upcycle existing items into fresh, stylish looks.',
      styleIntelligence: 'Style Intelligence',
      styleIntelligenceDesc: 'AI-powered recommendations blending your preferences with sustainable Italian trends and timeless elegance.'
    },
    districts: {
      label: 'Explore Milan',
      title: 'Fashion Districts',
      desc: 'Each neighborhood tells a different story. From the grandeur of Galleria Vittorio Emanuele to the artistic soul of Brera.',
      galleria: {
        name: 'Galleria Vittorio Emanuele II',
        description: "Italy's oldest shopping gallery, home to Prada's original boutique and timeless luxury.",
        stores: '45+ Boutiques'
      },
      brera: {
        name: 'Brera District',
        description: 'The artistic heart of Milan. Independent designers, vintage finds, and bohemian elegance.',
        stores: '80+ Ateliers'
      },
      montenapoleone: {
        name: 'Via Montenapoleone',
        description: "The pinnacle of luxury fashion. Where the world's most prestigious brands call home.",
        stores: '120+ Brands'
      }
    },
    testimonial: {
      label: 'Client Stories',
      quote: '"Gülizar showed me how sustainable fashion can be incredibly stylish. Her knowledge of Milan\'s hidden gems and eco-conscious boutiques is amazing."',
      author: 'Elena Rossi',
      role: 'Marketing Manager, Milano'
    },
    about: {
      label: 'Your Guide',
      bio1: "Originally from Denizli, Turkey, I trained at the Gerzele Hand Skills and Course Center where I discovered my passion for transforming materials into beautiful fashion pieces.",
      bio2: "Now based in Milan and studying fashion at the prestigious Università Cattolica del Sacro Cuore, I'm dedicated to sustainable fashion and the art of upcycling. I believe that the most beautiful garments are those that tell a story and respect our planet.",
      bio3: "Whether you're seeking a complete wardrobe transformation using sustainable principles, or want to discover Milan's best eco-conscious boutiques, I'm here to guide you with fresh perspective and genuine passion for ethical fashion.",
      stat1Label: 'Focus Area',
      stat1Value: 'Sustainable',
      stat2Label: 'Based in',
      stat2Value: 'Milano',
      stat3Label: 'Boutiques Discovered',
      stat3Value: '50+'
    },
    storesPage: {
      label: 'Curated Selection',
      title: 'Favorite Boutiques',
      desc: "A carefully curated collection of Milan's finest establishments, featuring both luxury brands and sustainable fashion pioneers."
    },
    guidePage: {
      label: 'Personal Style Guide',
      budgetLabel: 'Budget Range',
      identityLabel: 'Identity',
      budgetAccessible: 'Accessible',
      budgetMidRange: 'Mid-Range',
      budgetLuxury: 'Luxury',
      genderFemale: 'Female',
      genderMale: 'Male',
      genderNonBinary: 'Non-binary',
      generateBtn: 'Generate Your Guide',
      yourJourney: 'Your Journey',
      recommendedDest: 'Recommended Destinations',
      styleNotes: 'Style Notes',
      startOver: 'Start Over'
    },
    ai: { 
      title: 'AI Fashion Concierge', 
      desc: 'Let me curate your perfect Milanese shopping itinerary using AI intelligence and my knowledge of sustainable fashion.', 
      step1: 'Tell Me Your Style', 
      vibe: "What's your vibe?", 
      budget: 'Budget Range', 
      identity: 'Your Identity', 
      occasion: 'The Occasion', 
      next: 'Next Step', 
      loading: 'Crafting Your Milanese Moment', 
      generating: 'Consulting with Muse...', 
      resultTitle: 'Your Milan Style Blueprint', 
      path: 'Recommended Path', 
      boutiques: 'Must-Visit Boutiques', 
      looks: 'Look Inspirations', 
      reset: 'Create Another Guide' 
    },
    footer: { 
      desc: "Fashion designer and style consultant based in Milan, specializing in sustainable fashion and helping clients discover the city's best eco-conscious boutiques.",
      contact: 'Contact', 
      location: 'Location',
      remote: 'Remote',
      follow: 'Follow',
      reserved: '© 2024 Gülizar Ermiş. All rights reserved.',
      crafted: 'Crafted with passion in Milano'
    },
    booking: {
      title: 'Book Your Experience',
      desc: 'Begin your journey into sustainable Italian elegance',
      selectService: 'Select Service',
      yourDetails: 'Your Details',
      yourName: 'Your Name',
      emailAddress: 'Email Address',
      confirm: 'Request Appointment',
      loading: 'Preparing your confirmation...',
      success: 'Grazie Mille',
      successDesc: "We'll be in touch within 24 hours to confirm your booking.",
      close: 'Close',
      services: {
        shopping: {
          name: 'Sustainable Shopping Tour',
          desc: "Curated journey through Milan's best sustainable boutiques and vintage stores with expert guidance."
        },
        wardrobe: {
          name: 'Eco Wardrobe Transformation',
          desc: 'Complete closet audit with focus on sustainable styling and upcycling possibilities.'
        },
        vip: {
          name: 'Milan Fashion Week Experience',
          desc: 'Explore sustainable fashion during MFW, including eco-conscious shows and designer meetings.'
        },
        virtual: {
          name: 'Virtual Consultation',
          desc: 'Expert sustainable style advice and personalized recommendations from anywhere in the world.'
        }
      }
    },
    chat: {
      title: 'Style Advisor',
      placeholder: 'Ask about Milanese fashion...',
      thinking: 'Thinking...',
      greeting: 'Buongiorno!',
      greetingDesc: 'Ask me anything about fashion in Milano',
      errorMsg: 'Mi scusi, please try again...'
    }
  },
  tr: {
    nav: { 
      aperitivo: 'Aperitivo', 
      stores: 'Mağaza Rehberi', 
      guide: 'Moda Rehberi', 
      book: 'Randevu Al' 
    },
    hero: { 
      subtitle: 'Moda Tasarımcısı & Stil Danışmanı',
      title1: 'Milano\'nun',
      title2: 'Zarafetini',
      title3: 'Keşfet',
      desc: "Milano moda sahnesine sürdürülebilir tarz ve İtalyan zarafetiyle taze bir bakış açısı. Gizli butiklerden çevre dostu atölyelere, hikaye anlatan modayı keşfedin.",
      cta1: 'Yolculuğuna Başla',
      cta2: 'Danışmanlık Al',
      trustedBy: 'Öğrenim',
      satisfiedClients: 'Università Cattolica'
    },
    services: {
      label: 'Hizmetlerimiz',
      title: 'Sürdürülebilir Stil Deneyimleri',
      desc: 'Kişisel alışverişten sürdürülebilir gardırop dönüşümüne, her hizmet İtalyan zarafetini çevre dostu moda seçimleriyle birleştirir.',
      premium: 'Özel Deneyim',
      shoppingTours: 'Sürdürülebilir Alışveriş Turları',
      shoppingToursDesc: "Milano'nun en iyi sürdürülebilir butiklerini ve çevre dostu tasarımcılarını keşfedin. Vintage hazinelerden geri dönüştürülmüş modaya, hem size hem de gezegene dost parçalar bulun.",
      learnMore: 'Daha Fazla',
      wardrobeCuration: 'Eko Gardırop Küratörlüğü',
      wardrobeCurationDesc: 'Dolabınızı sürdürülebilir parçalarla dönüştürün ve mevcut eşyalarınızı nasıl yeni, şık görünümlere çevirebileceğinizi öğrenin.',
      styleIntelligence: 'Stil Zekası',
      styleIntelligenceDesc: 'Tercihlerinizi sürdürülebilir İtalyan trendleri ve zamansız zarafetle harmanlayan yapay zeka destekli öneriler.'
    },
    districts: {
      label: "Milano'yu Keşfet",
      title: 'Moda Bölgeleri',
      desc: 'Her mahalle farklı bir hikaye anlatır. Galleria Vittorio Emanuele\'nin ihtişamından Brera\'nın sanatsal ruhuna.',
      galleria: {
        name: 'Galleria Vittorio Emanuele II',
        description: "İtalya'nın en eski alışveriş galerisi, Prada'nın orijinal butiği ve zamansız lüksün evi.",
        stores: '45+ Butik'
      },
      brera: {
        name: 'Brera Bölgesi',
        description: "Milano'nun sanatsal kalbi. Bağımsız tasarımcılar, vintage buluntular ve bohem zarafet.",
        stores: '80+ Atölye'
      },
      montenapoleone: {
        name: 'Via Montenapoleone',
        description: "Lüks modanın zirvesi. Dünyanın en prestijli markalarının evi.",
        stores: '120+ Marka'
      }
    },
    testimonial: {
      label: 'Müşteri Hikayeleri',
      quote: '"Gülizar bana sürdürülebilir modanın ne kadar şık olabileceğini gösterdi. Milano\'nun gizli hazineleri ve çevre dostu butikleri hakkındaki bilgisi harika."',
      author: 'Elena Rossi',
      role: 'Pazarlama Müdürü, Milano'
    },
    about: {
      label: 'Rehberiniz',
      bio1: "Denizli, Türkiye doğumluyum. Malzemeleri güzel moda parçalarına dönüştürme tutkumu keşfettiğim Gerzele El Becerileri ve Kurs Merkezi'nde eğitim aldım.",
      bio2: "Şu an Milano'da yaşıyor ve prestijli Università Cattolica del Sacro Cuore'da moda okuyorum. Sürdürülebilir moda ve geri dönüşüm sanatına kendimi adadım. En güzel kıyafetlerin bir hikaye anlatan ve gezegenimize saygı duyanlar olduğuna inanıyorum.",
      bio3: "İster sürdürülebilir ilkelerle tam bir gardırop dönüşümü arıyor olun, ister Milano'nun en iyi çevre dostu butiklerini keşfetmek isteyin, etik moda tutkum ve taze bakış açımla size rehberlik etmek için buradayım.",
      stat1Label: 'Odak Alanı',
      stat1Value: 'Sürdürülebilir',
      stat2Label: 'Lokasyon',
      stat2Value: 'Milano',
      stat3Label: 'Keşfedilen Butik',
      stat3Value: '50+'
    },
    storesPage: {
      label: 'Küratörlü Seçim',
      title: 'Favori Butikler',
      desc: "Milano'nun en iyi kuruluşlarından özenle seçilmiş bir koleksiyon, hem lüks markalar hem de sürdürülebilir moda öncüleri."
    },
    guidePage: {
      label: 'Kişisel Stil Rehberi',
      budgetLabel: 'Bütçe Aralığı',
      identityLabel: 'Kimlik',
      budgetAccessible: 'Uygun Fiyatlı',
      budgetMidRange: 'Orta Segment',
      budgetLuxury: 'Lüks',
      genderFemale: 'Kadın',
      genderMale: 'Erkek',
      genderNonBinary: 'Non-binary',
      generateBtn: 'Rehberini Oluştur',
      yourJourney: 'Yolculuğunuz',
      recommendedDest: 'Önerilen Destinasyonlar',
      styleNotes: 'Stil Notları',
      startOver: 'Baştan Başla'
    },
    ai: { 
      title: 'AI Moda Danışmanı', 
      desc: 'Yapay zeka ve sürdürülebilir moda bilgimle size mükemmel Milano alışveriş rotasını oluşturayım.', 
      step1: 'Tarzını Anlat', 
      vibe: 'Tarzın nasıl?', 
      budget: 'Bütçe Aralığı', 
      identity: 'Kimliğiniz', 
      occasion: 'Etkinlik/Durum', 
      next: 'Sonraki Adım', 
      loading: 'Milano Anınızı Tasarlıyoruz', 
      generating: "Muse'a Danışılıyor...", 
      resultTitle: 'Milano Stil Planınız', 
      path: 'Önerilen Rota', 
      boutiques: 'Mutlaka Gidilecek Butikler', 
      looks: 'Görünüm İlhamları', 
      reset: 'Yeni Rehber Oluştur' 
    },
    footer: { 
      desc: "Milano merkezli moda tasarımcısı ve stil danışmanı, sürdürülebilir moda konusunda uzmanlaşmış ve müşterilerin şehrin en iyi çevre dostu butiklerini keşfetmelerine yardımcı oluyor.",
      contact: 'İletişim', 
      location: 'Konum',
      remote: 'Uzaktan',
      follow: 'Takip Et',
      reserved: '© 2024 Gülizar Ermiş. Tüm hakları saklıdır.',
      crafted: "Milano'da tutkuyla tasarlandı"
    },
    booking: {
      title: 'Randevu Al',
      desc: 'Sürdürülebilir İtalyan zarafetine yolculuğunuza başlayın',
      selectService: 'Hizmet Seçin',
      yourDetails: 'Bilgileriniz',
      yourName: 'Adınız',
      emailAddress: 'E-posta Adresi',
      confirm: 'Randevu Talebi',
      loading: 'Onayınız hazırlanıyor...',
      success: 'Teşekkürler',
      successDesc: 'Randevunuzu onaylamak için 24 saat içinde sizinle iletişime geçeceğiz.',
      close: 'Kapat',
      services: {
        shopping: {
          name: 'Sürdürülebilir Alışveriş Turu',
          desc: "Milano'nun en iyi sürdürülebilir butikleri ve vintage mağazalarında uzman rehberliğiyle küratörlü yolculuk."
        },
        wardrobe: {
          name: 'Eko Gardırop Dönüşümü',
          desc: 'Sürdürülebilir stil ve geri dönüşüm olanaklarına odaklanan tam dolap denetimi.'
        },
        vip: {
          name: 'Milano Moda Haftası Deneyimi',
          desc: "MFW süresince çevre dostu defileler ve tasarımcı buluşmaları dahil sürdürülebilir modayı keşfedin."
        },
        virtual: {
          name: 'Sanal Danışmanlık',
          desc: 'Dünyanın her yerinden uzman sürdürülebilir stil tavsiyeleri ve kişiselleştirilmiş öneriler.'
        }
      }
    },
    chat: {
      title: 'Stil Danışmanı',
      placeholder: 'Milano modası hakkında sor...',
      thinking: 'Düşünüyorum...',
      greeting: 'Merhaba!',
      greetingDesc: "Milano'daki moda hakkında bana her şeyi sorabilirsiniz",
      errorMsg: 'Özür dilerim, lütfen tekrar deneyin...'
    }
  },
  it: {
    nav: { 
      aperitivo: 'Aperitivo', 
      stores: 'Guida Negozi', 
      guide: 'Guida Moda', 
      book: 'Prenota' 
    },
    hero: { 
      subtitle: 'Fashion Designer & Consulente di Stile',
      title1: 'Scopri',
      title2: "l'Eleganza",
      title3: 'Milanese',
      desc: "Una prospettiva fresca sulla scena della moda milanese, che fonde lo stile sostenibile con l'eleganza italiana. Dalle boutique nascoste agli atelier eco-consapevoli, scopri la moda che racconta una storia.",
      cta1: 'Inizia il Tuo Viaggio',
      cta2: 'Prenota Consulenza',
      trustedBy: 'Studentessa presso',
      satisfiedClients: 'Università Cattolica'
    },
    services: {
      label: 'Cosa Offriamo',
      title: 'Esperienze di Stile Sostenibile',
      desc: "Dallo shopping personale alla trasformazione sostenibile del guardaroba, ogni servizio combina l'eleganza italiana con scelte di moda eco-consapevoli.",
      premium: 'Esperienza Esclusiva',
      shoppingTours: 'Tour di Shopping Sostenibile',
      shoppingToursDesc: "Scopri le migliori boutique sostenibili di Milano e i designer eco-consapevoli. Dai tesori vintage alla moda riciclata, trova pezzi gentili sia con te che con il pianeta.",
      learnMore: 'Scopri di Più',
      wardrobeCuration: 'Curatela Eco del Guardaroba',
      wardrobeCurationDesc: "Trasforma il tuo armadio con pezzi sostenibili e impara a riciclare gli articoli esistenti in look freschi e stilosi.",
      styleIntelligence: 'Intelligenza di Stile',
      styleIntelligenceDesc: "Raccomandazioni basate su AI che fondono le tue preferenze con le tendenze italiane sostenibili e l'eleganza senza tempo."
    },
    districts: {
      label: 'Esplora Milano',
      title: 'Distretti della Moda',
      desc: "Ogni quartiere racconta una storia diversa. Dalla grandezza della Galleria Vittorio Emanuele all'anima artistica di Brera.",
      galleria: {
        name: 'Galleria Vittorio Emanuele II',
        description: "La più antica galleria commerciale d'Italia, sede della boutique originale di Prada e del lusso senza tempo.",
        stores: '45+ Boutique'
      },
      brera: {
        name: 'Quartiere Brera',
        description: 'Il cuore artistico di Milano. Designer indipendenti, reperti vintage ed eleganza bohémien.',
        stores: '80+ Atelier'
      },
      montenapoleone: {
        name: 'Via Montenapoleone',
        description: "L'apice della moda di lusso. Dove i marchi più prestigiosi del mondo chiamano casa.",
        stores: '120+ Marchi'
      }
    },
    testimonial: {
      label: 'Storie dei Clienti',
      quote: '"Gülizar mi ha mostrato come la moda sostenibile possa essere incredibilmente elegante. La sua conoscenza delle gemme nascoste di Milano e delle boutique eco-consapevoli è incredibile."',
      author: 'Elena Rossi',
      role: 'Marketing Manager, Milano'
    },
    about: {
      label: 'La Tua Guida',
      bio1: "Originaria di Denizli, Turchia, mi sono formata al Centro Gerzele per le Abilità Manuali dove ho scoperto la mia passione per trasformare i materiali in bellissimi pezzi di moda.",
      bio2: "Ora vivo a Milano e studio moda alla prestigiosa Università Cattolica del Sacro Cuore, sono dedicata alla moda sostenibile e all'arte del riciclo. Credo che i capi più belli siano quelli che raccontano una storia e rispettano il nostro pianeta.",
      bio3: "Che tu stia cercando una trasformazione completa del guardaroba usando principi sostenibili, o voglia scoprire le migliori boutique eco-consapevoli di Milano, sono qui per guidarti con una prospettiva fresca e una genuina passione per la moda etica.",
      stat1Label: 'Focus',
      stat1Value: 'Sostenibile',
      stat2Label: 'Base',
      stat2Value: 'Milano',
      stat3Label: 'Boutique Scoperte',
      stat3Value: '50+'
    },
    storesPage: {
      label: 'Selezione Curata',
      title: 'Boutique Preferite',
      desc: "Una collezione accuratamente curata dei migliori stabilimenti di Milano, con marchi di lusso e pionieri della moda sostenibile."
    },
    guidePage: {
      label: 'Guida di Stile Personale',
      budgetLabel: 'Fascia di Budget',
      identityLabel: 'Identità',
      budgetAccessible: 'Accessibile',
      budgetMidRange: 'Fascia Media',
      budgetLuxury: 'Lusso',
      genderFemale: 'Donna',
      genderMale: 'Uomo',
      genderNonBinary: 'Non-binary',
      generateBtn: 'Genera la Tua Guida',
      yourJourney: 'Il Tuo Viaggio',
      recommendedDest: 'Destinazioni Consigliate',
      styleNotes: 'Note di Stile',
      startOver: 'Ricomincia'
    },
    ai: { 
      title: 'Concierge di Moda AI', 
      desc: "Lascia che curi il tuo itinerario di shopping milanese perfetto usando l'intelligenza artificiale e la mia conoscenza della moda sostenibile.", 
      step1: 'Raccontami il tuo Stile', 
      vibe: 'Qual è il tuo stile?', 
      budget: 'Budget', 
      identity: 'La tua Identità', 
      occasion: "L'Occasione", 
      next: 'Passaggio Successivo', 
      loading: 'Creazione del tuo Momento Milanese', 
      generating: 'Consultando la Muse...', 
      resultTitle: 'Il tuo Progetto di Stile Milanese', 
      path: 'Percorso Consigliato', 
      boutiques: 'Boutique da Visitare', 
      looks: 'Ispirazioni Look', 
      reset: "Crea un'altra Guida" 
    },
    footer: { 
      desc: "Fashion designer e consulente di stile con sede a Milano, specializzata in moda sostenibile e nell'aiutare i clienti a scoprire le migliori boutique eco-consapevoli della città.",
      contact: 'Contatti', 
      location: 'Posizione',
      remote: 'Remoto',
      follow: 'Seguici',
      reserved: '© 2024 Gülizar Ermiş. Tutti i diritti riservati.',
      crafted: 'Creato con passione a Milano'
    },
    booking: {
      title: 'Prenota la Tua Esperienza',
      desc: "Inizia il tuo viaggio nell'eleganza italiana sostenibile",
      selectService: 'Seleziona Servizio',
      yourDetails: 'I Tuoi Dettagli',
      yourName: 'Il Tuo Nome',
      emailAddress: 'Indirizzo Email',
      confirm: 'Richiedi Appuntamento',
      loading: 'Preparando la conferma...',
      success: 'Grazie Mille',
      successDesc: 'Ti contatteremo entro 24 ore per confermare la prenotazione.',
      close: 'Chiudi',
      services: {
        shopping: {
          name: 'Tour di Shopping Sostenibile',
          desc: "Viaggio curato attraverso le migliori boutique sostenibili e negozi vintage di Milano con guida esperta."
        },
        wardrobe: {
          name: 'Trasformazione Eco del Guardaroba',
          desc: "Audit completo dell'armadio con focus su styling sostenibile e possibilità di riciclo."
        },
        vip: {
          name: 'Esperienza Milan Fashion Week',
          desc: 'Esplora la moda sostenibile durante MFW, incluse sfilate eco-consapevoli e incontri con designer.'
        },
        virtual: {
          name: 'Consulenza Virtuale',
          desc: 'Consigli esperti di stile sostenibile e raccomandazioni personalizzate da qualsiasi parte del mondo.'
        }
      }
    },
    chat: {
      title: 'Consulente di Stile',
      placeholder: 'Chiedi della moda milanese...',
      thinking: 'Consultando...',
      greeting: 'Buongiorno!',
      greetingDesc: 'Chiedimi qualsiasi cosa sulla moda a Milano',
      errorMsg: 'Mi scusi, per favore riprova...'
    }
  }
};
