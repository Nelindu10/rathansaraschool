import React from 'react';
import { Calendar, Landmark, BookOpen, Star, Award, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function HistoryTab() {
  const milestones = [
    {
      year: '1918',
      title: 'Founding Year',
      icon: Landmark,
      description: 'Walpola Sri Rathanasara school was established in Baddegama by local Buddhist clergy and visionary community leaders to provide high-quality English and native education rooted in traditional values.'
    },
    {
      year: '1945',
      title: 'Government Assistance',
      icon: BookOpen,
      description: 'The school was recognized as a government-assisted school, enabling rapid infrastructure growth, recruitment of elite educators, and expansion of secondary level learning.'
    },
    {
      year: '1972',
      title: 'Science Laboratories',
      icon: Sparkles,
      description: 'Marking the Golden Jubilee, state-of-the-art laboratory facilities for Physical and Biological sciences were opened, pioneering premium rural science education.'
    },
    {
      year: '1994',
      title: 'National School Elevation',
      icon: Award,
      description: 'Elevated to the prestigious status of "National School" by the Ministry of Education, Sri Lanka, reflecting outstanding academic excellence, sports records, and local leadership.'
    },
    {
      year: '2018',
      title: 'Centennial Celebrations',
      icon: Star,
      description: 'Celebrated 100 years of historic educational excellence under Presidential patronage. Unveiled the Centennial Building and new computer laboratories.'
    },
    {
      year: 'Present Day',
      title: 'Digital & Academic Frontier',
      icon: Calendar,
      description: 'Nurturing over 1,500 students with smart classrooms, advanced technology laboratories, and consistently ranking among the top schools in the Southern Province.'
    }
  ];

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto" id="history-section">
      {/* Page Title */}
      <div className="text-center mb-16">
        <span className="text-[#735c00] font-semibold text-xs md:text-sm uppercase tracking-widest mb-2 inline-block font-sans">
          Centennial Legacy
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-[#570000] mb-4">
          Our Rich History &amp; Heritage
        </h2>
        <p className="text-sm md:text-base text-[#5a413d] max-w-2xl mx-auto font-sans leading-relaxed">
          Over a century of academic prestige, unwavering discipline, and dedication to raising generations of brilliant professionals, civil servants, and leaders.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Historical Context */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24" id="history-sidebar">
          <div className="bg-[#570000] text-white p-6 md:p-8 rounded-2xl shadow-md border border-[#ffe088]/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#ffe088]/10 rounded-full blur-xl"></div>
            
            <h3 className="font-display text-2xl font-bold mb-4 text-[#ffe088]">
              Origin of Excellence
            </h3>
            <p className="text-sm opacity-90 leading-relaxed font-sans mb-4">
              Nestled in the historical town of Baddegama, Galle, Walpola Sri Rathanasara school was born from the pure aspirations of community guardians. Guided by high-principled Buddhist tenets, the founders designed a template for holistic education where character development was held in equal prestige to science and mathematics.
            </p>
            <p className="text-sm opacity-90 leading-relaxed font-sans">
              Through generations of challenge, the school consistently rose to prominence, producing top rankers in national GCE Ordinary and Advanced Level exams, and dominating Southern Province athletic meets.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#e2bfb9]/40 shadow-sm space-y-4">
            <h4 className="font-display text-lg font-bold text-zinc-900 flex items-center gap-2">
              <Star className="h-5 w-5 text-[#735c00]" />
              Core Historical Pillars
            </h4>
            <div className="space-y-3 text-xs md:text-sm text-[#5a413d] font-sans">
              <div className="flex gap-2.5 items-start">
                <span className="w-1.5 h-1.5 bg-[#570000] rounded-full mt-2 shrink-0"></span>
                <p><strong>Unmatched Discipline:</strong> Rigid attendance, dress, and behavioral standards guiding students towards mature civil conduct.</p>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="w-1.5 h-1.5 bg-[#570000] rounded-full mt-2 shrink-0"></span>
                <p><strong>Cultural Pride:</strong> Celebrating cultural pageants, national Vesak, and linguistic debates keeping heritage alive.</p>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="w-1.5 h-1.5 bg-[#570000] rounded-full mt-2 shrink-0"></span>
                <p><strong>Universal Access:</strong> Welcoming gifted students from across Galle and neighboring administrative districts.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Timeline */}
        <div className="lg:col-span-7 relative pl-6 md:pl-8 border-l border-zinc-200 space-y-12" id="history-timeline">
          {milestones.map((milestone, idx) => {
            const IconComponent = milestone.icon;
            return (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative"
              >
                {/* Timeline node */}
                <div className="absolute -left-[43px] md:-left-[51px] top-0 bg-white border-2 border-[#570000] p-2 rounded-full shadow-sm text-[#570000] group-hover:bg-[#570000] group-hover:text-white transition-colors">
                  <IconComponent className="h-4 w-4 md:h-5 w-5" />
                </div>

                <div className="bg-white p-6 rounded-xl border border-zinc-100 hover:border-[#ffe088]/60 hover:shadow-md transition-all duration-300">
                  <span className="text-xl md:text-2xl font-display font-extrabold text-[#735c00] leading-none">
                    {milestone.year}
                  </span>
                  <h4 className="font-display font-bold text-lg text-zinc-950 mt-1 mb-3">
                    {milestone.title}
                  </h4>
                  <p className="text-sm text-[#5a413d] leading-relaxed font-sans">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
