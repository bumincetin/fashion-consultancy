
import { Store, Language } from './types';

export const DISTRICTS = (lang: Language = 'en') => {
  const data = {
    en: [
      { name: 'Quadrilatero della Moda', id: 'Quadrilatero', description: 'The golden square of high fashion.' },
      { name: 'Brera District', id: 'Brera', description: 'Bohemian luxury, niche boutiques, and art.' },
      { name: 'Corso Como', id: 'Corso Como', description: 'Concept stores and cutting-edge design.' },
      { name: 'Navigli', id: 'Navigli', description: 'Vintage treasures and artisan workshops.' }
    ],
    tr: [
      { name: 'Moda Dörtgeni', id: 'Quadrilatero', description: 'Yüksek modanın altın karesi.' },
      { name: 'Brera Bölgesi', id: 'Brera', description: 'Bohem lüks, niş butikler ve sanat.' },
      { name: 'Corso Como', id: 'Corso Como', description: 'Konsept mağazalar ve öncü tasarım.' },
      { name: 'Navigli', id: 'Navigli', description: 'Vintage hazineler ve zanaatkar atölyeleri.' }
    ],
    it: [
      { name: 'Quadrilatero della Moda', id: 'Quadrilatero', description: 'Il quadrato d\'oro dell\'alta moda.' },
      { name: 'Distretto di Brera', id: 'Brera', description: 'Lusso bohémien, boutique di nicchia e arte.' },
      { name: 'Corso Como', id: 'Corso Como', description: 'Concept store e design d\'avanguardia.' },
      { name: 'Navigli', id: 'Navigli', description: 'Tesori vintage e laboratori artigianali.' }
    ]
  };
  return data[lang] || data.en;
};

export const FEATURED_STORES = (lang: Language = 'en'): Store[] => {
  const descriptions = {
    en: {
      "10 Corso Como": "A world-famous concept store blending fashion, art, and design.",
      "Antonia Brera": "Multi-brand boutique featuring the most sought-after luxury labels.",
      "Cavalli e Nastri": "One of Milans most beautiful vintage shops with a curated selection.",
      "Excelsior Milano": "Luxurious department store with a futuristic feel.",
      "ModaHouse da Alessandra Fassi": "The iconic French maison's flagship store in Milan, showcasing haute couture and ready-to-wear collections.",
      "F&F da Francesca Fontana": "American luxury brand's elegant Milan boutique, featuring classic sophistication and timeless style.",
      "Ciao Bella": "Exclusive multi-brand boutique featuring emerging designers and avant-garde fashion pieces."
    },
    tr: {
      "10 Corso Como": "Moda, sanat ve tasarımı harmanlayan dünyaca ünlü bir konsept mağaza.",
      "Antonia Brera": "En çok aranan lüks markaları barındıran çok markalı butik.",
      "Cavalli e Nastri": "Milano'nun küratörlü seçkisiyle en güzel vintage dükkanlarından biri.",
      "Excelsior Milano": "Fütüristik hissi olan lüks çok katlı mağaza.",
      "ModaHouse da Alessandra Fassi": "İkonik Fransız maison'un Milano'daki amiral mağazası, haute couture ve prêt-à-porter koleksiyonlarını sergiliyor.",
      "F&F da Francesca Fontana": "Amerikan lüks markasının zarif Milano butiği, klasik sofistikasyon ve zamansız stili sunuyor.",
      "Ciao Bella": "Yeni tasarımcıları ve avangart moda parçalarını sergileyen özel çok markalı butik."
    },
    it: {
      "10 Corso Como": "Un concept store famoso in tutto il mondo che unisce moda, arte e design.",
      "Antonia Brera": "Boutique multibrand con i marchi di lusso più ricercati.",
      "Cavalli e Nastri": "Uno dei negozi vintage più belli di Milano con una selezione curata.",
      "Excelsior Milano": "Lussuoso department store dall'atmosfera futuristica.",
      "ModaHouse da Alessandra Fassi": "Il flagship store della maison francese iconica a Milano, che mostra collezioni haute couture e prêt-à-porter.",
      "F&F da Francesca Fontana": "L'elegante boutique milanese del brand di lusso americano, con sofisticazione classica e stile senza tempo.",
      "Ciao Bella": "Boutique multibrand esclusiva con designer emergenti e pezzi di moda avant-garde."
    }
  };

  const currDesc = descriptions[lang] || descriptions.en;

  return [
    {
      id: '1',
      name: '10 Corso Como',
      district: 'Corso Como',
      description: currDesc["10 Corso Como"],
      vibe: lang === 'it' ? 'Avanguardia e Curato' : 'Avant-garde & Curated',
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800',
      tags: lang === 'tr' ? ['Konsept Mağaza', 'Tasarım', 'Sanat'] : ['Concept Store', 'Designer', 'Art']
    },
    {
      id: '2',
      name: 'Antonia Brera',
      district: 'Brera',
      description: currDesc["Antonia Brera"],
      vibe: lang === 'it' ? 'Chic e Di Tendenza' : 'Chic & Trendy',
      image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=800',
      tags: lang === 'tr' ? ['Üst Segment', 'Çok Markalı'] : ['High-end', 'Multi-brand']
    },
    {
      id: '3',
      name: 'Cavalli e Nastri',
      district: 'Brera',
      description: currDesc["Cavalli e Nastri"],
      vibe: lang === 'it' ? 'Vintage Sofisticato' : 'Sophisticated Vintage',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
      tags: ['Vintage', 'Designer Heritage']
    },
    {
      id: '4',
      name: 'Excelsior Milano',
      district: 'Quadrilatero',
      description: currDesc["Excelsior Milano"],
      vibe: lang === 'it' ? 'Lusso Moderno' : 'Modern Luxury',
      image: 'excel.jpg',
      tags: lang === 'tr' ? ['Katlı Mağaza', 'Lüks'] : ['Department Store', 'Luxury']
    },
    {
      id: '5',
      name: 'ModaHouse da Alessandra Fassi',
      district: 'Quadrilatero',
      description: currDesc["ModaHouse da Alessandra Fassi"],
      vibe: lang === 'it' ? 'Iconico & Eterno' : 'Iconic & Timeless',
      image: 'chanel.jpg',
      tags: lang === 'tr' ? ['Haute Couture', 'Fransız Lüksü'] : ['Haute Couture', 'French Luxury']
    },
    {
      id: '6',
      name: 'F&F da Francesca Fontana',
      district: 'Quadrilatero',
      description: currDesc["F&F da Francesca Fontana"],
      vibe: lang === 'it' ? 'Classico & Sofisticato' : 'Classic & Sophisticated',
      image: 'ralph.jpg',
      tags: lang === 'tr' ? ['Amerikan Lüksü', 'Klasik'] : ['American Luxury', 'Classic']
    },
    {
      id: '7',
      name: 'Ciao Bella',
      district: 'Brera',
      description: currDesc["Ciao Bella"],
      vibe: lang === 'it' ? 'Avant-garde & Esclusivo' : 'Avant-garde & Exclusive',
      image: 'arabaa.jpg',
      tags: lang === 'tr' ? ['Çok Markalı', 'Avangart'] : ['Multi-brand', 'Avant-garde']
    }
  ];
};
