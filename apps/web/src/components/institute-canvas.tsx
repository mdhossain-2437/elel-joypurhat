"use client";

import { useEffect, useRef } from "react";

export function InstituteCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let raf = 0;

    const points = Array.from({ length: 34 }, (_, index) => ({
      x: Math.random(),
      y: Math.random(),
      r: 1.6 + Math.random() * 2.4,
      speed: 0.00025 + (index % 5) * 0.00008,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      frame += 1;
      context.clearRect(0, 0, width, height);
      context.fillStyle = "rgba(255, 90, 31, 0.08)";
      context.strokeStyle = "rgba(17, 17, 17, 0.07)";
      context.lineWidth = 1;

      points.forEach((point, index) => {
        if (!reduceMotion) {
          point.y = (point.y + point.speed) % 1;
          point.x += Math.sin(frame * 0.004 + index) * 0.00008;
        }

        const x = point.x * width;
        const y = point.y * height;
        context.beginPath();
        context.arc(x, y, point.r, 0, Math.PI * 2);
        context.fill();

        for (let next = index + 1; next < points.length; next += 1) {
          const other = points[next];
          const ox = other.x * width;
          const oy = other.y * height;
          const distance = Math.hypot(x - ox, y - oy);
          if (distance < 150) {
            context.globalAlpha = 1 - distance / 150;
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(ox, oy);
            context.stroke();
            context.globalAlpha = 1;
          }
        }
      });

      raf = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="institute-canvas" aria-hidden="true" />;
}
