import Link from 'next/link';
import { Search, MapPin } from 'lucide-react';
import { RestaurantCard } from '@/components/RestaurantCard';
import { Button } from '@/components/ui/button';
import { mockRestaurants, getFeaturedRestaurants } from '@/data/restaurants';

export default function Home() {
  const featuredRestaurants = getFeaturedRestaurants();
  const areas = ['本通・八丁堀', 'お好み村', '広島駅周辺', '薬研堀・流川', '宮島口'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* ヘッダー */}
      <header className="glass-card sticky top-0 z-50 border-0 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-4xl">🥞</div>
              <h1 className="text-3xl font-display font-bold text-gradient">
                広島お好み焼きガイド
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/restaurants" className="text-base font-medium hover:text-orange-600 transition-all duration-300 hover:scale-105">
                店舗一覧
              </Link>
              <a href="#areas" className="text-base font-medium hover:text-orange-600 transition-all duration-300 hover:scale-105">
                エリア別
              </a>
              <a href="#featured" className="text-base font-medium hover:text-orange-600 transition-all duration-300 hover:scale-105">
                おすすめ
              </a>
              <a href="#stats" className="text-base font-medium hover:text-orange-600 transition-all duration-300 hover:scale-105">
                統計
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="relative okonomiyaki-hero py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 text-6xl opacity-20 floating">🥬</div>
          <div className="absolute top-40 right-20 text-5xl opacity-20 floating" style={{animationDelay: '1s'}}>🥓</div>
          <div className="absolute bottom-20 left-20 text-7xl opacity-20 floating" style={{animationDelay: '2s'}}>🍳</div>
          <div className="absolute bottom-40 right-10 text-4xl opacity-20 floating" style={{animationDelay: '0.5s'}}>🧅</div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-6xl mb-6 floating">🥞</div>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-8 leading-tight">
              広島の<span className="text-yellow-200 drop-shadow-lg">本格</span>
              <br />
              お好み焼きを探そう
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              地元で愛される老舗から観光客に人気の有名店まで、<br className="hidden md:block" />
              広島のお好み焼き屋を厳選してご紹介します
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/restaurants">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 shadow-2xl text-lg px-8 py-4 glow">
                  <Search className="mr-3 h-6 w-6" />
                  店舗を探す
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-orange-600 shadow-xl text-lg px-8 py-4">
                <MapPin className="mr-3 h-6 w-6" />
                エリア別に見る
              </Button>
            </div>
          </div>
        </div>
        
        {/* 装飾的な波 */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-white">
            <path d="M0,120 C150,60 350,0 600,30 C850,60 1050,120 1200,90 L1200,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* エリア別クイックアクセス */}
      <section id="areas" className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-4xl font-display font-bold text-gray-900 mb-4">エリア別で探す</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              広島各地の特色あるエリアから、お好みのお好み焼き店を見つけましょう
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {areas.map((area, index) => {
              const areaEmojis = ['🏙️', '🏮', '🚅', '🌃', '⛩️'];
              const areaDescriptions = [
                '中心街の人気店',
                'お好み焼きの聖地',
                'アクセス抜群',
                '夜の繁華街',
                '観光地の名店'
              ];
              
              return (
                <Link key={area} href={`/area/${encodeURIComponent(area)}`}>
                  <div className="group bg-gradient-to-br from-white to-orange-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-orange-100 hover:border-orange-200 hover:-translate-y-2">
                    <div className="text-center">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {areaEmojis[index]}
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{area}</h4>
                      <p className="text-sm text-gray-600 mb-4">{areaDescriptions[index]}</p>
                      <div className="inline-flex items-center text-orange-600 font-medium group-hover:text-orange-700">
                        <MapPin className="mr-2 h-4 w-4" />
                        エリアを見る
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* おすすめ店舗 */}
      <section id="featured" className="py-20 bg-gradient-to-br from-orange-50 via-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-4xl font-display font-bold text-gray-900 mb-4">おすすめ店舗</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              評価が高く、地元の人にも観光客にも愛される人気店をご紹介。<br />
              どの店舗も広島お好み焼きの真髄を味わえる名店ばかりです。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredRestaurants.map((restaurant, index) => (
              <div 
                key={restaurant.id} 
                className="opacity-0 animate-in slide-in-from-bottom-8 duration-700"
                style={{animationDelay: `${index * 100}ms`, animationFillMode: 'forwards'}}
              >
                <RestaurantCard restaurant={restaurant} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/restaurants">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-xl px-8 py-4 text-lg glow">
                すべての店舗を見る
                <div className="ml-2">→</div>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 統計情報 */}
      <section id="stats" className="py-20 bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-3xl font-display font-bold mb-4">サイト統計</h3>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              広島お好み焼きの魅力を数字で実感
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-2">🏪</div>
                <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">
                  {mockRestaurants.length}
                </div>
                <div className="text-white/80 font-medium">掲載店舗数</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-2">📍</div>
                <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">
                  {new Set(mockRestaurants.map(r => r.area)).size}
                </div>
                <div className="text-white/80 font-medium">対応エリア</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-2">💬</div>
                <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">
                  {mockRestaurants.reduce((sum, r) => sum + r.reviewCount, 0)}
                </div>
                <div className="text-white/80 font-medium">総レビュー数</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-2">⭐</div>
                <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">
                  {(mockRestaurants.reduce((sum, r) => sum + r.rating, 0) / mockRestaurants.length).toFixed(1)}
                </div>
                <div className="text-white/80 font-medium">平均評価</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 装飾的なパターン */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-32 w-12 h-12 bg-white rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 bg-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <div className="w-full h-full bg-gray-800 bg-opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="text-3xl">🥞</div>
                <h4 className="text-2xl font-display font-bold text-gradient">広島お好み焼きガイド</h4>
              </div>
              <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-lg">
                広島の本格お好み焼きを愛するすべての人に、最高の店舗情報をお届けします。
                伝統と革新が織りなす、お好み焼きの世界をお楽しみください。
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                  <div className="text-lg">📧</div>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                  <div className="text-lg">📱</div>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                  <div className="text-lg">🌐</div>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-bold mb-6 text-lg text-orange-400">メニュー</h5>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-orange-400 transition-colors flex items-center group">
                    <span className="mr-2 group-hover:mr-3 transition-all">🏠</span>
                    ホーム
                  </Link>
                </li>
                <li>
                  <Link href="/restaurants" className="text-gray-300 hover:text-orange-400 transition-colors flex items-center group">
                    <span className="mr-2 group-hover:mr-3 transition-all">📋</span>
                    店舗一覧
                  </Link>
                </li>
                <li>
                  <a href="#areas" className="text-gray-300 hover:text-orange-400 transition-colors flex items-center group">
                    <span className="mr-2 group-hover:mr-3 transition-all">📍</span>
                    エリア別検索
                  </a>
                </li>
                <li>
                  <a href="#featured" className="text-gray-300 hover:text-orange-400 transition-colors flex items-center group">
                    <span className="mr-2 group-hover:mr-3 transition-all">⭐</span>
                    おすすめ
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold mb-6 text-lg text-orange-400">サイト情報</h5>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors flex items-center group">
                    <span className="mr-2 group-hover:mr-3 transition-all">ℹ️</span>
                    このサイトについて
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors flex items-center group">
                    <span className="mr-2 group-hover:mr-3 transition-all">🔒</span>
                    プライバシーポリシー
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors flex items-center group">
                    <span className="mr-2 group-hover:mr-3 transition-all">📞</span>
                    お問い合わせ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors flex items-center group">
                    <span className="mr-2 group-hover:mr-3 transition-all">🍳</span>
                    お好み焼きの歴史
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                &copy; 2024 広島お好み焼きガイド. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span>Made with ❤️ in Hiroshima</span>
                <span>🥞 お好み焼き愛好家による</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}