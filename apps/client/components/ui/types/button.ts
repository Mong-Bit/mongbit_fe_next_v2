export type Image = {
  width?: string;
  margin?: string;
  imageUrl?: string;
  objectFit?: string;
  borderRadius?: string;
  cursor?: string;
};

export type SeeMoreButtonProp = {
  onClick: (event: React.MouseEvent) => void;
};
