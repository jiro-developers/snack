import { useState } from 'react';

interface CounterProps {
  id?: string;
  className?: string;
  value?: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
}

export interface useCounterOptions {
  max: number;
  min: number;
  onMax?: (value: number) => void;
  onMin?: (value: number) => void;
}

export const useCounter = (initialValue: number, options: useCounterOptions) => {
  const [value, setValue] = useState<number>(initialValue);

  const increase = () => {
    if (value + 1 > options.max) {
      options.onMax && options.onMax(value);
      return;
    }

    setValue(value + 1);
  };

  const decrease = () => {
    if (value - 1 < options.min) {
      options.onMin && options.onMin(value);
      return;
    }

    setValue(value - 1);
  };

  const onIncrease = () => {
    increase();
  };

  const onDecrease = () => {
    decrease();
  };

  return {
    value,
    setValue,
    componentProps: {
      value: value,
      onIncrease,
      onDecrease,
    } as CounterProps,
  };
};
