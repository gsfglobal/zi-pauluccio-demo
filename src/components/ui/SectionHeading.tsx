import { SplitWords } from "./SplitWords";

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  italic?: string[];
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
};

export function SectionHeading({ eyebrow, title, lead, italic, align = "left", tone = "dark", as = "h2" }: Props) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`eyebrow ${tone === "light" ? "!text-gold" : ""}`} data-reveal>
        {eyebrow}
      </p>
      <SplitWords as={as} text={title} italic={italic} className={`h-section mt-5 ${tone === "light" ? "text-ivory" : ""}`} />
      {lead && (
        <p className={`lead mt-6 ${center ? "mx-auto" : ""} max-w-2xl ${tone === "light" ? "!text-ivory/70" : ""}`} data-reveal>
          {lead}
        </p>
      )}
    </div>
  );
}
