import React, { useState } from 'react';
import { Search, Filter, Calendar, ExternalLink, X, BookOpen, Clock, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NewsArticle } from '../types';

export default function NewsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Events' | 'Culture' | 'Arts'>('All');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  const articles: NewsArticle[] = [
    {
      id: 'sports-meet-2024',
      title: 'Annual Inter-House Sports Meet 2024',
      category: 'Events',
      date: 'March 15, 2024',
      description: 'A day of athletic prowess and sportsmanship as the four houses competed for the championship trophy.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOxpnOw8vpyPKsWncZE82ru2C-NXneygjRbZfzuMszMDxZHO5trS8jfU8ovg0eFvefphocEXwsa2bU4u5w39owJU5lIWa-KetN18jvwia-hG-kliX8iJvQCBVVNJeSQt6aijqAkx2GMTGBjthOKHjfVZgsMILwRPgSGE6CZji1wZgwh8l4FLuFYyDMLuvfBUu3Cs-XcC6TZ4lk2WN2svIZzrEYUwo2vUn94BNVOFVY5Pc66wPHC__T2FfgxCyH-GjT_ARD-LpdnnFW',
      content: 'The Annual Inter-House Sports Meet 2024 of Walpola Sri Rathanasara school was held in grand style at the school grounds. The event was graced by eminent sports personalities and administrative officers. Students from all four houses (Rathanasara, Jayasinghe, Wijewardene, and Gamini) participated in track and field athletic events with high spirit and determination. Wijewardene House clinched the overall championship trophy with remarkable performances in middle-distance running, relays, and field events. The main highlight was the colorful march past and the band display which displayed absolute discipline.',
      readMoreUrl: 'https://www.facebook.com/share/v/19Lr3eBxoK/'
    },
    {
      id: 'vesak-2024',
      title: 'Vesak Festival Celebrations',
      category: 'Culture',
      date: 'May 22, 2024',
      description: 'The school community came together to celebrate light and wisdom with lantern making and dharma sermons.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuPJdbjvtLm8NmPMfHZIamEF3rdpnAltQZmjtVULbhsI_76JIen4-6bMRM8IV-dZ64ypxmafwi1fBg84NKG23-8f2IF6nawwlV3yUAVCpbDKTQIL2-ZBspvk1ploBFeQ8OY7AUTmCeI0SyVwJ1x9kXtK12W4OYbmNU4m_VvOPM4bp93VEAa4G49HPr_dZX8PrL2ZRKpDqiQt5xHvHWd_-wcVMxa4x9n2VPkfW2ll9SRbRRlahNi1A2iYRUAHyyPGcCWgMcyE7Tmb11',
      content: 'In commemoration of the birth, enlightenment, and passing of Lord Buddha, Walpola Sri Rathanasara school organized a series of religious activities. Under the guidance of our venerable school advisors, students constructed magnificent bamboo-structured Vesak lanterns that illuminated the entire school premises at dusk. A peaceful "Amisa Pooja" was held in the morning, followed by a profound Dharma Sermon delivered by a resident monk from the local temple. Parents and old boys of the school set up an ice-cream and herbal drink "Dansala" for the local community, promoting the spirit of giving and kindness.',
      readMoreUrl: 'https://www.facebook.com/share/p/1Be3qpYN8o/'
    },
    {
      id: 'concert-harmonics-2024',
      title: "Western Band Concert: 'Harmonics'",
      category: 'Arts',
      date: 'June 10, 2024',
      description: 'Our award-winning Western Band delivered an unforgettable performance at the annual musical extravaganza.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeEYxR34f2Dn2zzBgLvBMmfUyXn5ZfXsU8YQ5s2qBnV2PlGKn2EOzkLV9fEAnzV3My7HaB8ntz1j9VpDlX7pJ0yedhVYvtrviEj1_BqdbUnBoSnW-_SXBthx3ftSurCOHxmz6GdwmiRlgI7Tkbn77kIEVpMoauWpcrUBLj09d39cuPDjgatVwqCYqgOSkhFHqcwRsOmyoIhCERIkER5leYGNlagXsbcAmkR99ELvmQw7QXj4xoLZQgRdjCxf7kT7ehUWRI3tzZ1UuO',
      content: "'Harmonics 2024', the annual musical concert organized by the Western Band of Walpola Sri Rathanasara school, took place at the Galle Municipal Auditorium. The band showcased their exceptional skill, playing classic symphonies, traditional Sri Lankan orchestral pieces, and contemporary scores. The disciplined drill, perfect pitch, and beautiful synchronization of the brass, woodwind, and percussion sections captivated the audience. Distinguished alumni, musicians, and directors of education praised the band's standard, marking them as one of the elite school bands in the Southern Province."
    }
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getBadgeStyle = (category: string) => {
    switch (category) {
      case 'Events': return 'bg-[#570000] text-white';
      case 'Culture': return 'bg-[#735c00] text-[#ffe088]';
      case 'Arts': return 'bg-[#800000] text-white';
      default: return 'bg-zinc-100 text-zinc-800';
    }
  };

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto" id="news-section">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <span className="text-[#735c00] font-semibold text-xs md:text-sm uppercase tracking-widest mb-2 inline-block font-sans">
            School Life
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#570000]">
            School Life &amp; News
          </h2>
          <p className="text-sm md:text-base text-[#5a413d] font-sans mt-2">
            Stay updated with the latest events, athletic meets, and achievements of our students.
          </p>
        </div>

        {/* Dynamic Filters Interface */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto" id="news-category-filters">
          {(['All', 'Events', 'Culture', 'Arts'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-md transition-all cursor-pointer ${
                selectedCategory === cat 
                  ? 'bg-[#570000] text-white shadow-sm' 
                  : 'bg-zinc-100 hover:bg-zinc-200 text-[#5a413d]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-10 max-w-md" id="news-search-container">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search news, events, announcements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm font-sans bg-white border border-[#e2bfb9]/70 rounded-lg focus:outline-none focus:border-[#570000] focus:ring-1 focus:ring-[#570000] transition-all placeholder-zinc-400"
          />
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="news-grid">
        {filteredArticles.map((article, idx) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group overflow-hidden rounded-xl bg-white border border-[#e2bfb9]/50 shadow-sm hover:shadow-md hover:border-[#ffe088]/60 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Card Image */}
              <div className="aspect-video relative overflow-hidden bg-zinc-100">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt={article.title}
                  src={article.imageUrl}
                />
                {/* News Category Chip */}
                <div className={`absolute top-3 right-3 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded font-sans shadow-sm ${getBadgeStyle(article.category)}`}>
                  {article.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="text-xs font-semibold text-[#735c00] tracking-wider mb-2 font-sans flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#ffe088]" />
                  {article.date}
                </div>
                <h4 className="font-display font-bold text-lg text-zinc-950 mb-3 group-hover:text-[#570000] transition-colors leading-snug">
                  {article.readMoreUrl ? (
                    <a 
                      href={article.readMoreUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:underline inline-flex items-center gap-1.5"
                    >
                      {article.title}
                      <ExternalLink className="h-4 w-4 text-zinc-400 shrink-0 inline-block" />
                    </a>
                  ) : (
                    article.title
                  )}
                </h4>
                <p className="text-sm text-[#5a413d] line-clamp-3 leading-relaxed font-sans">
                  {article.description}
                </p>
              </div>
            </div>

            {/* Read More Link */}
            <div className="px-6 pb-6 pt-2 flex items-center justify-between">
              <button
                onClick={() => setActiveArticle(article)}
                className="text-[#570000] font-bold text-sm inline-flex items-center gap-1.5 hover:gap-2.5 transition-all cursor-pointer font-sans"
              >
                Read More
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
              {article.readMoreUrl && (
                <a 
                  href={article.readMoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#735c00] hover:text-[#570000] font-bold text-xs inline-flex items-center gap-1 hover:underline font-sans transition-all"
                >
                  Watch Video
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </motion.div>
        ))}

        {filteredArticles.length === 0 && (
          <div className="col-span-full text-center py-12 bg-white rounded-xl border border-[#e2bfb9]/30" id="news-empty-state">
            <BookOpen className="h-10 w-10 text-zinc-300 mx-auto mb-3" />
            <p className="text-[#5a413d] font-medium font-sans">No news articles found matching your criteria.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="text-[#570000] font-bold text-xs mt-2 underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Detailed Reading Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div 
            className="fixed inset-0 bg-[#1a1c1c]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 md:p-6"
            onClick={() => setActiveArticle(null)}
            id="news-modal"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl border border-[#e2bfb9]/40 flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Image banner */}
              <div className="relative aspect-video md:aspect-[21/9] bg-zinc-100 shrink-0">
                <img 
                  src={activeArticle.imageUrl} 
                  alt={activeArticle.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <button 
                  onClick={() => setActiveArticle(null)}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 backdrop-blur-xs transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-sans ${getBadgeStyle(activeArticle.category)}`}>
                      {activeArticle.category}
                    </span>
                    <span className="text-xs text-zinc-300 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {activeArticle.date}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl md:text-2xl drop-shadow-sm">
                    {activeArticle.readMoreUrl ? (
                      <a 
                        href={activeArticle.readMoreUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:underline hover:text-[#ffe088] inline-flex items-center gap-2"
                      >
                        {activeArticle.title}
                        <ExternalLink className="h-5 w-5 shrink-0 inline-block" />
                      </a>
                    ) : (
                      activeArticle.title
                    )}
                  </h3>
                </div>
              </div>

              {/* Scrollable Content Body */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-[#5a413d] font-sans text-sm md:text-base leading-relaxed">
                <p className="font-semibold text-zinc-900 border-l-4 border-[#570000] pl-4 italic">
                  {activeArticle.description}
                </p>
                <div className="text-zinc-700 whitespace-pre-line space-y-4">
                  {activeArticle.content}
                </div>

                {activeArticle.readMoreUrl && (
                  <div className="bg-[#570000]/5 border border-[#ffe088]/40 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl shrink-0">🎬</span>
                      <div className="text-left">
                        <p className="font-bold text-[#570000] text-sm font-display">Watch the Sports Meet coverage</p>
                        <p className="text-xs text-[#5a413d] font-sans mt-0.5">Click the link to watch the full event video on Facebook.</p>
                      </div>
                    </div>
                    <a 
                      href={activeArticle.readMoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#570000] hover:bg-[#800000] text-white px-5 py-2.5 rounded-lg font-bold text-xs font-sans transition-all shrink-0 inline-flex items-center gap-1.5 shadow-sm"
                    >
                      Watch Video <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                )}
                
                {/* Meta details */}
                <div className="border-t border-zinc-100 pt-6 mt-8 flex flex-wrap gap-4 text-xs text-zinc-400 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Tag className="h-4 w-4 text-[#735c00]" />
                    <span>Topic: Walpola Sri Rathanasara school {activeArticle.category}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-zinc-300" />
                    <span>Published: {activeArticle.date}</span>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-zinc-50 px-6 py-4 border-t border-zinc-100 flex justify-between items-center shrink-0">
                <span className="text-xs font-semibold text-[#735c00] uppercase tracking-wider">
                  Official School Update
                </span>
                <button 
                  onClick={() => setActiveArticle(null)}
                  className="bg-[#570000] hover:bg-[#800000] text-white px-5 py-2 rounded-md font-bold text-xs font-sans cursor-pointer transition-colors"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
