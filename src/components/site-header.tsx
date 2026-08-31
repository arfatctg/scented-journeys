import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="shrink-0 text-muted-foreground transition-colors hover:text-gold md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className="flex min-w-0 items-center gap-8 md:justify-start">
          <Link to="/" className="min-w-0 shrink-0">
            <span className="block font-display text-xl leading-none tracking-[0.18em] text-gold-gradient sm:text-2xl">
              DECANTOLOGY
            </span>
            <span className="eyebrow block pt-1">Bangladesh</span>
          </Link>
          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-gold" }}
                className="text-xs tracking-[0.22em] text-muted-foreground uppercase transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <Link
          to="/cart"
          aria-label="Cart"
          className="relative shrink-0 text-muted-foreground transition-colors hover:text-gold"
        >
          <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
          {count > 0 && (
            <span className="absolute -top-2 -right-2 grid h-4.5 w-4.5 min-w-[1.125rem] place-items-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
              {count}
            </span>
          )}
        </Link>
      </div>

      {open && (
        <nav className="border-t border-border/70 px-4 pb-4 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-gold" }}
              className="block border-b border-border/50 py-3 text-xs tracking-[0.22em] text-muted-foreground uppercase last:border-0"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
