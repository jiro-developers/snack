'use client';

import React, { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface NameEntryDialogProps {
  open: boolean;
  onSubmit: (name: string) => void;
}

const NameEntryDialog: React.FC<NameEntryDialogProps> = ({ open, onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed) {
      onSubmit(trimmed);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[400px] bg-white rounded-xl shadow-2xl"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold text-ikea-gray-900">
              <span className="text-ikea-blue">스낵24</span>에 오신 것을 환영합니다
            </DialogTitle>
            <DialogDescription className="text-ikea-gray-500 text-sm">
              이름을 입력하면 주문 내역이 기록됩니다.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="이름을 입력해주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              className="border-ikea-gray-200 rounded-lg h-12 text-base text-ikea-gray-900 placeholder:text-ikea-gray-500 focus:ring-ikea-blue focus:border-ikea-blue"
            />
          </div>
          <DialogFooter>
            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full bg-ikea-blue hover:bg-ikea-blue-dark disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg h-12 font-display font-semibold text-base transition-colors duration-200"
            >
              시작하기
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NameEntryDialog;
