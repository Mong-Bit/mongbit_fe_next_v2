import styled from 'styled-components';

import { MEDIAQUERY } from '@/constants/constant';

import * as Types from '../types/wrap';

export const Wrap_mediaquery = styled.div<Types.WrapMediaqueryProp>`
  background-color: white;
  width: ${MEDIAQUERY.WIDTH_420};
  display: flex;
  flex-direction: ${(props) => props.flexDirection ?? ''};
  justify-content: ${(props) => props.justifyContent ?? ''};
  align-items: ${(props) => props.alignItems ?? ''};
  flex-wrap: ${(props) => props.flexWrap ?? ''};
  padding: ${(props) => props.padding ?? ''};
  margin: ${(props) => props.margin ?? ''};
  position: ${(props) => props.position ?? ''};
  text-align: ${(props) => props.textAlign ?? ''};

  @media (max-width: ${MEDIAQUERY.WIDTH_375}) {
    width: ${MEDIAQUERY.WIDTH_375};
  }
`;
