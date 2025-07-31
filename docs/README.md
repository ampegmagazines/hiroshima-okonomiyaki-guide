# 広島お好み焼きガイド

> 広島の本格お好み焼きを愛するすべての人に、最高の店舗情報をお届けするWebアプリケーション

![Project Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3+-38B2AC)

## 🎯 プロジェクト概要

広島お好み焼きガイドは、広島県内の優良お好み焼き店舗を紹介するモダンなWebアプリケーションです。観光客と地元住民の両方が利用しやすい、包括的な店舗ガイドを提供します。

### ✨ 主な機能

- 🏪 **店舗一覧・詳細表示**: 8店舗の詳細情報を提供
- 🗺️ **エリア別検索**: 広島市内7エリアでの店舗検索
- 🔍 **高度なフィルタリング**: 価格帯、特徴、営業状況での絞り込み
- 📱 **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応
- ⏰ **リアルタイム営業状況**: 現在の営業時間を動的表示
- 🖼️ **画像ギャラリー**: 各店舗の魅力的な画像表示

### 🎨 デザインハイライト

- **温かみのあるカラーパレット**: お好み焼きをイメージしたオレンジ系
- **モダンなカードデザイン**: shadcn/ui ベースの洗練されたUI
- **スムーズなアニメーション**: ホバーエフェクトとトランジション
- **アクセシブル設計**: 全ユーザーに配慮したUX

## 🛠️ 技術スタック

### フロントエンド
- **[Next.js 15.4.5](https://nextjs.org/)** - React フレームワーク（App Router使用）
- **[TypeScript](https://www.typescriptlang.org/)** - 型安全な開発
- **[TailwindCSS](https://tailwindcss.com/)** - ユーティリティファーストCSS
- **[shadcn/ui](https://ui.shadcn.com/)** - モダンUIコンポーネント
- **[Lucide React](https://lucide.dev/)** - アイコンライブラリ

### 開発・ビルド
- **[Turbopack](https://turbo.build/pack)** - 高速ビルドツール
- **[ESLint](https://eslint.org/)** - コード品質管理
- **[Prettier](https://prettier.io/)** - コードフォーマッター

## 🚀 セットアップ・インストール

### 前提条件

- Node.js 18.0.0 以上
- npm または yarn
- Git

### インストール手順

1. **リポジトリのクローン**
```bash
git clone <repository-url>
cd hiroshima-okonomiyaki-guide
```

2. **依存関係のインストール**
```bash
npm install
# または
yarn install
```

3. **開発サーバーの起動**
```bash
npm run dev
# または
yarn dev
```

4. **ブラウザでアクセス**
```
http://localhost:3000
```

### 利用可能なコマンド

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm run start

# コードリンティング
npm run lint

# TypeScript型チェック
npm run type-check
```

## 📁 プロジェクト構造

```
hiroshima-okonomiyaki-guide/
├── 📂 src/
│   ├── 📂 app/                    # Next.js App Router
│   │   ├── 📄 globals.css        # グローバルスタイル
│   │   ├── 📄 layout.tsx         # ルートレイアウト
│   │   ├── 📄 page.tsx           # ホームページ
│   │   ├── 📂 restaurants/       # 店舗一覧ページ
│   │   ├── 📂 restaurant/[id]/   # 店舗詳細ページ
│   │   └── 📂 area/[area]/       # エリア別ページ
│   ├── 📂 components/            # 再利用可能コンポーネント
│   │   └── 📂 ui/               # shadcn/ui コンポーネント
│   ├── 📂 data/                 # データファイル
│   │   └── 📄 restaurants.ts    # 店舗データ
│   ├── 📂 lib/                  # ユーティリティ関数
│   │   └── 📄 utils.ts          # 共通関数
│   └── 📂 types/                # TypeScript型定義
│       └── 📄 restaurant.ts     # 店舗関連型
├── 📂 public/                   # 静的ファイル
│   └── 📂 images/              # 画像ファイル
├── 📂 docs/                    # プロジェクト文書
│   ├── 📄 README.md            # プロジェクト概要（本文書）
│   ├── 📄 requirements.md      # 要件定義書
│   ├── 📄 technical-specification.md  # 技術仕様書
│   └── 📄 todo-history.md      # 作業履歴
└── ⚙️ 設定ファイル群
```

## 🗺️ ページ構成

### 🏠 ホームページ (`/`)
- ヒーローセクション
- 注目店舗カード（評価順TOP6）
- エリア別クイックアクセス
- サイト統計情報

### 🍽️ 店舗一覧 (`/restaurants`)
- 全店舗リスト表示
- 多軸フィルタリング機能
- レスポンシブカードレイアウト

### 🏪 店舗詳細 (`/restaurant/[id]`)
- 詳細店舗情報
- 画像ギャラリー
- 営業時間・現在の営業状況
- アクションボタン（電話・地図・公式サイト）

### 📍 エリア別 (`/area/[area]`)
- エリア固有の店舗一覧
- エリア紹介情報

## 🏪 収録店舗

### 本通・八丁堀エリア
- **みっちゃん総本店 八丁堀本店** - 広島風お好み焼きの元祖
- **風月** - 関西と広島の味を融合した新スタイル

### お好み村エリア
- **お好み村 ひろしま村** - お好み村の代表的店舗

### 紙屋町エリア
- **長田屋** - 地元愛され続ける隠れた名店

### 薬研堀・流川エリア
- **麗ちゃん** - 深夜営業の人気店

### 広島駅周辺エリア
- **さくら** - アクセス抜群、ボリューム満点

### 宮島口エリア
- **弁慶** - 牡蠣入りお好み焼きが名物

### 袋町・中町エリア
- **だるま** - シンプルで深い味わいが自慢

## 🎨 デザインシステム

### カラーパレット
```css
Primary Colors:
- Orange: #ff6b35 (メインカラー)
- Deep Orange: #ff8c42 (アクセント)
- Brown: #8b4513 (サブカラー)

Background Colors:
- Light: #fefefe (背景)
- Card: #ffffff (カード背景)
- Muted: #f5f5f5 (ミュート背景)
```

### タイポグラフィ
- **メインフォント**: Noto Sans JP
- **ディスプレイフォント**: Playfair Display
- **アイコン**: Lucide React

## 📊 データ構造

### 店舗データ型
```typescript
interface Restaurant {
  id: string;                    // 一意識別子
  name: string;                  // 店舗名
  description: string;           // 店舗説明
  address: string;               // 住所
  area: Area;                    // エリア
  phone?: string;                // 電話番号
  website?: string;              // ウェブサイト
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

## 🔧 開発ガイドライン

### コーディング規約
- **TypeScript**: strict モード使用
- **ESLint**: エラー0件を維持
- **Prettier**: 自動フォーマット適用
- **コンポーネント**: 関数コンポーネント使用
- **ファイル命名**: kebab-case

### Git運用
- **ブランチ戦略**: feature/機能名
- **コミットメッセージ**: Conventional Commits準拠
- **プルリクエスト**: 必須レビュー

## 🚀 デプロイメント

### 推奨ホスティング
- **[Vercel](https://vercel.com/)** - Next.js最適化
- **[Netlify](https://netlify.com/)** - 静的サイト向け
- **[GitHub Pages](https://pages.github.com/)** - 無料オプション

### ビルド設定
```bash
npm run build    # 静的サイト生成
npm run export   # 静的ファイル出力（将来実装）
```

## 📈 パフォーマンス目標

- **First Contentful Paint**: < 1.5秒
- **Largest Contentful Paint**: < 2.5秒
- **Cumulative Layout Shift**: < 0.1
- **Lighthouse Score**: 90点以上

## 🐛 既知の問題・制限事項

### 現在の問題
1. **デザイン表示問題**: 一部TailwindCSSスタイルが適用されない場合がある
2. **プレースホルダー画像**: 実際の店舗画像への置き換えが必要
3. **SEO最適化**: メタデータの詳細設定が不完全

### 将来の改善予定
- 実際の店舗画像の収集・実装
- ユーザーレビュー機能
- 多言語対応（英語）
- 検索機能の拡張
- PWA対応

## 🤝 コントリビューション

### 貢献方法
1. Issues での不具合報告・機能提案
2. Pull Request による改善提案
3. ドキュメントの改善・翻訳
4. 店舗情報の追加・更新

### 開発参加手順
1. Repository をフォーク
2. Feature ブランチを作成
3. 変更を実装・テスト
4. Pull Request を作成

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

## 📞 サポート・お問い合わせ

- **Issues**: GitHub Issues をご利用ください
- **ドキュメント**: `/docs` フォルダ内の詳細文書
- **開発状況**: [Project Board](プロジェクトボードURL)

---

**プロジェクト開始**: 2024年7月31日  
**現在のバージョン**: v1.0.0-alpha  
**進捗状況**: 約70%完成  
**次回リリース予定**: 2024年8月（予定）

---

Made with ❤️ for Hiroshima Okonomiyaki lovers