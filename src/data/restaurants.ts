import { Restaurant } from '@/types/restaurant';

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'みっちゃん総本店 八丁堀本店',
    description: '広島お好み焼きの元祖として知られる老舗中の老舗。創業者の故・井畝満夫さんが考案した「広島風お好み焼き」の発祥の店。',
    address: '広島県広島市中区八丁堀6-7',
    area: '本通・八丁堀',
    phone: '082-221-5438',
    website: 'https://www.okonomiyaki.co.jp/',
    openingHours: {
      monday: { isOpen: true, open: '11:00', close: '20:00' },
      tuesday: { isOpen: true, open: '11:00', close: '20:00' },
      wednesday: { isOpen: true, open: '11:00', close: '20:00' },
      thursday: { isOpen: true, open: '11:00', close: '20:00' },
      friday: { isOpen: true, open: '11:00', close: '20:00' },
      saturday: { isOpen: true, open: '11:00', close: '20:00' },
      sunday: { isOpen: true, open: '11:00', close: '20:00' }
    },
    priceRange: '1000円～1500円',
    rating: 4.3,
    reviewCount: 856,
    images: ['/images/mitchan-1.svg', '/images/mitchan-2.svg'],
    specialties: ['元祖お好み焼き', 'そば肉玉', 'うどん肉玉'],
    features: ['老舗', '有名店', 'テーブル席', 'カウンター席', '観光客歓迎', '英語メニュー'],
    coordinates: { lat: 34.3969, lng: 132.4615 },
    isOpen: true,
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    name: 'お好み村 ひろしま村',
    description: 'お好み村の代表的な店舗の一つ。多彩なトッピングと絶妙な焼き加減で地元民にも愛される老舗。',
    address: '広島県広島市中区新天地5-13 お好み村2F',
    area: 'お好み村',
    phone: '082-241-8758',
    openingHours: {
      monday: { isOpen: true, open: '11:00', close: '21:00' },
      tuesday: { isOpen: true, open: '11:00', close: '21:00' },
      wednesday: { isOpen: true, open: '11:00', close: '21:00' },
      thursday: { isOpen: true, open: '11:00', close: '21:00' },
      friday: { isOpen: true, open: '11:00', close: '21:00' },
      saturday: { isOpen: true, open: '11:00', close: '21:00' },
      sunday: { isOpen: true, open: '11:00', close: '21:00' }
    },
    priceRange: '500円～1000円',
    rating: 4.1,
    reviewCount: 423,
    images: ['/images/okonomimura-1.svg', '/images/okonomimura-2.svg'],
    specialties: ['特製ソース', 'いか天入り', 'チーズトッピング'],
    features: ['カウンター席', '観光客歓迎', 'テイクアウト可', 'PayPay可'],
    coordinates: { lat: 34.3962, lng: 132.4578 },
    isOpen: true,
    lastUpdated: '2024-01-10'
  },
  {
    id: '3',
    name: '長田屋',
    description: '地元広島で愛され続ける隠れた名店。秘伝のソースとふわふわの生地が自慢。アットホームな雰囲気が魅力。',
    address: '広島県広島市中区大手町1-7-19',
    area: '紙屋町',
    phone: '082-247-0787',
    openingHours: {
      monday: { isOpen: true, open: '11:30', close: '20:30' },
      tuesday: { isOpen: true, open: '11:30', close: '20:30' },
      wednesday: { isOpen: false },
      thursday: { isOpen: true, open: '11:30', close: '20:30' },
      friday: { isOpen: true, open: '11:30', close: '20:30' },
      saturday: { isOpen: true, open: '11:30', close: '20:30' },
      sunday: { isOpen: true, open: '11:30', close: '20:30' }
    },
    priceRange: '1000円～1500円',
    rating: 4.5,
    reviewCount: 234,
    images: ['/images/nagataya-1.svg', '/images/nagataya-2.svg'],
    specialties: ['秘伝ソース', 'えび入り', '野菜盛り'],
    features: ['テーブル席', 'カウンター席', '分煙', '駐車場'],
    coordinates: { lat: 34.3978, lng: 132.4549 },
    isOpen: true,
    lastUpdated: '2024-01-12'
  },
  {
    id: '4',
    name: '麗ちゃん',
    description: '薬研堀の人気店。夜遅くまで営業しており、飲み会の〆にも最適。こだわりの麺とソースが絶品。',
    address: '広島県広島市中区薬研堀10-6',
    area: '薬研堀・流川',
    phone: '082-248-4438',
    openingHours: {
      monday: { isOpen: true, open: '17:00', close: '01:00' },
      tuesday: { isOpen: true, open: '17:00', close: '01:00' },
      wednesday: { isOpen: true, open: '17:00', close: '01:00' },
      thursday: { isOpen: true, open: '17:00', close: '01:00' },
      friday: { isOpen: true, open: '17:00', close: '02:00' },
      saturday: { isOpen: true, open: '17:00', close: '02:00' },
      sunday: { isOpen: false }
    },
    priceRange: '1000円～1500円',
    rating: 4.2,
    reviewCount: 189,
    images: ['/images/reichan-1.svg', '/images/reichan-2.svg'],
    specialties: ['深夜営業', 'いか天', 'チーズ焼き'],
    features: ['カウンター席', 'テーブル席', '深夜営業', 'PayPay可'],
    coordinates: { lat: 34.3943, lng: 132.4563 },
    isOpen: true,
    lastUpdated: '2024-01-08'
  },
  {
    id: '5',
    name: 'さくら',
    description: '広島駅近くのアクセス抜群の人気店。観光客にも地元の人にも愛される味。ボリューム満点でコスパ最高。',
    address: '広島県広島市南区松原町5-1',
    area: '広島駅周辺',
    phone: '082-261-8739',
    openingHours: {
      monday: { isOpen: true, open: '10:00', close: '21:00' },
      tuesday: { isOpen: true, open: '10:00', close: '21:00' },
      wednesday: { isOpen: true, open: '10:00', close: '21:00' },
      thursday: { isOpen: true, open: '10:00', close: '21:00' },
      friday: { isOpen: true, open: '10:00', close: '21:00' },
      saturday: { isOpen: true, open: '10:00', close: '21:00' },
      sunday: { isOpen: true, open: '10:00', close: '21:00' }
    },
    priceRange: '500円～1000円',
    rating: 4.0,
    reviewCount: 567,
    images: ['/images/sakura-1.svg', '/images/sakura-2.svg'],
    specialties: ['ボリューム満点', '海鮮ミックス', 'もちチーズ'],
    features: ['テーブル席', 'カウンター席', '観光客歓迎', 'クレジットカード可', 'PayPay可'],
    coordinates: { lat: 34.3974, lng: 132.4759 },
    isOpen: true,
    lastUpdated: '2024-01-14'
  },
  {
    id: '6',
    name: '弁慶',
    description: '宮島口にある老舗店。宮島観光の前後に立ち寄るのに最適。牡蠣入りお好み焼きが名物。',
    address: '広島県廿日市市宮島口1-5-11',
    area: '宮島口',
    phone: '0829-56-0045',
    openingHours: {
      monday: { isOpen: true, open: '10:00', close: '19:00' },
      tuesday: { isOpen: true, open: '10:00', close: '19:00' },
      wednesday: { isOpen: false },
      thursday: { isOpen: true, open: '10:00', close: '19:00' },
      friday: { isOpen: true, open: '10:00', close: '19:00' },
      saturday: { isOpen: true, open: '10:00', close: '19:00' },
      sunday: { isOpen: true, open: '10:00', close: '19:00' }
    },
    priceRange: '1000円～1500円',
    rating: 4.4,
    reviewCount: 312,
    images: ['/images/benkei-1.svg', '/images/benkei-2.svg'],
    specialties: ['牡蠣入り', '宮島もみじ豚', '地ダコ入り'],
    features: ['老舗', 'テーブル席', '駐車場', '観光客歓迎', '英語メニュー'],
    coordinates: { lat: 34.2966, lng: 132.3203 },
    isOpen: true,
    lastUpdated: '2024-01-09'
  },
  {
    id: '7',
    name: 'だるま',
    description: '地元の常連客で賑わう隠れた名店。シンプルながらも深い味わいが自慢。アットホームな雰囲気が魅力。',
    address: '広島県広島市中区袋町3-17',
    area: '袋町・中町',
    phone: '082-247-3766',
    openingHours: {
      monday: { isOpen: true, open: '11:00', close: '20:00' },
      tuesday: { isOpen: true, open: '11:00', close: '20:00' },
      wednesday: { isOpen: true, open: '11:00', close: '20:00' },
      thursday: { isOpen: false },
      friday: { isOpen: true, open: '11:00', close: '20:00' },
      saturday: { isOpen: true, open: '11:00', close: '20:00' },
      sunday: { isOpen: true, open: '11:00', close: '20:00' }
    },
    priceRange: '500円～1000円',
    rating: 4.3,
    reviewCount: 145,
    images: ['/images/daruma-1.svg', '/images/daruma-2.svg'],
    specialties: ['昔ながらの味', 'シンプル', 'そば玉子'],
    features: ['カウンター席', '禁煙', 'テイクアウト可'],
    coordinates: { lat: 34.3959, lng: 132.4598 },
    isOpen: true,
    lastUpdated: '2024-01-11'
  },
  {
    id: '8',
    name: '風月',
    description: '関西と広島の味を融合させた新しいスタイルのお好み焼き。モダンな店内で若い世代にも人気。',
    address: '広島県広島市中区本通9-33',
    area: '本通・八丁堀',
    phone: '082-248-8877',
    openingHours: {
      monday: { isOpen: true, open: '11:30', close: '21:30' },
      tuesday: { isOpen: true, open: '11:30', close: '21:30' },
      wednesday: { isOpen: true, open: '11:30', close: '21:30' },
      thursday: { isOpen: true, open: '11:30', close: '21:30' },
      friday: { isOpen: true, open: '11:30', close: '21:30' },
      saturday: { isOpen: true, open: '11:30', close: '21:30' },
      sunday: { isOpen: true, open: '11:30', close: '21:30' }
    },
    priceRange: '1000円～1500円',
    rating: 3.9,
    reviewCount: 203,
    images: ['/images/fugetsu-1.svg', '/images/fugetsu-2.svg'],
    specialties: ['関西風ミックス', 'チーズ明太', 'アボカド'],
    features: ['テーブル席', '個室', 'クレジットカード可', 'PayPay可', '英語メニュー'],
    coordinates: { lat: 34.3954, lng: 132.4587 },
    isOpen: true,
    lastUpdated: '2024-01-13'
  }
];

export const getRestaurantById = (id: string): Restaurant | undefined => {
  return mockRestaurants.find(restaurant => restaurant.id === id);
};

export const getRestaurantsByArea = (area: string): Restaurant[] => {
  return mockRestaurants.filter(restaurant => restaurant.area === area);
};

export const getFeaturedRestaurants = (): Restaurant[] => {
  return mockRestaurants
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);
};