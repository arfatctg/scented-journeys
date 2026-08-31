import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { z } from "zod";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import {
  availableSizes,
  brands,
  products,
  SIZES,
  smallestPrice,
  type Gender,
  type SizeMl,
} from "@/lib/products";

const GENDERS: Gender[] = ["Men", "Women", "Unisex", "Niche", "Arabic/Oud"];
const MAX_PRICE = 3000;

const searchSchema = z.object({
  q: z.string().max(80).optional(),
  brand: z.string().max(60).optional(),
  gender: z.enum(["Men", "Women", "Unisex", "Niche", "Arabic/Oud"]).optional(),
  size: z.coerce.number().optional(),
  maxPrice: z.coerce.number().min(300).max(MAX_PRICE).optional(),
  sort: z.enum(["popular", "newest", "price-asc", "price-desc"]).optional(),
});

export const Route = createFileRoute("/shop/")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Shop All Perfume Decants — DecantologyBD" },
      {
        name: "description",
        content:
          "Browse every decant: filter by brand, gender, size (3ml-30ml) and price. Authentic designer and niche fragrances in BDT.",
      },
      { property: "og:title", content: "Shop All Perfume Decants — DecantologyBD" },
      {
        property: "og:description",
        content: "Filter authentic designer and niche fragrance decants by brand, size and price.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const set = (patch: Record<string, unknown>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });

  const sort = search.sort ?? "popular";

  const results = useMemo(() => {
    const q = (search.q ?? "").trim().toLowerCase();
    const list = products.filter((p) => {
      if (q && !`${p.brand} ${p.name}`.toLowerCase().includes(q)) return false;
      if (search.brand && p.brand !== search.brand) return false;
      if (search.gender && p.gender !== search.gender) return false;
      if (search.size && !availableSizes(p).includes(search.size as SizeMl)) return false;
      if (search.maxPrice && smallestPrice(p) > search.maxPrice) return false;
      return true;
    });
    return list.sort((a, b) => {
      if (sort === "price-asc") return smallestPrice(a) - smallestPrice(b);
      if (sort === "price-desc") return smallestPrice(b) - smallestPrice(a);
      if (sort === "newest") return b.addedAt.localeCompare(a.addedAt);
      return b.popularity - a.popularity;
    });
  }, [search, sort]);

  const activeFilters =
    Number(!!search.brand) +
    Number(!!search.gender) +
    Number(!!search.size) +
    Number(!!search.maxPrice);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <header className="text-center">
        <p className="eyebrow">The collection</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">All decants</h1>
        <div className="hairline mx-auto mt-6 w-40" />
      </header>

      <div className="mx-auto mt-10 max-w-xl">
        <label className="relative block">
          <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search.q ?? ""}
            onChange={(e) => set({ q: e.target.value || undefined })}
            maxLength={80}
            placeholder="Search by brand or fragrance name…"
            className="w-full rounded-sm border border-input bg-secondary py-3 pr-4 pl-11 text-sm outline-none placeholder:text-muted-foreground focus:border-gold"
          />
        </label>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
        {/* Filters */}
        <aside className="space-y-7 lg:sticky lg:top-24 lg:self-start">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              <span className="eyebrow">Filters</span>
            </div>
            {activeFilters > 0 && (
              <button
                type="button"
                onClick={() =>
                  set({ brand: undefined, gender: undefined, size: undefined, maxPrice: undefined })
                }
                className="flex shrink-0 items-center gap-1 text-[11px] tracking-wider text-muted-foreground uppercase hover:text-gold"
              >
                <X className="h-3 w-3" /> Clear
              </button>
            )}
          </div>

          <FilterGroup label="Gender">
            <div className="flex flex-wrap gap-2">
              {GENDERS.map((g) => (
                <Chip
                  key={g}
                  active={search.gender === g}
                  onClick={() => set({ gender: search.gender === g ? undefined : g })}
                >
                  {g}
                </Chip>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup label="Size">
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <Chip
                  key={s}
                  active={search.size === s}
                  onClick={() => set({ size: search.size === s ? undefined : s })}
                >
                  {s}ml
                </Chip>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup label="Brand">
            <select
              value={search.brand ?? ""}
              onChange={(e) => set({ brand: e.target.value || undefined })}
              className="w-full rounded-sm border border-input bg-secondary px-3 py-2.5 text-sm text-foreground outline-none focus:border-gold"
            >
              <option value="">All brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </FilterGroup>

          <FilterGroup label={`Max price (3ml from ৳${search.maxPrice ?? MAX_PRICE})`}>
            <input
              type="range"
              min={300}
              max={MAX_PRICE}
              step={50}
              value={search.maxPrice ?? MAX_PRICE}
              onChange={(e) =>
                set({
                  maxPrice: Number(e.target.value) >= MAX_PRICE ? undefined : Number(e.target.value),
                })
              }
              className="w-full accent-[var(--gold)]"
            />
          </FilterGroup>
        </aside>

        {/* Results */}
        <section>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border/60 pb-4">
            <p className="min-w-0 text-xs tracking-wider text-muted-foreground uppercase">
              {results.length} {results.length === 1 ? "decant" : "decants"}
            </p>
            <select
              value={sort}
              onChange={(e) => set({ sort: e.target.value })}
              className="shrink-0 rounded-sm border border-input bg-secondary px-3 py-2 text-xs tracking-wider text-foreground uppercase outline-none focus:border-gold"
            >
              <option value="popular">Popularity</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>

          {results.length === 0 ? (
            <p className="py-20 text-center text-sm text-muted-foreground">
              No decants match those filters. Try widening your search.
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
              {results.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 6) * 60}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-[11px] tracking-[0.2em] text-muted-foreground uppercase">{label}</p>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-[11px] tracking-wider transition-colors ${
        active
          ? "border-gold bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:border-gold/60 hover:text-gold"
      }`}
    >
      {children}
    </button>
  );
}
