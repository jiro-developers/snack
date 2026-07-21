'use client';

import React, { useEffect, useState } from 'react';

import { Search } from 'lucide-react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { ItemData, Category } from '@/type/itemType';

interface SearchCommandProps {
  snackItems: ItemData[];
  drinkItems: ItemData[];
  categories: { snack: Category[]; drink: Category[] };
  onSelectItem: (item: ItemData, type: 'snack' | 'drink') => void;
}

const SearchCommand: React.FC<SearchCommandProps> = ({
  snackItems,
  drinkItems,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  categories,
  onSelectItem,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (item: ItemData, type: 'snack' | 'drink') => {
    onSelectItem(item, type);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg bg-ikea-gray-100 border-none px-4 py-2.5 text-base text-ikea-gray-500 hover:bg-ikea-gray-200 transition-all w-full max-w-[320px]"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">검색...</span>
        <kbd className="hidden sm:inline-flex pointer-events-none h-5 select-none items-center gap-1 rounded-md bg-white text-ikea-gray-500 px-1.5 font-mono text-[10px] font-medium">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="상품명을 검색하세요..." />
        <CommandList>
          <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
          <CommandGroup heading="과자/스낵">
            {snackItems.map((item, i) => (
              <CommandItem
                key={`snack-${i}`}
                value={item.alt}
                onSelect={() => handleSelect(item, 'snack')}
              >
                {item.alt}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="음료">
            {drinkItems.slice(0, 50).map((item, i) => (
              <CommandItem
                key={`drink-${i}`}
                value={item.alt}
                onSelect={() => handleSelect(item, 'drink')}
              >
                {item.alt}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchCommand;
