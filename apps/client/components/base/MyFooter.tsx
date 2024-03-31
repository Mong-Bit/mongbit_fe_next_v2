'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { FONT, CONST_FOOTER, IMAGE_ALT_STRING } from '@/constants/constant';

import { Wrap_mediaquery } from '@/components/ui/wrap/Wrap';
import { Wrap, Text, Image } from '@/components/ui/CommonElements';

const PolicyText = styled(Text)`
  margin-right: 0.5rem;
  font-size: ${FONT.SIZE.EXTRA_SMALL};
  color: ${FONT.COLOR.DEEPGRAY};
`;

const CopyrightText = styled(Text)`
  position: absolute;
  right: 0;
  bottom: 1.5rem;
  padding: 0.2rem 1.5rem 0 0;
  font-size: ${FONT.SIZE.EXTRA_SMALL};
  color: ${FONT.COLOR.DEEPGRAY};
`;

export default function MyFooter() {
  const pathName = usePathname();
  const isShow = !pathName.includes('policy') && !pathName.includes('terms');

  // 약관 및 정책 페이지에서 footer 표시되지 않도록
  if (isShow)
    return (
      <div>
        <Wrap_mediaquery flexDirection="column" alignItems="baseline" padding="2em 0 1rem 1rem" position="relative">
          <Wrap margin="0 0 1.8rem 0.5rem">
            {CONST_FOOTER.DESCRIPTION.map((e, i) => (
              <Text padding=" 0 0 0.2rem 0" fontSize={FONT.SIZE.EXTRA_SMALL} color={FONT.COLOR.DEEPGRAY} key={e + i}>
                {e}
              </Text>
            ))}
          </Wrap>

          <Wrap
            display="flex"
            alignItems="center"
            position="absolute"
            right="-1.3rem"
            bottom="2.7rem"
            padding="1rem 2.5rem 0 0"
          >
            {CONST_FOOTER.POLICY.map((e, i) => (
              <Link key={e + i} href={CONST_FOOTER.PAGE_URL[i]} target="_blank">
                <PolicyText>{e}</PolicyText>
              </Link>
            ))}
          </Wrap>

          <Wrap display="flex" alignItems="center">
            <Wrap display="flex" alignItems="center" margin="0 0 0 0.5rem">
              {CONST_FOOTER.BUTTON_IMG_URL.map((e, i) => (
                <Link key={e + i} href={CONST_FOOTER.LINK_URL[i]} target="_blank">
                  <Image
                    width="2rem"
                    margin="0 1rem 0 0"
                    key={e + i}
                    src={e}
                    alt={IMAGE_ALT_STRING.MONGBIT_TITLE + '깃허브 및 인스타그램 바로가기'}
                  />
                </Link>
              ))}
            </Wrap>
            <CopyrightText>{CONST_FOOTER.COPYRIGHT}</CopyrightText>
          </Wrap>
        </Wrap_mediaquery>
      </div>
    );

  return null;
}
