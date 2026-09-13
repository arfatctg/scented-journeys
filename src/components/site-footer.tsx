import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MapPin, MessageCircle, Music2, Phone } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { WHATSAPP_NUMBER } from "@/components/whatsapp-button";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-gold/30 bg-navy text-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div><BrandMark footer /><p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/70">Try Decants — Bangladesh's most trusted decant shop. Try before you buy. 100% authentic fragrances, delivered to your door.</p><div className="mt-5 flex gap-4 text-gold">{[{href:"https://facebook.com",label:"Facebook",Icon:Facebook},{href:"https://instagram.com",label:"Instagram",Icon:Instagram},{href:`https://wa.me/${WHATSAPP_NUMBER}`,label:"WhatsApp",Icon:MessageCircle},{href:"https://tiktok.com",label:"TikTok",Icon:Music2}].map(({href,label,Icon}) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="hover:text-gold-soft"><Icon className="h-4.5 w-4.5" strokeWidth={1.5}/></a>)}</div></div>
        <div><h3 className="eyebrow !text-gold">Explore</h3><ul className="mt-4 space-y-2.5 text-sm">{[{to:"/shop",label:"All decants"},{to:"/about",label:"Our story"},{to:"/contact",label:"Contact"},{to:"/cart",label:"Cart & checkout"}].map((l)=><li key={l.to}><Link to={l.to} className="text-ivory/70 hover:text-gold">{l.label}</Link></li>)}</ul></div>
        <div><h3 className="eyebrow !text-gold">Customer care</h3><ul className="mt-4 space-y-2.5 text-sm"><li><Link to="/return-policy" className="text-ivory/70 hover:text-gold">Return policy</Link></li><li><Link to="/refund-policy" className="text-ivory/70 hover:text-gold">Refund policy</Link></li><li><Link to="/terms" className="text-ivory/70 hover:text-gold">Terms & conditions</Link></li><li><Link to="/login" className="text-ivory/70 hover:text-gold">My account</Link></li></ul></div>
        <div><h3 className="eyebrow !text-gold">Reach us</h3><ul className="mt-4 space-y-3 text-sm text-ivory/70"><li className="flex gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5}/>Banani, Dhaka 1213, Bangladesh</li><li className="flex gap-2.5"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5}/>+880 1712-345678</li></ul></div>
      </div>
      <div className="border-t border-gold/20 px-4 py-5 text-center text-xs tracking-wider text-ivory/60">© {new Date().getFullYear()} Try Decants. Cash on delivery, bKash & Nagad accepted.</div>
    </footer>
  );
}