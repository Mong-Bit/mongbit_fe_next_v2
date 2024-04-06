export const getCurrentDateTime = () => {
  const now = new Date().toISOString().replace('T', ' ').replace(/\..+/, '');
  return now;
};

export const localeDate = `${new Date().toLocaleDateString('en-CA')}`;
// export const localeDate = `${new Date().toLocaleString('en-CA')}`;

export const ISO_Date = new Date(new Date().getTime() + 9 * 60 * 60 * 1000).toISOString();
