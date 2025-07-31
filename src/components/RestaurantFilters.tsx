'use client';

import { useState } from 'react';
import { Search, MapPin, Filter, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Restaurant, Area, PriceRange, Feature } from '@/types/restaurant';

interface RestaurantFiltersProps {
  restaurants: Restaurant[];
  onFilterChange: (filteredRestaurants: Restaurant[]) => void;
}

interface Filters {
  searchQuery: string;
  selectedAreas: Area[];
  selectedPriceRanges: PriceRange[];
  selectedFeatures: Feature[];
  minRating: number;
}

export function RestaurantFilters({ restaurants, onFilterChange }: RestaurantFiltersProps) {
  const [filters, setFilters] = useState<Filters>({
    searchQuery: '',
    selectedAreas: [],
    selectedPriceRanges: [],
    selectedFeatures: [],
    minRating: 0
  });

  const [isExpanded, setIsExpanded] = useState(false);

  // 利用可能なフィルターオプションを取得
  const availableAreas = [...new Set(restaurants.map(r => r.area))];
  const availablePriceRanges = [...new Set(restaurants.map(r => r.priceRange))];
  const availableFeatures = [...new Set(restaurants.flatMap(r => r.features))];

  // フィルターを適用
  const applyFilters = (newFilters: Filters) => {
    let filtered = restaurants;

    // 検索クエリによるフィルタリング
    if (newFilters.searchQuery) {
      const query = newFilters.searchQuery.toLowerCase();
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.description.toLowerCase().includes(query) ||
        restaurant.address.toLowerCase().includes(query) ||
        restaurant.specialties.some(s => s.toLowerCase().includes(query)) ||
        restaurant.features.some(f => f.toLowerCase().includes(query))
      );
    }

    // エリアによるフィルタリング
    if (newFilters.selectedAreas.length > 0) {
      filtered = filtered.filter(restaurant =>
        newFilters.selectedAreas.includes(restaurant.area)
      );
    }

    // 価格帯によるフィルタリング
    if (newFilters.selectedPriceRanges.length > 0) {
      filtered = filtered.filter(restaurant =>
        newFilters.selectedPriceRanges.includes(restaurant.priceRange)
      );
    }

    // 特徴によるフィルタリング
    if (newFilters.selectedFeatures.length > 0) {
      filtered = filtered.filter(restaurant =>
        newFilters.selectedFeatures.some(feature =>
          restaurant.features.includes(feature)
        )
      );
    }

    // 最低評価によるフィルタリング
    if (newFilters.minRating > 0) {
      filtered = filtered.filter(restaurant =>
        restaurant.rating >= newFilters.minRating
      );
    }

    onFilterChange(filtered);
  };

  const updateFilters = (newFilters: Partial<Filters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  const toggleArea = (area: Area) => {
    const newAreas = filters.selectedAreas.includes(area)
      ? filters.selectedAreas.filter(a => a !== area)
      : [...filters.selectedAreas, area];
    updateFilters({ selectedAreas: newAreas });
  };

  const togglePriceRange = (priceRange: PriceRange) => {
    const newPriceRanges = filters.selectedPriceRanges.includes(priceRange)
      ? filters.selectedPriceRanges.filter(p => p !== priceRange)
      : [...filters.selectedPriceRanges, priceRange];
    updateFilters({ selectedPriceRanges: newPriceRanges });
  };

  const toggleFeature = (feature: Feature) => {
    const newFeatures = filters.selectedFeatures.includes(feature)
      ? filters.selectedFeatures.filter(f => f !== feature)
      : [...filters.selectedFeatures, feature];
    updateFilters({ selectedFeatures: newFeatures });
  };

  const clearAllFilters = () => {
    const clearedFilters: Filters = {
      searchQuery: '',
      selectedAreas: [],
      selectedPriceRanges: [],
      selectedFeatures: [],
      minRating: 0
    };
    setFilters(clearedFilters);
    applyFilters(clearedFilters);
  };

  const hasActiveFilters = 
    filters.searchQuery ||
    filters.selectedAreas.length > 0 ||
    filters.selectedPriceRanges.length > 0 ||
    filters.selectedFeatures.length > 0 ||
    filters.minRating > 0;

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              検索・フィルター
            </CardTitle>
            <CardDescription>
              条件を指定して店舗を絞り込めます
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '閉じる' : '詳細'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 検索バー */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="店名、説明、住所、特徴で検索..."
            value={filters.searchQuery}
            onChange={(e) => updateFilters({ searchQuery: e.target.value })}
            className="pl-10"
          />
        </div>

        {/* クイックフィルター */}
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={filters.minRating >= 4.0 ? "default" : "outline"}
            className="cursor-pointer text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1"
            onClick={() => updateFilters({ minRating: filters.minRating >= 4.0 ? 0 : 4.0 })}
          >
            高評価 (4.0+)
          </Badge>
          <Badge
            variant={filters.selectedFeatures.includes('深夜営業') ? "default" : "outline"}
            className="cursor-pointer text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1"
            onClick={() => toggleFeature('深夜営業')}
          >
            深夜営業
          </Badge>
          <Badge
            variant={filters.selectedFeatures.includes('観光客歓迎') ? "default" : "outline"}
            className="cursor-pointer text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1"
            onClick={() => toggleFeature('観光客歓迎')}
          >
            観光客歓迎
          </Badge>
          <Badge
            variant={filters.selectedFeatures.includes('老舗') ? "default" : "outline"}
            className="cursor-pointer text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1"
            onClick={() => toggleFeature('老舗')}
          >
            老舗
          </Badge>
        </div>

        {/* 詳細フィルター */}
        {isExpanded && (
          <div className="space-y-6 border-t pt-6">
            {/* エリア別フィルター */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                エリア別
              </h4>
              <div className="flex flex-wrap gap-2">
                {availableAreas.map((area) => {
                  const count = restaurants.filter(r => r.area === area).length;
                  const isSelected = filters.selectedAreas.includes(area);
                  return (
                    <Badge
                      key={area}
                      variant={isSelected ? "default" : "outline"}
                      className="cursor-pointer text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1"
                      onClick={() => toggleArea(area)}
                    >
                      {area} ({count})
                    </Badge>
                  );
                })}
              </div>
            </div>

            {/* 価格帯別フィルター */}
            <div>
              <h4 className="font-semibold mb-3">価格帯</h4>
              <div className="flex flex-wrap gap-2">
                {availablePriceRanges.map((priceRange) => {
                  const count = restaurants.filter(r => r.priceRange === priceRange).length;
                  const isSelected = filters.selectedPriceRanges.includes(priceRange);
                  return (
                    <Badge
                      key={priceRange}
                      variant={isSelected ? "default" : "outline"}
                      className="cursor-pointer text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1"
                      onClick={() => togglePriceRange(priceRange)}
                    >
                      {priceRange} ({count})
                    </Badge>
                  );
                })}
              </div>
            </div>

            {/* 特徴別フィルター */}
            <div>
              <h4 className="font-semibold mb-3">特徴・設備</h4>
              <div className="flex flex-wrap gap-2">
                {availableFeatures.slice(0, 12).map((feature) => {
                  const count = restaurants.filter(r => r.features.includes(feature)).length;
                  const isSelected = filters.selectedFeatures.includes(feature);
                  return (
                    <Badge
                      key={feature}
                      variant={isSelected ? "default" : "outline"}
                      className="cursor-pointer text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1"
                      onClick={() => toggleFeature(feature)}
                    >
                      {feature} ({count})
                    </Badge>
                  );
                })}
              </div>
            </div>

            {/* 評価フィルター */}
            <div>
              <h4 className="font-semibold mb-3">最低評価</h4>
              <div className="flex flex-wrap gap-2">
                {[3.0, 3.5, 4.0, 4.5].map((rating) => {
                  const count = restaurants.filter(r => r.rating >= rating).length;
                  const isSelected = filters.minRating === rating;
                  return (
                    <Badge
                      key={rating}
                      variant={isSelected ? "default" : "outline"}
                      className="cursor-pointer text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1"
                      onClick={() => updateFilters({ minRating: isSelected ? 0 : rating })}
                    >
                      {rating}+ ({count})
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* フィルタークリア */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              フィルターが適用されています
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              すべてクリア
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}