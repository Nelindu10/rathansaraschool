import React from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'motion/react';

export default function PrincipalWelcome() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto" id="principal-section">
      <div className="flex flex-col lg:flex-row gap-12 items-center bg-white border border-[#e2bfb9]/70 rounded-2xl p-6 md:p-12 shadow-sm relative overflow-hidden">
        {/* Abstract Background Design Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffe088]/10 rounded-full blur-2xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#570000]/5 rounded-full blur-3xl -z-10"></div>

        {/* Welcome Text Content */}
        <div className="w-full flex flex-col justify-center" id="principal-text-container">
          <span className="text-[#735c00] font-semibold text-xs md:text-sm uppercase tracking-wider mb-2 font-sans inline-block">
            Leadership Message
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#570000] mb-6 leading-tight">
            Principal's Welcome
          </h2>
          
          <div className="relative">
            <p className="font-sans italic text-base md:text-lg text-[#5a413d] leading-relaxed mb-8 relative z-10">
              "At Walpola Sri Rathanasara school, we believe that education is more than just grades. It's about building a foundation of integrity, resilience, and a lifelong passion for learning. Our mission is to provide a holistic environment where every student is challenged to reach their highest potential while remaining deeply rooted in our cultural heritage."
            </p>
          </div>

          <div className="border-t border-zinc-100 pt-4" id="principal-signature">
            <div className="font-bold text-lg text-zinc-900 font-sans">
              H.F.K.Fonseka
            </div>
            <div className="text-sm text-[#5a413d] font-medium font-sans">
              Principal, SLEAS Class I
            </div>
            <div className="text-xs text-zinc-400 font-sans mt-0.5">
              Sri Lanka Education Administrative Service
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
