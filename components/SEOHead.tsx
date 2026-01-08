import { Helmet } from 'react-helmet-async';
import { Language } from '../types';

interface SEOHeadProps {
  lang: Language;
}

const SEO_DATA: Record<Language, { title: string; description: string; keywords: string }> = {
  en: {
    title: 'Gülizar Ermiş | Milan Fashion Consultant & Luxury Shopping Tours',
    description: 'Experience exclusive luxury shopping tours in Milan with personal style consultant Gülizar Ermiş. VIP access to Via Montenapoleone, Brera, and hidden haute couture ateliers. Book your bespoke fashion experience today.',
    keywords: 'Milan fashion consultant, luxury shopping tour Milan, personal stylist Italy, Via Montenapoleone shopping, Milan fashion week, Italian haute couture, luxury wardrobe consultant',
  },
  tr: {
    title: 'Gülizar Ermiş | Milano Moda Danışmanı & Lüks Alışveriş Turları',
    description: 'Kişisel stil danışmanı Gülizar Ermiş ile Milano\'da özel lüks alışveriş turları deneyimleyin. Via Montenapoleone, Brera ve gizli haute couture atölyelerine VIP erişim. Özel moda deneyiminizi bugün rezerve edin.',
    keywords: 'Milano moda danışmanı, lüks alışveriş turu Milano, kişisel stilist İtalya, Via Montenapoleone alışveriş, Milano moda haftası, İtalyan haute couture, lüks gardırop danışmanı',
  },
  it: {
    title: 'Gülizar Ermiş | Consulente di Moda Milano & Tour Shopping di Lusso',
    description: 'Vivi tour di shopping di lusso esclusivi a Milano con la consulente di stile personale Gülizar Ermiş. Accesso VIP a Via Montenapoleone, Brera e atelier nascosti di haute couture. Prenota la tua esperienza di moda su misura oggi.',
    keywords: 'consulente moda Milano, tour shopping lusso Milano, stilista personale Italia, shopping Via Montenapoleone, settimana della moda Milano, haute couture italiana, consulente guardaroba lusso',
  },
};

export const SEOHead: React.FC<SEOHeadProps> = ({ lang }) => {
  const seo = SEO_DATA[lang];
  const canonicalUrl = lang === 'en' ? 'https://vestiliza.com/' : `https://vestiliza.com/${lang}`;
  
  return (
    <Helmet>
      <html lang={lang} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content="https://vestiliza.com/gulizar1.jpg" />
      <meta property="og:locale" content={lang === 'en' ? 'en_US' : lang === 'tr' ? 'tr_TR' : 'it_IT'} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content="https://vestiliza.com/gulizar1.jpg" />
      
      {/* Alternate language links */}
      <link rel="alternate" hrefLang="en" href="https://vestiliza.com/" />
      <link rel="alternate" hrefLang="tr" href="https://vestiliza.com/tr" />
      <link rel="alternate" hrefLang="it" href="https://vestiliza.com/it" />
      <link rel="alternate" hrefLang="x-default" href="https://vestiliza.com/" />
    </Helmet>
  );
};

