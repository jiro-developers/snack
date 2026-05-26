'use client';

import React, { useMemo, useState } from 'react';

import { Copy, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

import CategoryFilter from '@/components/CategoryFilter';
import ItemListCard from '@/components/ItemListCard';
import Items from '@/components/Items';
import NameEntryDialog from '@/components/NameEntryDialog';
import SearchCommand from '@/components/SearchCommand';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useUser } from '@/hooks/useUser';
import { CategoriesData, Item, Product, ItemData } from '@/type/itemType';

interface AllItemsProps {
  snack: ItemData[];
  drink: ItemData[];
  categories?: CategoriesData;
}

const AllItems: React.FC<AllItemsProps> = ({ snack, drink, categories }) => {
  const [itemList, setItemList] = useState<Product>('snack');
  console.log(setItemList)
  const [selectItem, setSelectItem] = useState<Item[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { userName, isLoading, isLoggedIn, saveUserName } = useUser();

  const items = itemList === 'snack' ? snack : drink;
  const currentCategories = categories
    ? itemList === 'snack' ? categories.snack : categories.drink
    : [];

  const filteredItems = useMemo(() => {
    if (!selectedCategory) return items;
    return items.filter((item) => item.category === selectedCategory);
  }, [items, selectedCategory]);

  // const handleTabChange = (tab: Product) => {
  //   setItemList(tab);
  //   setSelectedCategory(null);
  // };

  const copy = async () => {
    const selectedItemList = selectItem
      .map(({ item, quantity }) => `${item} * ${quantity}`)
      .join('\n');

    await navigator.clipboard.writeText(selectedItemList);
    toast.success('주문 목록을 복사했어요.');
  };

  // const submitOrder = async () => {
  //   if (!userName) {
  //     toast.error('이름을 먼저 입력해주세요.');
  //     return;
  //   }
  //   if (selectItem.length === 0) {
  //     toast.error('상품을 선택해주세요.');
  //     return;
  //   }
  //
  //   try {
  //     const res = await fetch('/api/orders', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         user_name: userName,
  //         items: selectItem.map((s) => ({
  //           item_name: s.item,
  //           item_type: s.type,
  //           quantity: s.quantity,
  //           item_image_url: `/images/${s.type}/${s.localFilename}`,
  //           item_price: s.price ?? 0,
  //         })),
  //       }),
  //     });
  //
  //     if (res.ok) {
  //       toast.success('주문이 제출되었습니다!');
  //       setSelectItem([]);
  //     } else {
  //       toast.error('주문 제출에 실패했습니다.');
  //     }
  //   } catch {
  //     toast.error('네트워크 오류가 발생했습니다.');
  //   }
  // };

  const deleteItem = (id: string) => {
    return () =>
      setSelectItem((list) => [...list.filter(({ item }) => item !== id)]);
  };

  const handleSearchSelect = (item: ItemData, type: 'snack' | 'drink') => {
    const existing = selectItem.find((s) => s.item === item.alt);
    if (existing) {
      toast.error(`${item.alt}는 이미 선택되어 있습니다.`);
      return;
    }
    setSelectItem((prev) => [
      ...prev,
      { type, item: item.alt, quantity: 1, localFilename: item.localFilename, imageSrc: item.src, price: item.price ?? 0 },
    ]);
    toast.success(`${item.alt} 추가됨`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-ikea-gray-500 font-display animate-fade-in">로딩 중...</div>
      </div>
    );
  }

  const OrderListContent = (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-1 overflow-y-auto min-h-0 px-5 py-4 scrollbar-thin">
        {selectItem.length === 0 ? (
          <p className="text-center text-ikea-gray-500 py-8 text-sm">선택된 상품이 없습니다.</p>
        ) : (
          selectItem.map((product, index) => (
            <ItemListCard
              product={product}
              onClick={deleteItem}
              setSelectItem={setSelectItem}
              key={index}
            />
          ))
        )}
      </div>
      <div className="sticky bottom-0 flex gap-3 p-4 border-t border-ikea-gray-200">
        <button
          className="flex-1 flex justify-center items-center gap-2 py-3 rounded-lg bg-ikea-blue text-white border border-ikea-gray-200 hover:bg-ikea-blue-dark transition-colors duration-200 text-sm font-display font-semibold"
          onClick={copy}
        >
          <Copy className="w-4 h-4" />
          복사하기
        </button>
        {/*TODO: supbase 죽어버림; */}
        {/*<button*/}
        {/*  className="flex-1 flex justify-center items-center py-3 rounded-lg bg-ikea-blue text-white text-sm font-display font-semibold hover:bg-ikea-blue-dark transition-colors duration-200"*/}
        {/*  onClick={submitOrder}*/}
        {/*>*/}
        {/*  주문 제출*/}
        {/*</button>*/}
      </div>
    </div>
  );

  return (
    <div className="flex flex-1 min-h-screen bg-white">
      <NameEntryDialog open={!isLoggedIn} onSubmit={saveUserName} />

      {/* 상품 영역 */}
      <div className="flex flex-1 flex-col">
        {/* 헤더 */}
        <header className="bg-white border-b border-ikea-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <h1 className="font-display text-xl font-bold text-ikea-gray-900">
                SNACK <span className="text-ikea-blue">24</span>
              </h1>
              {userName && (
                <span className="text-sm text-ikea-gray-500">
                  {userName}님
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <SearchCommand
                snackItems={snack}
                drinkItems={drink}
                categories={categories || { snack: [], drink: [] }}
                onSelectItem={handleSearchSelect}
              />
              {/*TODO: supabase 죽어버림*/}
              {/*<Link href="/stats">*/}
              {/*  <button className="p-2 rounded-lg text-ikea-gray-500 hover:text-ikea-blue transition-colors duration-200">*/}
              {/*    <BarChart3 className="h-5 w-5" />*/}
              {/*  </button>*/}
              {/*</Link>*/}
            </div>
          </div>
        </header>

        {/*<TabItem item={itemList} setItem={handleTabChange} />*/}

        {currentCategories.length > 0 && (
          <CategoryFilter
            categories={currentCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        )}

        <Items
          itemStatus={itemList}
          items={filteredItems}
          selectItem={selectItem}
          setSelectItem={setSelectItem}
          categories={currentCategories}
          selectedCategory={selectedCategory}
        />
      </div>

      {/* 데스크탑 사이드바 */}
      <div className="hidden lg:flex flex-col sticky top-0 h-screen min-w-[560px] max-w-[560px] w-[560px] bg-ikea-gray-50 border-l border-ikea-gray-200">
        <div className="px-6 pt-6 pb-4">
          <h2 className="font-display text-base font-bold text-ikea-gray-800">
            주문 목록
          </h2>
        </div>
        {OrderListContent}
      </div>

      {/* 모바일 FAB + Sheet */}
      <div className="lg:hidden">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <button className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-ikea-blue text-white shadow-lg z-50 flex items-center justify-center hover:bg-ikea-blue-dark hover:shadow-xl transition-all duration-300">
              <ShoppingCart className="w-6 h-6" />
              {selectItem.length > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-ikea-yellow text-ikea-gray-900 font-bold border-none">
                  {selectItem.length}
                </Badge>
              )}
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] p-0 flex flex-col bg-white rounded-t-2xl border-t border-ikea-gray-200">
            <SheetHeader className="px-6 pt-6 pb-4 border-b border-ikea-gray-200">
              <SheetTitle className="text-left font-display text-base font-bold text-ikea-gray-800">
                주문 목록
              </SheetTitle>
            </SheetHeader>
            {OrderListContent}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default AllItems;
