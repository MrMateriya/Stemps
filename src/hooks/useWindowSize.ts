import {useCallback, useEffect, useState} from "react";

type size = { width: number, height: number }
type noSize = { width: undefined, height: undefined }

export function useWindowSize(): size | noSize {
  const isClient = typeof window === 'object';

  const getSize = useCallback(function getSize(): size | noSize {
    return isClient ? { width: window.innerWidth, height: window.innerHeight } : { width: undefined, height: undefined };
  }, [isClient]);

  const [windowSize, setWindowSize] = useState<size | noSize>(getSize());

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