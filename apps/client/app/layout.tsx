import '@/app/globals.css';
import GlobalStateRoot from '@/app/GlobalStateRoot';
import StyledJsxRegistry from '@/app/registry';
import MyFooter from '@/components/base/MyFooter';
import MyHeader from '@/components/base/MyHeader';

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
