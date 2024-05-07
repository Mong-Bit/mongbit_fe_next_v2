import '@/app/globals.css';
import GlobalStateRoot from '@/app/GlobalStateRoot';
import StyledJsxRegistry from '@/app/registry';
import MyFooter from '@/components//MyFooter';
import MyHeader from '@/components//MyHeader';

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.2.0/kakao.min.js"
          integrity="sha384-x+WG2i7pOR+oWb6O5GV5f1KN2Ko6N7PTGPS7UlasYWNxZMKQA63Cj/B2lbUmUfuC"
          crossOrigin="anonymous"
        ></script>
      </head>
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
