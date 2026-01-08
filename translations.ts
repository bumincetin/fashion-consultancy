
import { Language } from './types';

export const TRANSLATIONS: Record<Language, any> = {
  en: {
    nav: { 
      aperitivo: 'Aperitivo', 
      experiences: 'Experiences',
      stores: 'Store Guide', 
      methodology: 'Methodology', 
      book: 'Book Experience' 
    },
    hero: { 
      subtitle: 'Fashion Designer & Luxury Style Consultant',
      title1: 'Discover',
      title2: 'Milanese',
      title3: 'Elegance',
      desc: "Experience Milan's legendary fashion scene through exclusive luxury tours. From the iconic Via Montenapoleone to hidden haute couture ateliers, discover the art of Italian elegance with a personal guide.",
      cta1: 'My Approach',
      cta2: 'Book Consultation',
      trustedBy: 'Studying at',
      satisfiedClients: 'Università Cattolica'
    },
    services: {
      label: 'What We Offer',
      title: 'Luxury Style Experiences',
      desc: 'From exclusive shopping tours to personal styling sessions, each service is designed to immerse you in the world of Italian haute couture and timeless elegance.',
      premium: 'Signature Experience',
      shoppingTours: 'Luxury Shopping Tours',
      shoppingToursDesc: "Explore Milan's most prestigious fashion destinations. From flagship boutiques on Via Montenapoleone to exclusive showrooms, discover pieces from the world's finest designers.",
      learnMore: 'Learn More',
      wardrobeCuration: 'Luxury Wardrobe Curation',
      wardrobeCurationDesc: 'Transform your wardrobe with carefully selected designer pieces that reflect Italian craftsmanship and timeless sophistication.',
      styleIntelligence: 'Personal Style Advisory',
      styleIntelligenceDesc: 'Expert guidance on building a luxury wardrobe, understanding Italian fashion houses, and making investment pieces that last a lifetime.'
    },
    districts: {
      label: 'Explore Milan',
      title: 'Fashion Districts',
      desc: 'Each neighborhood tells a different story. From the grandeur of Galleria Vittorio Emanuele to the artistic soul of Brera.',
      bookTour: 'Book a Tour',
      galleria: {
        name: 'Galleria Vittorio Emanuele II',
        description: "We don't just take you to the Galleria—we take you to the private rooms above the Galleria where the real fashion magic happens. Exclusive access to spaces tourists never see.",
        stores: '45+ Boutiques',
        brands: 'Prada, Louis Vuitton, Gucci, Versace, Armani, Tod\'s, Massimo Dutti, Swarovski',
        history: 'Built between 1865-1877 by architect Giuseppe Mengoni, this stunning iron and glass arcade was one of the first shopping malls in the world. Named after the first king of unified Italy, it connects Piazza del Duomo to La Scala opera house.',
        philosophy: 'Where heritage meets haute couture. The Galleria represents the timeless Italian philosophy of "bella figura" – looking impeccable is not vanity, but a form of respect.',
        vibe: 'Insider Access'
      },
      brera: {
        name: 'Brera District',
        description: 'Skip the tourist shops. I\'ll take you to the secret courtyard ateliers where Milan\'s emerging designers create pieces you\'ll never find online. True insider knowledge.',
        stores: '80+ Ateliers',
        brands: 'Cavalli e Nastri, Biffi Boutique, Wait and See, Antonia, 10 Corso Como, Vintage Delirium, independent artisan workshops',
        history: 'Once home to artists and intellectuals since the 18th century, Brera grew around the famous Pinacoteca di Brera art gallery. The neighborhood retains its artistic soul with narrow cobblestone streets lined with art studios and independent boutiques.',
        philosophy: 'Fashion as art, style as self-expression. Brera celebrates individuality over trends, craftsmanship over mass production. Here, every piece tells a story.',
        vibe: 'Hidden Gems'
      },
      montenapoleone: {
        name: 'Via Montenapoleone',
        description: "Anyone can walk Monte Napoleone. But can you get a private appointment in the VIP salon? I\'ll arrange exclusive access that transforms shopping into an experience.",
        stores: '120+ Brands',
        brands: 'Bulgari, Cartier, Dolce & Gabbana, Fendi, Hermès, Valentino, Bottega Veneta, Balenciaga, Saint Laurent, Celine, Dior, Chanel',
        history: 'Named after Napoleon Bonaparte who ordered its construction in 1804, Via Montenapoleone transformed from a street of banks to the world\'s most exclusive fashion destination in the 1950s when Italian fashion houses began opening their flagship stores.',
        philosophy: 'The Quadrilatero della Moda embodies Italian excellence – where master craftsmanship meets cutting-edge design. Every detail is perfection, every piece an investment.',
        vibe: 'VIP Access'
      },
      serravalle: {
        name: 'Serravalle Designer Outlet',
        description: "Europe's largest designer outlet. Luxury brands at exceptional prices, just an hour from Milan.",
        stores: '300+ Stores',
        brands: 'Gucci, Prada, Armani, Versace, Burberry, Michael Kors, Coach, Dolce & Gabbana, Valentino, Salvatore Ferragamo, Tod\'s, Bottega Veneta',
        history: 'Opened in 2000, Serravalle Designer Outlet quickly became Europe\'s largest outlet village. Nestled in the Piedmont hills near Alessandria, it attracts over 6 million visitors annually seeking luxury brands at reduced prices.',
        philosophy: 'Luxury accessible to all. Serravalle proves that exceptional style doesn\'t require exceptional budgets. Here, dreams of owning Italian designer pieces become reality.',
        vibe: 'Outlet Luxury & Deals'
      }
    },
    testimonial: {
      label: 'Client Stories',
      testimonials: [
        {
          quote: '"Gulizar transformed my Milan shopping experience into something truly magical. Her knowledge of the luxury fashion scene and VIP access to exclusive boutiques was incredible."',
          author: 'Elena Rossi',
          role: 'Marketing Manager, Milano'
        },
        {
          quote: '"Working with Gulizar was like having a personal fashion curator. She understood my style immediately and introduced me to pieces I never would have found on my own. The attention to detail is unmatched."',
          author: 'Sophia Chen',
          role: 'Fashion Entrepreneur, London'
        },
        {
          quote: '"As someone new to Milan, Gulizar\'s expertise was invaluable. She took me to the most exclusive ateliers and helped me build a wardrobe that perfectly reflects my personality. Worth every euro!"',
          author: 'Muhammed El Sahli',
          role: 'Investor, Dubai'
        },
        {
          quote: '"The luxury shopping tour exceeded all expectations. Gulizar\'s connections in the fashion world opened doors I didn\'t even know existed. A truly bespoke experience."',
          author: 'Charlotte Dubois',
          role: 'Art Collector, Paris'
        },
        {
          quote: '"Gulizar doesn\'t just help you shop—she teaches you about Italian craftsmanship, the history of fashion houses, and how to invest in pieces that last. An education in luxury."',
          author: 'Amara Singh',
          role: 'Tech Executive, San Francisco'
        }
      ]
    },
    about: {
      label: 'Your Guide',
      bio1: "Originally from Denizli, Turkey, I trained at the Gerzele Hand Skills and Course Center where I discovered my passion for fashion craftsmanship and the art of creating beautiful pieces.",
      bio2: "Now based in Milan and studying fashion at the prestigious Università Cattolica del Sacro Cuore, I've immersed myself in the world of Italian luxury fashion. From understanding the heritage of iconic fashion houses to discovering emerging designers, I've developed deep connections within Milan's fashion scene.",
      bio3: "Whether you're seeking a VIP shopping experience at the Quadrilatero della Moda, exclusive access to designer showrooms, or guidance in building a luxury wardrobe, I'm here to make your Milan fashion dreams come true.",
      stat1Label: 'Focus Area',
      stat1Value: 'Luxury',
      stat2Label: 'Based in',
      stat2Value: 'Milano',
      stat3Label: 'Boutiques Discovered',
      stat3Value: '50+'
    },
    storesPage: {
      label: 'Curated Selection',
      title: 'Favorite Boutiques',
      desc: "A carefully curated collection of Milan's finest luxury establishments, from iconic fashion houses to exclusive designer ateliers."
    },
    methodology: {
      label: 'The 3-Step Style DNA Method',
      title: 'My Proprietary Approach',
      intro: 'I\'ve developed a unique methodology that goes beyond simple shopping. The 3-Step Style DNA Method™ is designed to transform not just your wardrobe, but your entire relationship with fashion.',
      steps: [
        {
          title: 'Discovery — The Psychology',
          description: 'We dive deep into who you are. Your lifestyle, aspirations, body language, and the image you want to project. This isn\'t just about clothes—it\'s about understanding your Style DNA.'
        },
        {
          title: 'Curation — The Architecture',
          description: 'Using insights from Discovery, I architect your perfect wardrobe blueprint. Each piece is strategically selected to build upon the others, creating a foundation of investment pieces that work in harmony.'
        },
        {
          title: 'Integration — The Wardrobe',
          description: 'The final transformation. We bring your Style DNA to life through carefully orchestrated shopping experiences, ensuring every new piece integrates seamlessly into your existing wardrobe and lifestyle.'
        }
      ],
      philosophyLabel: 'My Philosophy',
      philosophy: 'True luxury is not about logos – it\'s about quality, craftsmanship, and pieces that make you feel extraordinary.',
      philosophyDesc: 'I believe that the most beautiful wardrobe is one built with intention. Every piece should be an investment in yourself, crafted by master artisans and designed to last generations. My mission is to connect you with the finest Italian fashion has to offer.',
      specialLabel: 'What Makes It Special',
      specialTitle: 'The Gulizar Difference',
      specialDesc: 'My approach combines three essential elements that set this experience apart from traditional shopping.',
      specialFeatures: [
        {
          title: 'Personal Connection',
          description: 'This isn\'t a transaction – it\'s a relationship. I take the time to truly understand you, your life, and your style goals before making any recommendations.'
        },
        {
          title: 'Luxury Expertise',
          description: 'With deep knowledge of Italian fashion houses, designer heritage, and luxury craftsmanship, I help you make informed decisions on investment pieces.'
        },
        {
          title: 'Exclusive Access',
          description: 'Living and studying in Milan gives me access to VIP appointments, private showrooms, and insider knowledge that transforms a shopping trip into an unforgettable experience.'
        }
      ],
      processLabel: 'Your Journey',
      processTitle: 'A Typical Experience',
      process: [
        {
          time: 'Before We Meet',
          title: 'Initial Consultation',
          description: 'A video call or in-person meeting where we discuss your style goals, lifestyle needs, and luxury fashion preferences.'
        },
        {
          time: 'Day of Experience',
          title: 'Curated Luxury Tour',
          description: 'A personalized journey through Milan\'s most prestigious boutiques and designer showrooms, with VIP access and exclusive appointments.'
        },
        {
          time: 'Throughout the Day',
          title: 'Style Guidance',
          description: 'Expert advice on fit, styling, and how each designer piece integrates with your existing wardrobe. No pressure, just thoughtful guidance.'
        },
        {
          time: 'After Our Day',
          title: 'Continued Support',
          description: 'Follow-up styling tips, outfit combinations, and ongoing advice to help you make the most of your luxury investments.'
        }
      ],
      ctaTitle: 'Ready to Experience Luxury?',
      ctaDesc: 'Let\'s create a fashion experience that\'s as exclusive as you are. Book your consultation and discover the world of Italian luxury fashion.',
      ctaButton: 'Book Your Experience'
    },
    footer: { 
      desc: "Fashion designer and luxury style consultant based in Milan, specializing in exclusive shopping tours and helping clients discover the city's finest designer boutiques.",
      contact: 'Contact', 
      location: 'Location',
      remote: 'Remote',
      follow: 'Follow',
      reserved: '© 2024 Vestiliza. All rights reserved.',
      crafted: 'Crafted with passion in Milano'
    },
    booking: {
      title: 'Book Your Experience',
      desc: 'Begin your journey into Italian luxury fashion',
      selectService: 'Select Service',
      yourDetails: 'Your Details',
      yourName: 'Your Name',
      emailAddress: 'Email Address',
      selectDate: 'Select Date',
      selectTime: 'Select Time',
      checkingAvailability: 'Checking availability...',
      notAvailable: 'This time slot is not available. Please select another time.',
      confirm: 'Request Appointment',
      loading: 'Sending your booking request...',
      success: 'Grazie Mille',
      successDesc: "Your booking request has been sent! Gülizar has received your request and you'll receive a confirmation email shortly. She will respond within 24 hours.",
      close: 'Close',
      services: {
        shopping: {
          name: 'Luxury Shopping Tour',
          desc: "Curated journey through Milan's most prestigious boutiques with VIP access and personal styling."
        },
        wardrobe: {
          name: 'Wardrobe Transformation',
          desc: 'Complete closet audit and luxury styling session to elevate your personal style.'
        },
        cityTour: {
          name: 'Milan Cultural & Fashion Journey',
          desc: 'Full-day tour of Duomo, Castello Sforzesco, Brera, Navigli, La Scala & more. All entrances included.'
        },
        vip: {
          name: 'Milan Fashion Week Experience',
          desc: 'Exclusive access to shows, showrooms, and designer meetings during MFW.'
        },
        virtual: {
          name: 'Virtual Consultation',
          desc: 'Expert luxury style advice and personalized recommendations from anywhere in the world.'
        }
      }
    }
  },
  tr: {
    nav: { 
      aperitivo: 'Aperitivo', 
      experiences: 'Deneyimler',
      stores: 'Mağaza Rehberi', 
      methodology: 'Metodoloji', 
      book: 'Randevu Al' 
    },
    hero: { 
      subtitle: 'Moda Tasarımcısı & Lüks Stil Danışmanı',
      title1: 'Milano',
      title2: 'Zarafetini',
      title3: 'Keşfet',
      desc: "Milano'nun efsanevi moda sahnesini özel lüks turlarla deneyimleyin. İkonik Via Montenapoleone'den gizli haute couture atölyelerine, İtalyan zarafetinin sanatını kişisel bir rehberle keşfedin.",
      cta1: 'Yaklaşımım',
      cta2: 'Danışmanlık Al',
      trustedBy: 'Öğrenim',
      satisfiedClients: 'Università Cattolica'
    },
    services: {
      label: 'Hizmetlerimiz',
      title: 'Lüks Stil Deneyimleri',
      desc: 'Özel alışveriş turlarından kişisel stil danışmanlığına, her hizmet sizi İtalyan haute couture ve zamansız zarafet dünyasına daldırmak için tasarlanmıştır.',
      premium: 'Özel Deneyim',
      shoppingTours: 'Lüks Alışveriş Turları',
      shoppingToursDesc: "Milano'nun en prestijli moda destinasyonlarını keşfedin. Via Montenapoleone'deki amiral butiklerden özel showroom'lara, dünyanın en iyi tasarımcılarından parçalar keşfedin.",
      learnMore: 'Daha Fazla',
      wardrobeCuration: 'Lüks Gardırop Küratörlüğü',
      wardrobeCurationDesc: 'Gardırobunuzu İtalyan işçiliğini ve zamansız sofistikeliği yansıtan özenle seçilmiş tasarımcı parçalarıyla dönüştürün.',
      styleIntelligence: 'Kişisel Stil Danışmanlığı',
      styleIntelligenceDesc: 'Lüks gardırop oluşturma, İtalyan moda evlerini anlama ve ömür boyu sürecek yatırım parçaları yapma konusunda uzman rehberliği.'
    },
    districts: {
      label: "Milano'yu Keşfet",
      title: 'Moda Bölgeleri',
      desc: 'Her mahalle farklı bir hikaye anlatır. Galleria Vittorio Emanuele\'nin ihtişamından Brera\'nın sanatsal ruhuna.',
      bookTour: 'Tur Rezervasyonu',
      galleria: {
        name: 'Galleria Vittorio Emanuele II',
        description: "İtalya'nın en eski alışveriş galerisi, Prada'nın orijinal butiği ve zamansız lüksün evi.",
        stores: '45+ Butik',
        brands: 'Prada, Louis Vuitton, Gucci, Versace, Armani, Tod\'s, Massimo Dutti, Swarovski',
        history: 'Mimar Giuseppe Mengoni tarafından 1865-1877 yılları arasında inşa edilen bu muhteşem demir ve cam arkad, dünyanın ilk alışveriş merkezlerinden biriydi. Birleşik İtalya\'nın ilk kralının adını taşır ve Piazza del Duomo\'yu La Scala opera binasına bağlar.',
        philosophy: 'Miras ve yüksek modanın buluştuğu yer. Galleria, zamansız İtalyan "bella figura" felsefesini temsil eder – kusursuz görünmek kibir değil, bir saygı biçimidir.',
        vibe: 'Zarif & Tarihi'
      },
      brera: {
        name: 'Brera Bölgesi',
        description: "Milano'nun sanatsal kalbi. Bağımsız tasarımcılar, vintage buluntular ve bohem zarafet.",
        stores: '80+ Atölye',
        brands: 'Cavalli e Nastri, Biffi Boutique, Wait and See, Antonia, 10 Corso Como, Vintage Delirium, bağımsız zanaatkar atölyeleri',
        history: '18. yüzyıldan beri sanatçılara ve entelektüellere ev sahipliği yapan Brera, ünlü Pinacoteca di Brera sanat galerisinin etrafında büyüdü. Mahalle, sanat stüdyoları ve bağımsız butiklerle kaplı dar arnavut kaldırımlı sokaklarıyla sanatsal ruhunu koruyor.',
        philosophy: 'Sanat olarak moda, kendini ifade olarak stil. Brera, trendler yerine bireyselliği, seri üretim yerine zanaatkarlığı kutlar. Burada her parça bir hikaye anlatır.',
        vibe: 'Bohem & Sanatsal'
      },
      montenapoleone: {
        name: 'Via Montenapoleone',
        description: "Lüks modanın zirvesi. Dünyanın en prestijli markalarının evi.",
        stores: '120+ Marka',
        brands: 'Bulgari, Cartier, Dolce & Gabbana, Fendi, Hermès, Valentino, Bottega Veneta, Balenciaga, Saint Laurent, Celine, Dior, Chanel',
        history: 'İnşaatını 1804\'te emreden Napolyon Bonapart\'ın adını taşıyan Via Montenapoleone, 1950\'lerde İtalyan moda evlerinin amiral mağazalarını açmaya başlamasıyla bankalar sokağından dünyanın en özel moda destinasyonuna dönüştü.',
        philosophy: 'Quadrilatero della Moda, İtalyan mükemmelliğini simgeler – usta işçiliğin son teknoloji tasarımla buluştuğu yer. Her detay mükemmellik, her parça bir yatırımdır.',
        vibe: 'Ultra-Lüks & Özel'
      },
      serravalle: {
        name: 'Serravalle Designer Outlet',
        description: "Avrupa'nın en büyük tasarımcı outlet'i. Milano'dan sadece bir saat uzaklıkta, istisnai fiyatlarla lüks markalar.",
        stores: '300+ Mağaza',
        brands: 'Gucci, Prada, Armani, Versace, Burberry, Michael Kors, Coach, Dolce & Gabbana, Valentino, Salvatore Ferragamo, Tod\'s, Bottega Veneta',
        history: '2000 yılında açılan Serravalle Designer Outlet, kısa sürede Avrupa\'nın en büyük outlet köyü haline geldi. Alessandria yakınlarındaki Piedmont tepelerinde yer alan outlet, indirimli fiyatlarla lüks marka arayan yılda 6 milyondan fazla ziyaretçi çekiyor.',
        philosophy: 'Herkes için erişilebilir lüks. Serravalle, olağanüstü stilin olağanüstü bütçeler gerektirmediğini kanıtlıyor. Burada İtalyan tasarımcı parçalarına sahip olma hayalleri gerçeğe dönüşüyor.',
        vibe: 'Outlet Lüks & Fırsatlar'
      }
    },
    testimonial: {
      label: 'Müşteri Hikayeleri',
      testimonials: [
        {
          quote: '"Gulizar Milano alışveriş deneyimimi gerçekten büyülü bir şeye dönüştürdü. Lüks moda dünyası hakkındaki bilgisi ve özel butiklere VIP erişimi inanılmazdı."',
          author: 'Elena Rossi',
          role: 'Pazarlama Müdürü, Milano'
        },
        {
          quote: '"Gulizar ile çalışmak kişisel bir moda küratörüne sahip olmak gibiydi. Stilimi hemen anladı ve kendi başıma asla bulamayacağım parçalarla tanıştırdı. Detaylara verilen özen eşsiz."',
          author: 'Sophia Chen',
          role: 'Moda Girişimcisi, Londra'
        },
        {
          quote: '"Milano\'ya yeni biri olarak Gulizar\'ın uzmanlığı paha biçilmezdi. Beni en özel atölyelere götürdü ve kişiliğimi mükemmel şekilde yansıtan bir gardırop oluşturmama yardımcı oldu. Her kuruşuna değer!"',
          author: 'Muhammed El Sahli',
          role: 'Investor, Dubai'
        },
        {
          quote: '"Lüks alışveriş turu tüm beklentileri aştı. Gulizar\'ın moda dünyasındaki bağlantıları varlığından bile haberdar olmadığım kapıları açtı. Gerçekten özel bir deneyim."',
          author: 'Charlotte Dubois',
          role: 'Sanat Koleksiyoncusu, Paris'
        },
        {
          quote: '"Gulizar sadece alışveriş yapmanıza yardımcı olmuyor—size İtalyan zanaatkarlığı, moda evlerinin tarihi ve uzun süre dayanacak parçalara nasıl yatırım yapılacağını öğretiyor. Lüks konusunda bir eğitim."',
          author: 'Amara Singh',
          role: 'Teknoloji Yöneticisi, San Francisco'
        }
      ]
    },
    about: {
      label: 'Rehberiniz',
      bio1: "Denizli, Türkiye doğumluyum. Moda zanaatkarlığı ve güzel parçalar yaratma sanatına olan tutkumu keşfettiğim Gerzele El Becerileri ve Kurs Merkezi'nde eğitim aldım.",
      bio2: "Şu an Milano'da yaşıyor ve prestijli Università Cattolica del Sacro Cuore'da moda okuyorum. Kendimi İtalyan lüks moda dünyasına adadım. İkonik moda evlerinin mirasını anlamaktan yeni tasarımcıları keşfetmeye, Milano moda sahnesinde derin bağlantılar geliştirdim.",
      bio3: "İster Quadrilatero della Moda'da VIP alışveriş deneyimi, ister tasarımcı showroom'larına özel erişim veya lüks gardırop oluşturma rehberliği arıyor olun, Milano moda hayallerinizi gerçekleştirmek için buradayım.",
      stat1Label: 'Odak Alanı',
      stat1Value: 'Lüks',
      stat2Label: 'Lokasyon',
      stat2Value: 'Milano',
      stat3Label: 'Keşfedilen Butik',
      stat3Value: '50+'
    },
    storesPage: {
      label: 'Küratörlü Seçim',
      title: 'Favori Butikler',
      desc: "Milano'nun en iyi lüks kuruluşlarından özenle seçilmiş bir koleksiyon, ikonik moda evlerinden özel tasarımcı atölyelerine."
    },
    methodology: {
      label: '3 Adımlı Stil DNA Metodu',
      title: 'Özel Yaklaşımım',
      intro: 'Basit alışverişin ötesine geçen benzersiz bir metodoloji geliştirdim. 3 Adımlı Stil DNA Metodu™, sadece gardırobunuzu değil, modayla olan tüm ilişkinizi dönüştürmek için tasarlandı.',
      steps: [
        {
          title: 'Keşif — Psikoloji',
          description: 'Kim olduğunuzu derinlemesine inceliyoruz. Yaşam tarzınız, hedefleriniz, beden diliniz ve yansıtmak istediğiniz imaj. Bu sadece kıyafetlerle ilgili değil—Stil DNA\'nızı anlamakla ilgili.'
        },
        {
          title: 'Küratörlük — Mimari',
          description: 'Keşif aşamasından elde edilen içgörüleri kullanarak mükemmel gardırop planınızı oluşturuyorum. Her parça, birbirleri üzerine inşa edilecek şekilde stratejik olarak seçilir ve uyum içinde çalışan yatırım parçalarının temeli oluşturulur.'
        },
        {
          title: 'Entegrasyon — Gardırop',
          description: 'Son dönüşüm. Özenle düzenlenmiş alışveriş deneyimleri aracılığıyla Stil DNA\'nızı hayata geçiriyoruz, her yeni parçanın mevcut gardırobunuza ve yaşam tarzınıza sorunsuz bir şekilde entegre olmasını sağlıyoruz.'
        }
      ],
      philosophyLabel: 'Felsefem',
      philosophy: 'Gerçek lüks logolarla ilgili değil – kalite, işçilik ve sizi olağanüstü hissettiren parçalarla ilgilidir.',
      philosophyDesc: 'En güzel gardırobun niyetle inşa edilmiş olan olduğuna inanıyorum. Her parça kendinize bir yatırım olmalı, usta zanaatkarlar tarafından üretilmeli ve nesiller boyu sürecek şekilde tasarlanmalıdır. Misyonum, sizi İtalyan modasının sunduğu en iyi şeylerle buluşturmaktır.',
      specialLabel: 'Neyi Özel Kılar',
      specialTitle: 'Gulizar Farkı',
      specialDesc: 'Yaklaşımım, bu deneyimi geleneksel alışverişten ayıran üç temel unsuru birleştirir.',
      specialFeatures: [
        {
          title: 'Kişisel Bağlantı',
          description: 'Bu bir işlem değil – bir ilişki. Herhangi bir öneri yapmadan önce sizi, hayatınızı ve stil hedeflerinizi gerçekten anlamak için zaman ayırıyorum.'
        },
        {
          title: 'Lüks Uzmanlığı',
          description: 'İtalyan moda evleri, tasarımcı mirası ve lüks işçilik konusundaki derin bilgimle, yatırım parçaları konusunda bilinçli kararlar vermenize yardımcı oluyorum.'
        },
        {
          title: 'Özel Erişim',
          description: 'Milano\'da yaşamak ve okumak, bir alışveriş gezisini unutulmaz bir deneyime dönüştüren VIP randevulara, özel showroom\'lara ve içeriden bilgiye erişim sağlıyor.'
        }
      ],
      processLabel: 'Yolculuğunuz',
      processTitle: 'Tipik Bir Deneyim',
      process: [
        {
          time: 'Buluşmadan Önce',
          title: 'İlk Danışmanlık',
          description: 'Stil hedeflerinizi, yaşam tarzı ihtiyaçlarınızı ve lüks moda tercihlerinizi tartıştığımız bir video görüşmesi veya yüz yüze toplantı.'
        },
        {
          time: 'Deneyim Günü',
          title: 'Küratörlü Lüks Tur',
          description: 'VIP erişim ve özel randevularla Milano\'nun en prestijli butikleri ve tasarımcı showroom\'ları arasında kişiselleştirilmiş bir yolculuk.'
        },
        {
          time: 'Gün Boyunca',
          title: 'Stil Rehberliği',
          description: 'Kalıp, stil ve her tasarımcı parçasının mevcut gardırobunuzla nasıl bütünleştiği konusunda uzman tavsiyeleri. Baskı yok, sadece düşünceli rehberlik.'
        },
        {
          time: 'Günümüzden Sonra',
          title: 'Sürekli Destek',
          description: 'Lüks yatırımlarınızdan en iyi şekilde yararlanmanıza yardımcı olacak takip stil ipuçları, kombin önerileri ve sürekli tavsiyeler.'
        }
      ],
      ctaTitle: 'Lüksü Deneyimlemeye Hazır mısınız?',
      ctaDesc: 'Sizin kadar özel bir moda deneyimi yaratalım. Danışmanlığınızı rezerve edin ve İtalyan lüks moda dünyasını keşfedin.',
      ctaButton: 'Deneyiminizi Rezerve Edin'
    },
    footer: { 
      desc: "Milano merkezli moda tasarımcısı ve lüks stil danışmanı, özel alışveriş turları konusunda uzmanlaşmış ve müşterilerin şehrin en iyi tasarımcı butiklerini keşfetmelerine yardımcı oluyor.",
      contact: 'İletişim', 
      location: 'Konum',
      remote: 'Uzaktan',
      follow: 'Takip Et',
      reserved: '© 2024 Vestiliza. Tüm hakları saklıdır.',
      crafted: "Milano'da tutkuyla tasarlandı"
    },
    booking: {
      title: 'Randevu Al',
      desc: 'İtalyan lüks modasına yolculuğunuza başlayın',
      selectService: 'Hizmet Seçin',
      yourDetails: 'Bilgileriniz',
      yourName: 'Adınız',
      emailAddress: 'E-posta Adresi',
      selectDate: 'Tarih Seçin',
      selectTime: 'Saat Seçin',
      checkingAvailability: 'Müsaitlik kontrol ediliyor...',
      notAvailable: 'Bu zaman dilimi müsait değil. Lütfen başka bir saat seçin.',
      confirm: 'Randevu Talebi',
      loading: 'Randevu talebiniz gönderiliyor...',
      success: 'Teşekkürler',
      successDesc: 'Randevu talebiniz gönderildi! Gülizar talebinizi aldı ve kısa süre içinde bir onay e-postası alacaksınız. 24 saat içinde yanıt verecektir.',
      close: 'Kapat',
      services: {
        shopping: {
          name: 'Lüks Alışveriş Turu',
          desc: "VIP erişim ve kişisel stil danışmanlığıyla Milano'nun en prestijli butiklerinde küratörlü yolculuk."
        },
        wardrobe: {
          name: 'Gardırop Dönüşümü',
          desc: 'Kişisel tarzınızı yükseltmek için tam dolap denetimi ve lüks stil danışmanlığı.'
        },
        cityTour: {
          name: 'Milano Kültür & Moda Yolculuğu',
          desc: "Duomo, Castello Sforzesco, Brera, Navigli, La Scala ve daha fazlasını içeren tam gün tur. Tüm girişler dahil."
        },
        vip: {
          name: 'Milano Moda Haftası Deneyimi',
          desc: "MFW süresince gösterilere, showroom'lara ve tasarımcı buluşmalarına özel erişim."
        },
        virtual: {
          name: 'Sanal Danışmanlık',
          desc: 'Dünyanın her yerinden uzman lüks stil tavsiyeleri ve kişiselleştirilmiş öneriler.'
        }
      }
    }
  },
  it: {
    nav: { 
      aperitivo: 'Aperitivo', 
      experiences: 'Esperienze',
      stores: 'Guida Negozi', 
      methodology: 'Metodologia', 
      book: 'Prenota' 
    },
    hero: { 
      subtitle: 'Fashion Designer & Consulente di Stile di Lusso',
      title1: 'Scopri',
      title2: "l'Eleganza",
      title3: 'Milanese',
      desc: "Vivi la leggendaria scena della moda milanese attraverso tour di lusso esclusivi. Dall'iconica Via Montenapoleone agli atelier nascosti di haute couture, scopri l'arte dell'eleganza italiana con una guida personale.",
      cta1: 'Il Mio Approccio',
      cta2: 'Prenota Consulenza',
      trustedBy: 'Studentessa presso',
      satisfiedClients: 'Università Cattolica'
    },
    services: {
      label: 'Cosa Offriamo',
      title: 'Esperienze di Stile di Lusso',
      desc: "Dai tour di shopping esclusivi alle sessioni di styling personale, ogni servizio è progettato per immergerti nel mondo dell'haute couture italiana e dell'eleganza senza tempo.",
      premium: 'Esperienza Esclusiva',
      shoppingTours: 'Tour di Shopping di Lusso',
      shoppingToursDesc: "Esplora le destinazioni di moda più prestigiose di Milano. Dalle boutique flagship di Via Montenapoleone agli showroom esclusivi, scopri pezzi dei migliori designer del mondo.",
      learnMore: 'Scopri di Più',
      wardrobeCuration: 'Curatela del Guardaroba di Lusso',
      wardrobeCurationDesc: "Trasforma il tuo guardaroba con pezzi di designer accuratamente selezionati che riflettono l'artigianato italiano e la raffinatezza senza tempo.",
      styleIntelligence: 'Consulenza di Stile Personale',
      styleIntelligenceDesc: "Guida esperta sulla costruzione di un guardaroba di lusso, sulla comprensione delle case di moda italiane e sulla realizzazione di pezzi di investimento che durano una vita."
    },
    districts: {
      label: 'Esplora Milano',
      title: 'Distretti della Moda',
      desc: "Ogni quartiere racconta una storia diversa. Dalla grandezza della Galleria Vittorio Emanuele all'anima artistica di Brera.",
      bookTour: 'Prenota un Tour',
      galleria: {
        name: 'Galleria Vittorio Emanuele II',
        description: "La più antica galleria commerciale d'Italia, sede della boutique originale di Prada e del lusso senza tempo.",
        stores: '45+ Boutique',
        brands: 'Prada, Louis Vuitton, Gucci, Versace, Armani, Tod\'s, Massimo Dutti, Swarovski',
        history: 'Costruita tra il 1865 e il 1877 dall\'architetto Giuseppe Mengoni, questa splendida galleria in ferro e vetro fu uno dei primi centri commerciali al mondo. Intitolata al primo re dell\'Italia unita, collega Piazza del Duomo al Teatro alla Scala.',
        philosophy: 'Dove il patrimonio incontra l\'alta moda. La Galleria rappresenta la filosofia italiana senza tempo della "bella figura" – apparire impeccabili non è vanità, ma una forma di rispetto.',
        vibe: 'Elegante & Storico'
      },
      brera: {
        name: 'Quartiere Brera',
        description: 'Il cuore artistico di Milano. Designer indipendenti, reperti vintage ed eleganza bohémien.',
        stores: '80+ Atelier',
        brands: 'Cavalli e Nastri, Biffi Boutique, Wait and See, Antonia, 10 Corso Como, Vintage Delirium, laboratori artigianali indipendenti',
        history: 'Un tempo dimora di artisti e intellettuali dal XVIII secolo, Brera si sviluppò attorno alla famosa Pinacoteca di Brera. Il quartiere conserva la sua anima artistica con strette vie acciottolate fiancheggiate da studi d\'arte e boutique indipendenti.',
        philosophy: 'La moda come arte, lo stile come espressione di sé. Brera celebra l\'individualità sui trend, l\'artigianato sulla produzione di massa. Qui ogni pezzo racconta una storia.',
        vibe: 'Bohémien & Artistico'
      },
      montenapoleone: {
        name: 'Via Montenapoleone',
        description: "L'apice della moda di lusso. Dove i marchi più prestigiosi del mondo chiamano casa.",
        stores: '120+ Marchi',
        brands: 'Bulgari, Cartier, Dolce & Gabbana, Fendi, Hermès, Valentino, Bottega Veneta, Balenciaga, Saint Laurent, Celine, Dior, Chanel',
        history: 'Intitolata a Napoleone Bonaparte che ne ordinò la costruzione nel 1804, Via Montenapoleone si trasformò da strada di banche nella destinazione di moda più esclusiva del mondo negli anni \'50, quando le case di moda italiane iniziarono ad aprire i loro flagship store.',
        philosophy: 'Il Quadrilatero della Moda incarna l\'eccellenza italiana – dove la maestria artigianale incontra il design all\'avanguardia. Ogni dettaglio è perfezione, ogni pezzo un investimento.',
        vibe: 'Ultra-Lusso & Esclusivo'
      },
      serravalle: {
        name: 'Serravalle Designer Outlet',
        description: "Il più grande outlet designer d'Europa. Marchi di lusso a prezzi eccezionali, a solo un'ora da Milano.",
        stores: '300+ Negozi',
        brands: 'Gucci, Prada, Armani, Versace, Burberry, Michael Kors, Coach, Dolce & Gabbana, Valentino, Salvatore Ferragamo, Tod\'s, Bottega Veneta',
        history: 'Aperto nel 2000, Serravalle Designer Outlet è diventato rapidamente il più grande outlet village d\'Europa. Situato nelle colline del Piemonte vicino ad Alessandria, attira oltre 6 milioni di visitatori all\'anno in cerca di marchi di lusso a prezzi ridotti.',
        philosophy: 'Lusso accessibile a tutti. Serravalle dimostra che uno stile eccezionale non richiede budget eccezionali. Qui i sogni di possedere pezzi di designer italiani diventano realtà.',
        vibe: 'Outlet Lusso & Affari'
      }
    },
    testimonial: {
      label: 'Storie dei Clienti',
      testimonials: [
        {
          quote: '"Gulizar ha trasformato la mia esperienza di shopping a Milano in qualcosa di veramente magico. La sua conoscenza della scena della moda di lusso e l\'accesso VIP alle boutique esclusive era incredibile."',
          author: 'Elena Rossi',
          role: 'Marketing Manager, Milano'
        },
        {
          quote: '"Lavorare con Gulizar è stato come avere un curatore di moda personale. Ha capito immediatamente il mio stile e mi ha presentato pezzi che non avrei mai trovato da sola. L\'attenzione ai dettagli è impareggiabile."',
          author: 'Sophia Chen',
          role: 'Imprenditrice di Moda, Londra'
        },
        {
          quote: '"Come persona nuova a Milano, l\'esperienza di Gulizar è stata inestimabile. Mi ha portato negli atelier più esclusivi e mi ha aiutato a costruire un guardaroba che riflette perfettamente la mia personalità. Vale ogni euro!"',
          author: 'Muhammed El Sahli',
          role: 'Investitore, Dubai'
        },
        {
          quote: '"Il tour di shopping di lusso ha superato tutte le aspettative. Le connessioni di Gulizar nel mondo della moda hanno aperto porte che non sapevo nemmeno esistessero. Un\'esperienza veramente su misura."',
          author: 'Charlotte Dubois',
          role: 'Collezionista d\'Arte, Parigi'
        },
        {
          quote: '"Gulizar non ti aiuta solo a fare shopping—ti insegna l\'artigianato italiano, la storia delle case di moda e come investire in pezzi che durano. Un\'educazione nel lusso."',
          author: 'Amara Singh',
          role: 'Dirigente Tech, San Francisco'
        }
      ]
    },
    about: {
      label: 'La Tua Guida',
      bio1: "Originaria di Denizli, Turchia, mi sono formata al Centro Gerzele per le Abilità Manuali dove ho scoperto la mia passione per l'artigianato della moda e l'arte di creare pezzi bellissimi.",
      bio2: "Ora vivo a Milano e studio moda alla prestigiosa Università Cattolica del Sacro Cuore, mi sono immersa nel mondo della moda di lusso italiana. Dalla comprensione del patrimonio delle iconiche case di moda alla scoperta di designer emergenti, ho sviluppato profonde connessioni nella scena della moda milanese.",
      bio3: "Che tu stia cercando un'esperienza di shopping VIP al Quadrilatero della Moda, accesso esclusivo agli showroom dei designer, o guida nella costruzione di un guardaroba di lusso, sono qui per realizzare i tuoi sogni di moda milanese.",
      stat1Label: 'Focus',
      stat1Value: 'Lusso',
      stat2Label: 'Base',
      stat2Value: 'Milano',
      stat3Label: 'Boutique Scoperte',
      stat3Value: '50+'
    },
    storesPage: {
      label: 'Selezione Curata',
      title: 'Boutique Preferite',
      desc: "Una collezione accuratamente curata dei migliori stabilimenti di lusso di Milano, dalle iconiche case di moda agli esclusivi atelier di designer."
    },
    methodology: {
      label: 'Il Metodo 3 Fasi Style DNA',
      title: 'Il Mio Approccio Esclusivo',
      intro: 'Ho sviluppato una metodologia unica che va oltre il semplice shopping. Il Metodo 3 Fasi Style DNA™ è progettato per trasformare non solo il tuo guardaroba, ma la tua intera relazione con la moda.',
      steps: [
        {
          title: 'Scoperta — La Psicologia',
          description: 'Approfondiamo chi sei. Il tuo stile di vita, le tue aspirazioni, il linguaggio del corpo e l\'immagine che vuoi proiettare. Non si tratta solo di vestiti—si tratta di comprendere il tuo Style DNA.'
        },
        {
          title: 'Curatela — L\'Architettura',
          description: 'Usando le intuizioni dalla Scoperta, architetto il progetto perfetto del tuo guardaroba. Ogni pezzo è selezionato strategicamente per costruire sugli altri, creando una base di pezzi di investimento che lavorano in armonia.'
        },
        {
          title: 'Integrazione — Il Guardaroba',
          description: 'La trasformazione finale. Diamo vita al tuo Style DNA attraverso esperienze di shopping accuratamente orchestrate, assicurando che ogni nuovo pezzo si integri perfettamente nel tuo guardaroba e stile di vita esistenti.'
        }
      ],
      philosophyLabel: 'La Mia Filosofia',
      philosophy: 'Il vero lusso non riguarda i loghi – riguarda la qualità, l\'artigianato e i pezzi che ti fanno sentire straordinaria.',
      philosophyDesc: 'Credo che il guardaroba più bello sia quello costruito con intenzione. Ogni pezzo dovrebbe essere un investimento su te stessa, realizzato da maestri artigiani e progettato per durare generazioni. La mia missione è connetterti con il meglio che la moda italiana ha da offrire.',
      specialLabel: 'Cosa Lo Rende Speciale',
      specialTitle: 'La Differenza Gulizar',
      specialDesc: 'Il mio approccio combina tre elementi essenziali che distinguono questa esperienza dallo shopping tradizionale.',
      specialFeatures: [
        {
          title: 'Connessione Personale',
          description: 'Questa non è una transazione – è una relazione. Mi prendo il tempo per capire veramente te, la tua vita e i tuoi obiettivi di stile prima di fare qualsiasi raccomandazione.'
        },
        {
          title: 'Competenza nel Lusso',
          description: 'Con profonda conoscenza delle case di moda italiane, del patrimonio dei designer e dell\'artigianato di lusso, ti aiuto a prendere decisioni informate sui pezzi di investimento.'
        },
        {
          title: 'Accesso Esclusivo',
          description: 'Vivere e studiare a Milano mi dà accesso ad appuntamenti VIP, showroom privati e conoscenze insider che trasformano un giro di shopping in un\'esperienza indimenticabile.'
        }
      ],
      processLabel: 'Il Tuo Viaggio',
      processTitle: 'Un\'Esperienza Tipica',
      process: [
        {
          time: 'Prima di Incontrarci',
          title: 'Consulenza Iniziale',
          description: 'Una videochiamata o un incontro di persona dove discutiamo i tuoi obiettivi di stile, le esigenze di vita e le preferenze per la moda di lusso.'
        },
        {
          time: 'Giorno dell\'Esperienza',
          title: 'Tour di Lusso Curato',
          description: 'Un viaggio personalizzato attraverso le boutique più prestigiose di Milano e gli showroom dei designer, con accesso VIP e appuntamenti esclusivi.'
        },
        {
          time: 'Durante la Giornata',
          title: 'Guida allo Stile',
          description: 'Consigli esperti su vestibilità, styling e come ogni pezzo di designer si integra con il tuo guardaroba esistente. Nessuna pressione, solo guida premurosa.'
        },
        {
          time: 'Dopo la Nostra Giornata',
          title: 'Supporto Continuo',
          description: 'Suggerimenti di styling di follow-up, combinazioni di outfit e consigli continui per aiutarti a sfruttare al meglio i tuoi investimenti di lusso.'
        }
      ],
      ctaTitle: 'Pronta a Vivere il Lusso?',
      ctaDesc: 'Creiamo un\'esperienza di moda esclusiva come te. Prenota la tua consulenza e scopri il mondo della moda di lusso italiana.',
      ctaButton: 'Prenota la Tua Esperienza'
    },
    footer: { 
      desc: "Fashion designer e consulente di stile di lusso con sede a Milano, specializzata in tour di shopping esclusivi e nell'aiutare i clienti a scoprire le migliori boutique di designer della città.",
      contact: 'Contatti', 
      location: 'Posizione',
      remote: 'Remoto',
      follow: 'Seguici',
      reserved: '© 2024 Vestiliza. Tutti i diritti riservati.',
      crafted: 'Creato con passione a Milano'
    },
    booking: {
      title: 'Prenota la Tua Esperienza',
      desc: "Inizia il tuo viaggio nella moda di lusso italiana",
      selectService: 'Seleziona Servizio',
      yourDetails: 'I Tuoi Dettagli',
      yourName: 'Il Tuo Nome',
      emailAddress: 'Indirizzo Email',
      selectDate: 'Seleziona Data',
      selectTime: 'Seleziona Ora',
      checkingAvailability: 'Controllo disponibilità...',
      notAvailable: 'Questo orario non è disponibile. Si prega di selezionare un altro orario.',
      confirm: 'Richiedi Appuntamento',
      loading: 'Invio della richiesta di prenotazione...',
      success: 'Grazie Mille',
      successDesc: 'La tua richiesta di prenotazione è stata inviata! Gülizar ha ricevuto la tua richiesta e riceverai un\'email di conferma a breve. Risponderà entro 24 ore.',
      close: 'Chiudi',
      services: {
        shopping: {
          name: 'Tour di Shopping di Lusso',
          desc: "Viaggio curato attraverso le boutique più prestigiose di Milano con accesso VIP e styling personale."
        },
        wardrobe: {
          name: 'Trasformazione del Guardaroba',
          desc: "Audit completo dell'armadio e sessione di styling di lusso per elevare il tuo stile personale."
        },
        cityTour: {
          name: 'Viaggio Culturale & Moda Milano',
          desc: "Tour di una giornata intera: Duomo, Castello Sforzesco, Brera, Navigli, La Scala e altro. Tutti gli ingressi inclusi."
        },
        vip: {
          name: 'Esperienza Milan Fashion Week',
          desc: 'Accesso esclusivo a sfilate, showroom e incontri con designer durante MFW.'
        },
        virtual: {
          name: 'Consulenza Virtuale',
          desc: 'Consigli esperti di stile di lusso e raccomandazioni personalizzate da qualsiasi parte del mondo.'
        }
      }
    }
  }
};
