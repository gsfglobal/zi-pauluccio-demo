import type { ElementType } from "react";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** "now" = anima al caricamento (hero), altrimenti allo scroll */
  trigger?: "now" | "scroll";
  italic?: string[];
};

/** Titolo con reveal parola per parola. Il testo resta leggibile per screen reader e motori di ricerca. */
export function SplitWords({ text, as: Tag = "h2", className, trigger = "scroll", italic = [] }: Props) {
  const words = text.split(" ");
  return (
    <Tag className={className} data-words={trigger} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="w inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <span className={italic.includes(w.replace(/[.,]/g, "")) ? "italic-accent" : undefined}>{w}</span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
