"use client";

import { useEffect, useRef, useState } from "react";

const symbols = ["◆", "●", "▲", "■", "✦", "+"];
const startingDeck = [0, 3, 1, 5, 2, 4, 3, 0, 5, 1, 4, 2];

export function MemoryMatch() {
  const [deck, setDeck] = useState(startingDeck);
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [busy, setBusy] = useState(false);
  const [round, setRound] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const solved = matched.length === deck.length;

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const reset = () => {
    if (timer.current) clearTimeout(timer.current);
    const nextRound = round + 1;
    const offset = (nextRound * 5) % startingDeck.length;
    setDeck([...startingDeck.slice(offset), ...startingDeck.slice(0, offset)]);
    setRound(nextRound);
    setOpen([]);
    setMatched([]);
    setMoves(0);
    setBusy(false);
  };

  const flip = (index: number) => {
    if (busy || open.includes(index) || matched.includes(index)) return;
    if (open.length === 0) {
      setOpen([index]);
      return;
    }

    const first = open[0];
    setMoves((current) => current + 1);
    if (deck[first] === deck[index]) {
      setMatched((current) => [...current, first, index]);
      setOpen([]);
      return;
    }

    setOpen([first, index]);
    setBusy(true);
    timer.current = setTimeout(() => {
      setOpen([]);
      setBusy(false);
    }, 620);
  };

  return (
    <article className="playable-game memory-game">
      <div className="game-heading">
        <div><span>Playable</span><h2>Memory Match</h2></div>
        <button onClick={reset}>New game</button>
      </div>
      <p>{solved ? `Cleared in ${moves} moves.` : `${moves} moves · Find all six pairs.`}</p>
      <div className="memory-grid" role="grid" aria-label="Memory Match cards">
        {deck.map((symbol, index) => {
          const visible = open.includes(index) || matched.includes(index);
          return (
            <button
              key={`${round}-${index}`}
              className={visible ? "is-open" : ""}
              onClick={() => flip(index)}
              aria-label={`Card ${index + 1}${visible ? `: ${symbols[symbol]}` : ": hidden"}`}
              aria-pressed={visible}
            >
              {visible ? symbols[symbol] : "?"}
            </button>
          );
        })}
      </div>
    </article>
  );
}
