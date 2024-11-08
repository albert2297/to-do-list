import { useState, useEffect } from "react";

export const useIsReady = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  return isReady;
};
