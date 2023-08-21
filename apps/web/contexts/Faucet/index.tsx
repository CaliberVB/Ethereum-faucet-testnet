import { createContext, useState, useMemo, useCallback } from 'react';

export interface FaucetContextState {
  isInsufficientFund: boolean;
  onSetIsInsufficientFund: (isInsufficientFund: boolean) => void;
}
export const FaucetContext = createContext<FaucetContextState>({
  isInsufficientFund: false,
  onSetIsInsufficientFund: () => {},
});

export const FaucetProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isInsufficientFund, setIsInsufficientFund] = useState<boolean>(false);

  const onSetIsInsufficientFund = useCallback((isInsufficientFund: boolean) => {
    setIsInsufficientFund(isInsufficientFund);
  }, []);

  const value = useMemo(
    () => ({
      isInsufficientFund,
      onSetIsInsufficientFund,
    }),
    [isInsufficientFund, onSetIsInsufficientFund],
  );

  return <FaucetContext.Provider value={value}>{children}</FaucetContext.Provider>;
};
