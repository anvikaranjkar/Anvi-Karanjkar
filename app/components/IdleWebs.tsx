"use client";

import { useEffect, useRef } from "react";

const IDLE_START_MS = 8_000;
const WEB_GROWTH_MS = 38_000;

function drawWeb(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  progress: number,
) {
  const spokes = 8;
  const rings = Math.max(2, Math.ceil(progress * 7));
  const size = radius * Math.min(1, progress * 1.25);

  for (let index = 0; index <= spokes; index += 1) {
    const angle = startAngle + ((endAngle - startAngle) * index) / spokes;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
    context.stroke();
  }

  for (let ring = 1; ring <= rings; ring += 1) {
    const ringRadius = (size * ring) / rings;
    context.beginPath();
    for (let index = 0; index <= spokes; index += 1) {
      const angle = startAngle + ((endAngle - startAngle) * index) / spokes;
      const wobble = index % 2 === 0 ? 0.94 : 1;
      const pointX = x + Math.cos(angle) * ringRadius * wobble;
      const pointY = y + Math.sin(angle) * ringRadius * wobble;
      if (index === 0) context.moveTo(pointX, pointY);
      else context.lineTo(pointX, pointY);
    }
    context.stroke();
  }
}

function drawSpider(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  angle: number,
  ink: string,
) {
  context.save();
  context.translate(x, y);
  context.rotate(angle);
  context.strokeStyle = ink;
  context.fillStyle = ink;
  context.globalAlpha = 0.96;
  context.lineWidth = Math.max(1.5, size * 0.11);
  context.lineCap = "square";
  context.lineJoin = "miter";

  for (const side of [-1, 1]) {
    for (let leg = 0; leg < 4; leg += 1) {
      const offset = (leg - 1.5) * size * 0.22;
      const reach = size * (0.72 + Math.abs(leg - 1.5) * 0.1);
      context.beginPath();
      context.moveTo(side * size * 0.18, offset);
      context.lineTo(side * size * 0.55, offset - size * 0.24);
      context.lineTo(side * reach, offset + (leg < 2 ? -1 : 1) * size * 0.28);
      context.stroke();
    }
  }

  context.beginPath();
  context.ellipse(0, size * 0.16, size * 0.34, size * 0.46, 0, 0, Math.PI * 2);
  context.fill();
  context.beginPath();
  context.arc(0, -size * 0.28, size * 0.25, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = "#fff";
  context.fillRect(-size * 0.13, -size * 0.36, size * 0.08, size * 0.08);
  context.fillRect(size * 0.05, -size * 0.36, size * 0.08, size * 0.08);
  context.restore();
}

export function IdleWebs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let lastActivity = performance.now();
    let width = 0;
    let height = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const clear = () => {
      lastActivity = performance.now();
      canvas.dataset.idleWebProgress = "0";
      canvas.dataset.spiderCount = "0";
      canvas.dataset.spiderJumping = "false";
      canvas.style.opacity = "0";
      context.clearRect(0, 0, width, height);
    };

    const render = (time: number) => {
      const idleFor = time - lastActivity;
      const progress = Math.max(0, Math.min(1, (idleFor - IDLE_START_MS) / WEB_GROWTH_MS));
      canvas.dataset.idleWebProgress = progress.toFixed(2);
      context.clearRect(0, 0, width, height);

      if (progress > 0) {
        const ink = getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#111";
        context.save();
        context.strokeStyle = ink;
        context.lineWidth = 1.15;
        context.globalAlpha = 0.76;
        context.lineCap = "square";
        const cornerRadius = Math.min(width, height) * 0.44;

        drawWeb(context, 0, 0, cornerRadius, 0, Math.PI / 2, progress);
        drawWeb(context, width, 0, cornerRadius, Math.PI / 2, Math.PI, progress);
        if (progress > 0.18) drawWeb(context, width, height, cornerRadius, Math.PI, Math.PI * 1.5, progress - 0.12);
        if (progress > 0.32) drawWeb(context, 0, height, cornerRadius, Math.PI * 1.5, Math.PI * 2, progress - 0.22);
        if (progress > 0.5) drawWeb(context, width * 0.48, 0, Math.min(width, height) * 0.24, 0, Math.PI, (progress - 0.45) * 1.8);
        if (progress > 0.66) drawWeb(context, width * 0.68, height, Math.min(width, height) * 0.22, Math.PI, Math.PI * 2, (progress - 0.6) * 2.2);
        context.restore();

        let spiderCount = 0;
        let spiderJumping = false;
        if (progress > 0.58) {
          const crawl = time * 0.001;
          const spiderSize = 8 + progress * 7;
          const spiders = [
            { x: width * (0.12 + 0.16 * Math.sin(crawl * 0.62)), y: height * (0.24 + 0.13 * Math.cos(crawl * 0.48)), angle: crawl * 0.22 },
            { x: width * (0.82 + 0.1 * Math.cos(crawl * 0.51)), y: height * (0.2 + 0.18 * Math.sin(crawl * 0.69)), angle: -crawl * 0.19 },
            { x: width * (0.28 + 0.2 * Math.cos(crawl * 0.38)), y: height * (0.82 + 0.08 * Math.sin(crawl * 0.57)), angle: crawl * 0.16 },
            { x: width * (0.68 + 0.15 * Math.sin(crawl * 0.44)), y: height * (0.72 + 0.14 * Math.cos(crawl * 0.6)), angle: -crawl * 0.24 },
          ];
          spiders.forEach((spider, index) => {
            drawSpider(context, spider.x, spider.y, spiderSize + index * 1.4, spider.angle, ink);
          });
          spiderCount = spiders.length;

          if (progress > 0.82) {
            const jumpCycle = (Math.sin(time * 0.0032) + 1) / 2;
            const jump = Math.min(1, Math.max(0, (jumpCycle - 0.58) / 0.42));
            const jumpSize = 18 + Math.pow(jump, 2.3) * 72;
            drawSpider(
              context,
              width * 0.5 + Math.sin(time * 0.0011) * width * 0.08,
              height * 0.48 + Math.cos(time * 0.0013) * height * 0.06,
              jumpSize,
              Math.sin(time * 0.0017) * 0.3,
              ink,
            );
            spiderCount += 1;
            spiderJumping = jump > 0.2;
          }
        }

        canvas.dataset.spiderCount = String(spiderCount);
        canvas.dataset.spiderJumping = String(spiderJumping);

        canvas.style.opacity = String(Math.min(0.72, progress * 1.25));
      } else {
        canvas.dataset.spiderCount = "0";
        canvas.dataset.spiderJumping = "false";
        canvas.style.opacity = "0";
      }

      frame = requestAnimationFrame(render);
    };

    const activityEvents: (keyof WindowEventMap)[] = ["pointerdown", "pointermove", "keydown", "wheel", "scroll", "touchstart"];
    resize();
    activityEvents.forEach((eventName) => window.addEventListener(eventName, clear, { passive: true, capture: true }));
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      activityEvents.forEach((eventName) => window.removeEventListener(eventName, clear, { capture: true }));
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="idle-webs"
      data-idle-web-progress="0"
      data-spider-count="0"
      data-spider-jumping="false"
      aria-hidden="true"
    />
  );
}
