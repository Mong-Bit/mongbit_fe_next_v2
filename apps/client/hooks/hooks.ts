import { useEffect } from 'react';
import lottie from 'lottie-web';

export function useAnimationEffect(containerRef: Hooks.containerRefCurrent, animationData: Hooks.animationData) {
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
