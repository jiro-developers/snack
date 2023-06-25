import { useState } from 'react';

export const useToggle = (initialValue: boolean) => {
  const [toggle, _setToggle] = useState<boolean>(initialValue);

  const setToggle = () => {
    _setToggle(!toggle);
  };

  return [toggle, setToggle] as const;
};
