import { NextRequest, NextResponse } from 'next/server';

import { getSupabase } from '@/lib/supabase';

interface OrderItem {
  item_name: string;
  item_type: string;
  item_category?: string;
  quantity: number;
  item_image_url?: string;
  item_price?: number;
}

interface OrderRequest {
  user_name: string;
  items: OrderItem[];
}

export async function POST(request: NextRequest) {
  const supabase = getSupabase();
  const body: OrderRequest = await request.json();
  const { user_name, items } = body;

  if (!user_name || !items || items.length === 0) {
    return NextResponse.json({ error: '이름과 상품을 입력해주세요.' }, { status: 400 });
  }

  const now = new Date();
  const order_month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({ user_name, order_month })
    .select('id')
    .single();

  if (orderError || !order) {
    return NextResponse.json({ error: '주문 생성 실패', detail: orderError?.message }, { status: 500 });
  }

  const orderItems = items.map((item) => ({
    order_id: order.id,
    ...item,
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

  if (itemsError) {
    return NextResponse.json({ error: '상품 저장 실패', detail: itemsError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, orderId: order.id });
}

export async function GET(request: NextRequest) {
  const supabase = getSupabase();
  const { searchParams } = new URL(request.url);
  const month = searchParams.get('month');

  let query = supabase
    .from('orders')
    .select(`
      id,
      user_name,
      order_month,
      created_at,
      order_items (
        item_name,
        item_type,
        item_category,
        quantity,
        item_image_url,
        item_price
      )
    `)
    .order('created_at', { ascending: false });

  if (month) {
    query = query.eq('order_month', month);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: '조회 실패', detail: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
