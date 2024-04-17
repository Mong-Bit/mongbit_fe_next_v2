import styled from 'styled-components';

import { FONT } from '@/constants/constant';

export const Image = styled.img<Ui.Image>`
  width: ${(props) => props.width ?? ''};
  margin: ${(props) => props.margin ?? ''};
  object-fit: ${(props) => props.objectFit ?? ''};
  border-radius: ${(props) => props.borderRadius ?? ''};
  cursor: ${(props) => props.cursor ?? ''};
`;

export const TitleText = styled.p<Ui.Text>`
  color: ${(props) => props.color ?? FONT.COLOR.BLACK};
  font-size: ${(props) => props.fontSize ?? FONT.SIZE.MEDIUM};
  font-weight: ${(props) => props.fontWeight ?? ''};
  padding: ${(props) => props.padding ?? ''};
  margin: ${(props) => props.margin ?? ''};
  padding-left: 1.5rem;
`;

export const Text = styled.p<Ui.Text>``;

export const Div = styled.div<Ui.Wrap>``;

export const Stroke = styled.div<Ui.Stroke>`
  border-bottom: 0.1rem solid #f1f1f1;
  width: ${(props) => props.width ?? ''};
  height: 0.5rem;
  margin: ${(props) => props.margin ?? ''};
`;
