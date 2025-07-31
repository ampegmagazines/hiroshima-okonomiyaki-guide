import Link from 'next/link';
import { Star, MapPin, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Restaurant } from '@/types/restaurant';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const getCurrentDaySchedule = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[new Date().getDay()] as keyof typeof restaurant.openingHours;
    return restaurant.openingHours[today];
  };

  const todaySchedule = getCurrentDaySchedule();

  // レストランタイプに基づいてエモジとカラーを選択
  const getRestaurantEmoji = (name: string) => {
    if (name.includes('みっちゃん')) return '👑';
    if (name.includes('お好み村')) return '🏮';
    if (name.includes('長田屋')) return '🏠';
    if (name.includes('麗ちゃん')) return '🌙';
    if (name.includes('さくら')) return '🌸';
    if (name.includes('弁慶')) return '⛩️';
    if (name.includes('だるま')) return '🎭';
    if (name.includes('風月')) return '🌙';
    return '🍳';
  };

  return (
    <Link href={`/restaurant/${restaurant.id}`}>
      <div className="restaurant-card group cursor-pointer h-full">
        <div className="restaurant-image h-56 rounded-t-2xl flex flex-col items-center justify-center relative overflow-hidden">
          <div className="text-6xl mb-2 group-hover:scale-110 transition-transform duration-300">
            {getRestaurantEmoji(restaurant.name)}
          </div>
          <div className="text-white text-xl font-bold text-center px-4 drop-shadow-lg">
            {restaurant.name}
          </div>
          
          {/* バッジ */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {restaurant.features.includes('老舗') && (
              <Badge className="badge-primary shadow-lg">👴 老舗</Badge>
            )}
            {restaurant.features.includes('有名店') && (
              <Badge className="badge-primary shadow-lg">⭐ 有名店</Badge>
            )}
          </div>
          
          {/* 営業状況 */}
          <div className="absolute top-3 right-3">
            {restaurant.isOpen && todaySchedule.isOpen && (
              <Badge className="bg-green-500 text-white shadow-lg animate-pulse">
                🟢 営業中
              </Badge>
            )}
          </div>
          
          {/* シマー効果 */}
          <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
              {restaurant.name}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
              {restaurant.description}
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="h-4 w-4 text-orange-500" />
            <span className="line-clamp-1">{restaurant.address}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-blue-500" />
            <span className={`font-medium ${todaySchedule.isOpen ? 'text-green-600' : 'text-red-600'}`}>
              {todaySchedule.isOpen 
                ? `${todaySchedule.open} - ${todaySchedule.close}` 
                : '定休日'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-lg">{restaurant.rating}</span>
              </div>
              <span className="text-sm text-gray-500">
                ({restaurant.reviewCount}件)
              </span>
            </div>
            <Badge className="badge-secondary font-semibold px-3 py-1">
              {restaurant.priceRange}
            </Badge>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {restaurant.specialties.slice(0, 3).map((specialty, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 transition-colors"
              >
                🍳 {specialty}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs font-medium border-orange-200 text-orange-600">
                📍 {restaurant.area}
              </Badge>
            </div>
            {restaurant.isOpen && todaySchedule.isOpen && (
              <Badge className="bg-green-50 text-green-700 border border-green-200 text-xs">
                ✅ 営業中
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}