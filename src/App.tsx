import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import PrincipalWelcome from './components/PrincipalWelcome';
import AcademicsTab from './components/AcademicsTab';
import NewsSection from './components/NewsSection';
import ContactTab from './components/ContactTab';
import AdmissionsPortal from './components/AdmissionsPortal';
import PortalTab from './components/PortalTab';
import Footer from './components/Footer';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');

  const renderActiveScreen = () => {
    switch (currentTab) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Hero setCurrentTab={setCurrentTab} />
            <Stats />
            <PrincipalWelcome />
            <AcademicsTab standalone={false} setCurrentTab={setCurrentTab} />
            <NewsSection />
          </motion.div>
        );
      case 'academics':
        return (
          <motion.div
            key="academics"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <AcademicsTab standalone={true} />
          </motion.div>
        );
      case 'contact':
        return (
          <motion.div
            key="contact"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <ContactTab />
          </motion.div>
        );
      case 'admissions':
        return (
          <motion.div
            key="admissions"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <AdmissionsPortal setCurrentTab={setCurrentTab} />
          </motion.div>
        );
      case 'portal':
        return (
          <motion.div
            key="portal"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <PortalTab />
          </motion.div>
        );
      default:
        return (
          <div className="py-24 text-center font-sans">
            <h2 className="text-xl font-bold">Screen not found</h2>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9f9] text-zinc-900 transition-colors duration-200" id="app-root">
      {/* Dynamic Header / Nav bar */}
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main Dynamic Viewport with fade/motion transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {renderActiveScreen()}
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer setCurrentTab={setCurrentTab} />
    </div>
  );
}
