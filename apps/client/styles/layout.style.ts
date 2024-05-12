import styled, { CSSProperties } from 'styled-components';

export const Flex = styled.div<CSSProperties>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  justify-content: ${(props) => props.justifyContent ?? 'center'};
  align-items: ${(props) => props.alignItems ?? 'center'};
  flex-wrap: ${(props) => props.flexWrap};
  gap: ${(props) => props.gap};
  margin: ${(props) => props.margin};
`;

export const Position = styled.div<CSSProperties>`
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  right: ${(props) => props.right};
  left: ${(props) => props.left};
`;

// 생성하지 않고 사용하는편이 좋을듯 합니다.
export const Div = styled.div<{ margin: string }>`
  margin: ${(props) => props.margin};
`;

export const AnimationDiv = styled.div`
  width: 100px;
  margin: 10rem 10rem;
`;
