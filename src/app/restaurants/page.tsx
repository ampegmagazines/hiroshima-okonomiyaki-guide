'use client';

import { useState } from 'react';
// import { Search, Filter, MapPin, Star } from 'lucide-react';
import { RestaurantCard } from '@/components/RestaurantCard';
import { RestaurantFilters } from '@/components/RestaurantFilters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { mockRestaurants } from '@/data/restaurants';
import { Restaurant } from '@/types/restaurant';
import Link from 'next/link';

export default function RestaurantsPage() {
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(mockRestaurants);
  const [sortBy, setSortBy] = useState<'rating' | 'name' | 'area' | 'price'>('rating');
  
  const areas = [...new Set(mockRestaurants.map(r => r.area))];
  // const priceRanges = [...new Set(mockRestaurants.map(r => r.priceRange))];
  const totalRestaurants = mockRestaurants.length;
  const averageRating = (mockRestaurants.reduce((sum, r) => sum + r.rating, 0) / mockRestaurants.length).toFixed(1);

  const handleFilterChange = (filtered: Restaurant[]) => {
    setFilteredRestaurants(filtered);
  };

  const sortRestaurants = (restaurants: Restaurant[], sortBy: string) => {
    switch (sortBy) {
      case 'name':
        return restaurants.sort((a, b) => a.name.localeCompare(b.name));
      case 'area':
        return restaurants.sort((a, b) => a.area.localeCompare(b.area));
      case 'price':
        const priceOrder = ['～500円', '500円～1000円', '1000円～1500円', '1500円～2000円', '2000円～'];
        return restaurants.sort((a, b) => priceOrder.indexOf(a.priceRange) - priceOrder.indexOf(b.priceRange));
      case 'rating':
      default:
        return restaurants.sort((a, b) => b.rating - a.rating);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-orange-600">
              広島お好み焼きガイド
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-sm hover:text-orange-600 transition-colors">ホーム</Link>
              <Link href="/restaurants" className="text-sm text-orange-600 font-semibold">店舗一覧</Link>
              <a href="#" className="text-sm hover:text-orange-600 transition-colors">エリア別</a>
              <a href="#" className="text-sm hover:text-orange-600 transition-colors">ランキング</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* パンくずナビ */}
        <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-orange-600 transition-colors">ホーム</Link>
          <span>/</span>
          <span className="text-foreground">店舗一覧</span>
        </div>

        {/* ページヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">広島お好み焼き店舗一覧</h1>
          <p className="text-muted-foreground text-lg">
            広島の本格お好み焼きを提供する厳選された {totalRestaurants} 店舗をご紹介します。
          </p>
        </div>

        {/* 統計情報 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-orange-600">{totalRestaurants}</div>
              <div className="text-sm text-muted-foreground">掲載店舗数</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-orange-600">{areas.length}</div>
              <div className="text-sm text-muted-foreground">対応エリア</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-orange-600">{averageRating}</div>
              <div className="text-sm text-muted-foreground">平均評価</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {mockRestaurants.reduce((sum, r) => sum + r.reviewCount, 0)}
              </div>
              <div className="text-sm text-muted-foreground">総レビュー数</div>
            </CardContent>
          </Card>
        </div>

        {/* フィルター・検索セクション */}
        <RestaurantFilters 
          restaurants={mockRestaurants}
          onFilterChange={handleFilterChange}
        />

        {/* 並び替えオプション */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="text-muted-foreground">
            {filteredRestaurants.length} 店舗を表示中 ({totalRestaurants} 店舗中)
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">並び替え:</span>
            <div className="flex gap-2">
              <Badge 
                variant={sortBy === 'rating' ? "default" : "outline"} 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => setSortBy('rating')}
              >
                評価順
              </Badge>
              <Badge 
                variant={sortBy === 'name' ? "default" : "outline"} 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => setSortBy('name')}
              >
                名前順
              </Badge>
              <Badge 
                variant={sortBy === 'area' ? "default" : "outline"} 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => setSortBy('area')}
              >
                エリア順
              </Badge>
              <Badge 
                variant={sortBy === 'price' ? "default" : "outline"} 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => setSortBy('price')}
              >
                価格順
              </Badge>
            </div>
          </div>
        </div>

        {/* 店舗リスト */}
        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {sortRestaurants([...filteredRestaurants], sortBy).map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <Card className="mb-8">
            <CardContent className="pt-6 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">該当する店舗が見つかりません</h3>
              <p className="text-muted-foreground mb-4">
                検索条件を変更して、再度お試しください。
              </p>
            </CardContent>
          </Card>
        )}

        {/* ページネーション（将来の拡張用） */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">すべての店舗を表示しています</p>
          <Button variant="outline" asChild>
            <Link href="/">
              ホームに戻る
            </Link>
          </Button>
        </div>
      </div>

      {/* フッター */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4 text-orange-400">広島お好み焼きガイド</h4>
              <p className="text-gray-400 text-sm">
                広島の本格お好み焼きを愛するすべての人に、
                最高の店舗情報をお届けします。
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">メニュー</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition-colors">ホーム</Link></li>
                <li><Link href="/restaurants" className="hover:text-white transition-colors">店舗一覧</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">エリア別検索</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ランキング</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">サイト情報</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">このサイトについて</a></li>
                <li><a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a></li>
                <li><a href="#" className="hover:text-white transition-colors">お問い合わせ</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 広島お好み焼きガイド. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}