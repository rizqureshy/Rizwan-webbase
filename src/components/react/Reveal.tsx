import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";

type RevealProps = {
  children: ReactNode;
  /* Stagger index for sequenced groups. */
  delay?: number;
  /* Travel distance in px. */
  y?: number;
  as?: "div" | "li" | "section" | "span";
  className?: string;
};

/*
  Scroll-triggered reveal. Fades and lifts content into view once.
  Falls back to immediate visibility when reduced motion is requested
  (motion library reads the media query internally).
*/
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  as = "div",
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const MotionTag = motion[as];

  return (
    <MotionTag
      ref={ref as never}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
