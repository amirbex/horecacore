export default function Footer() {
  return (
    <footer className="bg-charcoal-dark py-12 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full border border-gold flex items-center justify-center relative">
                <div className="w-1 h-1 bg-gold rounded-full"></div>
              </div>
              <span className="font-semibold text-lg tracking-widest text-bone uppercase">
                HoReCa Core
              </span>
            </div>
            <p className="text-sm text-bone-muted font-light">
              Strategic Hospitality Intelligence
            </p>
          </div>

          <div className="flex items-center gap-8">
            <a href="#" className="text-sm text-bone-muted hover:text-gold transition-colors">Instagram</a>
            <a href="#" className="text-sm text-bone-muted hover:text-gold transition-colors">LinkedIn</a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-bone-muted/60 font-light font-sans tracking-wide">
          <p>&copy; {new Date().getFullYear()} HoReCa Core. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-bone transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-bone transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
