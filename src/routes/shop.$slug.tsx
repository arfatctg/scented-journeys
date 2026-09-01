import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Droplets, Timer, Wind } from "lucide-react";
import { toast } from "sonner";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { useCart } from "@/lib/cart";
import {
  availableSizes,
  formatBDT,
  getProduct,
  products,
  type Product,
  type SizeMl,
} from "@/lib/products";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Decant not found — DecantologyBD" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} Decant by ${product.brand} — DecantologyBD`;
    const description = `${product.name} decants in ${availableSizes(product)
      .map((s) => `${s}ml`)
      .join(", ")}. ${product.description.slice(0, 100)}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const sizes = availableSizes(product);
  const [size, setSize] = useState<SizeMl>(sizes[0]!);
  const [image, setImage] = useState(0);
  const { add } = useCart();

  const related = products
    .filter((p) => p.slug !== product.slug && (p.gender === product.gender || p.brand === product.brand))
    .slice(0, 3);

  const price = product.prices[size] ?? 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-gold"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to shop
      </Link>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="overflow-hidden rounded-lg border border-border/70 bg-secondary">
            <img
              src={product.images[image]}
              alt={`${product.brand} ${product.name} decant view ${image + 1}`}
              width={900}
              height={1100}
              className="aspect-4/5 w-full object-cover"
            />
          </div>
          <div className="mt-3 flex gap-3">
            {product.images.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setImage(i)}
                aria-label={`View image ${i + 1}`}
                className={`h-20 w-16 overflow-hidden rounded-sm border transition-colors ${
                  i === image ? "border-gold" : "border-border hover:border-gold/50"
                }`}
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="eyebrow">{product.brand}</p>
          <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">{product.name}</h1>
          <p className="mt-3 text-xs tracking-[0.2em] text-gold uppercase">{product.gender}</p>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-8">
            <p className="eyebrow">Choose your size</p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`rounded-sm border px-4 py-3 text-sm transition-colors ${
                    s === size
                      ? "border-gold bg-primary text-primary-foreground"
                      : "border-border text-foreground hover:border-gold/60 hover:text-gold"
                  }`}
                >
                  <span className="block">{s}ml</span>
                  <span className="mt-0.5 block text-[11px] opacity-80">
                    {formatBDT(product.prices[s] ?? 0)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-y border-border/70 py-5">
            <div>
              <p className="eyebrow">Total</p>
              <p className="font-display text-3xl text-gold">{formatBDT(price)}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                add(product.slug, size);
                toast.success(`${product.name} ${size}ml added to your cart`);
              }}
              className="rounded-sm bg-primary px-8 py-3.5 text-xs tracking-[0.22em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
            >
              Add to cart
            </button>
          </div>

          {/* Notes pyramid */}
          <div className="mt-8">
            <p className="eyebrow">Fragrance notes</p>
            <div className="mt-4 space-y-3">
              <NoteRow label="Top" notes={product.notes.top} strength={100} />
              <NoteRow label="Heart" notes={product.notes.heart} strength={72} />
              <NoteRow label="Base" notes={product.notes.base} strength={48} />
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Spec icon={Timer} label="Longevity" value={product.longevity} />
            <Spec icon={Wind} label="Sillage" value={product.sillage} />
            <Spec icon={Droplets} label="Decanted" value="From retail bottle" />
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-24">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow">You may also like</p>
              <h2 className="mt-3 font-display text-3xl">Related decants</h2>
              <div className="hairline mx-auto mt-6 w-32" />
            </div>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {related.map((p: Product, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function NoteRow({
  label,
  notes,
  strength,
}: {
  label: string;
  notes: string[];
  strength: number;
}) {
  return (
    <div className="rounded-sm border border-border/70 bg-card p-4">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <p className="min-w-0 text-[11px] tracking-[0.2em] text-gold uppercase">{label} notes</p>
        <span className="shrink-0 text-[11px] text-muted-foreground">{notes.length}</span>
      </div>
      <div className="mt-2 h-px w-full bg-border">
        <div
          className="h-px bg-primary transition-all duration-700"
          style={{ width: `${strength}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-foreground">{notes.join(" · ")}</p>
    </div>
  );
}

function Spec({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Timer;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-sm border border-border/70 p-4">
      <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
      <p className="mt-3 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{label}</p>
      <p className="mt-1 text-sm text-foreground">{value}</p>
    </div>
  );
}
