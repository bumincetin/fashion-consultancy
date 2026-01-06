# Gülizar Ermiş - Milan Fashion Consultancy

A luxury fashion consultancy website for Gülizar Ermiş, a fashion designer and style consultant based in Milan, Italy. The website showcases exclusive luxury shopping tours, personal styling services, and curated fashion experiences in Milan's most prestigious districts.

## Features

- **Luxury Fashion Tours**: Exclusive shopping experiences in Milan's iconic fashion districts
- **Multi-language Support**: Available in English, Turkish, and Italian with dynamic URL routing
- **Interactive Testimonials**: Sliding client stories with smooth animations
- **Fashion Districts Guide**: Detailed information about Milan's fashion districts including:
  - Galleria Vittorio Emanuele II
  - Brera District
  - Via Montenapoleone (Quadrilatero della Moda)
  - Serravalle Designer Outlet
- **Curated Boutiques**: Showcase of Milan's finest luxury boutiques including:
  - 10 Corso Como
  - Antonia Brera
  - Cavalli e Nastri
  - Excelsior Milano
  - ModaHouse da Alessandra Fassi
  - F&F da Francesca Fontana
  - Ciao Bella
- **Methodology Section**: Detailed explanation of the styling approach and process
- **Booking System**: Integrated consultation booking modal
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Professional animations using Framer Motion

## Tech Stack

- **React** with TypeScript
- **Vite** for build tooling
- **Framer Motion** for animations
- **Tailwind CSS** for styling
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd fashion-consultancy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Project Structure

```
fashion-consultancy/
├── public/              # Static assets and images
├── components/          # React components
│   ├── BookingModal.tsx
│   ├── ImageSlider.tsx
│   └── StoreCard.tsx
├── App.tsx             # Main application component
├── constants.tsx        # Store and district data
├── translations.ts      # Multi-language translations
├── types.ts            # TypeScript type definitions
└── index.css           # Global styles
```

## Features in Detail

### Language Support
The website supports three languages (English, Turkish, Italian) with URL-based routing:
- English: `/`
- Turkish: `/tr`
- Italian: `/it`

### Image Sliders
- Hero section with crossfade image slider
- About section with Ken Burns effect slider
- Automatic image rotation every 3-5 seconds

### Testimonials
- Auto-rotating client testimonials
- Smooth slide animations
- Interactive navigation dots
- 5 testimonials per language

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-optimized interactions
- Safe area support for notched devices

## Contact

- **Email**: vestilizamilano@gmail.com
- **Phone**: +39 351 302 5810
- **Instagram**: [@gulizarermiss](https://www.instagram.com/gulizarermiss/)
- **Location**: Milano, Italy

## License

© 2024 Gülizar Ermiş. All rights reserved.

---

*Crafted with passion in Milano*
