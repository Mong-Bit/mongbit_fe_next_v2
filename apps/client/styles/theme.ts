const colors = {
  yellow: '#ffc52f',
  yellow_hover: '#f8b713',
  darkGray: '#8f8f8f',
  deepGray: '#979797',
  lightGray: '#f2f2f2',
  white: 'white',
  black: 'black',
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
    n: 400,
    b: 700,
  },
};

const yellowButton = `
    color: ${colors.white};
    background-color: ${colors.yellow};
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: ${colors.yellow_hover};
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
  width_340: '340px',
  width_345: '345px',
  width_370: '370px',
  width_375: '375px',
  width_400: '400px',
  width_420: '420px',
};

export const theme = {
  colors,
  font,
  flex,
  devices,
  yellowButton,
};

export default theme;
