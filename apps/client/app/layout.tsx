import '@/app/globals.css';
import StyledJsxRegistry from '@/app/registry';
import MyHeader from '@/components/base/MyHeader';
import MyFooter from '@/components/base/MyFooter';
import GlobalStateRoot from '@/app/GlobalStateRoot';

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body>
        <StyledJsxRegistry>
          <GlobalStateRoot>
            <MyHeader />
            {children}
            <MyFooter />
          </GlobalStateRoot>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
