import { styled } from '@mui/material';
import { Content, OpenSourceMemo } from '@/components';
import { Header } from './header';
import { Footer } from './footer';

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
