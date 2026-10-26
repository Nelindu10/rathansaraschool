import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Landmark } from 'lucide-react';

interface HeroProps {
  setCurrentTab: (tab: string) => void;
}

export default function Hero({ setCurrentTab }: HeroProps) {
  return (
    <section className="relative h-[75vh] min-h-[550px] flex items-center overflow-hidden" id="hero-section">
      {/* Background Image and Overlays */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="Walpola Sri Rathanasara School Campus" 
          className="w-full h-full object-cover object-[center_35%]"
          src="/assets/aistudio/WhatsApp_Image_2026-10-26_at_18.10.27_13fa04bc.jpeg"
        />
        {/* Subtle dark/reddish gradient overlay ensuring text legibility while keeping the classrooms, tree, and Buddhist shrine visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#3b0000]/85 via-[#4a0000]/45 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#ffe088] font-semibold text-xs md:text-sm uppercase tracking-widest bg-[#570000]/70 px-3 py-1 rounded-full border border-[#ffe088]/20 inline-block mb-4 shadow-sm backdrop-blur-xs">
              5WWC+Q7F, GAMPAHA
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-sm"
          >
            Nurturing Wisdom, <br className="hidden md:inline" />Character, and Excellence
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg lg:text-xl text-zinc-100 opacity-95 mb-8 max-w-2xl leading-relaxed font-sans"
          >
            Walpola Sri Rathanasara school ,Situated in the heart of Gampaha, our institution is dedicated to cultivating wisdom and integrity, empowering students to achieve excellence through a rich legacy of academic brilliance
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button 
              id="hero-admissions-btn"
              onClick={() => setCurrentTab('admissions')}
              className="bg-[#570000] text-white hover:bg-[#800000] px-8 py-4 rounded-md font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 border border-[#ffe088]/20 cursor-pointer"
            >
              <GraduationCap className="h-5 w-5 text-[#ffe088]" />
              Admissions Info
            </button>
            <button 
              id="hero-history-btn"
              onClick={() => setCurrentTab('history')}
              className="border-2 border-white text-white hover:bg-white hover:text-[#570000] px-8 py-4 rounded-md font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Landmark className="h-5 w-5" />
              Explore Our History
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
