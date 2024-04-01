import { useEffect } from 'react';
import lottie from 'lottie-web';

import * as useAnimationEffectProp from '@/hooks/types';

export function useAnimationEffect(
  containerRef: useAnimationEffectProp.containerRefCurrent,
  animationData: useAnimationEffectProp.animationData,
) {
  useEffect(() => {
    if (!containerRef.current) return;

    const anim = lottie.loadAnimation({
      container: containerRef.current,
      animationData,
      renderer: 'svg',
      loop: true,
      autoplay: true,
    });

    return () => {
      anim?.destroy();
    };
  }, [containerRef]);
}
