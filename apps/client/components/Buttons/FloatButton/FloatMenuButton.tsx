import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import * as B from '@/styles/base.style';
import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';

import { FloatButton, FloatButtonProps } from '.';

interface FloatMenuButton extends Omit<FloatButtonProps, 'onClick'> {
  menuOptions: {
    text: string;
    onClick: () => void;
  }[];
}

const FloatMenuBox = styled(L.Position)`
  width: 120px;
  gap: 15px;
  margin-bottom: 50px;
  padding: 10px;
  background-color: #f1d28981;
  border-radius: 0.8rem;
  z-index: 100;
  ${theme.flex.centerColumn}
`;

// 사용할 컴포넌트에서 직접 입력 (임시 작성)
//   const router = useRouter();

//   const floatMenuOptions = [
//     {
//       text: '전체 목록',
//       onClick: () => router.push(PATHS.TOTAL),
//     },
//     {
//       text: '최신 목록',
//       onClick: () => router.push(PATHS.LATEST),
//     },
//     {
//       text: '랜덤 테스트',
//       onClick: () => router.push(PATHS.RANDOM),
//     },
//   ];

export const FloatMenuButton = ({ text, menuOptions, ...props }: FloatMenuButton) => {
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
      {isOpen && (
        <FloatMenuBox position="fixed" {...props}>
          {menuOptions.map((menu) => (
            <B.Button key={menu.text} width="100%" height="35px" borderRadius="0.5rem" onClick={menu.onClick}>
              {menu.text}
            </B.Button>
          ))}
        </FloatMenuBox>
      )}

      <FloatButton text={isOpen ? 'X' : text} onClick={onClickOpenButton} {...props} />
    </div>
  );
};
