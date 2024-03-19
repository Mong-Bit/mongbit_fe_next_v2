'use client';
import { RecoilRoot } from 'recoil';
import { StyleSheetManager } from 'styled-components';

export default function GlobalStateRoot({ children }) {
  return (
    <RecoilRoot>
      <StyleSheetManager
        shouldForwardProp={(prop) =>
          prop !== 'flexDirection' &&
          prop !== 'borderRadius' &&
          prop !== 'justifyContent' &&
          prop !== 'alignItems' &&
          prop !== 'backgroundColor' &&
          prop !== 'whiteSpace' &&
          prop !== 'textOverflow'
        }
      >
        {children}
      </StyleSheetManager>
    </RecoilRoot>
  );
}
