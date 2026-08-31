import { Link } from "@tanstack/react-router";
import { availableSizes, formatBDT, smallestPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const sizes = availableSizes(product);

  return (
    <Link
      to="/shop/$slug"
      params={{ slug: product.slug }}
      className="group block overflow-hidden rounded-lg border border-border/70 bg-card transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[var(--shadow-lux)]"
    >
      <div className="relative aspect-4/5 overflow-hidden bg-secondary">
        <img
          src={product.images[0]}
          alt={`${product.brand} ${product.name} decant`}
          loading="lazy"
          width={900}
          height={1100}
          className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 rounded-full border border-gold/50 bg-background/80 px-3 py-1 text-[10px] tracking-[0.2em] text-gold uppercase backdrop-blur">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="eyebrow">{product.brand}</p>
        <h3 className="mt-1.5 truncate font-display text-lg text-foreground">{product.name}</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {sizes.map((s) => `${s}ml`).join(" · ")}
        </p>
        <div className="mt-3 flex items-end justify-between gap-2">
          <span className="text-sm text-foreground">
            <span className="text-[11px] text-muted-foreground">from </span>
            {formatBDT(smallestPrice(product))}
          </span>
          <span className="text-[10px] tracking-[0.2em] text-gold uppercase opacity-0 transition-opacity group-hover:opacity-100">
            View
          </span>
        </div>
      </div>
    </Link>
  );
}
