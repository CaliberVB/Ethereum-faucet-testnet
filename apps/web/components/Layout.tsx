import { styled } from '@mui/material';
import { Header, Content, OpenSourceMemo, Footer } from '@/components';

export const LayoutElement = styled('div')(() => ({
  background: '#0061e2',
  backgroundBlendMode: 'screen',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
}));
export const Layout: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <LayoutElement>
      <Header />
      <Content>
        {children}
        <OpenSourceMemo />
      </Content>
      <Footer />
    </LayoutElement>
  );
};
