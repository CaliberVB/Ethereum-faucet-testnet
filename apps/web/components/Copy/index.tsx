import { useCopyToClipboard } from '@/hooks';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, Tooltip } from '@mui/material';
interface CopyButtonProps {
  textToCopy: string;
}
export const Copy: React.FunctionComponent<CopyButtonProps> = ({ textToCopy }) => {
  const [text, copyText] = useCopyToClipboard();
  return (
    <Tooltip title={text ? 'Copied.' : 'Copy Address'} placement="top" arrow>
      <IconButton onClick={() => copyText(textToCopy)} size="small">
        <ContentCopyIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};
