import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Star, MapPin, Clock, Phone, Globe, Calendar, Utensils, CreditCard } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getRestaurantById } from '@/data/restaurants';
import { Restaurant, DaySchedule } from '@/types/restaurant';

interface RestaurantDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RestaurantDetailPage({ params }: RestaurantDetailPageProps) {
  const { id } = await params;
  const restaurant = getRestaurantById(id);

  if (!restaurant) {
    notFound();
  }

  const getCurrentDaySchedule = (restaurant: Restaurant): DaySchedule => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[new Date().getDay()] as keyof typeof restaurant.openingHours;
    return restaurant.openingHours[today];
  };

  const formatDaySchedule = (schedule: DaySchedule): string => {
    if (!schedule.isOpen) {
      return '定休日';
    }
    if (!schedule.open || !schedule.close) {
      return '営業時間要確認';
    }
    return `${schedule.open} - ${schedule.close}`;
  };

  const todaySchedule = getCurrentDaySchedule(restaurant);

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
          <Link href="/restaurants" className="hover:text-orange-600 transition-colors">店舗一覧</Link>
          <span>/</span>
          <span className="text-foreground">{restaurant.name}</span>
        </div>

        {/* 戻るボタン */}
        <Link href="/">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            一覧に戻る
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* メイン情報 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 店舗基本情報 */}
            <Card>
              <div className="relative">
                {restaurant.images && restaurant.images.length > 0 ? (
                  <div className="relative h-64 rounded-t-lg overflow-hidden">
                    <Image
                      src={restaurant.images[0]}
                      alt={`${restaurant.name}の外観`}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h1 className="text-3xl font-bold drop-shadow-lg">
                        {restaurant.name}
                      </h1>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 bg-gradient-to-r from-orange-400 to-red-500 rounded-t-lg flex items-center justify-center">
                    <div className="text-white text-3xl font-bold text-center px-4">
                      {restaurant.name}
                    </div>
                  </div>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  {restaurant.features.includes('老舗') && (
                    <Badge className="bg-yellow-600/90 backdrop-blur-sm">老舗</Badge>
                  )}
                  {restaurant.features.includes('有名店') && (
                    <Badge className="bg-red-600/90 backdrop-blur-sm">有名店</Badge>
                  )}
                </div>
              </div>
              
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">{restaurant.name}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl font-semibold">{restaurant.rating}</span>
                    <span className="text-muted-foreground">
                      ({restaurant.reviewCount}件のレビュー)
                    </span>
                  </div>
                </div>
                <CardDescription className="text-lg leading-relaxed">
                  {restaurant.description}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* 店舗詳細情報 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* 基本情報 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    基本情報
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="font-semibold mb-1">住所</div>
                    <div className="text-muted-foreground">{restaurant.address}</div>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">エリア</div>
                    <Badge variant="outline">{restaurant.area}</Badge>
                  </div>
                  {restaurant.phone && (
                    <div>
                      <div className="font-semibold mb-1">電話番号</div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <a href={`tel:${restaurant.phone}`} className="text-orange-600 hover:underline">
                          {restaurant.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  {restaurant.website && (
                    <div>
                      <div className="font-semibold mb-1">ウェブサイト</div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <a 
                          href={restaurant.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-orange-600 hover:underline"
                        >
                          公式サイト
                        </a>
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="font-semibold mb-1">価格帯</div>
                    <Badge className="bg-green-100 text-green-800 border-green-300">
                      {restaurant.priceRange}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* 営業時間 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    営業時間
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(restaurant.openingHours).map(([day, schedule]) => {
                      const dayNames = {
                        monday: '月曜日',
                        tuesday: '火曜日',
                        wednesday: '水曜日',
                        thursday: '木曜日',
                        friday: '金曜日',
                        saturday: '土曜日',
                        sunday: '日曜日'
                      };
                      
                      const isToday = day === ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][new Date().getDay()];
                      
                      return (
                        <div 
                          key={day} 
                          className={`flex justify-between items-center py-1 ${isToday ? 'bg-orange-50 px-2 rounded' : ''}`}
                        >
                          <span className={`${isToday ? 'font-semibold text-orange-600' : ''}`}>
                            {dayNames[day as keyof typeof dayNames]}
                          </span>
                          <span className={`${!schedule.isOpen ? 'text-red-600' : schedule.isOpen && isToday ? 'text-green-600 font-semibold' : ''}`}>
                            {formatDaySchedule(schedule)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-semibold mb-1">今日の営業時間</div>
                    <div className={`text-lg ${todaySchedule.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                      {formatDaySchedule(todaySchedule)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 特徴・名物 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="h-5 w-5" />
                    名物・おすすめメニュー
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    設備・サービス
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 画像ギャラリー */}
              {restaurant.images && restaurant.images.length > 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      📸 店舗の様子
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {restaurant.images.slice(1).map((image, index) => (
                        <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                          <Image
                            src={image}
                            alt={`${restaurant.name}の画像 ${index + 2}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* サイドバー */}
          <div className="space-y-6">
            {/* 営業状況 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">現在の営業状況</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg font-semibold ${
                    restaurant.isOpen && todaySchedule.isOpen
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <div className={`w-3 h-3 rounded-full ${
                      restaurant.isOpen && todaySchedule.isOpen ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    {restaurant.isOpen && todaySchedule.isOpen ? '営業中' : '営業時間外'}
                  </div>
                  {todaySchedule.isOpen && todaySchedule.open && todaySchedule.close && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      {todaySchedule.open} - {todaySchedule.close}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* アクションボタン */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">アクション</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {restaurant.phone && (
                  <Button className="w-full" asChild>
                    <a href={`tel:${restaurant.phone}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      電話をかける
                    </a>
                  </Button>
                )}
                <Button variant="outline" className="w-full" asChild>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    地図で確認
                  </a>
                </Button>
                {restaurant.website && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={restaurant.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-2 h-4 w-4" />
                      公式サイト
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* 最終更新日 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>最終更新: {restaurant.lastUpdated}</span>
                </div>
              </CardContent>
            </Card>
          </div>
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