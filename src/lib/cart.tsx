import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { formatBDT, getProduct, type SizeMl } from "./products";

export type CartLine = {
  slug: string;
  size: SizeMl;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  add: (slug: string, size: SizeMl, qty?: number) => void;
  setQty: (slug: string, size: SizeMl, qty: number) => void;
  remove: (slug: string, size: SizeMl) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const STORAGE_KEY = "decantologybd.cart.v1";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore malformed storage */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable */
    }
  }, [lines]);

  const add = useCallback((slug: string, size: SizeMl, qty = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.slug === slug && l.size === size);
      if (found) {
        return prev.map((l) =>
          l.slug === slug && l.size === size ? { ...l, qty: Math.min(l.qty + qty, 20) } : l,
        );
      }
      return [...prev, { slug, size, qty }];
    });
  }, []);

  const setQty = useCallback((slug: string, size: SizeMl, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => !(l.slug === slug && l.size === size))
        : prev.map((l) =>
            l.slug === slug && l.size === size ? { ...l, qty: Math.min(qty, 20) } : l,
          ),
    );
  }, []);

  const remove = useCallback((slug: string, size: SizeMl) => {
    setLines((prev) => prev.filter((l) => !(l.slug === slug && l.size === size)));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((sum, l) => sum + lineTotal(l), 0);
    return { lines, add, setQty, remove, clear, count, subtotal };
  }, [lines, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function lineTotal(line: CartLine) {
  const product = getProduct(line.slug);
  const unit = product?.prices[line.size] ?? 0;
  return unit * line.qty;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export const money = formatBDT;
