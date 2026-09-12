import { Link } from "@tanstack/react-router";

export function BrandMark({ footer = false }: { footer?: boolean }) {
  return (
    <Link to="/" aria-label="Try Decants home" className="inline-flex flex-col">
      <span className="font-display text-xl leading-none sm:text-2xl">
        <span className="text-gold">TRY</span>{" "}
        <span className={footer ? "text-ivory" : "text-ivory"}>DECANTS</span>
      </span>
      <span className="mt-1 font-display text-[10px] italic text-gold-soft">
        — Try Before You Buy —
      </span>
    </Link>
  );
}