"use client";

import { useEffect, useState } from "react";

const CELL_COUNT = 25;

export function PixelHunt() {
  const [active, setActive] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [target, setTarget] = useState(12);

  useEffect(() => {
    if (!active) return;
    const clock = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          setActive(false);
          return 0;
        }
        return current - 1;
      });
    }, 1_000);
    const mover = window.setInterval(() => {
      setTarget((current) => (current * 7 + 11) % CELL_COUNT);
    }, 850);
    return () => {
      window.clearInterval(clock);
      window.clearInterval(mover);
    };
  }, [active]);

  const start = () => {
    setScore(0);
    setTimeLeft(15);
    setTarget(12);
    setActive(true);
  };

  const hit = (index: number) => {
    if (!active || index !== target) return;
    setScore((current) => current + 1);
    setTarget((current) => (current * 13 + 3) % CELL_COUNT);
  };

  return (
    <article className="playable-game hunt-game">
      <div className="game-heading">
        <div><span>Playable</span><h2>Pixel Hunt</h2></div>
        <button onClick={start}>{active ? "Restart" : "Start"}</button>
      </div>
      <p>{active ? `${timeLeft}s · ${score} caught` : timeLeft === 0 ? `Time. Score: ${score}.` : "Catch the moving pixel."}</p>
      <div className="hunt-grid" role="grid" aria-label="Pixel Hunt board">
        {Array.from({ length: CELL_COUNT }, (_, index) => (
          <button
            key={index}
            className={active && index === target ? "is-target" : ""}
            onClick={() => hit(index)}
            aria-label={active && index === target ? "Catch pixel" : `Empty cell ${index + 1}`}
          >
            {active && index === target ? "◆" : ""}
          </button>
        ))}
      </div>
    </article>
  );
}
