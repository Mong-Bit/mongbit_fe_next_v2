import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import * as B from '@/styles/base.style';
import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';

const FloatMenuBox = styled(L.Position)`
  width: 120px;
  height: 190px;
  ${theme.flex.centerColumn}
  gap: 15px;
`;

const FloatOpenMenu = ({ top, bottom, right, left }: BaseStyle.PositionProps) => {
  const router = useRouter();

  return (
    <FloatMenuBox position="fixed" top={top} bottom={bottom} right={right} left={left}>
      <B.Button width="100%" height="35px" borderRadius="0.5rem" onClick={() => router.push('/mbti-test/total')}>
        전체 목록
      </B.Button>
      <B.Button width="100%" height="35px" borderRadius="0.5rem" onClick={() => router.push('/mbti-test/latest')}>
        최신 목록
      </B.Button>
      <B.Button width="100%" height="35px" borderRadius="0.5rem">
        랜덤 테스트
      </B.Button>
    </FloatMenuBox>
  );
};

export const FloatMenuButton = ({ top, bottom, right, left }: BaseStyle.PositionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const onClickOpenButton = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && isOpen && !menuRef.current.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef}>
      {isOpen && <FloatOpenMenu top={top} bottom={bottom} right={right} left={left} />}
      <L.Position position="fixed" top={top} bottom={bottom} right={right} left={left}>
        <B.Button
          width="40px"
          height="40px"
          borderRadius="50%"
          fontSize={theme.font.size.xs}
          color={theme.colors.black}
          backgroundColor=" #ffc42f88"
          onClick={onClickOpenButton}
        >
          {isOpen ? 'X' : 'MENU'}
        </B.Button>
      </L.Position>
    </div>
  );
};

export const FloatTopButton = ({ top, bottom, right, left }: BaseStyle.PositionProps) => {
  const onClickScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <L.Position position="fixed" top={top} bottom={bottom} right={right} left={left}>
      <B.Button
        width="40px"
        height="40px"
        borderRadius="50%"
        fontSize={theme.font.size.xs}
        color={theme.colors.black}
        backgroundColor=" #ffc42f88"
        onClick={onClickScrollToTop}
      >
        TOP
      </B.Button>
    </L.Position>
  );
};
