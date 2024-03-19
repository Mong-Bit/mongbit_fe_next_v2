import styled from 'styled-components';

export const TitleText = styled.p`
  color: ${(props) => (props.color ? props.color : '')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '')};
  padding-top: ${(props) => (props.paddingtop ? props.paddingtop : '')};
  margin: ${(props) => (props.margin ? props.margin : '')};
`;

export const Image = styled.img`
  width: ${(props) => (props.width ? props.width : '')};
  margin: ${(props) => (props.margin ? props.margin : '')};
`;

export const Text = styled.p`
  color: ${(props) => (props.color ? props.color : '')};
  width: ${(props) => (props.width ? props.width : '')};
  padding: ${(props) => (props.padding ? props.padding : '')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '')};
  white-space: ${(props) => (props.whiteSpace ? props.whiteSpace : '')};
  overflow: ${(props) => (props.overflow ? props.overflow : '')};
  text-overflow: ${(props) => (props.textoverflow ? props.textoverflow : '')};
  cursor: ${(props) => (props.cursor ? props.cursor : '')};
  display: ${(props) => (props.display ? props.display : '')};
  margin-left: ${(props) => (props.marginleft ? props.marginleft : '')};
`;

export const Wrap = styled.div`
  width: ${(props) => (props.width ? props.width : '')};
  height: ${(props) => (props.height ? props.height : '')};
  margin: ${(props) => (props.margin ? props.margin : '')};
  overflow: ${(props) => (props.overflow ? props.overflow : '')};
  display: ${(props) => (props.display ? props.display : '')};
  flex-wrap: ${(props) => (props.flexwrap ? props.flexwrap : '')};
  position: ${(props) => (props.position ? props.position : '')};
  right: ${(props) => (props.right ? props.right : '')};
  bottom: ${(props) => (props.bottom ? props.bottom : '')};
  padding: ${(props) => (props.padding ? props.padding : '')};
  flex-direction: ${(props) => (props.flexDirection ? props.flexDirection : '')};
  justify-content: ${(props) => (props.justifyContent ? props.justifyContent : '')};
  align-items: ${(props) => (props.alignitems ? props.alignitems : '')};
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : '')};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : '')};
`;

export const Stroke = styled.div`
  border-bottom: 1px solid #f1f1f1;
  width: 90%;
  height: 5px;
`;
