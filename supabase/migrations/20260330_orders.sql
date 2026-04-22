-- 주문 기록
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_name TEXT NOT NULL,
  order_month TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 주문 상세
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  item_type TEXT NOT NULL,
  item_category TEXT,
  quantity INT NOT NULL DEFAULT 1,
  item_image_url TEXT,
  item_price INT DEFAULT 0
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_orders_month ON orders(order_month);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_name);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

-- RLS 정책 (공개 접근 - 소규모 팀 내부 사용)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to orders" ON orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to order_items" ON order_items FOR ALL USING (true) WITH CHECK (true);
