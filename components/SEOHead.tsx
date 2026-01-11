import { Helmet } from 'react-helmet-async';
import { Language } from '../types';

interface SEOHeadProps {
  lang: Language;
}

const SEO_DATA: Record<Language, { title: string; description: string; keywords: string }> = {
  en: {
    title: 'Gülizar Ermiş | Milan Fashion Consultant & Luxury Shopping Tours',
    description: 'Experience exclusive luxury shopping tours in Milan with personal style consultant Gülizar Ermiş. VIP access to Via Montenapoleone, Brera, Galleria Vittorio Emanuele II, and hidden haute couture ateliers. Book your bespoke fashion experience today.',
    keywords: 'Milan fashion consultant, luxury shopping tour Milan, personal stylist Italy, Via Montenapoleone shopping, Milan fashion week, Italian haute couture, luxury wardrobe consultant, Galleria Vittorio Emanuele, Brera shopping, Milan city tour, fashion tour Italy',
  },
  tr: {
    title: 'Gülizar Ermiş | Milano Moda Danışmanı & Lüks Alışveriş Turları',
    description: 'Kişisel stil danışmanı Gülizar Ermiş ile Milano\'da özel lüks alışveriş turları deneyimleyin. Via Montenapoleone, Brera, Galleria Vittorio Emanuele II ve gizli haute couture atölyelerine VIP erişim. Özel moda deneyiminizi bugün rezerve edin.',
    keywords: 'Milano moda danışmanı, lüks alışveriş turu Milano, kişisel stilist İtalya, Via Montenapoleone alışveriş, Milano moda haftası, İtalyan haute couture, lüks gardırop danışmanı, Galleria Vittorio Emanuele, Brera alışveriş, Milano şehir turu, İtalya moda turu',
  },
  it: {
    title: 'Gülizar Ermiş | Consulente di Moda Milano & Tour Shopping di Lusso',
    description: 'Vivi tour di shopping di lusso esclusivi a Milano con la consulente di stile personale Gülizar Ermiş. Accesso VIP a Via Montenapoleone, Brera, Galleria Vittorio Emanuele II e atelier nascosti di haute couture. Prenota la tua esperienza di moda su misura oggi.',
    keywords: 'consulente moda Milano, tour shopping lusso Milano, stilista personale Italia, shopping Via Montenapoleone, settimana della moda Milano, haute couture italiana, consulente guardaroba lusso, Galleria Vittorio Emanuele, shopping Brera, tour città Milano, tour moda Italia',
  },
};

// Structured data for rich search results
const getStructuredData = (lang: Language) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Vestiliza - Gülizar Ermiş Fashion Consultancy",
  "description": SEO_DATA[lang].description,
  "image": "https://vestiliza.com/gulizar4.jpg",
  "url": "https://vestiliza.com",
  "telephone": "+39-351-302-5810",
  "email": "vestilizamilano@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Milano",
    "addressCountry": "IT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "45.4642",
    "longitude": "9.1900"
  },
  "priceRange": "€€€",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "09:00",
    "closes": "19:00"
  },
  "sameAs": [
    "https://www.instagram.com/gulizarermiss/"
  ],
  "serviceType": [
    "Fashion Consulting",
    "Personal Shopping",
    "Luxury Shopping Tours",
    "Wardrobe Styling",
    "Milan City Tours"
  ]
});

export const SEOHead: React.FC<SEOHeadProps> = ({ lang }) => {
  const seo = SEO_DATA[lang];
  const canonicalUrl = lang === 'en' ? 'https://vestiliza.com/' : `https://vestiliza.com/${lang}`;
  const structuredData = getStructuredData(lang);
  
  return (
    <Helmet>
      <html lang={lang} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content="Gülizar Ermiş - Vestiliza" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Favicon */}
      <link rel="icon" type="image/png" href="/logogulizar.png" />
      <link rel="apple-touch-icon" href="/logogulizar.png" />
      
      {/* Open Graph - Using gulizar4.jpg (Milan Duomo background) for best social preview */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content="https://vestiliza.com/gulizar4.jpg" />
      <meta property="og:image:alt" content="Gülizar Ermiş - Fashion Consultant in Milan" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="1500" />
      <meta property="og:site_name" content="Vestiliza - Gülizar Ermiş" />
      <meta property="og:locale" content={lang === 'en' ? 'en_US' : lang === 'tr' ? 'tr_TR' : 'it_IT'} />
      
      {/* Twitter - Using gulizar4.jpg for preview */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content="https://vestiliza.com/gulizar4.jpg" />
      <meta name="twitter:image:alt" content="Gülizar Ermiş - Fashion Consultant in Milan" />
      <meta name="twitter:creator" content="@gulizarermiss" />
      
      {/* Alternate language links for international SEO */}
      <link rel="alternate" hrefLang="en" href="https://vestiliza.com/" />
      <link rel="alternate" hrefLang="tr" href="https://vestiliza.com/tr" />
      <link rel="alternate" hrefLang="it" href="https://vestiliza.com/it" />
      <link rel="alternate" hrefLang="x-default" href="https://vestiliza.com/" />
      
      {/* Structured Data for Rich Results */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

