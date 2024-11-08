import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { ICelebration } from "@/interfaces";
import { useCelebration } from "@/hooks";

export const Celebration = ({ mood }: ICelebration) => {
  const { width, height } = useWindowSize();
  const { isConfettiVisible } = useCelebration({ mood });

  return (
    <div data-testid="celebration">
      {isConfettiVisible && (
        <Confetti
          width={width}
          height={height}
          gravity={0.2}
          recycle={false}
          numberOfPieces={200}
        />
      )}
    </div>
  );
};
