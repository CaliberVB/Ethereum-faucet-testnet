import { Select as MaterialSelect, SelectProps as MaterialSelectProps } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { forwardRef } from 'react';

interface SelectProps<TValue> extends MaterialSelectProps<TValue> {
  noBorders?: boolean;
}
const useStyles = makeStyles((theme) => ({
  menuList: {
    padding: '8px',
  },
}));
export const Select = forwardRef(function CustomSelect<TValue>(
  props: SelectProps<TValue>,
  ref: React.ForwardedRef<HTMLUListElement>,
) {
  const { noBorders, sx, ...restProps } = props;
  const noBorderClass = noBorders && {
    boxShadow: 'none',
    '.MuiOutlinedInput-notchedOutline': { border: 0 },
    '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      border: 0,
    },
    '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 0,
    },
    '&:hover': {
      '&& fieldset': {
        backgroundColor: '#99a1bd14',
        padding: '0px !important',
      },
    },
  };
  const classes = useStyles();

  return (
    <MaterialSelect
      sx={{
        border: 'none',
        ...noBorderClass,
        ...sx,
      }}
      {...restProps}
      ref={ref}
      MenuProps={{
        classes: {
          list: classes.menuList,
        },
      }}
    />
  );
}) as <TValue>(props: SelectProps<TValue> & React.RefAttributes<HTMLUListElement>) => JSX.Element;
