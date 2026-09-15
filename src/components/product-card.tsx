import { Link } from "@tanstack/react-router";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { availableSizes, formatBDT, smallestPrice, type Product } from "@/lib/products";

export function ProductCard({ product, dark = false }: { product: Product; dark?: boolean }) {
  const sizes = availableSizes(product);
  const { add } = useCart();
  const firstSize = sizes[0];

  return (
    <article className={`group relative overflow-hidden rounded-sm border-2 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[var(--shadow-lux)] ${dark ? "border-gold/25 bg-navy text-ivory" : "border-border/70 bg-card"}`}>
      <div className="relative aspect-4/5 overflow-hidden bg-secondary">
        <Link to="/shop/$slug" params={{ slug: product.slug }} aria-label={`View ${product.name}`}>
          <img src={product.images[0]} alt={`${product.brand} ${product.name} decant`} loading="lazy" width={900} height={1100} className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105" />
        </Link>
        {product.badge && (
          <span className="absolute top-3 left-3 rounded-sm bg-primary px-2.5 py-1 text-[9px] tracking-[0.16em] text-primary-foreground uppercase">{product.badge === "New Arrival" ? "New" : product.badge}</span>
        )}
        <button type="button" aria-label={`Add ${product.name} to wishlist`} onClick={() => toast.success(`${product.name} saved to your wishlist`)} className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-sm bg-background/90 text-navy shadow-sm transition-colors hover:text-gold"><Heart className="h-4 w-4" strokeWidth={1.5}/></button>
        <Link to="/shop/$slug" params={{ slug: product.slug }} className="absolute inset-x-3 bottom-3 flex translate-y-3 items-center justify-center gap-2 rounded-sm bg-navy/95 px-3 py-2.5 text-[10px] tracking-[0.16em] text-ivory uppercase opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"><Eye className="h-3.5 w-3.5"/>Quick view</Link>
      </div>
      <div className="p-4">
        <p className="eyebrow">{product.brand}</p>
        <Link to="/shop/$slug" params={{ slug: product.slug }}><h3 className={`mt-1.5 truncate font-display text-lg ${dark ? "text-ivory" : "text-foreground"}`}>{product.name}</h3></Link>
        <div className="mt-2 flex flex-wrap gap-1.5">{sizes.slice(0,3).map((s)=><span key={s} className={`rounded-sm border px-1.5 py-0.5 text-[9px] ${dark ? "border-gold/35 text-gold-soft" : "border-border text-muted-foreground"}`}>{s}ml</span>)}</div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className={`text-sm ${dark ? "text-ivory" : "text-foreground"}`}>
            <span className="text-[11px] text-muted-foreground">from </span>
            {formatBDT(smallestPrice(product))}
          </span>
          <button type="button" disabled={!firstSize} aria-label={`Add ${product.name} to cart`} onClick={() => { if (!firstSize) return; add(product.slug, firstSize); toast.success(`${product.name} added to cart`); }} className="inline-flex items-center gap-1.5 rounded-sm bg-promo px-2.5 py-2 text-[9px] tracking-[0.12em] text-promo-foreground uppercase transition-opacity hover:opacity-90"><ShoppingBag className="h-3 w-3"/> Add</button>
        </div>
      </div>
    </article>
  );
}
