import { MessageCircle } from "lucide-react";

export const WHATSAPP_NUMBER = "8801712345678";

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        "Hi DecantologyBD! I'd like to ask about a decant.",
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with DecantologyBD on WhatsApp"
      className="group fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full border border-gold/40 bg-card/95 px-4 py-3 text-sm tracking-wide text-foreground shadow-[var(--shadow-lux)] backdrop-blur transition-all hover:border-gold hover:text-gold sm:right-6 sm:bottom-6"
    >
      <MessageCircle className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
