"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ------------------------------------------------------------------ *
 * Reveal — fade/slide an element in when it scrolls into view.
 * Progressive enhancement: content is visible by default (no-JS safe),
 * the entrance animation only enriches it.
 * ------------------------------------------------------------------ */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  y = 28,
  once = true,
  style,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(() => prefersReducedMotion());

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setShown(false);
          }
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      className={`reveal-item ${shown ? "is-in" : ""} ${className}`}
      style={{ ...style, transitionDelay: `${delay}ms`, "--reveal-y": `${y}px` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ *
 * KineticText — splits text into words that rise into place on view.
 * Works with Bengali by splitting on spaces (keeps conjuncts intact).
 * ------------------------------------------------------------------ */
export function KineticText({
  text,
  className = "",
  as: Tag = "span",
  stagger = 60,
}: {
  text: string;
  className?: string;
  as?: ElementType;
  stagger?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(() => prefersReducedMotion());
  const words = text.split(" ");

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`kinetic ${shown ? "is-in" : ""} ${className}`}>
      {words.map((word, index) => (
        <span className="kinetic-word" key={`${word}-${index}`}>
          <span style={{ transitionDelay: `${index * stagger}ms` }}>{word}</span>
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------ *
 * Magnetic — element subtly follows the cursor (buttons / chips).
 * ------------------------------------------------------------------ */
export function Magnetic({
  children,
  className = "",
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    function onMove(event: MouseEvent) {
      const rect = node!.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      node!.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    }
    function onLeave() {
      node!.style.transform = "translate(0, 0)";
    }
    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);
    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`magnetic ${className}`}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Counter — counts up to a number when scrolled into view.
 * ------------------------------------------------------------------ */
export function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1600,
  className = "",
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(() => (prefersReducedMotion() ? to : 0));

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        function tick(nowTs: number) {
          const progress = Math.min((nowTs - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(eased * to));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Marquee — infinite horizontal scroll of its children (duplicated).
 * ------------------------------------------------------------------ */
export function Marquee({
  children,
  speed = 32,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`marquee ${className}`} data-reverse={reverse ? "true" : "false"}>
      <div className="marquee-track" style={{ animationDuration: `${speed}s` }}>
        <div className="marquee-group">{children}</div>
        <div className="marquee-group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
