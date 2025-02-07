import {useCallback, useEffect, useState} from "react";

export function useWindowSize(): { width: number | undefined, height: number | undefined} {
  const isClient = typeof window === 'object';

  const getSize = useCallback(function getSize() {
    return isClient ? { width: window.innerWidth, height: window.innerHeight } : { width: undefined, height: undefined };
  }, [isClient]);

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient, getSize]);

  return windowSize;
}