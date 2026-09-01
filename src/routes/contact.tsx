import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Facebook, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Reveal } from "@/components/reveal";
import { WHATSAPP_NUMBER } from "@/components/whatsapp-button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact DecantologyBD — WhatsApp, Facebook & Dhaka Studio" },
      {
        name: "description",
        content:
          "Questions about a decant, an order or a custom split? Message DecantologyBD on WhatsApp or send us a note.",
      },
      { property: "og:title", content: "Contact DecantologyBD" },
      {
        property: "og:description",
        content: "Reach our Dhaka studio on WhatsApp, Facebook or through the contact form.",
      },
    ],
  }),
  component: Contact,
});

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^(\+?880|0)1[0-9]{9}$/, "Enter a valid Bangladeshi mobile number"),
  message: z.string().trim().min(10, "Tell us a little more").max(1000),
});

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <header className="text-center">
        <p className="eyebrow">Get in touch</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">We're one message away</h1>
        <div className="hairline mx-auto mt-6 w-40" />
      </header>

      <div className="mt-12 grid gap-10 md:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = Object.fromEntries(new FormData(form));
              const parsed = contactSchema.safeParse(data);
              if (!parsed.success) {
                const next: Record<string, string> = {};
                for (const issue of parsed.error.issues) {
                  next[String(issue.path[0])] = issue.message;
                }
                setErrors(next);
                toast.error("Please check the highlighted fields.");
                return;
              }
              setErrors({});
              toast.success("Message sent. We usually reply within a few hours.");
              form.reset();
            }}
            className="rounded-lg border border-border/70 bg-card p-6 sm:p-8"
          >
            <Field label="Your name" name="name" error={errors["name"]} />
            <Field
              label="Mobile number"
              name="phone"
              placeholder="01712-345678"
              error={errors["phone"]}
            />
            <div className="mt-5">
              <label
                htmlFor="message"
                className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                maxLength={1000}
                className="mt-2 w-full rounded-sm border border-input bg-secondary px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-gold"
                placeholder="Which fragrance are you looking for?"
              />
              {errors["message"] && (
                <p className="mt-1.5 text-xs text-destructive">{errors["message"]}</p>
              )}
            </div>
            <button
              type="submit"
              className="mt-7 w-full rounded-sm bg-primary px-6 py-3.5 text-xs tracking-[0.22em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
            >
              Send message
            </button>
          </form>
        </Reveal>

        <Reveal delay={120}>
          <div className="space-y-4">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 rounded-lg border border-border/70 bg-card p-5 transition-colors hover:border-gold/50"
            >
              <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
              <div className="min-w-0">
                <p className="font-display text-lg">WhatsApp</p>
                <p className="text-sm text-muted-foreground">
                  +880 1712-345678 — fastest way to reach us
                </p>
              </div>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 rounded-lg border border-border/70 bg-card p-5 transition-colors hover:border-gold/50"
            >
              <Facebook className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
              <div className="min-w-0">
                <p className="font-display text-lg">Facebook Page</p>
                <p className="text-sm text-muted-foreground">fb.com/decantologybd</p>
              </div>
            </a>
            <div className="flex items-start gap-4 rounded-lg border border-border/70 bg-card p-5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
              <div className="min-w-0">
                <p className="font-display text-lg">Studio</p>
                <p className="text-sm text-muted-foreground">
                  House 42, Road 11, Banani, Dhaka 1213 — pickup by appointment
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg border border-border/70 bg-card p-5">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
              <div className="min-w-0">
                <p className="font-display text-lg">Hours</p>
                <p className="text-sm text-muted-foreground">
                  Saturday - Thursday, 11am - 9pm. Friday closed.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg border border-border/70 bg-card p-5">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
              <div className="min-w-0">
                <p className="font-display text-lg">Email</p>
                <p className="text-sm text-muted-foreground">hello@decantologybd.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg border border-border/70 bg-card p-5">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
              <div className="min-w-0">
                <p className="font-display text-lg">Hotline</p>
                <p className="text-sm text-muted-foreground">+880 1712-345678</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
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
    <div className="mt-5 first:mt-0">
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
