import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <span className="font-display text-2xl tracking-[0.18em] text-gold-gradient">
            DECANTOLOGY
          </span>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Authentic designer and niche fragrance decants, hand-filled in Dhaka. Try before
            you commit to a full bottle.
          </p>
          <div className="mt-5 flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-muted-foreground transition-colors hover:text-gold"
            >
              <Facebook className="h-4.5 w-4.5" strokeWidth={1.5} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground transition-colors hover:text-gold"
            >
              <Instagram className="h-4.5 w-4.5" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="eyebrow">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { to: "/shop", label: "All decants" },
              { to: "/about", label: "Our story" },
              { to: "/contact", label: "Contact" },
              { to: "/cart", label: "Cart & checkout" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-muted-foreground transition-colors hover:text-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">Reach us</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              Banani, Dhaka 1213, Bangladesh
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              +880 1712-345678
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 px-4 py-5 text-center text-xs tracking-wider text-muted-foreground">
        © {new Date().getFullYear()} DecantologyBD. Cash on delivery, bKash & Nagad accepted.
      </div>
    </footer>
  );
}
