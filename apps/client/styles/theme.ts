const colors = {
  primaryColor: '#ffc52f',
  primaryColorHover: '#f8b713',
  lightPrimaryColor: '#FFF8E4',
  bgColor: '#ffffff',
  darkGray: '#8f8f8f',
  deepGray: '#979797',
  lightGray: '#f2f2f2',
  mediumGray: '#f4f4f4',
  white: '#ffffff',
  black: '#000000',
  lightBlue: '#a4d9e4',
  lightYellow: '#fff5da',
};

const font = {
  size: {
    xs: '0.7rem',
    s: '0.8rem',
    m: '0.9rem',
    l: '1rem',
    xl: '1.3rem',
  },
  bold: {
    n: '400',
    m: '500',
    b: '700',
  },
};

const boxShadow = `box-shadow: 0 4px 8px rgba(85, 85, 85, 0.1);`;
const transition = `transition: background-color 0.3s ease-in-out;`;

const yellowButton = `
    color: ${colors.white};
    background-color: ${colors.primaryColor};
    ${transition}

    &:hover {
        background-color: ${colors.primaryColorHover};
      }
`;

const flex = {
  center: `
      display:flex;
      justify-contents:center;
      align-items:center;
    `,
  centerColumn: `
      display:flex;
      flex-direction:column;
      justify-contents:center;
      align-items:center;
    `,
};

const devices = {
  width_220: '220px',
  width_240: '240px',
  width_310: '310px',
  width_330: '330px',
  width_340: '340px',
  width_345: '345px',
  width_370: '370px',
  width_375: '375px',
  width_400: '400px',
  width_420: '420px',
  height_600: '600px',
};

export const theme = {
  colors,
  font,
  flex,
  devices,
  yellowButton,
  boxShadow,
  transition,
};

export default theme;
