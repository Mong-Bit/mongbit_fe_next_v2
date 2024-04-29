'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { CONST_FOOTER, IMAGE_ALT_STRING } from '@/constants/constant';

import {
  PolicyText,
  CopyrightText,
  WrapForDiscription,
  WrapForPolicyText,
  DescriptionText,
} from '@/components/base/styledComponents';
import { Image } from '@/components/ui/CommonElements';
import { Wrap_mediaquery } from '@/components/ui/Wrap';

export default function MyFooter() {
  const pathName = usePathname();
  const isShow = !pathName.includes('policy') && !pathName.includes('terms');

  // 약관 및 정책 페이지에서 footer 표시되지 않도록
  if (isShow)
    return (
      <div>
        <Wrap_mediaquery flexDirection="column" alignItems="baseline" padding="2em 0 1rem 1rem" position="relative">
          <WrapForDiscription>
            {CONST_FOOTER.DESCRIPTION.map((el, i) => (
              <DescriptionText key={el + i}>{el}</DescriptionText>
            ))}
          </WrapForDiscription>

          <WrapForPolicyText position="absolute" right="-1.3rem" bottom="2.7rem" padding="1rem 2.5rem 0 0">
            {CONST_FOOTER.POLICY.map((el, i) => (
              <Link key={el + i} href={CONST_FOOTER.PAGE_URL[i]} target="_blank">
                <PolicyText>{el}</PolicyText>
              </Link>
            ))}
          </WrapForPolicyText>

          <div>
            <WrapForPolicyText margin="0 0 0 0.5rem">
              {CONST_FOOTER.BUTTON_IMG_URL.map((el, i) => (
                <Link key={el + i} href={CONST_FOOTER.LINK_URL[i]} target="_blank">
                  <Image
                    width="1.3rem"
                    margin="0 1rem 0 0"
                    key={el + i}
                    src={el}
                    alt={IMAGE_ALT_STRING.MONGBIT_TITLE + '깃허브 및 인스타그램 바로가기'}
                  />
                </Link>
              ))}
            </WrapForPolicyText>
            <CopyrightText>{CONST_FOOTER.COPYRIGHT}</CopyrightText>
          </div>
        </Wrap_mediaquery>
      </div>
    );

  return null;
}
