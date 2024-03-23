import styled from 'styled-components';

import * as Types from './types';

export const Image = styled.img<Types.Image>`
  width: ${(props) => props.width ?? ''};
  margin: ${(props) => props.margin ?? ''};
  object-fit: ${(props) => props.objectFit ?? ''};
  border-radius: ${(props) => props.borderRadius ?? ''};
  cursor: ${(props) => props.cursor ?? ''};
`;
export const TitleText = styled.p<Types.Text>`
  color: ${(props) => (props.color ? props.color : '')};
  font-size: ${(props) => props.fontSize ?? ''};
  font-weight: ${(props) => props.fontWeight ?? ''};
  padding: ${(props) => props.padding ?? ''};
  margin: ${(props) => props.margin ?? ''};
`;

export const Text = styled.p<Types.Text>`
  color: ${(props) => props.color ?? ''};
  width: ${(props) => props.width ?? ''};
  padding: ${(props) => props.padding ?? ''};
  font-size: ${(props) => props.fontSize ?? ''};
  white-space: ${(props) => props.whiteSpace ?? ''};
  overflow: ${(props) => props.overflow ?? ''};
  text-overflow: ${(props) => props.textOverflow ?? ''};
  cursor: ${(props) => props.cursor ?? ''};
  display: ${(props) => props.display ?? ''};
  margin-left: ${(props) => props.marginLeft ?? ''};
`;

export const Wrap = styled.div<Types.Wrap>`
  width: ${(props) => props.width ?? ''};
  height: ${(props) => props.height ?? ''};
  margin: ${(props) => props.margin ?? ''};
  overflow: ${(props) => props.overflow ?? ''};
  display: ${(props) => props.display ?? ''};
  flex-wrap: ${(props) => props.flexWrap ?? ''};
  position: ${(props) => props.position ?? ''};
  right: ${(props) => props.right ?? ''};
  bottom: ${(props) => props.bottom ?? ''};
  padding: ${(props) => props.padding ?? ''};
  flex-direction: ${(props) => props.flexDirection ?? ''};
  justify-content: ${(props) => props.justifyContent ?? ''};
  align-items: ${(props) => props.alignItems ?? ''};
  background-color: ${(props) => props.backgroundColor ?? ''};
  border-radius: ${(props) => props.borderRadius ?? ''};
`;

export const Stroke = styled.div`
  border-bottom: 1px solid #f1f1f1;
  width: 90%;
  height: 5px;
`;
