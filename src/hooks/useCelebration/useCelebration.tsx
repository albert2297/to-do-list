import { ICelebration } from "@/interfaces";
import { useState, useEffect } from "react";

export const useCelebration = ({ mood }: ICelebration) => {
  const [isConfettiVisible, setIsConfettiVisible] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (mood === "happy") {
      setIsConfettiVisible(true);
      timer = setTimeout(() => setIsConfettiVisible(false), 4000);
    } else {
      setIsConfettiVisible(false);
    }

    return () => clearTimeout(timer);
  }, [mood]);

  return { isConfettiVisible };
};
