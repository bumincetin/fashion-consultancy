
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
      "Excelsior Milano": "Luxurious department store with a futuristic feel."
    },
    tr: {
      "10 Corso Como": "Moda, sanat ve tasarımı harmanlayan dünyaca ünlü bir konsept mağaza.",
      "Antonia Brera": "En çok aranan lüks markaları barındıran çok markalı butik.",
      "Cavalli e Nastri": "Milano'nun küratörlü seçkisiyle en güzel vintage dükkanlarından biri.",
      "Excelsior Milano": "Fütüristik hissi olan lüks çok katlı mağaza."
    },
    it: {
      "10 Corso Como": "Un concept store famoso in tutto il mondo che unisce moda, arte e design.",
      "Antonia Brera": "Boutique multibrand con i marchi di lusso più ricercati.",
      "Cavalli e Nastri": "Uno dei negozi vintage più belli di Milano con una selezione curata.",
      "Excelsior Milano": "Lussuoso department store dall'atmosfera futuristica."
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
      image: 'https://images.unsplash.com/photo-1534452203294-49c8913c7673?auto=format&fit=crop&q=80&w=800',
      tags: lang === 'tr' ? ['Katlı Mağaza', 'Lüks'] : ['Department Store', 'Luxury']
    }
  ];
};
