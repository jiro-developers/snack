import React, { SetStateAction } from 'react';

import { Minus, Plus, X } from 'lucide-react';
import NextImage from 'next/image';

import { Item } from '@/type/itemType';

interface ItemListCardProps {
  product: Item;
  onClick: (id: string) => () => void;
  setSelectItem: React.Dispatch<SetStateAction<Item[]>>;
}

const ItemListCard: React.FC<ItemListCardProps> = ({ product, setSelectItem, onClick }) => {
  const { type, item, quantity, localFilename } = product;
  const src = `/images/${type}/${localFilename}`;

  const handleIncrement = () => {
    setSelectItem((items) =>
      items.map((itemData) => {
        if (itemData.item === product.item) {
          return { ...itemData, quantity: itemData.quantity + 1 };
        }
        return itemData;
      })
    );
  };

  const handleDecrement = () => {
    setSelectItem((items) =>
      items.map((itemData) => {
        if (itemData.item === product.item && itemData.quantity > 1) {
          return { ...itemData, quantity: itemData.quantity - 1 };
        }
        return itemData;
      })
    );
  };

  return (
    <div className="flex items-start gap-3 py-3 border-b border-ikea-gray-100 last:border-0">
      {/* 이미지 */}
      <NextImage
        src={src}
        alt={item}
        width={64}
        height={64}
        className="w-16 h-16 object-contain rounded-lg bg-ikea-gray-50 flex-shrink-0"
      />

      {/* 상품 정보 + 수량 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm text-ikea-gray-800 font-medium leading-snug line-clamp-2">
            {item}
          </p>
          <button
            className="flex-shrink-0 p-1 rounded-md text-ikea-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"
            onClick={onClick(item)}
          >
            <X size={16} />
          </button>
        </div>

        {/* 수량 조절 */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center bg-ikea-gray-100 rounded-full">
            <button
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-ikea-gray-200 text-ikea-gray-600 transition-colors"
              onClick={handleDecrement}
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="min-w-[28px] text-center font-display font-bold text-sm text-ikea-gray-900">
              {quantity}
            </span>
            <button
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-ikea-gray-200 text-ikea-gray-600 transition-colors"
              onClick={handleIncrement}
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ItemListCard);
