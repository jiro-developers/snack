'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { Download } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface OrderItem {
  item_name: string;
  item_type: string;
  quantity: number;
  item_price: number | null;
}

interface Order {
  id: string;
  user_name: string;
  order_month: string;
  created_at: string;
  order_items: OrderItem[];
}

interface StatsRow {
  user_name: string;
  item_name: string;
  item_type: string;
  total_quantity: number;
  unit_price: number;
  total_price: number;
}

interface StatsTableProps {
  month: string;
}

const formatPrice = (price: number) => {
  return price.toLocaleString('ko-KR') + '원';
};

const StatsTable: React.FC<StatsTableProps> = ({ month }) => {
  const [stats, setStats] = useState<StatsRow[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders?month=${month}`);
      const json = await res.json();
      const orders: Order[] = json.data || [];

      const map = new Map<string, StatsRow>();
      for (const order of orders) {
        for (const item of order.order_items) {
          const key = `${order.user_name}__${item.item_name}`;
          const unitPrice = item.item_price ?? 0;
          const existing = map.get(key);
          if (existing) {
            existing.total_quantity += item.quantity;
            existing.total_price += item.quantity * unitPrice;
          } else {
            map.set(key, {
              user_name: order.user_name,
              item_name: item.item_name,
              item_type: item.item_type,
              total_quantity: item.quantity,
              unit_price: unitPrice,
              total_price: item.quantity * unitPrice,
            });
          }
        }
      }

      setStats(
        Array.from(map.values()).sort((a, b) => {
          if (a.user_name !== b.user_name) return a.user_name.localeCompare(b.user_name);
          return b.total_quantity - a.total_quantity;
        })
      );
    } catch {
      console.error('통계 조회 실패');
    } finally {
      setLoading(false);
    }
  }, [month]);

  useEffect(() => {
    if (month) fetchStats();
  }, [month, fetchStats]);

  const grandTotal = stats.reduce((sum, row) => sum + row.total_price, 0);

  const exportCSV = () => {
    const header = '이름,상품명,종류,수량,단가,금액\n';
    const rows = stats
      .map((s) =>
        `${s.user_name},${s.item_name},${s.item_type === 'snack' ? '과자' : '음료'},${s.total_quantity},${s.unit_price},${s.total_price}`
      )
      .join('\n');
    const blob = new Blob(['\uFEFF' + header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `snack24_stats_${month}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div className="flex justify-center py-8 text-ikea-gray-500">불러오는 중...</div>;
  }

  if (stats.length === 0) {
    return <div className="flex justify-center py-8 text-ikea-gray-500">해당 월의 주문 데이터가 없습니다.</div>;
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div className="text-sm text-ikea-gray-600">
          총 금액: <span className="font-display text-xl font-bold text-ikea-blue">{formatPrice(grandTotal)}</span>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-ikea-gray-200 text-ikea-gray-600 text-sm hover:text-ikea-blue hover:border-ikea-blue transition-colors duration-200"
        >
          <Download className="h-4 w-4" />
          CSV 내보내기
        </button>
      </div>
      <div className="rounded-xl overflow-hidden border border-ikea-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-ikea-gray-50 hover:bg-ikea-gray-50 border-none">
              <TableHead className="text-ikea-gray-600 font-display uppercase tracking-wider text-xs">이름</TableHead>
              <TableHead className="text-ikea-gray-600 font-display uppercase tracking-wider text-xs">상품명</TableHead>
              <TableHead className="text-ikea-gray-600 font-display uppercase tracking-wider text-xs">종류</TableHead>
              <TableHead className="text-ikea-gray-600 font-display uppercase tracking-wider text-xs text-right">수량</TableHead>
              <TableHead className="text-ikea-gray-600 font-display uppercase tracking-wider text-xs text-right">단가</TableHead>
              <TableHead className="text-ikea-gray-600 font-display uppercase tracking-wider text-xs text-right">금액</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.map((row, i) => (
              <TableRow
                key={i}
                className="hover:bg-ikea-blue-light transition-colors duration-150 border-b border-ikea-gray-100 last:border-0"
              >
                <TableCell className="font-medium text-ikea-gray-900 text-sm">{row.user_name}</TableCell>
                <TableCell className="text-ikea-gray-600 text-sm">{row.item_name}</TableCell>
                <TableCell className="text-ikea-gray-600 text-sm">{row.item_type === 'snack' ? '과자' : '음료'}</TableCell>
                <TableCell className="text-right font-display font-semibold text-ikea-gray-900 text-sm">{row.total_quantity}</TableCell>
                <TableCell className="text-right text-ikea-gray-600 text-sm">{row.unit_price > 0 ? formatPrice(row.unit_price) : '-'}</TableCell>
                <TableCell className="text-right font-medium text-ikea-blue text-sm">{row.total_price > 0 ? formatPrice(row.total_price) : '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StatsTable;
