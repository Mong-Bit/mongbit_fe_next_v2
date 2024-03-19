import './globals.css';

import MyHeader from '@/components/base/MyHeader';
import GlobalStateRoot from './GlobalStateRoot';

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body>
        <GlobalStateRoot>
          <MyHeader />
          {children}
        </GlobalStateRoot>
      </body>
    </html>
  );
}
