"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const palette = ["#61bb46", "#fdb827", "#f5821f", "#e03a3e", "#963d97", "#009ddc"];

const faces = [
  { name: "Projects", short: "P", path: "/projects", className: "front", color: palette[3], foreground: "#fff" },
  { name: "Experience", short: "E", path: "/experience", className: "right", color: palette[0], foreground: "#111" },
  { name: "Contact", short: "C", path: "/contact", className: "left", color: palette[5], foreground: "#fff" },
  { name: "Games", short: "G", path: "/games", className: "back", color: palette[2], foreground: "#111" },
  { name: "Top", className: "top", color: palette[1], foreground: "#111" },
  { name: "Bottom", className: "bottom", color: palette[4], foreground: "#fff" },
];

export function RubiksCube() {
  const router = useRouter();
  const cubeRef = useRef<HTMLDivElement>(null);
  const rotation = useRef({ x: -24, y: 34 });
  const drag = useRef({ active: false, x: 0, y: 0, rx: 0, ry: 0 });
  const [scramble, setScramble] = useState(0);

  const applyRotation = () => {
    if (!cubeRef.current) return;
    cubeRef.current.style.transform = `rotateX(${rotation.current.x}deg) rotateY(${rotation.current.y}deg)`;
    cubeRef.current.dataset.rotationY = rotation.current.y.toFixed(2);
  };

  useEffect(() => {
    let frame = 0;
    let previous = performance.now();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const speed = reducedMotion ? 0.006 : 0.025;

    const animate = (time: number) => {
      const delta = Math.min(time - previous, 32);
      previous = time;
      if (!drag.current.active) {
        rotation.current.y += delta * speed;
        applyRotation();
      }
      frame = requestAnimationFrame(animate);
    };

    applyRotation();
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const move = (x: number, y: number) => {
    rotation.current = { x: rotation.current.x + x, y: rotation.current.y + y };
    applyRotation();
  };

  return (
    <div className="cube-shell">
      <button className="turn-arrow turn-arrow--up" onClick={() => move(-90, 0)} aria-label="Turn cube upward">↑</button>
      <button className="turn-arrow turn-arrow--left" onClick={() => move(0, -90)} aria-label="Turn cube left">←</button>
      <div
        className="cube-stage"
        role="application"
        aria-label="Interactive three by three Rubik's Cube in classic Macintosh colours. It spins automatically. Drag to rotate it or select a lettered centre cap."
        tabIndex={0}
        onPointerDown={(event) => {
          drag.current = {
            active: true,
            x: event.clientX,
            y: event.clientY,
            rx: rotation.current.x,
            ry: rotation.current.y,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!drag.current.active) return;
          rotation.current = {
            x: drag.current.rx - (event.clientY - drag.current.y) * 0.38,
            y: drag.current.ry + (event.clientX - drag.current.x) * 0.38,
          };
          applyRotation();
        }}
        onPointerUp={() => { drag.current.active = false; }}
        onPointerCancel={() => { drag.current.active = false; }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") move(0, -90);
          if (event.key === "ArrowRight") move(0, 90);
          if (event.key === "ArrowUp") move(-90, 0);
          if (event.key === "ArrowDown") move(90, 0);
          if (event.key.startsWith("Arrow")) event.preventDefault();
        }}
      >
        <div
          ref={cubeRef}
          className="rubiks-cube"
          data-auto-spinning="true"
          data-rotation-y="34.00"
          style={{ transform: "rotateX(-24deg) rotateY(34deg)" }}
        >
          {faces.map((face, faceIndex) => (
            <div className={`cube-face cube-face--${face.className}`} key={face.name}>
              {Array.from({ length: 9 }, (_, pieceIndex) => {
                const color = scramble === 0
                  ? face.color
                  : palette[(pieceIndex * 2 + faceIndex * 3 + scramble) % palette.length];

                if (pieceIndex === 4 && face.path && face.short) {
                  return (
                    <button
                      className="cube-centre"
                      key={pieceIndex}
                      style={{ backgroundColor: face.color, color: face.foreground }}
                      onPointerDown={(event) => event.stopPropagation()}
                      onClick={(event) => { event.stopPropagation(); router.push(face.path); }}
                      aria-label={`Open ${face.name}`}
                      title={face.name}
                    >
                      {face.short}
                    </button>
                  );
                }

                return <span className="cube-piece" key={pieceIndex} style={{ backgroundColor: color }} />;
              })}
            </div>
          ))}
        </div>
      </div>
      <button className="turn-arrow turn-arrow--right" onClick={() => move(0, 90)} aria-label="Turn cube right">→</button>
      <button className="turn-arrow turn-arrow--down" onClick={() => move(90, 0)} aria-label="Turn cube downward">↓</button>
      <div className="cube-toolbar">
        <span aria-label="Automatic rotation is on">● Auto-spin</span>
        <button onClick={() => setScramble((current) => current + 1)}>⌘ Scramble</button>
        <button onClick={() => { rotation.current = { x: -24, y: 34 }; setScramble(0); applyRotation(); }}>Reset view</button>
      </div>
      <div className="cube-status">
        <span>P Projects</span><span>E Experience</span><span>C Contact</span><span>G Games</span>
      </div>
    </div>
  );
}
