import React from 'react';
import { Users, GraduationCap, Award, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export default function Stats() {
  const statsData = [
    {
      value: '100+',
      label: 'student',
      icon: Users,
    },
    {
      value: '100+',
      label: 'Educators',
      icon: GraduationCap,
    },
    {
      value: '100+',
      label: 'Years of Excellence',
      icon: Calendar,
    },
    {
      value: 'Top 10',
      label: 'National Rankers',
      icon: Award,
    },
  ];

  return (
    <section className="relative z-20 mx-4 md:mx-12 -mt-10 max-w-7xl lg:mx-auto" id="stats-section">
      <div className="bg-[#570000] text-white py-8 md:py-10 rounded-xl shadow-lg border border-[#e2bfb9]/10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-6 md:px-12 divide-y-0 divide-x-0 lg:divide-x divide-white/10">
          {statsData.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center p-2"
              id={`stat-item-${idx}`}
            >
              <div className="bg-white/10 p-2.5 rounded-full mb-3 text-[#ffe088]">
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#ffe088] leading-tight">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm font-semibold text-zinc-300 uppercase tracking-widest mt-1 font-sans">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
