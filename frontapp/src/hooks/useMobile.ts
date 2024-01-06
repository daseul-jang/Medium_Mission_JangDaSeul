import { useEffect, useState } from 'react';

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    const mql = window.matchMedia('(max-width: 639px)');

    mql.addEventListener('change', handleResize);
    window.addEventListener('resize', handleResize);

    return () => {
      mql.removeEventListener('change', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
};
