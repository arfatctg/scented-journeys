import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const links = [
  { to: "/return-policy", label: "Return Policy" },
  { to: "/refund-policy", label: "Refund Policy" },
  { to: "/terms", label: "Terms & Conditions" },
] as const;

export function PolicyLayout({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <div>
      <header className="bg-navy px-4 py-16 text-center sm:px-6">
        <p className="eyebrow !text-gold">Try Decants policies</p>
        <h1 className="mt-3 font-display text-4xl text-gold-soft sm:text-5xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-ivory/75">{intro}</p>
      </header>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow">Quick links</p>
          <nav className="mt-4 space-y-3">
            {links.map((item) => (
              <Link key={item.to} to={item.to} className="block text-sm text-muted-foreground underline-offset-4 hover:text-gold hover:underline">
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <article className="space-y-7 text-sm leading-7 text-muted-foreground [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-foreground [&_p]:max-w-3xl">
          {children}
        </article>
      </div>
    </div>
  );
}