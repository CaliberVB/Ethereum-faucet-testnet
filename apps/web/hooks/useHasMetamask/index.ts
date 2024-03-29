import { useEffect, useState } from 'react';

export const useHasMetamask = () => {
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      setInstalled(true);
    }
  }, [installed]);

  return installed;
};
