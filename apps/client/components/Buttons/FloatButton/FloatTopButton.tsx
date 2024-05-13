import { PositionProps } from '@/types/styled';

import { FloatButton } from '.';

export const FloatTopButton = ({ ...props }: Omit<PositionProps, 'position'>) => {
  const onClickScrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return <FloatButton text="TOP" onClick={onClickScrollToTop} {...props} />;
};
