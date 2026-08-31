import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, BadgeCheck, ShieldCheck, Truck } from "lucide-react";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { CATEGORIES, heroImage, products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DecantologyBD — Authentic Perfume Decants in Bangladesh" },
      {
        name: "description",
        content:
          "Try designer and niche fragrances in 3ml, 5ml, 10ml or 30ml decants. 100% authentic, hand-filled in Dhaka, delivered nationwide.",
      },
      { property: "og:title", content: "DecantologyBD — Authentic Perfume Decants" },
      {
        property: "og:description",
        content: "Designer & niche fragrance decants from ৳380. Cash on delivery, bKash & Nagad.",
      },
    ],
  }),
  component: Home,
});

const bestSellers = products.filter((p) => p.badge === "Best Seller");
const newArrivals = products.filter((p) => p.badge === "New Arrival");

function Home() {
  const [tab, setTab] = useState<"best" | "new">("best");
  const list = tab === "best" ? bestSellers : newArrivals;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div>
            <p className="eyebrow">Perfume decants · Bangladesh</p>
            <h1 className="mt-5 font-display text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
              Wear the fragrance
              <span className="block text-gold-gradient italic">before you own it.</span>
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              Hand-filled 3ml, 5ml, 10ml and 30ml samples of the world's most talked-about
              designer and niche houses — every drop decanted from a verified batch.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-3.5 text-xs tracking-[0.22em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
              >
                Shop the collection
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className="text-xs tracking-[0.22em] text-muted-foreground uppercase transition-colors hover:text-gold"
              >
                Why decants?
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-lg border border-gold/25 shadow-[var(--shadow-lux)]">
              <img
                src={heroImage}
                alt="Gold-capped perfume decant vials beside a designer fragrance bottle"
                width={1408}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-4 rounded-sm border border-gold/40 bg-background/90 px-5 py-3 backdrop-blur sm:left-8">
              <p className="eyebrow">Starting at</p>
              <p className="font-display text-2xl text-gold">৳380 / 3ml</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <p className="eyebrow">Shop by category</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">Find your family</h2>
            <div className="hairline mt-6 w-40" />
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.label} delay={i * 80} className="last:col-span-2 md:last:col-span-1">
              <Link
                to="/shop"
                search={{ gender: c.label }}
                className="group relative block h-56 overflow-hidden rounded-lg border border-border/70 md:h-72"
              >
                <img
                  src={c.image}
                  alt={`${c.label} fragrance decants`}
                  loading="lazy"
                  width={900}
                  height={1100}
                  className="h-full w-full object-cover opacity-70 transition-all duration-[900ms] group-hover:scale-105 group-hover:opacity-100"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "var(--gradient-veil)" }}
                />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-display text-xl text-foreground">{c.label}</h3>
                  <p className="mt-0.5 text-[11px] tracking-wide text-muted-foreground">
                    {c.blurb}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Best sellers / new arrivals carousel */}
      <section className="border-y border-border/60 bg-card/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
              <div className="min-w-0">
                <p className="eyebrow">Curated for you</p>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl">
                  {tab === "best" ? "Best sellers" : "New arrivals"}
                </h2>
              </div>
              <div className="flex shrink-0 gap-1 rounded-sm border border-border p-1">
                {(["best", "new"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={`rounded-sm px-3 py-2 text-[10px] tracking-[0.18em] uppercase transition-colors ${
                      tab === t
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-gold"
                    }`}
                  >
                    {t === "best" ? "Best" : "New"}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <Carousel opts={{ align: "start" }} className="mt-10">
              <CarouselContent className="-ml-4">
                {list.map((p) => (
                  <CarouselItem key={p.slug} className="basis-4/5 pl-4 sm:basis-1/2 lg:basis-1/3">
                    <ProductCard product={p} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-3 border-border bg-background text-foreground hover:border-gold hover:text-gold" />
              <CarouselNext className="-right-3 border-border bg-background text-foreground hover:border-gold hover:text-gold" />
            </Carousel>
          </Reveal>
        </div>
      </section>

      {/* Trust badges */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: BadgeCheck,
              title: "100% Authentic",
              body: "Every decant is drawn from a sealed, batch-verified retail bottle. Never a clone.",
            },
            {
              icon: Truck,
              title: "Fast Delivery",
              body: "Inside Dhaka in 24 hours, nationwide within 2-3 days via trusted couriers.",
            },
            {
              icon: ShieldCheck,
              title: "Secure Payment",
              body: "Cash on delivery, bKash or Nagad — pay the way that suits you best.",
            },
          ].map((b, i) => (
            <Reveal key={b.title} delay={i * 100}>
              <div className="h-full rounded-lg border border-border/70 bg-card p-7 transition-colors hover:border-gold/40">
                <b.icon className="h-6 w-6 text-gold" strokeWidth={1.4} />
                <h3 className="mt-5 font-display text-xl">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-3xl px-4 pb-8 text-center sm:px-6">
        <Reveal>
          <p className="eyebrow">The list</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">
            New batches, first access
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
            One short email when fresh decants land or a rare bottle gets split. No spam.
          </p>
          <form
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              const input = new FormData(e.currentTarget).get("email");
              const email = String(input ?? "").trim();
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 255) {
                toast.error("Please enter a valid email address.");
                return;
              }
              toast.success("You're on the list. Welcome to Decantology.");
              e.currentTarget.reset();
            }}
          >
            <input
              name="email"
              type="email"
              required
              maxLength={255}
              placeholder="your@email.com"
              className="min-w-0 flex-1 rounded-sm border border-input bg-secondary px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-gold"
            />
            <button
              type="submit"
              className="shrink-0 rounded-sm bg-primary px-6 py-3 text-xs tracking-[0.22em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
            >
              Subscribe
            </button>
          </form>
        </Reveal>
      </section>
    </div>
  );
}
