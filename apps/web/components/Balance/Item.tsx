import { Item } from '../Item';

interface BalanceItemProps {
  icon: React.ReactNode;
  title: string;
  balance: string | undefined;
  symbol: string;
}

export const BalanceItem: React.FunctionComponent<BalanceItemProps> = ({ icon, title, balance, symbol }) => {
  return (
    <Item>
      {icon}
      <span>{title}</span>
      <span>
        {balance ? balance : <>&ndash;</>} {symbol}
      </span>
    </Item>
  );
};
