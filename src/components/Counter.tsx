import React from 'react';

import { Minus, Plus } from 'lucide-react';

export interface CounterProps {
  className?: string;
  value?: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
  handleIncrease: () => void;
  handleDecrease: () => void;
}

export const Counter: React.FC<CounterProps> = ({ className, handleIncrease, handleDecrease, value, onDecrease, onIncrease }) => {
  return (
    <div className={`flex items-center gap-1.5 ${className ?? ''}`}>
      <button
        className="flex items-center justify-center w-8 h-8 rounded-full bg-ikea-gray-100 hover:bg-ikea-gray-200 text-ikea-gray-700 transition-all"
        onClick={() => {
          handleDecrease();
          onDecrease?.();
        }}
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <div className="flex justify-center items-center min-w-[28px] h-7 font-display font-bold text-ikea-gray-900 text-sm text-center">
        {value}
      </div>
      <button
        className="flex items-center justify-center w-8 h-8 rounded-full bg-ikea-gray-100 hover:bg-ikea-gray-200 text-ikea-gray-700 transition-all"
        onClick={() => {
          handleIncrease();
          onIncrease?.();
        }}
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
