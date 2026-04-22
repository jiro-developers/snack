'use client';

import React, { useState } from 'react';

import { ArrowLeft, Lock } from 'lucide-react';
import Link from 'next/link';

import StatsTable from '@/components/StatsTable';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function getMonthOptions() {
  const months: string[] = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  }
  return months;
}

export default function StatsPage() {
  const months = getMonthOptions();
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      setAuthenticated(true);
    } else {
      setError('아이디 또는 비밀번호가 잘못되었습니다.');
      setPassword('');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <form onSubmit={handleLoginSubmit} className="flex flex-col items-center gap-4 p-8">
          <Lock className="w-10 h-10 text-ikea-gray-400" />
          <h1 className="font-display text-xl font-bold text-ikea-gray-900">관리자 인증</h1>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디"
            className="w-64 px-4 py-3 border border-ikea-gray-300 rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-ikea-blue"
            autoFocus
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="w-64 px-4 py-3 border border-ikea-gray-300 rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-ikea-blue"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-64 bg-ikea-blue text-white hover:bg-ikea-blue-dark">
            로그인
          </Button>
        </form>
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-white">
        <header className="sticky top-0 z-10 bg-white border-b border-ikea-gray-200">
          <div className="flex items-center gap-4 px-4 py-3 max-w-4xl mx-auto">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-ikea-gray-500 hover:text-ikea-gray-900 hover:bg-ikea-gray-100">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="font-display text-lg font-bold text-ikea-gray-900">월별 주문 통계</h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-4 space-y-6">
          <div className="flex gap-2 flex-wrap">
            {months.map((month) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(month)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                  selectedMonth === month
                    ? 'bg-ikea-blue text-white'
                    : 'bg-ikea-gray-100 text-ikea-gray-600 hover:bg-ikea-gray-200'
                )}
              >
                {month}
              </button>
            ))}
          </div>

          <StatsTable month={selectedMonth} />
        </main>
      </div>
  );
}
