import { log } from "console";
import { useRef } from "react";

export function useTilt(maxTilt = 15) {
  const cardRef = useRef<HTMLDivElement>(null);
  console.log("test");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    const rotateX = (maxTilt / 2 - y * maxTilt).toFixed(2);
    const rotateY = (x * maxTilt - maxTilt / 2).toFixed(2);

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return { cardRef, handleMouseMove, handleMouseLeave };
}
