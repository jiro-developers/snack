'use client';

import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

interface Props {
  setItem: (value: 'snack' | 'drink') => void;
  item: string;
}

const TabItem: React.FC<Props> = ({ item, setItem }) => {
  const [scrollPositions, setScrollPositions] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrollPositions((prevPositions) => ({
        ...prevPositions,
        [item]: window.scrollY,
      }));
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [item]);

  useEffect(() => {
    window.scrollTo(0, scrollPositions[item] || 0);
  }, [item, scrollPositions]);

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-ikea-gray-200">
      <div className="flex h-14">
        <button
          onClick={() => setItem('snack')}
          className={cn(
            'flex-1 relative font-display text-base transition-all duration-300',
            item === 'snack'
              ? 'text-ikea-blue font-bold'
              : 'text-ikea-gray-500 hover:text-ikea-gray-700'
          )}
        >
          과자
          {item === 'snack' && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[2px] bg-ikea-blue rounded-full" />
          )}
        </button>
        <button
          onClick={() => setItem('drink')}
          className={cn(
            'flex-1 relative font-display text-base transition-all duration-300',
            item === 'drink'
              ? 'text-ikea-blue font-bold'
              : 'text-ikea-gray-500 hover:text-ikea-gray-700'
          )}
        >
          음료
          {item === 'drink' && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[2px] bg-ikea-blue rounded-full" />
          )}
        </button>
      </div>
    </div>
  );
};

export default TabItem;
