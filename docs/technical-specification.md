# 広島お好み焼きガイド - 技術仕様書

## 1. システム概要

### 1.1 アーキテクチャ
- **フレームワーク**: Next.js 15.4.5 (App Router)
- **言語**: TypeScript 5+
- **スタイリング**: TailwindCSS 3+
- **UIライブラリ**: shadcn/ui
- **ビルドツール**: Turbopack
- **デプロイ**: Static Site Generation (SSG)

### 1.2 プロジェクト構造
```
hiroshima-okonomiyaki-guide/
├── src/
│   ├── app/                    # App Router ページ
│   │   ├── globals.css        # グローバルスタイル
│   │   ├── layout.tsx         # ルートレイアウト
│   │   ├── page.tsx           # ホームページ
│   │   ├── restaurants/       # 店舗一覧
│   │   ├── restaurant/[id]/   # 店舗詳細
│   │   └── area/[area]/       # エリア別
│   ├── components/            # 再利用可能コンポーネント
│   │   └── ui/               # shadcn/ui コンポーネント
│   ├── data/                 # データファイル
│   ├── lib/                  # ユーティリティ関数
│   └── types/                # TypeScript型定義
├── public/                   # 静的ファイル
│   └── images/              # 画像ファイル
├── docs/                    # プロジェクト文書
└── 設定ファイル群
```

## 2. 技術スタック詳細

### 2.1 フロントエンド技術

#### Next.js 15.4.5
- **App Router**: 最新のNext.jsルーティングシステム
- **Turbopack**: 高速ビルドツール
- **Image Optimization**: 自動画像最適化
- **Font Optimization**: フォント最適化
- **SEO**: メタデータAPI使用

#### TypeScript
- **バージョン**: 5.0+
- **設定**: strict モード有効
- **型安全性**: 全コンポーネントで型定義

#### TailwindCSS
- **バージョン**: 3.0+
- **設定**: カスタムテーマ・カラーパレット
- **レスポンシブ**: モバイルファースト設計
- **ダークモード**: サポート準備

### 2.2 UIコンポーネント

#### shadcn/ui
- **Radix UI**: アクセシブルなプリミティブ
- **カスタマイズ**: プロジェクト固有のスタイル
- **コンポーネント一覧**:
  - Card, CardHeader, CardContent
  - Button
  - Badge
  - フォーム関連コンポーネント

#### Lucide React
- **アイコンライブラリ**: 軽量でカスタマイズ可能
- **使用アイコン**: Star, MapPin, Clock, Phone, Globe, etc.

## 3. データ構造・API設計

### 3.1 型定義

#### Restaurant型
```typescript
interface Restaurant {
  id: string;                    // 一意識別子
  name: string;                  // 店舗名
  description: string;           // 店舗説明
  address: string;               // 住所
  area: Area;                    // エリア
  phone?: string;                // 電話番号（オプション）
  website?: string;              // ウェブサイト（オプション）
  openingHours: OpeningHours;    // 営業時間
  priceRange: PriceRange;        // 価格帯
  rating: number;                // 評価 (0-5)
  reviewCount: number;           // レビュー数
  images: string[];              // 画像パス配列
  specialties: string[];         // 名物・特色
  features: Feature[];           // 特徴・設備
  coordinates: Coordinates;      // 座標
  isOpen: boolean;               // 現在の営業状況
  lastUpdated: string;           // 最終更新日
}
```

#### 営業時間型
```typescript
interface OpeningHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

interface DaySchedule {
  isOpen: boolean;               // 営業日かどうか
  open?: string;                 // 開店時間
  close?: string;                // 閉店時間
  breakTime?: {                  // 休憩時間（将来用）
    start: string;
    end: string;
  };
}
```

#### その他の型
```typescript
type Area = 
  | '本通・八丁堀'
  | '広島駅周辺'
  | '紙屋町'
  | '袋町・中町'
  | '薬研堀・流川'
  | 'お好み村'
  | '宮島口'
  | 'その他';

type PriceRange = 
  | '～500円'
  | '500円～1000円'
  | '1000円～1500円'
  | '1500円～2000円'
  | '2000円～';

type Feature = 
  | 'テーブル席' | 'カウンター席' | '個室'
  | '禁煙' | '分煙' | '駐車場'
  | 'クレジットカード可' | 'PayPay可'
  | '英語メニュー' | '観光客歓迎'
  | 'テイクアウト可' | '老舗' | '有名店'
  | '深夜営業';
```

### 3.2 データ管理

#### データファイル
- **場所**: `/src/data/restaurants.ts`
- **形式**: TypeScript配列として定義
- **店舗数**: 8店舗（初期データセット）

#### データ取得関数
```typescript
// 全店舗取得
export const getFeaturedRestaurants = (): Restaurant[]

// ID指定で店舗取得
export const getRestaurantById = (id: string): Restaurant | undefined

// エリア指定で店舗取得
export const getRestaurantsByArea = (area: string): Restaurant[]
```

## 4. ページ仕様・ルーティング

### 4.1 ページ一覧

#### ホームページ (/)
- **ファイル**: `/src/app/page.tsx`
- **機能**:
  - ヒーローセクション
  - 注目店舗表示（評価順TOP6）
  - エリア別クイックアクセス
  - 統計情報
- **データ取得**: `getFeaturedRestaurants()`

#### 店舗一覧 (/restaurants)
- **ファイル**: `/src/app/restaurants/page.tsx`
- **機能**:
  - 全店舗リスト表示
  - フィルタリング（エリア、価格帯、特徴、営業状況）
  - レスポンシブカードレイアウト
- **データ取得**: 静的データ使用

#### 店舗詳細 (/restaurant/[id])
- **ファイル**: `/src/app/restaurant/[id]/page.tsx`
- **機能**:
  - 詳細情報表示
  - 画像ギャラリー
  - 営業時間・現在の営業状況
  - アクションボタン（電話・地図・公式サイト）
- **データ取得**: `getRestaurantById(id)`

#### エリア別 (/area/[area])
- **ファイル**: `/src/app/area/[area]/page.tsx`
- **機能**:
  - エリア固有店舗一覧
  - エリア情報表示
- **データ取得**: `getRestaurantsByArea(area)`

### 4.2 動的ルーティング

#### 静的生成パス
```typescript
// 店舗詳細ページ
export async function generateStaticParams() {
  return mockRestaurants.map((restaurant) => ({
    id: restaurant.id,
  }));
}

// エリア別ページ
export async function generateStaticParams() {
  const areas = Array.from(new Set(mockRestaurants.map(r => r.area)));
  return areas.map((area) => ({
    area: encodeURIComponent(area),
  }));
}
```

## 5. スタイリング・デザインシステム

### 5.1 カラーパレット
```css
:root {
  /* お好み焼きテーマの温かい色彩 */
  --primary: 25 90% 48%;           /* オレンジ */
  --accent: 15 80% 55%;            /* 深いオレンジ */
  --background: 35 20% 98%;        /* オフホワイト */
  --foreground: 30 10% 15%;        /* ダークブラウン */
  
  /* カスタムカラー */
  --okonomiyaki-brown: 25 35% 35%;
  --okonomiyaki-sauce: 15 80% 25%;
  --okonomiyaki-cabbage: 120 40% 65%;
}
```

### 5.2 カスタムコンポーネントクラス
```css
.okonomiyaki-hero {
  background: linear-gradient(135deg, 
    hsl(25 90% 48% / 0.95) 0%, 
    hsl(15 80% 55% / 0.9) 50%, 
    hsl(35 70% 45% / 0.95) 100%);
}

.restaurant-card {
  @apply bg-white rounded-2xl shadow-lg hover:shadow-2xl 
         transition-all duration-300 overflow-hidden 
         border border-orange-100/50;
  backdrop-filter: blur(10px);
}

.restaurant-card:hover {
  transform: translateY(-8px);
}
```

### 5.3 レスポンシブ設計
- **ブレークポイント**: TailwindCSS標準
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
- **モバイルファースト**: 基本設計方針
- **グリッドレイアウト**: CSS Grid使用

## 6. 画像管理・最適化

### 6.1 画像構成
- **メイン画像**: 各店舗1枚（600x400px）
- **ギャラリー画像**: 各店舗追加1枚以上
- **形式**: SVG（プレースホルダー）、将来的にJPG/PNG
- **命名規則**: `{restaurant-name}-{number}.{ext}`

### 6.2 Next.js Image最適化
```typescript
<Image
  src={restaurant.images[0]}
  alt={`${restaurant.name}の外観`}
  fill
  className="object-cover"
  priority
/>
```

- **lazy loading**: デフォルト有効
- **priority**: メイン画像のみ設定
- **responsive**: 自動レスポンシブ対応

## 7. パフォーマンス最適化

### 7.1 ビルド最適化
- **Static Generation**: 全ページSSG
- **Bundle Splitting**: 自動コード分割
- **Tree Shaking**: 未使用コード除去
- **Minification**: CSS/JS圧縮

### 7.2 ランタイム最適化
- **Image Optimization**: Next.js自動最適化
- **Font Optimization**: Google Fontsの最適化
- **Prefetching**: リンクの自動プリフェッチ

### 7.3 目標パフォーマンス指標
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 8. 開発・ビルド環境

### 8.1 開発コマンド
```bash
npm run dev          # 開発サーバー起動
npm run build        # プロダクションビルド
npm run start        # プロダクションサーバー
npm run lint         # ESLint実行
npm run type-check   # TypeScriptチェック
```

### 8.2 設定ファイル

#### Next.js設定
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['via.placeholder.com'],
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};
```

#### TailwindCSS設定
```javascript
// tailwind.config.ts
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // カスタムカラー定義
      },
    },
  },
  plugins: [],
};
```

## 9. テスト戦略

### 9.1 テスト種別（将来実装）
- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: Cypress
- **E2E Tests**: Playwright
- **Performance Tests**: Lighthouse CI

### 9.2 テスト対象
- コンポーネントの正常レンダリング
- データ取得関数の動作
- ルーティングの正常動作
- レスポンシブデザインの検証

## 10. デプロイメント・運用

### 10.1 デプロイ戦略
- **ホスティング**: Vercel（推奨）
- **ビルド**: Static Site Generation
- **CDN**: 自動配信
- **ドメイン**: カスタムドメイン対応

### 10.2 環境設定
- **本番環境**: 静的サイト
- **ステージング環境**: プレビューデプロイ
- **開発環境**: ローカル開発サーバー

### 10.3 監視・分析
- **Analytics**: Google Analytics（将来）
- **Performance**: Core Web Vitals監視
- **Error Tracking**: Sentry（将来）

---

**作成日**: 2024年7月31日  
**最終更新**: 2024年7月31日  
**バージョン**: 1.0.0  
**作成者**: Claude Code Assistant