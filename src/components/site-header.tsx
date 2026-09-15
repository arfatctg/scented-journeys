import { Link } from "@tanstack/react-router";
import { Heart, Menu, Minus, Plus, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { lineTotal, useCart } from "@/lib/cart";
import { formatBDT, getProduct } from "@/lib/products";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const { lines, count, subtotal, setQty, remove } = useCart();
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <div className="border-b border-gold/30 bg-navy px-4 py-2 text-center text-[9px] tracking-[0.12em] text-gold sm:text-[11px] sm:tracking-[0.18em]">
        Free Delivery on Orders Over ৳1500 <span className="mx-2 text-gold-soft">•</span> Try Before You Buy <span className="mx-2 text-gold-soft">•</span> 100% Authentic Guaranteed
      </div>
      <header className="sticky top-0 z-40 border-b border-border bg-off-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-4 md:gap-8">
            <button type="button" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" className="shrink-0 text-navy transition-colors hover:text-gold md:hidden">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <BrandMark />
          </div>

          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((item) => (
              <Link key={item.to} to={item.to} activeOptions={{ exact: item.to === "/" }} activeProps={{ className: "text-gold border-gold" }} className="border-b border-transparent pb-1 text-xs tracking-[0.18em] text-navy uppercase transition-colors hover:text-gold">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 text-navy">
            <Link to="/shop" aria-label="Search products" className="transition-colors hover:text-gold"><Search className="h-4.5 w-4.5" strokeWidth={1.5} /></Link>
            <Link to="/shop" aria-label="Wishlist" className="hidden transition-colors hover:text-gold sm:block"><Heart className="h-4.5 w-4.5" strokeWidth={1.5} /></Link>
            <Link to="/login" aria-label="Customer account" className="hidden transition-colors hover:text-gold sm:block"><UserRound className="h-4.5 w-4.5" strokeWidth={1.5} /></Link>
            <button type="button" onClick={() => setCartOpen(true)} aria-label="Open cart" className="relative p-1 transition-colors hover:text-gold">
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {count > 0 && <span className="absolute -top-1.5 -right-1.5 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-gold px-1 text-[10px] font-medium text-navy">{count}</span>}
            </button>
          </div>
        </div>
        {open && (
          <nav className="border-t border-border px-4 pb-4 md:hidden">
            {nav.map((item) => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} activeOptions={{ exact: item.to === "/" }} activeProps={{ className: "text-gold" }} className="block border-b border-border py-3 text-xs tracking-[0.18em] text-navy uppercase last:border-0">{item.label}</Link>)}
            <Link to="/login" onClick={() => setOpen(false)} className="block py-3 text-xs tracking-[0.18em] text-navy uppercase">My account</Link>
          </nav>
        )}
      </header>

      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-navy/55" role="presentation" onClick={() => setCartOpen(false)}>
          <aside className="ml-auto flex h-full w-full max-w-sm flex-col bg-background shadow-2xl" role="dialog" aria-modal="true" aria-label="Your Cart" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between bg-navy px-5 py-5">
              <h2 className="font-display text-2xl text-gold">Your Cart</h2>
              <button type="button" onClick={() => setCartOpen(false)} aria-label="Close cart" className="text-ivory hover:text-gold"><X className="h-5 w-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {lines.length === 0 ? <p className="py-16 text-center text-sm text-muted-foreground">Your cart is ready for a new scent.</p> : lines.map((line) => {
                const product = getProduct(line.slug);
                if (!product) return null;
                return <div key={`${line.slug}-${line.size}`} className="grid grid-cols-[64px_1fr] gap-3 border-b border-border py-4 first:pt-0">
                  <img src={product.images[0]} alt={product.name} className="h-20 w-16 rounded-sm object-cover" />
                  <div className="min-w-0"><div className="flex justify-between gap-2"><div><p className="truncate font-display text-base">{product.name}</p><p className="text-xs text-muted-foreground">{line.size}ml · {formatBDT(lineTotal(line))}</p></div><button type="button" onClick={() => remove(line.slug, line.size)} aria-label="Remove item" className="text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button></div>
                    <div className="mt-3 inline-flex items-center border border-border"><button type="button" aria-label="Decrease quantity" onClick={() => setQty(line.slug, line.size, line.qty - 1)} className="p-1.5 hover:text-gold"><Minus className="h-3 w-3" /></button><span className="w-7 text-center text-xs">{line.qty}</span><button type="button" aria-label="Increase quantity" onClick={() => setQty(line.slug, line.size, line.qty + 1)} className="p-1.5 hover:text-gold"><Plus className="h-3 w-3" /></button></div>
                  </div>
                </div>;
              })}
            </div>
            <div className="border-t border-border p-5"><div className="flex justify-between font-display text-xl"><span>Subtotal</span><span className="text-gold">{formatBDT(subtotal)}</span></div><div className="mt-5 grid gap-3"><Link to="/cart" onClick={() => setCartOpen(false)} className="bg-gold-gradient rounded-sm px-5 py-3 text-center text-xs tracking-[0.18em] text-navy uppercase">Checkout</Link><Link to="/cart" onClick={() => setCartOpen(false)} className="rounded-sm border border-navy px-5 py-3 text-center text-xs tracking-[0.18em] text-navy uppercase hover:bg-secondary">View cart</Link></div></div>
          </aside>
        </div>
      )}
    </>
  );
}