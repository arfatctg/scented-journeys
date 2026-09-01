import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Reveal } from "@/components/reveal";
import { lineTotal, useCart } from "@/lib/cart";
import { formatBDT, getProduct } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart & Checkout — DecantologyBD" },
      {
        name: "description",
        content:
          "Review your decants and check out with cash on delivery, bKash or Nagad. Nationwide delivery across Bangladesh.",
      },
      { property: "og:title", content: "Your Cart & Checkout — DecantologyBD" },
      {
        property: "og:description",
        content: "Cash on delivery, bKash and Nagad accepted. Delivery anywhere in Bangladesh.",
      },
    ],
  }),
  component: CartPage,
});

const DELIVERY_INSIDE = 70;
const DELIVERY_OUTSIDE = 130;

const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^(\+?880|0)1[0-9]{9}$/, "Enter a valid Bangladeshi mobile number"),
  address: z.string().trim().min(10, "Please enter your full address").max(300),
  city: z.string().trim().min(2, "Enter your city or district").max(80),
  note: z.string().trim().max(300).optional(),
});

function CartPage() {
  const { lines, setQty, remove, clear, subtotal, count } = useCart();
  const [zone, setZone] = useState<"inside" | "outside">("inside");
  const [payment, setPayment] = useState<"cod" | "bkash" | "nagad">("cod");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const delivery = count === 0 ? 0 : zone === "inside" ? DELIVERY_INSIDE : DELIVERY_OUTSIDE;
  const total = subtotal + delivery;

  if (count === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-28 text-center">
        <ShoppingBag className="mx-auto h-8 w-8 text-gold" strokeWidth={1.3} />
        <h1 className="mt-6 font-display text-3xl">Your cart is empty</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Pick a few 3ml or 5ml decants and discover your next signature.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-flex rounded-sm bg-primary px-7 py-3.5 text-xs tracking-[0.22em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
        >
          Browse decants
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <header className="text-center">
        <p className="eyebrow">Checkout</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Your order</h1>
        <div className="hairline mx-auto mt-6 w-40" />
      </header>

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        {/* Lines + form */}
        <div className="space-y-4">
          {lines.map((line) => {
            const product = getProduct(line.slug);
            if (!product) return null;
            return (
              <div
                key={`${line.slug}-${line.size}`}
                className="grid grid-cols-[80px_minmax(0,1fr)] gap-4 rounded-lg border border-border/70 bg-card p-4"
              >
                <Link to="/shop/$slug" params={{ slug: product.slug }} className="shrink-0">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    className="h-24 w-20 rounded-sm object-cover"
                  />
                </Link>
                <div className="min-w-0">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                    <div className="min-w-0">
                      <p className="eyebrow">{product.brand}</p>
                      <h2 className="truncate font-display text-lg">{product.name}</h2>
                      <p className="mt-0.5 text-xs text-gold">{line.size}ml decant</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(line.slug, line.size)}
                      aria-label="Remove item"
                      className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </div>
                  <div className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
                    <div className="flex shrink-0 items-center rounded-sm border border-border">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQty(line.slug, line.size, line.qty - 1)}
                        className="px-2.5 py-2 text-muted-foreground hover:text-gold"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-8 text-center text-sm">{line.qty}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setQty(line.slug, line.size, line.qty + 1)}
                        className="px-2.5 py-2 text-muted-foreground hover:text-gold"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="text-right text-sm text-foreground">
                      {formatBDT(lineTotal(line))}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          <button
            type="button"
            onClick={clear}
            className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase hover:text-destructive"
          >
            Clear cart
          </button>

          <Reveal className="pt-4">
            <form
              id="checkout-form"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const parsed = checkoutSchema.safeParse(
                  Object.fromEntries(new FormData(form)),
                );
                if (!parsed.success) {
                  const next: Record<string, string> = {};
                  for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
                  setErrors(next);
                  toast.error("Please check the highlighted fields.");
                  return;
                }
                setErrors({});
                toast.success(
                  payment === "cod"
                    ? "Order placed! We'll call to confirm before dispatch."
                    : "Order placed! Send the payment and share the transaction ID on WhatsApp.",
                );
                clear();
                form.reset();
              }}
              className="rounded-lg border border-border/70 bg-card p-6 sm:p-8"
            >
              <h2 className="font-display text-2xl">Delivery details</h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label="Full name" name="name" error={errors["name"]} />
                <Field
                  label="Mobile number"
                  name="phone"
                  placeholder="01712-345678"
                  error={errors["phone"]}
                />
              </div>
              <div className="mt-5">
                <Field label="City / district" name="city" error={errors["city"]} />
              </div>
              <div className="mt-5">
                <label
                  htmlFor="address"
                  className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase"
                >
                  Full address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  maxLength={300}
                  placeholder="House, road, area, landmark"
                  className="mt-2 w-full rounded-sm border border-input bg-secondary px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-gold"
                />
                {errors["address"] && (
                  <p className="mt-1.5 text-xs text-destructive">{errors["address"]}</p>
                )}
              </div>
              <div className="mt-5">
                <label
                  htmlFor="note"
                  className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase"
                >
                  Order note (optional)
                </label>
                <input
                  id="note"
                  name="note"
                  maxLength={300}
                  className="mt-2 w-full rounded-sm border border-input bg-secondary px-4 py-3 text-sm outline-none focus:border-gold"
                />
              </div>

              <div className="mt-7">
                <p className="eyebrow">Delivery zone</p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {(
                    [
                      { id: "inside", label: `Inside Dhaka · ${formatBDT(DELIVERY_INSIDE)}` },
                      { id: "outside", label: `Outside Dhaka · ${formatBDT(DELIVERY_OUTSIDE)}` },
                    ] as const
                  ).map((z) => (
                    <Option key={z.id} active={zone === z.id} onClick={() => setZone(z.id)}>
                      {z.label}
                    </Option>
                  ))}
                </div>
              </div>

              <div className="mt-7">
                <p className="eyebrow">Payment method</p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {(
                    [
                      { id: "cod", label: "Cash on delivery" },
                      { id: "bkash", label: "bKash" },
                      { id: "nagad", label: "Nagad" },
                    ] as const
                  ).map((p) => (
                    <Option key={p.id} active={payment === p.id} onClick={() => setPayment(p.id)}>
                      {p.label}
                    </Option>
                  ))}
                </div>
                {payment !== "cod" && (
                  <p className="mt-4 rounded-sm border border-gold/30 bg-secondary p-4 text-xs leading-relaxed text-muted-foreground">
                    Send {formatBDT(total)} to <span className="text-gold">01712-345678</span> (
                    {payment === "bkash" ? "bKash" : "Nagad"} personal), then share your
                    transaction ID with us on WhatsApp.
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg border border-gold/25 bg-card p-6">
            <h2 className="font-display text-2xl">Summary</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <Row label={`Subtotal (${count} ${count === 1 ? "item" : "items"})`}>
                {formatBDT(subtotal)}
              </Row>
              <Row label="Delivery">{formatBDT(delivery)}</Row>
              <div className="hairline my-4" />
              <div className="flex items-end justify-between">
                <dt className="eyebrow">Total</dt>
                <dd className="font-display text-3xl text-gold">{formatBDT(total)}</dd>
              </div>
            </dl>
            <button
              type="submit"
              form="checkout-form"
              className="mt-7 w-full rounded-sm bg-primary px-6 py-4 text-xs tracking-[0.22em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
            >
              Place order
            </button>
            <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
              We call every order to confirm before dispatch. Authenticity guaranteed.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="min-w-0 text-muted-foreground">{label}</dt>
      <dd className="shrink-0 text-foreground">{children}</dd>
    </div>
  );
}

function Option({
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
      className={`rounded-sm border px-4 py-2.5 text-xs tracking-wider transition-colors ${
        active
          ? "border-gold bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:border-gold/60 hover:text-gold"
      }`}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  name,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  placeholder?: string | undefined;
  error?: string | undefined;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        maxLength={120}
        placeholder={placeholder}
        className="mt-2 w-full rounded-sm border border-input bg-secondary px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-gold"
      />
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
