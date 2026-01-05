
export type Language = 'en' | 'tr' | 'it';

export interface Store {
  id: string;
  name: string;
  district: 'Brera' | 'Quadrilatero' | 'Navigli' | 'Corso Como' | 'Isola';
  description: string;
  vibe: string;
  image: string;
  tags: string[];
}

export interface StyleGuide {
  title: string;
  summary: string;
  recommendations: string[];
  mustVisitStores: string[];
  suggestedOutfits: string[];
}

export interface UserPreferences {
  vibe: string;
  budget: 'Accessible' | 'Mid-Range' | 'Luxury';
  occasion: string;
  gender: 'Female' | 'Male' | 'Non-binary';
}
