'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { CONST_FOOTER, IMAGE_ALT_STRING } from '@/constants/constant';
import * as B from '@/styles/base.style';
import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';

export default function MyFooter() {
  const pathName = usePathname();
  const isShow = !pathName.includes('policy') && !pathName.includes('terms');

  // 약관 및 정책 페이지에서 footer 표시되지 않도록
  if (isShow)
    return (
      <div>
        <B.Wrap_mediaquery flexDirection="column" alignItems="baseline" padding="2em 0 1rem 1rem" position="relative">
          <L.Div margin="0 0 2rem 0">
            {CONST_FOOTER.DESCRIPTION.map((e, i) => (
              <B.Text key={e + i} padding="0 0 0.2rem 0" fontSize={theme.font.size.xs} color={theme.colors.deepGray}>
                {e}
              </B.Text>
            ))}
          </L.Div>

          <L.Position position="absolute" right="-1.3rem" bottom="2.7rem">
            <L.Flex gap="0.5rem" margin="0 3rem 0 0">
              {CONST_FOOTER.POLICY.map((e, i) => (
                <Link key={e + i} href={CONST_FOOTER.PAGE_URL[i]} target="_blank">
                  <B.Text fontSize={theme.font.size.xs}>{e}</B.Text>
                </Link>
              ))}
            </L.Flex>
          </L.Position>

          <div>
            <L.Flex margin="0 0 0 0.5rem">
              {CONST_FOOTER.BUTTON_IMG_URL.map((e, i) => (
                <Link key={e + i} href={CONST_FOOTER.LINK_URL[i]} target="_blank">
                  <B.IconImage
                    src={e}
                    alt={IMAGE_ALT_STRING.MONGBIT_TITLE + '깃허브 및 인스타그램 바로가기'}
                    width="1.3rem"
                    height="1.3rem"
                    margin="0 0.5rem 0 0"
                  />
                </Link>
              ))}
            </L.Flex>
            <L.Position position="absolute" right="1.5rem" bottom="1.5rem">
              <B.Text fontSize={theme.font.size.xs}>{CONST_FOOTER.COPYRIGHT}</B.Text>
            </L.Position>
          </div>
        </B.Wrap_mediaquery>
      </div>
    );

  return null;
}
