import './globals.css';
import StyledJsxRegistry from './registry';
import MyHeader from '../components/base/MyHeader';
import GlobalStateRoot from './GlobalStateRoot';

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body>
        <GlobalStateRoot>
          <MyHeader />
          <StyledJsxRegistry>{children}</StyledJsxRegistry>
        </GlobalStateRoot>
      </body>
    </html>
  );
}
