"use client";

import { useState } from "react";

const start = [false, true, false, false, true, false, true, false, false, true, false, true, true, false, false, true];

export function CircuitBreaker() {
  const [nodes, setNodes] = useState(start);
  const solved = nodes.every(Boolean);

  const press = (index: number) => {
    setNodes((current) => current.map((value, item) => {
      const row = Math.floor(index / 4);
      const col = index % 4;
      const itemRow = Math.floor(item / 4);
      const itemCol = item % 4;
      const adjacent = (itemRow === row && Math.abs(itemCol - col) <= 1) || (itemCol === col && Math.abs(itemRow - row) === 1);
      return adjacent ? !value : value;
    }));
  };

  return (
    <article className="circuit-game">
      <div className="game-heading"><div><span>Playable</span><h2>Circuit Breaker</h2></div><button onClick={() => setNodes(start)}>Reset</button></div>
      <p>{solved ? "Solved." : "Turn every node blue."}</p>
      <div className="circuit-grid" role="grid" aria-label="Circuit Breaker puzzle">
        {nodes.map((active, index) => (
          <button key={index} className={active ? "is-active" : ""} onClick={() => press(index)} aria-label={`Node ${index + 1}: ${active ? "on" : "off"}`} />
        ))}
      </div>
    </article>
  );
}
