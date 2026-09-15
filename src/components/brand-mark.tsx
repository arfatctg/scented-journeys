import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/try-decants-logo.png.asset.json";

export function BrandMark({ footer = false }: { footer?: boolean }) {
  return (
    <Link to="/" aria-label="Try Decants home" className="inline-flex shrink-0 items-center">
      <img
        src={logoAsset.url}
        alt="Try Decants — Try Before You Buy"
        width={613}
        height={408}
        className={footer ? "h-16 w-auto max-w-48 object-contain" : "h-14 w-auto max-w-52 object-contain sm:h-16 sm:max-w-60"}
      />
    </Link>
  );
}