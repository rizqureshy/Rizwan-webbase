import { motion } from "motion/react";

type Props = {
  text: string;
  /* Words wrapped in [[ ]] receive the gradient accent treatment. */
  className?: string;
};

/*
  Reveals a headline word by word on mount. Mark accent words with double
  brackets, for example: "responsible, [[high-impact]] AI".
*/
export default function AnimatedHeadline({ text, className = "" }: Props) {
  const words = text.split(" ");

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } },
  };
  const word = {
    hidden: { opacity: 0, y: "0.5em" },
    show: {
      opacity: 1,
      y: "0em",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.h1
      className={className}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {words.map((w, i) => {
        const accent = w.startsWith("[[") && w.endsWith("]]");
        const clean = accent ? w.slice(2, -2) : w;
        return (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom"
            style={{ marginRight: "0.28em" }}
          >
            <motion.span
              variants={word}
              className={accent ? "text-gradient inline-block" : "inline-block"}
            >
              {clean}
            </motion.span>
          </span>
        );
      })}
    </motion.h1>
  );
}
