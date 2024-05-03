import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { BUTTON_TYPE } from '@/constants/constant';

import { YellowButton } from './Button';

type FlatBtnProps = {
  top?: string;
  bottom?: string;
  right?: string;
  left?: string;
};

const FlatBtn = styled.button<FlatBtnProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  box-shadow: 0 4px 8px rgba(85, 85, 85, 0.1);
  background-color: #ffc42f88;
  transition: ${BUTTON_TYPE.YELLOW_BUTTON.TRANSITION};
  position: fixed;
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  right: ${(props) => props.right};
  left: ${(props) => props.left};

  &:hover {
    background-color: #f8b71388;
  }
`;

const FloatMenuWrap = styled.div<FlatBtnProps>`
  width: 120px;
  height: 200px;
  position: fixed;
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  right: ${(props) => props.right};
  left: ${(props) => props.left};
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FloatMenuInnerBtn = styled(YellowButton)<FlatBtnProps>`
  width: 100%;
  height: 40px;
`;

const FloatOpenMenu = ({ top, bottom, right, left }: FlatBtnProps) => {
  const router = useRouter();

  return (
    <FloatMenuWrap top={top} bottom={bottom} right={right} left={left}>
      <FloatMenuInnerBtn onClick={() => router.push('/login')}>전체 목록</FloatMenuInnerBtn>
      <FloatMenuInnerBtn onClick={() => router.push('/login')}>최신 목록</FloatMenuInnerBtn>
      <FloatMenuInnerBtn>랜덤 테스트</FloatMenuInnerBtn>
    </FloatMenuWrap>
  );
};

export const FloatMenuButton = ({ top, bottom, right, left }: FlatBtnProps) => {
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
      <FlatBtn top={top} bottom={bottom} right={right} left={left} onClick={onClickOpenButton}>
        {isOpen ? 'X' : '메뉴'}
      </FlatBtn>
    </div>
  );
};

export const FloatTopButton = ({ top, bottom, right, left }: FlatBtnProps) => {
  const onClickScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FlatBtn top={top} bottom={bottom} right={right} left={left} onClick={onClickScrollToTop}>
      위로
    </FlatBtn>
  );
};
