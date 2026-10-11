import React from 'react';
import { MapPin, Phone, Mail, Map, GraduationCap, ArrowUpRight, Youtube, Share2, Facebook } from 'lucide-react';
import schoolLogo from '../assets/images/school_logo_1784219569595.jpg';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  const handleLinkClick = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#192836] dark:bg-[#0d1d2a] border-t border-[#2f3e4c] text-white/90 font-sans" id="footer-section">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 px-6 md:px-12 py-12 md:py-16 max-w-7xl mx-auto">
        
        {/* Column 1: Brand Info (3 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <img 
            alt="Walpola Sri Rathanasara school Logo" 
            className="h-16 w-auto self-start brightness-110 object-contain cursor-pointer rounded-full"
            onClick={() => handleLinkClick('home')}
            src={schoolLogo}
            referrerPolicy="no-referrer"
          />
          <div className="font-display font-bold text-lg md:text-xl text-[#ffe088] leading-tight">
            Walpola Sri Rathanasara school
          </div>
          <p className="text-xs md:text-sm text-zinc-300 opacity-90 leading-relaxed max-w-sm">
            Nurturing wisdom and building character to create the leaders of tomorrow. Our vision is to be the pinnacle of academic excellence and disciplined citizenship in the Southern Province.
          </p>
        </div>

        {/* Column 2: Quick Links (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-4" id="footer-quick-links">
          <h4 className="font-semibold text-[#ffe088] uppercase tracking-widest text-xs md:text-sm">
            Quick Links
          </h4>
          <nav className="flex flex-col gap-2.5 text-xs md:text-sm">
            <button 
              onClick={() => handleLinkClick('home')}
              className="text-zinc-300 hover:text-[#ffe088] transition-colors text-left flex items-center gap-1 cursor-pointer"
            >
              Home Page
            </button>
            <button 
              onClick={() => handleLinkClick('academics')}
              className="text-zinc-300 hover:text-[#ffe088] transition-colors text-left flex items-center gap-1 cursor-pointer"
            >
              Academics
            </button>
            <button 
              onClick={() => handleLinkClick('history')}
              className="text-zinc-300 hover:text-[#ffe088] transition-colors text-left flex items-center gap-1 cursor-pointer"
            >
              School History
            </button>
            <button 
              onClick={() => handleLinkClick('admissions')}
              className="text-zinc-300 hover:text-[#ffe088] transition-colors text-left flex items-center gap-1 cursor-pointer"
            >
              Online Admissions
            </button>

          </nav>
        </div>

        {/* Column 3: Contact Us (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-4" id="footer-contact-info">
          <h4 className="font-semibold text-[#ffe088] uppercase tracking-widest text-xs md:text-sm">
            Contact Us
          </h4>
          <ul className="flex flex-col gap-3 text-xs md:text-sm">
            <li className="flex gap-2.5 items-start">
              <MapPin className="h-4 w-4 text-[#ffe088] shrink-0 mt-0.5" />
              <span className="text-zinc-300">Baddegama, Galle,<br />Sri Lanka</span>
            </li>
            <li className="flex gap-2.5 items-center">
              <Phone className="h-4 w-4 text-[#ffe088] shrink-0" />
              <span className="text-zinc-300 font-medium">+94 91 229 2345</span>
            </li>
            <li className="flex gap-2.5 items-center">
              <Mail className="h-4 w-4 text-[#ffe088] shrink-0" />
              <span className="text-zinc-300 hover:text-[#ffe088] transition-colors">
                <a href="mailto:info@rathanasara.sch.lk">info@rathanasara.sch.lk</a>
              </span>
            </li>
          </ul>
        </div>

        {/* Column 4: Map Representation (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-3" id="footer-map-col">
          <h4 className="font-semibold text-[#ffe088] uppercase tracking-widest text-xs md:text-sm">
            School Location
          </h4>
          <div className="rounded-lg overflow-hidden border border-[#2f3e4c] h-36 relative group bg-slate-900/45">
            <div className="w-full h-full bg-[#2f3e4c] flex flex-col items-center justify-center text-center p-4">
              <Map className="h-6 w-6 text-[#ffe088] mb-1.5 animate-pulse" />
              <p className="text-[10px] uppercase font-bold tracking-wider text-[#ffe088]">Baddegama Campus</p>
              <p className="text-[9px] text-zinc-300 mt-0.5">Galle, Southern Province</p>
              
              <a 
                href="https://maps.google.com/?q=Walpola+Sri+Rathanasara+school+Baddegama"
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 text-[11px] font-bold text-[#ffe088]"
              >
                Open Google Maps
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Sub-footer bottom bar */}
      <div className="border-t border-[#2f3e4c]/50 py-6 px-6 md:px-12 bg-[#14202c]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <div className="text-zinc-400">
            © {new Date().getFullYear()} Walpola Sri Rathanasara school. All Rights Reserved.
          </div>
          
          <div className="text-[#ffe088] font-bold tracking-wider uppercase">
            Made with pride in Sri Lanka
          </div>

          <div className="flex gap-4" id="footer-social-links">
            <a 
              href="https://www.facebook.com/share/1DEmXJQm21/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-zinc-400 hover:text-[#ffe088] transition-colors"
              aria-label="Visit Facebook page"
            >
              <Facebook className="h-4.5 w-4.5" />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-zinc-400 hover:text-[#ffe088] transition-colors"
              aria-label="Visit Youtube channel"
            >
              <Youtube className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
