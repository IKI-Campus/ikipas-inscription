import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Activity, 
  Zap, 
  TrendingUp, 
  BarChart3, 
  Compass, 
  BookOpen, 
  Palette,
  CheckCircle2, 
  GraduationCap, 
  Clock, 
  Sparkles,
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { ACADEMIC_STREAMS } from '../data/orientationData';
import { AcademicStream } from '../types';

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  Activity,
  Zap,
  TrendingUp,
  BarChart3,
  Compass,
  BookOpen,
  Palette,
};

export const AcademicStreamsExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStream, setSelectedStream] = useState<AcademicStream>(ACADEMIC_STREAMS[0]);

  const categories = [
    { id: 'all', label: 'Toutes les filières' },
    { id: 'technology', label: 'Technologies & Ingénierie' },
    { id: 'sciences', label: 'Sciences & Santé' },
    { id: 'economics', label: 'Économie & Gestion' },
    { id: 'arts', label: 'Arts & Architecture' },
    { id: 'humanities', label: 'Droit & Sciences Humaines' },
  ];

  const filteredStreams = selectedCategory === 'all'
    ? ACADEMIC_STREAMS
    : ACADEMIC_STREAMS.filter((s) => s.category === selectedCategory);

  const SelectedIcon = iconMap[selectedStream.iconName] || GraduationCap;

  return (
    <section
      id="academic-corridor-section"
      className="relative bg-[#F5F2EB] dark:bg-[#162215] text-[#243324] dark:text-[#F4EFE6] py-20 sm:py-28 px-4 sm:px-8 lg:px-12 transition-colors duration-400"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#243324]/10 dark:border-white/10">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B4D36]/10 dark:bg-[#4A6D47]/20 text-[#3B4D36] dark:text-[#A3B59E] text-xs font-semibold tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Guide des Filières & Cursus Académiques</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl text-[#1F2B1D] dark:text-[#F4EFE6] font-bold">
              Explorez les filières et les clés de réussite
            </h2>
            <p className="text-sm sm:text-base text-[#4A5D44] dark:text-[#CBD7C7] font-light leading-relaxed">
              Analyse approfondie de chaque cursus universitaire, compétences clés pour réussir, taux d'insertion sur le marché et établissements de référence.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 justify-start md:justify-end">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#3B4D36] dark:bg-[#4A6D47] text-white shadow-sm'
                    : 'bg-white dark:bg-[#1F2B1D] text-[#4A5D44] dark:text-[#A3B59E] hover:bg-[#EAE4D7] dark:hover:bg-[#283826] border border-[#243324]/10 dark:border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: List of Streams */}
          <div className="lg:col-span-5 space-y-3 max-h-[720px] overflow-y-auto pr-1 select-none">
            {filteredStreams.map((stream) => {
              const IconComp = iconMap[stream.iconName] || GraduationCap;
              const isSelected = selectedStream.id === stream.id;

              return (
                <motion.div
                  key={stream.id}
                  onClick={() => {
                    setSelectedStream(stream);
                    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                      const el = document.getElementById('stream-detail-card');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }
                  }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-left flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-white dark:bg-[#20301F] border-[#3B4D36] dark:border-[#5A8756] shadow-md ring-1 ring-[#3B4D36]/20'
                      : 'bg-white/60 dark:bg-[#1A2619]/60 border-[#243324]/10 dark:border-white/10 hover:bg-white dark:hover:bg-[#20301F]'
                  }`}
                >
                  <div className="flex items-center gap-3.5 flex-1">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#3B4D36] text-white'
                          : 'bg-[#3B4D36]/10 text-[#3B4D36] dark:bg-white/10 dark:text-[#A3B59E]'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-[#1F2B1D] dark:text-[#F4EFE6]">
                        {stream.name}
                      </h4>
                      <p className="text-xs text-[#657351] dark:text-[#A3B59E]">
                        {stream.categoryLabel}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-[#3B4D36]/10 dark:bg-white/10 text-xs font-bold text-[#3B4D36] dark:text-[#CBD7C7]">
                      {stream.employmentRate}% insertion
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Detailed Card with Editorial Style */}
          <div id="stream-detail-card" className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedStream.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-[2.5rem] bg-white dark:bg-[#1E2C1D] border border-[#243324]/10 dark:border-white/10 p-6 sm:p-8 lg:p-10 shadow-xl space-y-8 text-left"
              >
                {/* Header & Badges */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#243324]/10 dark:border-white/10 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#3B4D36] dark:bg-[#4A6D47] text-white flex items-center justify-center shadow-md">
                      <SelectedIcon className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#657351] dark:text-[#A3B59E] uppercase tracking-wider block">
                        {selectedStream.categoryLabel}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl text-[#1F2B1D] dark:text-[#F4EFE6] font-bold">
                        {selectedStream.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2E6B38]/10 text-[#2E6B38] dark:text-[#78C986] text-xs font-bold">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>Insertion : {selectedStream.employmentRate}%</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#657351]/10 text-[#657351] dark:text-[#CBD7C7] text-xs font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{selectedStream.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#3C4E3A] dark:text-[#D5E2D2] leading-relaxed font-light">
                  {selectedStream.description}
                </p>

                {/* Key Skills & Career Prospects */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Skills */}
                  <div className="space-y-3 bg-[#FBF9F5] dark:bg-[#162215] p-5 rounded-2xl border border-[#243324]/5 dark:border-white/5">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#3B4D36] dark:text-[#A3B59E] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>Compétences & Clés du succès</span>
                    </h5>
                    <ul className="space-y-2">
                      {selectedStream.keySkills.map((skill, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#4A5D44] dark:text-[#CBD7C7]">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Career Prospects */}
                  <div className="space-y-3 bg-[#FBF9F5] dark:bg-[#162215] p-5 rounded-2xl border border-[#243324]/5 dark:border-white/5">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#3B4D36] dark:text-[#A3B59E] flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4" />
                      <span>Débouchés & Métiers d'avenir</span>
                    </h5>
                    <ul className="space-y-2">
                      {selectedStream.careerProspects.map((career, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#4A5D44] dark:text-[#CBD7C7]">
                          <ArrowRight className="w-4 h-4 text-[#3B4D36] dark:text-[#A3B59E] shrink-0" />
                          <span>{career}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Top Institutes and Starting Salary */}
                <div className="space-y-4 pt-4 border-t border-[#243324]/10 dark:border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
                    <span className="font-semibold text-[#1F2B1D] dark:text-[#F4EFE6]">Salaire moyen à l'embauche :</span>
                    <span className="font-bold text-[#2E6B38] dark:text-[#78C986] bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-lg">
                      {selectedStream.averageStartingSalary}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-[#657351] dark:text-[#A3B59E] block">
                      Établissements & Grandes Écoles de référence :
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedStream.topInstitutes.map((inst, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-xl bg-[#F5F2EB] dark:bg-[#283826] text-[#243324] dark:text-[#F4EFE6] text-xs font-medium border border-[#243324]/10 dark:border-white/10"
                        >
                          {inst}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
