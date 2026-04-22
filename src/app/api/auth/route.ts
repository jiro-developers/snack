import { NextRequest, NextResponse } from 'next/server';

import { getSupabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ error: '아이디와 비밀번호를 입력해주세요.' }, { status: 400 });
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('admin_users')
    .select('id')
    .eq('username', username)
    .eq('password', password)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: '아이디 또는 비밀번호가 잘못되었습니다.' }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}
