'use client';

import { useCallback, useEffect, useState } from 'react';

const USER_NAME_KEY = 'snack24_user_name';

export function useUser() {
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(USER_NAME_KEY);
    setUserName(stored);
    setIsLoading(false);
  }, []);

  const saveUserName = useCallback((name: string) => {
    localStorage.setItem(USER_NAME_KEY, name);
    setUserName(name);
  }, []);

  const clearUserName = useCallback(() => {
    localStorage.removeItem(USER_NAME_KEY);
    setUserName(null);
  }, []);

  return {
    userName,
    isLoading,
    isLoggedIn: !!userName,
    saveUserName,
    clearUserName,
  };
}
