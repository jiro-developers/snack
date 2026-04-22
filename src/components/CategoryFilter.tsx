'use client';

import React, { useCallback } from 'react';

import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Category } from '@/type/itemType';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (code: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const displayCategories = categories.filter((c) => c.displayYN !== 'N');

  if (displayCategories.length === 0) return null;

  return (
    <div className="relative border-b border-ikea-gray-100">
      <button
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-white/90 rounded-full shadow-sm text-ikea-gray-500 hover:text-ikea-gray-700 transition-colors hidden sm:flex"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-white/90 rounded-full shadow-sm text-ikea-gray-500 hover:text-ikea-gray-700 transition-colors hidden sm:flex"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <div className="overflow-hidden px-4 lg:px-6 py-3" ref={emblaRef}>
        <div className="flex gap-2">
          <button
            className={cn(
              'flex-none rounded-full px-4 py-2 font-medium text-sm transition-all duration-200 whitespace-nowrap',
              selectedCategory === null
                ? 'bg-ikea-blue text-white'
                : 'bg-ikea-gray-100 text-ikea-gray-600 hover:bg-ikea-gray-200'
            )}
            onClick={() => onSelectCategory(null)}
          >
            전체
          </button>
          {displayCategories.map((cat) => (
            <button
              key={cat.code}
              className={cn(
                'flex-none rounded-full px-4 py-2 font-medium text-sm transition-all duration-200 whitespace-nowrap',
                selectedCategory === cat.code
                  ? 'bg-ikea-blue text-white'
                  : 'bg-ikea-gray-100 text-ikea-gray-600 hover:bg-ikea-gray-200'
              )}
              onClick={() => onSelectCategory(cat.code)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
