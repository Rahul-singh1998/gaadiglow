import { FaWhatsapp } from "react-icons/fa";

const WA_LINK =
  "https://wa.me/917800800122?text=Hi%21%20I%E2%80%99d%20like%20to%20book%20a%20car%20cleaning%20service%20with%20GaadiGlow!";

export default function WhatsAppFAB() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with GaadiGlow on WhatsApp"
      className="fixed bottom-6 right-5 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60"
    >
      <FaWhatsapp className="w-6 h-6" />
    </a>
  );
}
