'use client';

import React, { SetStateAction, useCallback, useMemo } from 'react';

import { Check } from 'lucide-react';
import NextImage from 'next/image';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Category, Item, Product, ItemData } from '@/type/itemType';

interface ItemsProps {
  itemStatus: Product;
  items: ItemData[];
  selectItem: Item[];
  setSelectItem: React.Dispatch<SetStateAction<Item[]>>;
  categories: Category[];
  selectedCategory: string | null;
}

const Items: React.FC<ItemsProps> = ({ itemStatus, items, selectItem, setSelectItem, categories, selectedCategory }) => {
  const handleSelectItem = useCallback((clickedItem: string) => {
    setSelectItem((prevSelectItem) => {
      const existingItemIndex = prevSelectItem.findIndex(item => item.item === clickedItem);

      if (existingItemIndex > -1) {
        const existingItem = prevSelectItem[existingItemIndex];

        if (existingItem.quantity === 1) {
          return prevSelectItem.filter((_, index) => index !== existingItemIndex);
        } else {
          toast.error(`${clickedItem}는 이미 ${existingItem.quantity}개 선택되어 있습니다.`);
          return prevSelectItem;
        }
      } else {
        const itemData = items.find(item => item.alt === clickedItem);
        const localFilename = itemData?.localFilename || '';
        const price = itemData?.price ?? 0;

        return [...prevSelectItem, { type: itemStatus, item: clickedItem, quantity: 1, localFilename, imageSrc: itemData?.src, price }];
      }
    });
  }, [setSelectItem, itemStatus, items]);

  const groupedItems = useMemo((): { category: Category | null; items: ItemData[] }[] => {
    if (selectedCategory) {
      return [{
        category: categories.find(c => c.code === selectedCategory) || null,
        items: items.filter(i => i.category === selectedCategory),
      }];
    }

    if (!categories.length || !items.some(i => i.category)) {
      return [{ category: null, items }];
    }

    const groups: { category: Category | null; items: ItemData[] }[] = categories
      .filter(c => c.displayYN !== 'N')
      .map(cat => ({
        category: cat as Category | null,
        items: items.filter(i => i.category === cat.code),
      }))
      .filter(g => g.items.length > 0);

    const uncategorized = items.filter(i => !i.category);
    if (uncategorized.length > 0) {
      groups.push({ category: null, items: uncategorized });
    }

    return groups;
  }, [items, categories, selectedCategory]);

  return (
    <div className="pb-6">
      {groupedItems.map((group, groupIndex) => (
        <div key={group.category?.code || `uncategorized-${groupIndex}`}>
          {group.category && (
            <div className="flex items-center gap-2 px-4 lg:px-6 pt-6 pb-3">
              <h3 className="font-display text-base font-bold text-ikea-gray-900">
                {group.category.name}
              </h3>
              <span className="text-xs text-ikea-gray-500 font-medium">
                {group.items.length}개
              </span>
            </div>
          )}
          {!group.category && groupedItems.length > 1 && (
            <div className="flex items-center gap-2 px-4 lg:px-6 pt-6 pb-3">
              <h3 className="font-display text-base font-bold text-ikea-gray-900">기타</h3>
              <span className="text-xs text-ikea-gray-500 font-medium">
                {group.items.length}개
              </span>
            </div>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 lg:px-6">
            {group.items.map((item, index) => {
              const { alt, localFilename } = item;
              const src = `/images/${itemStatus}/${localFilename}`;
              const isSelected = !!selectItem.find(({ item }) => item === alt);

              return (
                <div
                  key={index}
                  className="group cursor-pointer opacity-0 animate-fade-up"
                  style={{ animationDelay: `${Math.min(index * 0.03, 0.3)}s` }}
                  onClick={() => handleSelectItem(alt)}
                >
                  <div
                    className={cn(
                      'relative bg-ikea-gray-50 rounded-lg overflow-hidden transition-shadow duration-200',
                      'group-hover:shadow-md',
                      isSelected && 'ring-2 ring-ikea-blue'
                    )}
                  >
                    {isSelected && (
                      <div className="absolute right-2 top-2 flex items-center justify-center w-6 h-6 rounded-full bg-ikea-blue text-white z-10">
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </div>
                    )}
                    <NextImage
                      src={src}
                      alt={alt}
                      width={140}
                      height={140}
                      className="w-full aspect-square object-contain p-1"
                    />
                  </div>
                  <p className="text-lg text-ikea-gray-800 mt-2 line-clamp-2 font-bold leading-snug">
                    {alt}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Items;
