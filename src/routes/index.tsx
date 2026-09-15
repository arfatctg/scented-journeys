import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Headphones, PiggyBank, Star, Truck } from "lucide-react";
import { toast } from "sonner";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { CATEGORIES, formatBDT, heroImage, products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Try Decants — Authentic Perfume Samples Bangladesh" },
    { name: "description", content: "Shop authentic perfume samples, curated discovery packs and full-size fragrances in Bangladesh." },
    { property: "og:title", content: "Try Decants — Try Before You Buy" },
    { property: "og:description", content: "Authentic fragrance samples, rare finds and full bottles delivered across Bangladesh." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}), component: Home,
});

const requestedBrands = ["Xerjoff", "Jean Paul Gaultier", "Creed", "Tom Ford", "Lattafa", "Maison Margiela", "Armaf", "Initio"];
const tabs = ["Men", "Women", "Unisex", "Arabic/Oud", "Niche"] as const;

function Home() {
  const [sampleTab, setSampleTab] = useState<(typeof tabs)[number]>("Men");
  const filtered = products.filter((p) => p.gender === sampleTab);
  const sampleProducts = filtered.length >= 5 ? filtered : [...filtered, ...products.filter((p) => !filtered.includes(p))].slice(0, 5);

  return <div>
    <section className="relative overflow-hidden border-b border-gold/40 bg-navy">
      <img src={heroImage} alt="Luxury perfume decants and bottle" className="absolute inset-0 h-full w-full object-cover opacity-45"/>
      <div className="absolute inset-0 bg-[var(--gradient-hero)]"/>
      <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-end px-4 py-16 sm:px-6 md:py-20">
        <div className="max-w-3xl"><p className="font-display text-sm italic text-gold">— Try Before You Buy —</p><h1 className="hero-sheen mt-5 font-display text-4xl leading-[1.08] sm:text-6xl">Find Your Signature Scent</h1><p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/80">Authentic decants delivered across Bangladesh. Sample first, commit later.</p><div className="mt-9 flex flex-wrap gap-4"><Link to="/shop" className="bg-gold-gradient inline-flex items-center gap-2 rounded-sm px-7 py-3.5 text-xs tracking-[0.2em] text-navy uppercase">Shop Decants <ArrowRight className="h-4 w-4"/></Link><Link to="/shop" search={{ gender:"Niche" }} className="rounded-sm border border-ivory px-7 py-3.5 text-xs tracking-[0.2em] text-ivory uppercase hover:border-gold hover:text-gold">View Sample Packs</Link></div></div>
      </div>
    </section>
    <div className="overflow-hidden border-b border-gold/30 bg-navy py-3 text-gold"><div className="w-max animate-[marquee_28s_linear_infinite] whitespace-nowrap text-xs tracking-[0.2em] uppercase">✦ 100% Authentic ✦ Try Before You Buy ✦ Fast Delivery ✦ Secure Payment ✦ Easy Returns ✦ 100% Authentic ✦ Try Before You Buy ✦ Fast Delivery ✦ Secure Payment ✦ Easy Returns ✦</div></div>

    <ProductSection eyebrow="Just landed" title="Shop New Releases" products={products.slice().sort((a,b)=>b.addedAt.localeCompare(a.addedAt)).slice(0,6)} rail />

    <section className="bg-off-white py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6"><SectionTitle eyebrow="Curated discovery" title="Shop Fragrance Sample Packs"/><div className="mt-10 grid gap-6 lg:grid-cols-2">{[
      {name:"The Icon Collection", count:5, price:3490, image:CATEGORIES[2]?.image ?? heroImage, copy:"Five modern signatures for work, weekends and evenings."},
      {name:"Oud After Dark", count:4, price:2890, image:CATEGORIES[4]?.image ?? heroImage, copy:"A rich edit of smoky woods, amber and warm spice."},
    ].map((pack)=><article key={pack.name} className="grid overflow-hidden rounded-sm border border-border bg-card sm:grid-cols-2"><img src={pack.image} alt={`${pack.name} fragrance sample pack`} className="h-64 w-full object-cover sm:h-full"/><div className="flex flex-col justify-center p-7"><p className="eyebrow">{pack.count} scents included</p><h3 className="mt-3 font-display text-2xl">{pack.name}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pack.copy}</p><p className="mt-5 font-display text-2xl text-gold">{formatBDT(pack.price)}</p><Link to="/shop" className="mt-6 inline-flex w-fit rounded-sm bg-promo px-5 py-3 text-xs tracking-[0.16em] text-promo-foreground uppercase">Explore Pack</Link></div></article>)}</div></div></section>

    <section className="bg-navy py-16 text-ivory"><div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto]"><div><p className="text-xs tracking-[0.2em] text-promo-foreground uppercase">Seasonal scent edit</p><h2 className="mt-3 font-display text-3xl sm:text-4xl">Midnight Notes, Weekend Prices</h2><p className="mt-4 text-sm text-ivory/70">Use code <span className="border border-promo px-2 py-1 text-promo-foreground">TRY15</span> for 15% off selected discoveries.</p><div className="mt-6 flex gap-3">{[["02","Days"],["14","Hours"],["36","Mins"]].map(([n,l])=><div key={l} className="min-w-16 border border-gold/35 p-3 text-center"><span className="block font-display text-xl text-gold">{n}</span><span className="text-[9px] tracking-wider uppercase">{l}</span></div>)}</div></div><Link to="/shop" className="inline-flex rounded-sm bg-promo px-7 py-4 text-xs tracking-[0.18em] text-promo-foreground uppercase">Shop the Collection</Link></div></section>

    <ProductSection eyebrow="The complete experience" title="Shop Full Size Bottles" products={products.filter(p=>p.prices[30]).slice(0,4)} />

    <section className="bg-off-white py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6"><SectionTitle eyebrow="Find your match" title="Shop All Fragrance Samples"/><div className="mt-8 flex flex-wrap justify-center gap-2">{tabs.map(t=><button key={t} type="button" onClick={()=>setSampleTab(t)} className={`rounded-sm border px-4 py-2 text-[10px] tracking-[0.15em] uppercase ${sampleTab===t?"border-promo bg-promo text-promo-foreground":"border-border bg-card text-muted-foreground hover:border-gold"}`}>{t}</button>)}</div><div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">{sampleProducts.map(p=><ProductCard key={p.slug} product={p}/>)}</div></div></section>

    <section className="bg-navy py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6"><SectionTitle eyebrow="Explore the houses" title="Shop by Brand" dark/><div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">{requestedBrands.map((brand,i)=><Link key={brand} to="/shop" search={{ brand: products.some(p=>p.brand===brand)?brand:undefined }} className="flex min-h-24 items-center justify-center rounded-sm border border-gold/55 px-4 text-center font-display text-lg text-ivory transition-colors hover:bg-gold hover:text-navy"><span className={i%3===0?"italic":""}>{brand}</span></Link>)}</div></div></section>

    <section className="grid min-h-[460px] lg:grid-cols-2"><img src={CATEGORIES[3]?.image ?? heroImage} alt="Dark niche fragrance collection" className="h-full min-h-80 w-full object-cover"/><div className="flex items-center bg-navy p-10 text-ivory sm:p-16"><div className="max-w-lg"><p className="eyebrow !text-gold">For collectors</p><h2 className="mt-3 font-display text-4xl">Discover the scents nobody else is wearing</h2><p className="mt-5 text-sm leading-relaxed text-ivory/70">Step beyond the familiar with small-batch perfumery, expressive compositions and hard-to-find bottles.</p><Link to="/shop" search={{ gender:"Niche" }} className="mt-8 inline-flex rounded-sm bg-promo px-6 py-3.5 text-xs tracking-[0.18em] text-promo-foreground uppercase">Explore Niche</Link></div></div></section>

    <ProductSection eyebrow="Her edit" title="Shop Women's Fragrances" products={[...products.filter(p=>p.gender==="Women"),...products].slice(0,4)} />

    <section className="border-y border-border bg-off-white py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6"><SectionTitle eyebrow="Why Try Decants" title="Service that stays personal"/><div className="mt-10 grid gap-5 md:grid-cols-3">{[
      {Icon:Headphones,title:"Customer Service",body:"7 days support via WhatsApp & Facebook"},{Icon:Truck,title:"Quick Shipping",body:"Delivered within 2–5 business days"},{Icon:PiggyBank,title:"Save Money",body:"Try before you commit to a full bottle"}
    ].map(({Icon,title,body})=><div key={title} className="rounded-sm border border-border border-l-4 border-l-navy bg-card p-7"><Icon className="h-6 w-6 text-gold" strokeWidth={1.4}/><h3 className="mt-5 font-display text-xl">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{body}</p></div>)}</div></div></section>

    <section className="bg-navy py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6"><SectionTitle eyebrow="Collector's shelf" title="Rare & Discontinued" dark/><div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">{products.slice(8,12).map(p=><div key={p.slug} className="relative"><span className="absolute top-3 left-3 z-10 rounded-sm bg-promo px-2 py-1 text-[9px] tracking-wider text-promo-foreground uppercase">Rare Find</span><ProductCard product={p} dark/></div>)}</div></div></section>

    <section className="py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6"><SectionTitle eyebrow="Real fragrance stories" title="Let Our Customers Speak for Us"/><div className="mt-10 grid gap-5 md:grid-cols-3">{[
      ["Nadia Rahman","Delina Exclusif","Beautifully packed and completely authentic. The 5ml size lasted much longer than I expected."],
      ["Farhan Ahmed","Aventus","Fast delivery to Chattogram and the scent performs exactly like the retail bottle."],
      ["Tasnim Noor","Bianco Latte","The easiest way to test a trending perfume without committing to the full price."],
    ].map(([name,product,review])=><article key={name} className="rounded-sm border border-border bg-card p-7"><div className="flex gap-1 text-gold" aria-label="5 out of 5 stars">{[1,2,3,4,5].map(n=><Star key={n} className="h-4 w-4 fill-current"/>)}</div><p className="mt-5 text-sm leading-relaxed text-muted-foreground">“{review}”</p><p className="mt-6 font-display text-lg">{name}</p><p className="mt-1 text-[10px] tracking-wider text-gold uppercase">Purchased {product}</p></article>)}</div></div></section>

    <section className="bg-navy py-14 text-ivory"><div className="mx-auto grid max-w-5xl items-center gap-8 px-4 sm:px-6 md:grid-cols-2"><div><p className="eyebrow !text-promo-foreground">The private list</p><h2 className="mt-3 font-display text-3xl">New drops, rare splits, first access.</h2></div><form className="flex flex-col gap-3 sm:flex-row" onSubmit={(e)=>{e.preventDefault();toast.success("You're on the Try Decants list.");e.currentTarget.reset();}}><input name="email" type="email" required placeholder="Email address" className="min-w-0 flex-1 rounded-sm border border-ivory/25 bg-ivory/10 px-4 py-3 text-sm text-ivory outline-none placeholder:text-ivory/50 focus:border-gold"/><button type="submit" className="rounded-sm bg-promo px-6 py-3 text-xs tracking-[0.18em] text-promo-foreground uppercase">Subscribe</button></form></div></section>
  </div>;
}

function SectionTitle({eyebrow,title,dark=false}:{eyebrow:string;title:string;dark?:boolean}) { return <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"><div><p className={`eyebrow ${dark?"!text-gold":""}`}>{eyebrow}</p><h2 className={`mt-3 font-display text-3xl sm:text-4xl ${dark?"text-ivory":""}`}>{title}</h2></div><Link to="/shop" className={`hidden items-center gap-2 text-[10px] tracking-[0.16em] uppercase sm:flex ${dark?"text-gold":"text-navy"}`}>View All <ArrowRight className="h-3.5 w-3.5"/></Link></div> }
function ProductSection({eyebrow,title,products:items,rail=false}:{eyebrow:string;title:string;products:typeof products;rail?:boolean}) { return <section className="py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6"><SectionTitle eyebrow={eyebrow} title={title}/><div className={rail?"mt-10 flex snap-x gap-4 overflow-x-auto pb-4":"mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4"}>{items.map(p=><div key={p.slug} className={rail?"w-[76%] shrink-0 snap-start sm:w-[42%] lg:w-[calc((100%-5rem)/6)]":""}><ProductCard product={p}/></div>)}</div></div></section> }