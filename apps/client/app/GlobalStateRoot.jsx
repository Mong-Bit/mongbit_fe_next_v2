'use client';
import { RecoilRoot } from 'recoil';
import { StyleSheetManager, ThemeProvider } from 'styled-components';

import theme from '@/styles/theme';

export default function GlobalStateRoot({ children }) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <StyleSheetManager
          shouldForwardProp={(prop) =>
            prop !== 'flexDirection' &&
            prop !== 'borderRadius' &&
            prop !== 'justifyContent' &&
            prop !== 'alignItems' &&
            prop !== 'backgroundColor' &&
            prop !== 'whiteSpace' &&
            prop !== 'textOverflow' &&
            prop !== 'flexWrap' &&
            prop !== 'marginLeft' &&
            prop !== 'imageUrl' &&
            prop !== 'zIndex' &&
            prop !== 'show' &&
            prop !== 'logIn'
          }
        >
          {children}
        </StyleSheetManager>
      </ThemeProvider>
    </RecoilRoot>
  );
}
