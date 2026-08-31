import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, FlaskConical, HandCoins, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { heroImage } from "@/lib/products";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story & Authenticity Promise — DecantologyBD" },
      {
        name: "description",
        content:
          "Why decants make sense, how DecantologyBD fills them, and the authenticity promise behind every 3ml, 5ml and 10ml vial.",
      },
      { property: "og:title", content: "Our Story & Authenticity Promise — DecantologyBD" },
      {
        property: "og:description",
        content: "How we decant, why we do it, and our guarantee of 100% authentic fragrance.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <header className="text-center">
        <p className="eyebrow">Our story</p>
        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
          Fragrance should be
          <span className="block text-gold-gradient italic">tried, not gambled on.</span>
        </h1>
        <div className="hairline mx-auto mt-6 w-40" />
      </header>

      <Reveal className="mt-12">
        <div className="overflow-hidden rounded-lg border border-gold/25">
          <img
            src={heroImage}
            alt="DecantologyBD decant vials being filled"
            loading="lazy"
            width={1408}
            height={1200}
            className="max-h-[420px] w-full object-cover"
          />
        </div>
      </Reveal>

      <Reveal className="mt-12">
        <div className="space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>
            DecantologyBD started in a Banani apartment in 2023, out of a simple frustration: a
            full bottle of a niche fragrance can cost more than a month's rent, and blind-buying
            one from a photo is an expensive coin flip. Meanwhile, most of us only ever finish a
            fraction of a bottle before moving on.
          </p>
          <p>
            So we began splitting our own collection into small, carefully labelled vials —
            first for friends, then for a growing circle of Bangladeshi fragrance lovers. Today we
            decant from dozens of designer and niche houses, from Tom Ford and Creed to Amouage,
            Parfums de Marly and the best of the Arabic oud world.
          </p>
          <p>
            Every vial is filled by hand, in small batches, under clean conditions — no funnels
            reused between scents, no top-ups, no mixing. What you spray is exactly what sits in
            the retail bottle on our shelf.
          </p>
        </div>
      </Reveal>

      <div className="mt-16 grid gap-5 sm:grid-cols-2">
        {[
          {
            icon: FlaskConical,
            title: "Why decants",
            body: "Live with a fragrance for two weeks in Dhaka heat before you commit thousands of taka to a full bottle.",
          },
          {
            icon: HandCoins,
            title: "Honest pricing",
            body: "Price per ml is calculated from the retail bottle cost plus a flat filling fee. No inflated 'sample tax'.",
          },
          {
            icon: BadgeCheck,
            title: "Authenticity promise",
            body: "Bottle photo and batch code available on request for any decant you order. If it isn't genuine, we refund in full.",
          },
          {
            icon: Sparkles,
            title: "Built for discovery",
            body: "Notes, longevity and sillage listed on every product so you can choose with your nose, not the hype.",
          },
        ].map((c, i) => (
          <Reveal key={c.title} delay={i * 90}>
            <div className="h-full rounded-lg border border-border/70 bg-card p-7 transition-colors hover:border-gold/40">
              <c.icon className="h-6 w-6 text-gold" strokeWidth={1.4} />
              <h2 className="mt-5 font-display text-xl">{c.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 text-center">
        <Link
          to="/shop"
          className="inline-flex rounded-sm bg-primary px-8 py-3.5 text-xs tracking-[0.22em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
        >
          Explore the collection
        </Link>
      </Reveal>
    </div>
  );
}
