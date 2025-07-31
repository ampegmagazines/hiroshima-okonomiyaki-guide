import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Filter } from 'lucide-react';
import { RestaurantCard } from '@/components/RestaurantCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getRestaurantsByArea, mockRestaurants } from '@/data/restaurants';
import { Area } from '@/types/restaurant';

interface AreaPageProps {
  params: Promise<{
    area: string;
  }>;
}

const areaDescriptions: Record<Area, { title: string; description: string; features: string[] }> = {
  '本通・八丁堀': {
    title: '本通・八丁堀エリア',
    description: '広島市中心部の繁華街。老舗から有名店まで多様なお好み焼き店が集まる激戦区。観光客にも地元民にも人気のエリアです。',
    features: ['老舗店が多い', 'アクセス良好', '観光客向け', '営業時間が長い']
  },
  '広島駅周辺': {
    title: '広島駅周辺エリア',
    description: '広島の玄関口である広島駅周辺。旅行者が最初に訪れることの多いエリアで、アクセス抜群のお好み焼き店が揃っています。',
    features: ['駅近でアクセス良好', '旅行者向け', 'ボリューム満点', 'コスパ良し']
  },
  '紙屋町': {
    title: '紙屋町エリア',
    description: '広島市の中心商業地区。ビジネス街に位置し、地元のサラリーマンや住民に愛される隠れた名店が点在しています。',
    features: ['地元密着', 'ビジネス街', '穴場店', 'ランチタイム人気']
  },
  '袋町・中町': {
    title: '袋町・中町エリア',
    description: '広島市中区の住宅街に位置するエリア。地元の常連客に愛される家庭的な雰囲気のお好み焼き店が特徴です。',
    features: ['アットホーム', '地元の常連客', '家庭的', '隠れた名店']
  },
  '薬研堀・流川': {
    title: '薬研堀・流川エリア',
    description: '広島の夜の繁華街として知られるエリア。深夜まで営業している店が多く、飲み会の締めにも最適です。',
    features: ['夜の繁華街', '深夜営業', '飲み会の締め', '大人の雰囲気']
  },
  'お好み村': {
    title: 'お好み村エリア',
    description: '広島お好み焼きの聖地とも言えるお好み村。複数のお好み焼き店が一つの建物に集まる観光スポットです。',
    features: ['観光名所', '選択肢豊富', '比較しながら選べる', '広島の象徴']
  },
  '宮島口': {
    title: '宮島口エリア',
    description: '世界遺産宮島への玄関口。宮島観光の前後に立ち寄れる立地で、牡蠣などの地元食材を使った特色あるお好み焼きが楽しめます。',
    features: ['宮島観光拠点', '地元食材使用', '牡蠣入り', '観光ついで']
  },
  'その他': {
    title: 'その他エリア',
    description: '広島市内の様々なエリアに点在するお好み焼き店。それぞれに個性と魅力があります。',
    features: ['個性豊か', '穴場店', '地域密着', '多様性']
  }
};

export default async function AreaPage({ params }: AreaPageProps) {
  const { area: encodedArea } = await params;
  const area = decodeURIComponent(encodedArea) as Area;
  
  // エリアが有効かチェック
  if (!areaDescriptions[area]) {
    notFound();
  }

  const restaurants = getRestaurantsByArea(area);
  const areaInfo = areaDescriptions[area];
  const averageRating = restaurants.length > 0 
    ? (restaurants.reduce((sum, r) => sum + r.rating, 0) / restaurants.length).toFixed(1)
    : '0.0';

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
              <Link href="/restaurants" className="text-sm hover:text-orange-600 transition-colors">店舗一覧</Link>
              <a href="#" className="text-sm text-orange-600 font-semibold">エリア別</a>
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
          <a href="#" className="hover:text-orange-600 transition-colors">エリア別</a>
          <span>/</span>
          <span className="text-foreground">{areaInfo.title}</span>
        </div>

        {/* 戻るボタン */}
        <Link href="/restaurants">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            店舗一覧に戻る
          </Button>
        </Link>

        {/* エリア紹介 */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <MapPin className="h-6 w-6 text-orange-600" />
                {areaInfo.title}
              </CardTitle>
              <CardDescription className="text-lg leading-relaxed">
                {areaInfo.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">このエリアの特徴</h4>
                  <div className="flex flex-wrap gap-2">
                    {areaInfo.features.map((feature, index) => (
                      <Badge key={index} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* エリア統計 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-orange-600">{restaurants.length}</div>
              <div className="text-sm text-muted-foreground">このエリアの店舗数</div>
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
                {restaurants.reduce((sum, r) => sum + r.reviewCount, 0)}
              </div>
              <div className="text-sm text-muted-foreground">総レビュー数</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {restaurants.filter(r => r.isOpen).length}
              </div>
              <div className="text-sm text-muted-foreground">営業中の店舗</div>
            </CardContent>
          </Card>
        </div>

        {/* 他のエリアへのリンク */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              他のエリアも見る
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Object.keys(areaDescriptions).map((otherArea) => {
                const count = mockRestaurants.filter(r => r.area === otherArea).length;
                const isCurrentArea = otherArea === area;
                
                return (
                  <Link 
                    key={otherArea} 
                    href={`/area/${encodeURIComponent(otherArea)}`}
                    className={isCurrentArea ? 'pointer-events-none' : ''}
                  >
                    <Badge
                      variant={isCurrentArea ? "default" : "outline"}
                      className={`px-3 py-1 ${!isCurrentArea ? 'cursor-pointer hover:bg-orange-50 hover:border-orange-300 transition-colors' : ''}`}
                    >
                      {otherArea} ({count})
                    </Badge>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* 店舗リスト */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{areaInfo.title}の店舗</h2>
            <div className="text-muted-foreground">
              {restaurants.length} 店舗
            </div>
          </div>
        </div>

        {restaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {restaurants
              .sort((a, b) => b.rating - a.rating)
              .map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
          </div>
        ) : (
          <Card className="mb-8">
            <CardContent className="pt-6 text-center">
              <div className="text-6xl mb-4">🍳</div>
              <h3 className="text-xl font-semibold mb-2">このエリアには店舗がありません</h3>
              <p className="text-muted-foreground mb-4">
                現在、{areaInfo.title}には掲載している店舗がありません。
              </p>
              <Button asChild>
                <Link href="/restaurants">
                  他のエリアの店舗を見る
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* 戻るボタン */}
        <div className="text-center">
          <Button variant="outline" asChild>
            <Link href="/restaurants">
              店舗一覧に戻る
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