import { createFileRoute, Link } from "@tanstack/react-router";
import { LockKeyhole } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Customer Login — Try Decants" }, { name: "description", content: "Sign in to your Try Decants customer account." }, { property: "og:title", content: "Customer Login — Try Decants" }, { property: "og:description", content: "Access your Try Decants customer account." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: LoginPage,
});

function LoginPage() {
  return <div className="bg-off-white px-4 py-16 sm:px-6"><div className="mx-auto max-w-md rounded-lg border border-gold bg-card p-7 shadow-[var(--shadow-lux)] sm:p-9"><LockKeyhole className="h-6 w-6 text-gold"/><p className="eyebrow mt-5">Welcome back</p><h1 className="mt-2 font-display text-3xl">Login to Try Decants</h1><form className="mt-7 space-y-5" onSubmit={(e)=>{e.preventDefault();toast.info("This login will connect to WooCommerce when the site is converted.");}}><Field label="Email address" type="email"/><Field label="Password" type="password"/><div className="flex items-center justify-between text-xs"><label className="flex items-center gap-2 text-muted-foreground"><input type="checkbox" className="accent-[var(--gold)]"/> Remember me</label><a href="#" className="text-gold hover:underline">Forgot password?</a></div><button type="submit" className="w-full rounded-sm bg-navy px-6 py-3.5 text-xs tracking-[0.2em] text-ivory uppercase hover:text-gold">Login</button></form><p className="mt-6 text-center text-sm text-muted-foreground">New here? <Link to="/register" className="text-gold hover:underline">Create an account</Link></p></div></div>;
}

function Field({ label, type }: { label: string; type: string }) { const id=label.toLowerCase().replaceAll(" ","-"); return <label htmlFor={id} className="block text-[11px] tracking-[0.16em] text-muted-foreground uppercase">{label}<input id={id} type={type} required className="mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-gold"/></label>; }