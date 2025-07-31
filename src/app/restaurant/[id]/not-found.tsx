import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function NotFound() {
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

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <Card>
            <CardHeader>
              <div className="text-6xl mb-4">🍳</div>
              <CardTitle className="text-2xl">店舗が見つかりません</CardTitle>
              <CardDescription className="text-lg">
                申し訳ございませんが、お探しの店舗は存在しないか、削除された可能性があります。
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3">
                <Button asChild>
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    ホームに戻る
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/restaurants">
                    <Search className="mr-2 h-4 w-4" />
                    店舗一覧を見る
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}