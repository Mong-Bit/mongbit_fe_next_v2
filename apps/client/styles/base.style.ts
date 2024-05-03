import styled from 'styled-components';

export const Title = styled.div<BaseStyle.Text>`
  width: 100%;
  h3 {
    color: ${(props) => props.theme.colors.black};
    font-size: ${(props) => props.theme.font.size.xl};
    font-weight: ${(props) => props.theme.font.bold.b};
    margin-bottom: 5px;
  }
  p {
    color: ${(props) => props.theme.colors.darkGray};
    font-size: ${(props) => props.theme.font.size.m};
    font-weight: ${(props) => props.theme.font.bold.m};
    margin-left: 0.2rem;
  }
`;

export const Content = styled.p<BaseStyle.Text>`
  color: ${(props) => props.color ?? props.theme.color_darkGray};
  font-size: ${(props) => props.fontSize ?? props.theme.font_size_s};
  font-weight: ${(props) => props.fontWeight ?? props.theme.font_weight_n};
`;
