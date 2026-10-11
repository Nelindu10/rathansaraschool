import React, { useState } from 'react';
import { Smile, BookOpen, FlaskConical, ArrowRight, CheckCircle2, Award, Users, BookMarked, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AcademicStream } from '../types';

interface AcademicsTabProps {
  standalone?: boolean;
  onExploreStream?: (streamId: string) => void;
  setCurrentTab?: (tab: string) => void;
}

export default function AcademicsTab({ standalone = false, onExploreStream, setCurrentTab }: AcademicsTabProps) {
  const [selectedStreamId, setSelectedStreamId] = useState<string | null>(null);

  const streams: AcademicStream[] = [
    {
      id: 'primary',
      name: 'Primary Education',
      grades: 'Grades 1 to 5',
      description: 'Grades 1 to 5. Focused on foundational literacy, numeracy, and social integration through playful yet structured learning.',
      badgeColor: 'border-t-4 border-[#570000]',
      duration: '5 Years',
      examType: 'Grade 5 Scholarship Exam (Optional)',
      subjects: [
        'Mother Tongue (Sinhala)',
        'Mathematics',
        'English Language & Activity',
        'Religion (Buddhism / Christianity / Hinduism)',
        'Environmental Studies',
        'Aesthetics & Creative Activities',
        'Physical Education & Health'
      ]
    }
  ];

  const getIcon = (id: string) => {
    switch (id) {
      case 'primary': return <Smile className="h-9 w-9 text-[#570000]" />;
      default: return <BookOpen className="h-9 w-9 text-[#570000]" />;
    }
  };

  const handleCardClick = (stream: AcademicStream) => {
    if (standalone) {
      setSelectedStreamId(selectedStreamId === stream.id ? null : stream.id);
    } else if (setCurrentTab) {
      // Navigate to standalone academics tab
      setCurrentTab('academics');
      setTimeout(() => {
        const element = document.getElementById(`standalone-stream-${stream.id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  return (
    <section 
      className={`py-16 md:py-24 px-6 md:px-12 ${standalone ? 'bg-white' : 'bg-zinc-50'}`}
      id="academics-section"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[#735c00] font-semibold text-xs md:text-sm uppercase tracking-widest mb-2 inline-block font-sans">
            Educational Pathways
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#570000] mb-4">
            Academic Excellence
          </h2>
          <p className="text-sm md:text-base text-[#5a413d] max-w-2xl mx-auto font-sans">
            Comprehensive educational pathways for every stage of development, delivering world-class curriculum frameworks grounded in discipline and prestige.
          </p>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-1 max-w-md mx-auto gap-6 md:gap-8">
          {streams.map((stream, idx) => {
            const isSelected = selectedStreamId === stream.id;
            return (
              <motion.div
                key={stream.id}
                id={`stream-card-${stream.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`bg-white p-6 md:p-8 rounded-xl border border-zinc-100 hover:shadow-lg transition-all duration-300 ${stream.badgeColor} flex flex-col justify-between group cursor-pointer relative overflow-hidden`}
                onClick={() => handleCardClick(stream)}
              >
                {/* Decorative golden backdrop glow on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#ffe088]/5 rounded-full blur-xl group-hover:bg-[#ffe088]/15 transition-all"></div>

                <div>
                  <div className="mb-6 bg-zinc-50 p-3 rounded-lg w-fit group-hover:bg-[#ffe088]/10 transition-colors">
                    {getIcon(stream.id)}
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-zinc-900 mb-3 group-hover:text-[#570000] transition-colors">
                    {stream.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#735c00] uppercase tracking-wider mb-4 font-sans flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#735c00]"></span>
                    {stream.grades}
                  </div>
                  <p className="text-sm text-[#5a413d] mb-6 leading-relaxed font-sans">
                    {stream.description}
                  </p>
                </div>

                <div className="mt-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(stream);
                    }}
                    className="text-[#570000] font-bold text-sm inline-flex items-center gap-1.5 group-hover:gap-3 transition-all cursor-pointer font-sans"
                  >
                    Curriculum Details
                    <ArrowRight className="h-4 w-4 text-[#570000] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed deep-dive section when in standalone or when clicked */}
        <AnimatePresence>
          {standalone && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-16 border-t border-zinc-100 pt-16"
              id="academics-standalone-details"
            >
              <div className="text-center mb-10">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-[#570000] mb-2">
                  Curriculum Deep-Dive & Syllabus Info
                </h3>
                <p className="text-xs md:text-sm text-[#5a413d] font-sans">
                  Click on one of the pathway cards above to highlight particular syllabus streams, or read details below.
                </p>
              </div>

              <div className="space-y-12">
                {streams.map((stream) => (
                  <div 
                    key={stream.id} 
                    id={`standalone-stream-${stream.id}`}
                    className={`p-6 md:p-10 rounded-2xl border transition-all duration-300 ${
                      selectedStreamId === stream.id 
                        ? 'bg-zinc-50/80 border-[#ffe088] shadow-md ring-1 ring-[#ffe088]' 
                        : 'bg-white border-[#e2bfb9]/40 hover:border-[#ffe088]/60'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row gap-8 justify-between">
                      {/* Left Block */}
                      <div className="lg:w-1/2">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="p-2 bg-[#570000]/10 rounded-lg">
                            {getIcon(stream.id)}
                          </span>
                          <div>
                            <h4 className="font-display text-xl md:text-2xl font-bold text-[#570000]">
                              {stream.name}
                            </h4>
                            <p className="text-xs text-[#735c00] font-semibold tracking-wider font-sans uppercase">
                              {stream.grades}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm md:text-base text-[#5a413d] mb-6 leading-relaxed font-sans">
                          Our curriculum is structured around high academic achievements, absolute discipline, and nurturing future leaders. It follows the guidelines set forth by the Ministry of Education, Sri Lanka, enriched with leadership initiatives.
                        </p>

                        <div className="grid grid-cols-2 gap-4" id={`stream-meta-${stream.id}`}>
                          <div className="bg-white p-3.5 rounded-lg border border-zinc-100">
                            <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider font-sans block">
                              Duration
                            </span>
                            <span className="text-sm font-bold text-zinc-800 font-sans flex items-center gap-1.5 mt-0.5">
                              <Calendar className="h-4 w-4 text-[#735c00]" />
                              {stream.duration}
                            </span>
                          </div>
                          <div className="bg-white p-3.5 rounded-lg border border-zinc-100">
                            <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider font-sans block">
                              National Evaluation
                            </span>
                            <span className="text-sm font-bold text-zinc-800 font-sans flex items-center gap-1.5 mt-0.5">
                              <Award className="h-4 w-4 text-[#570000]" />
                              {stream.examType}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Block - Subject List */}
                      <div className="lg:w-1/2 bg-white p-6 rounded-xl border border-[#e2bfb9]/30 shadow-inner">
                        <div className="flex items-center gap-2 mb-4">
                          <BookMarked className="h-5 w-5 text-[#570000]" />
                          <h5 className="font-display font-bold text-zinc-800 text-lg">
                            Core Subjects & Electives
                          </h5>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id={`stream-subjects-${stream.id}`}>
                          {stream.subjects.map((sub, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-2 text-xs md:text-sm text-[#5a413d] font-sans">
                              <CheckCircle2 className="h-4.5 w-4.5 text-[#735c00] shrink-0 mt-0.5" />
                              <span>{sub}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 pt-4 border-t border-zinc-50 text-center">
                          <span className="text-xs text-zinc-400 italic">
                            Detailed syllabus is authorized by the National Institute of Education, Sri Lanka.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
