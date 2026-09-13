import { createFileRoute, Link } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create Account — Try Decants" }, { name: "description", content: "Create your Try Decants customer account." }, { property: "og:title", content: "Create Account — Try Decants" }, { property: "og:description", content: "Join Try Decants for a smoother fragrance shopping experience." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  return <div className="bg-off-white px-4 py-16 sm:px-6"><div className="mx-auto max-w-md rounded-lg border border-gold bg-card p-7 shadow-[var(--shadow-lux)] sm:p-9"><UserPlus className="h-6 w-6 text-gold"/><p className="eyebrow mt-5">Join the community</p><h1 className="mt-2 font-display text-3xl">Create your account</h1><form className="mt-7 space-y-5" onSubmit={(e)=>{e.preventDefault();toast.info("Registration will connect to WooCommerce when the site is converted.");}}>{["Full name","Email address","Phone number","Password"].map((label)=><label key={label} className="block text-[11px] tracking-[0.16em] text-muted-foreground uppercase">{label}<input type={label.includes("Password")?"password":label.includes("Email")?"email":"text"} required className="mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-gold"/></label>)}<button type="submit" className="bg-gold-gradient w-full rounded-sm px-6 py-3.5 text-xs tracking-[0.2em] text-navy uppercase">Register</button></form><p className="mt-6 text-center text-sm text-muted-foreground">Already have an account? <Link to="/login" className="text-gold hover:underline">Login</Link></p></div></div>;
}