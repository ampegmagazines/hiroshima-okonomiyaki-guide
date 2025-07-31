export interface Restaurant {
  id: string;
  name: string;
  description: string;
  address: string;
  area: Area;
  phone?: string;
  website?: string;
  openingHours: OpeningHours;
  priceRange: PriceRange;
  rating: number;
  reviewCount: number;
  images: string[];
  specialties: string[];
  features: Feature[];
  coordinates: Coordinates;
  isOpen: boolean;
  lastUpdated: string;
}

export interface OpeningHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isOpen: boolean;
  open?: string;
  close?: string;
  breakTime?: {
    start: string;
    end: string;
  };
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export type Area = 
  | '本通・八丁堀'
  | '広島駅周辺'
  | '紙屋町'
  | '袋町・中町'
  | '薬研堀・流川'
  | 'お好み村'
  | '宮島口'
  | 'その他';

export type PriceRange = 
  | '～500円'
  | '500円～1000円'
  | '1000円～1500円'
  | '1500円～2000円'
  | '2000円～';

export type Feature = 
  | 'テーブル席'
  | 'カウンター席'
  | '個室'
  | '禁煙'
  | '分煙'
  | '駐車場'
  | 'クレジットカード可'
  | 'PayPay可'
  | '英語メニュー'
  | '観光客歓迎'
  | 'テイクアウト可'
  | '老舗'
  | '有名店'
  | '深夜営業';

export interface SearchFilters {
  area?: Area;
  priceRange?: PriceRange;
  features?: Feature[];
  isOpen?: boolean;
  rating?: number;
}

export interface RestaurantListProps {
  restaurants: Restaurant[];
  filters?: SearchFilters;
}