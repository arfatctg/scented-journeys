import men from "@/assets/p-men.jpg";
import women from "@/assets/p-women.jpg";
import unisex from "@/assets/p-unisex.jpg";
import oud from "@/assets/p-oud.jpg";
import niche from "@/assets/p-niche.jpg";
import hero from "@/assets/hero-decants.jpg";

export type Gender = "Men" | "Women" | "Unisex" | "Niche" | "Arabic/Oud";
export type SizeMl = 3 | 5 | 10 | 30;

export type Product = {
  slug: string;
  name: string;
  brand: string;
  gender: Gender;
  images: string[];
  prices: Partial<Record<SizeMl, number>>;
  notes: { top: string[]; heart: string[]; base: string[] };
  description: string;
  longevity: string;
  sillage: string;
  popularity: number;
  addedAt: string;
  badge?: "Best Seller" | "New Arrival";
};

export const CATEGORIES: { label: Gender; blurb: string; image: string }[] = [
  { label: "Men", blurb: "Bold, smoky, magnetic", image: men },
  { label: "Women", blurb: "Floral, radiant, refined", image: women },
  { label: "Unisex", blurb: "Clean and boundary-free", image: unisex },
  { label: "Niche", blurb: "Rare houses, small batches", image: niche },
  { label: "Arabic/Oud", blurb: "Resinous, deep, opulent", image: oud },
];

export const heroImage = hero;

export const products: Product[] = [
  {
    slug: "tobacco-vanille",
    name: "Tobacco Vanille",
    brand: "Tom Ford",
    gender: "Unisex",
    images: [oud, hero, niche],
    prices: { 3: 1150, 5: 1750, 10: 3200, 30: 8900 },
    notes: {
      top: ["Tobacco Leaf", "Spicy Notes"],
      heart: ["Vanilla", "Cocoa", "Tonka Bean"],
      base: ["Dried Fruits", "Woody Notes"],
    },
    description:
      "A warm, honeyed tobacco opulence — spiced rum, vanilla and cocoa wrapped in dried fruit. The definitive cold-evening signature.",
    longevity: "10-12 hours",
    sillage: "Heavy",
    popularity: 98,
    addedAt: "2026-06-02",
    badge: "Best Seller",
  },
  {
    slug: "baccarat-rouge-540",
    name: "Baccarat Rouge 540 Extrait",
    brand: "Maison Francis Kurkdjian",
    gender: "Unisex",
    images: [niche, hero, unisex],
    prices: { 3: 1450, 5: 2250, 10: 4200, 30: 11500 },
    notes: {
      top: ["Saffron", "Bitter Almond"],
      heart: ["Jasmine", "Egyptian Jasmine"],
      base: ["Amberwood", "Ambergris", "Fir Resin"],
    },
    description:
      "Luminous, mineral and addictive. Saffron and jasmine over a burnt-sugar amberwood trail that lingers on fabric for days.",
    longevity: "12+ hours",
    sillage: "Beast mode",
    popularity: 96,
    addedAt: "2026-07-11",
    badge: "Best Seller",
  },
  {
    slug: "oud-wood",
    name: "Oud Wood",
    brand: "Tom Ford",
    gender: "Arabic/Oud",
    images: [oud, men, niche],
    prices: { 3: 1250, 5: 1950, 10: 3600 },
    notes: {
      top: ["Rosewood", "Cardamom", "Chinese Pepper"],
      heart: ["Oud", "Sandalwood", "Vetiver"],
      base: ["Tonka Bean", "Vanilla", "Amber"],
    },
    description:
      "Smooth, civilised oud. Creamy sandalwood and rosewood sand off the raw edges — an office-safe entry into the oud world.",
    longevity: "8-10 hours",
    sillage: "Moderate",
    popularity: 91,
    addedAt: "2026-05-19",
  },
  {
    slug: "aventus",
    name: "Aventus",
    brand: "Creed",
    gender: "Men",
    images: [men, hero, unisex],
    prices: { 3: 1350, 5: 2100, 10: 3900, 30: 10500 },
    notes: {
      top: ["Pineapple", "Bergamot", "Blackcurrant"],
      heart: ["Birch", "Patchouli", "Jasmine"],
      base: ["Musk", "Oakmoss", "Ambergris"],
    },
    description:
      "The pineapple-and-smoky-birch legend. Fresh, fruity confidence with a dry woody backbone that reads expensive instantly.",
    longevity: "8-10 hours",
    sillage: "Strong",
    popularity: 95,
    addedAt: "2026-04-28",
    badge: "Best Seller",
  },
  {
    slug: "layton",
    name: "Layton",
    brand: "Parfums de Marly",
    gender: "Men",
    images: [men, niche, hero],
    prices: { 3: 1150, 5: 1800, 10: 3300, 30: 9200 },
    notes: {
      top: ["Apple", "Bergamot", "Lavender"],
      heart: ["Geranium", "Violet", "Jasmine"],
      base: ["Vanilla", "Guaiac Wood", "Cardamom"],
    },
    description:
      "Apple and lavender diving into a creamy vanilla-guaiac base. Sweet but structured — a reliable compliment magnet.",
    longevity: "10-12 hours",
    sillage: "Strong",
    popularity: 93,
    addedAt: "2026-07-30",
    badge: "New Arrival",
  },
  {
    slug: "delina-exclusif",
    name: "Delina Exclusif",
    brand: "Parfums de Marly",
    gender: "Women",
    images: [women, niche, hero],
    prices: { 3: 1400, 5: 2200, 10: 4100 },
    notes: {
      top: ["Litchi", "Bergamot", "Nutmeg"],
      heart: ["Turkish Rose", "Peony", "Vanilla"],
      base: ["Cashmeran", "Musk", "Incense"],
    },
    description:
      "A plush Turkish rose wrapped in litchi and cashmere musk. Feminine, celebratory, unmistakably luxurious.",
    longevity: "10+ hours",
    sillage: "Strong",
    popularity: 90,
    addedAt: "2026-08-08",
    badge: "New Arrival",
  },
  {
    slug: "good-girl",
    name: "Good Girl",
    brand: "Carolina Herrera",
    gender: "Women",
    images: [women, hero, unisex],
    prices: { 3: 750, 5: 1150, 10: 2100, 30: 5600 },
    notes: {
      top: ["Almond", "Coffee", "Lemon"],
      heart: ["Tuberose", "Jasmine Sambac", "Orange Blossom"],
      base: ["Tonka Bean", "Cocoa", "Sandalwood"],
    },
    description:
      "Almond-coffee gourmand with a tuberose heart. Night-out energy that holds its shape through Dhaka humidity.",
    longevity: "8-9 hours",
    sillage: "Moderate to strong",
    popularity: 88,
    addedAt: "2026-03-14",
  },
  {
    slug: "sauvage-elixir",
    name: "Sauvage Elixir",
    brand: "Dior",
    gender: "Men",
    images: [men, unisex, hero],
    prices: { 3: 1100, 5: 1700, 10: 3150, 30: 8600 },
    notes: {
      top: ["Grapefruit", "Cinnamon", "Nutmeg"],
      heart: ["Lavender Absolute", "Spices"],
      base: ["Sandalwood", "Amber", "Licorice"],
    },
    description:
      "Concentrated, spicy lavender over a resinous amber core. Two sprays are plenty — projection is unapologetic.",
    longevity: "12+ hours",
    sillage: "Beast mode",
    popularity: 94,
    addedAt: "2026-06-21",
  },
  {
    slug: "khamrah",
    name: "Khamrah",
    brand: "Lattafa",
    gender: "Arabic/Oud",
    images: [oud, niche, hero],
    prices: { 3: 420, 5: 650, 10: 1150, 30: 2900 },
    notes: {
      top: ["Cinnamon", "Nutmeg", "Bergamot"],
      heart: ["Dates", "Praline", "Mahonial"],
      base: ["Tonka", "Vanilla", "Benzoin", "Amber"],
    },
    description:
      "Spiced dates and praline — the dessert-table oriental that made Lattafa famous. Outstanding value per ml.",
    longevity: "10 hours",
    sillage: "Strong",
    popularity: 92,
    addedAt: "2026-05-05",
    badge: "Best Seller",
  },
  {
    slug: "oud-mood-elixir",
    name: "Oud Mood Elixir",
    brand: "Lattafa",
    gender: "Arabic/Oud",
    images: [oud, men, niche],
    prices: { 3: 380, 5: 590, 10: 1050, 30: 2600 },
    notes: {
      top: ["Saffron", "Rose"],
      heart: ["Oud", "Leather"],
      base: ["Amber", "Musk", "Patchouli"],
    },
    description:
      "Smoky rose-and-leather oud built for weddings and winter nights. Traditional Middle Eastern character, modern smoothness.",
    longevity: "10-12 hours",
    sillage: "Heavy",
    popularity: 84,
    addedAt: "2026-02-26",
  },
  {
    slug: "bianco-latte",
    name: "Bianco Latte",
    brand: "Giardini di Toscana",
    gender: "Unisex",
    images: [niche, unisex, hero],
    prices: { 3: 900, 5: 1400, 10: 2600 },
    notes: {
      top: ["Almond Milk", "Bergamot"],
      heart: ["Caramel", "Coconut", "Honey"],
      base: ["Vanilla", "Tonka Bean", "White Musk"],
    },
    description:
      "Warm milk, caramel and vanilla — a skin-scent hug. Soft projection, endlessly wearable, universally liked.",
    longevity: "6-8 hours",
    sillage: "Intimate",
    popularity: 87,
    addedAt: "2026-08-16",
    badge: "New Arrival",
  },
  {
    slug: "reflection-man",
    name: "Reflection Man",
    brand: "Amouage",
    gender: "Niche",
    images: [niche, unisex, hero],
    prices: { 3: 1600, 5: 2500, 10: 4700 },
    notes: {
      top: ["Rosemary", "Pink Pepper", "Neroli"],
      heart: ["Jasmine", "Orris", "Ylang-Ylang"],
      base: ["Sandalwood", "Vetiver", "Cedar"],
    },
    description:
      "Crystalline white florals over powdery orris and sandalwood. Quiet luxury — the kind people notice up close.",
    longevity: "9-11 hours",
    sillage: "Moderate",
    popularity: 82,
    addedAt: "2026-07-02",
  },
];

export const SIZES: SizeMl[] = [3, 5, 10, 30];

export const brands = Array.from(new Set(products.map((p) => p.brand))).sort();

export const formatBDT = (v: number) =>
  `৳${v.toLocaleString("en-BD", { maximumFractionDigits: 0 })}`;

export const smallestPrice = (p: Product) =>
  Math.min(...Object.values(p.prices).map(Number));

export const availableSizes = (p: Product) =>
  SIZES.filter((s) => p.prices[s] !== undefined);

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
