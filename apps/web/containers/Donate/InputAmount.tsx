import { Item } from '@/components';
import { useNetWork } from '@/hooks';
import PaidIcon from '@mui/icons-material/Paid';
import { TextField, TextFieldProps } from '@mui/material';
import { memo } from 'react';
type InputAmountProps = {
  onSetMaxAmount: () => void;
  amount: string;
  onChangeAmount: (amount: string) => void;
} & TextFieldProps;

export const InputAmountComponent: React.FunctionComponent<InputAmountProps> = ({
  onSetMaxAmount,
  amount,
  onChangeAmount,
  ...props
}) => {
  const { networkChain } = useNetWork();

  return (
    <Item
      style={{
        paddingBottom: 0,
        paddingTop: 0,
        paddingRight: 0,
      }}
    >
      <PaidIcon />
      <span>Amount:</span>
      <TextField
        size="small"
        placeholder="Minimum 0"
        value={amount}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChangeAmount(e.target.value);
        }}
        style={{
          flex: 2,
        }}
        sx={{
          borderColor: '#e9ecef',
        }}
        autoComplete="off"
        InputProps={{
          endAdornment: (
            <div>
              <span>{networkChain.nativeAsset}</span>
              <span
                role="button"
                style={{
                  textDecoration: 'underline',
                  color: '#1976d2',
                  marginLeft: 8,
                  cursor: 'pointer',
                }}
                onClick={onSetMaxAmount}
              >
                Max
              </span>
            </div>
          ),
        }}
        {...props}
      />
    </Item>
  );
};
export const InputAmount = memo(InputAmountComponent);
