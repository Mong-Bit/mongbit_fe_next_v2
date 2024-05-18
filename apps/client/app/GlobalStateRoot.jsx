'use client';
import { RecoilRoot } from 'recoil';
import { StyleSheetManager, ThemeProvider } from 'styled-components';

import theme from '@/styles/theme';

export default function GlobalStateRoot({ children }) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <StyleSheetManager shouldForwardProp={(props) => props}>{children}</StyleSheetManager>
      </ThemeProvider>
    </RecoilRoot>
  );
}
