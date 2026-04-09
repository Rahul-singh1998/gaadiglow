import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-darkblue text-white pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-8">

          {/* Col 1 — Brand + Socials + Legal */}
          <div>
            <div className="mb-4">
              <span className="text-white font-bold text-2xl md:text-3xl">
                Gaadi<span className="text-yellow-400">Glow</span>
              </span>
            </div>
            <p className="mb-5 opacity-80 text-sm leading-relaxed">
              Premium doorstep car cleaning in Delhi NCR — foam wash, fabric &amp; leather seat care &amp; 3M wax polish delivered with professional care.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4 mb-6">
              <a href="https://www.instagram.com/gaadiglow?igsh=NTN2Mzl6c3F2eWlm" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram text-2xl hover:text-pink-400 transition-colors"></i>
              </a>
              <a href="https://www.linkedin.com/in/gaadi-glow-276761375?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin text-2xl hover:text-blue-400 transition-colors"></i>
              </a>
              <a href="https://www.facebook.com/share/14wBSc4YEt/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook text-2xl hover:text-blue-400 transition-colors"></i>
              </a>
              <a href="https://youtube.com/@gaadiglow?si=bSMZU8HmnAc8Ca83" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <i className="fab fa-youtube text-2xl hover:text-red-500 transition-colors"></i>
              </a>
            </div>

            {/* Legal links — always visible as first-column item */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link href="/terms" className="text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors">
                Terms &amp; Conditions
              </Link>
              <Link href="/privacy-policy" className="text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Col 2 — Contact */}
          <div id="contact">
            <h4 className="font-bold text-lg mb-5">Contact Us</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt mt-0.5 text-yellow-400"></i>
                <div>
                  <p className="font-medium">Address</p>
                  <p className="opacity-80">KalKaji, DDA Flats, J3</p>
                  <p className="opacity-80">New Delhi, Delhi 110019</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className="fas fa-phone mt-0.5 text-yellow-400"></i>
                <div>
                  <p className="font-medium">Phone</p>
                  <a href="tel:+917800800122" className="opacity-80 hover:underline">7800800122</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className="fas fa-envelope mt-0.5 text-yellow-400"></i>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="opacity-80">gaadiglow@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3 — Availability */}
          <div>
            <h4 className="font-bold text-lg mb-5">Our Availability</h4>
            <div className="flex items-start gap-3 text-sm">
              <i className="fas fa-clock mt-0.5 text-yellow-400"></i>
              <div>
                <p className="font-medium">Working Hours</p>
                <p className="opacity-80">Monday to Sunday</p>
                <p className="opacity-80">8:00 am to 8:00 pm</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar — copyright only */}
        <div className="border-t border-white/10 pt-5 text-center">
          <p className="text-white opacity-60 text-sm">
            &copy; {new Date().getFullYear()} GaadiGlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
