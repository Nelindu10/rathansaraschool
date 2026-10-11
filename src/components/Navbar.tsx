import React, { useState } from 'react';
import { Menu, X, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import schoolLogo from '../assets/images/school_logo_1784219569595.jpg';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function Navbar({ currentTab, setCurrentTab }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'academics', label: 'Academics' },
    { id: 'history', label: 'History' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 w-full bg-white dark:bg-[#1a1c1c] z-50 border-b border-[#e2bfb9] dark:border-zinc-800 shadow-sm transition-colors duration-200">
      <div className="flex justify-between items-center px-6 md:px-12 max-w-7xl mx-auto h-20">
        {/* Brand Logo and Title */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => handleNavClick('home')}
          id="nav-brand-container"
        >
          <img 
            alt="Walpola Sri Rathanasara school Logo" 
            className="h-12 w-auto object-contain rounded-full"
            src={schoolLogo}
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="font-display text-lg md:text-xl font-bold text-[#570000] leading-tight hover:text-[#800000] transition-colors">
              Walpola Sri Rathanasara school
            </span>
            <span className="text-[10px] md:text-xs font-medium text-[#5a413d] tracking-wide font-sans">
              ශ්‍රී රතනසාර විද්‍යාලය
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8" id="nav-desktop-links">
          <nav className="flex gap-6">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-2 font-medium transition-all duration-200 ease-in-out cursor-pointer text-sm md:text-base ${
                    isActive 
                      ? 'text-[#570000] font-semibold' 
                      : 'text-[#5a413d] hover:text-[#570000]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div 
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#570000]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          id="nav-mobile-hamburger"
          className="md:hidden text-[#570000] hover:text-[#800000] p-2 cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            id="nav-mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#fdfdfd] border-t border-[#e2bfb9] px-6 py-4 flex flex-col gap-4 overflow-hidden"
          >
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`nav-link-mobile-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left py-2 font-medium border-b border-zinc-100 last:border-0 transition-colors cursor-pointer ${
                    currentTab === item.id 
                      ? 'text-[#570000] font-bold pl-2 border-l-2 border-[#570000]' 
                      : 'text-[#5a413d] hover:text-[#570000]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
