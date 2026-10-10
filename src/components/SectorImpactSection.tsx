import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp } from 'lucide-react';
import { SECTOR_DEMANDS } from '../data/orientationData';

export const SectorImpactSection: React.FC = () => {
  const [selectedSectorName, setSelectedSectorName] = useState<string>(SECTOR_DEMANDS[0].sector);
  const selectedDemand = SECTOR_DEMANDS.find((s) => s.sector === selectedSectorName) || SECTOR_DEMANDS[0];

  return (
    <section className="relative min-h-screen py-24 px-4 sm:px-8 lg:px-12 flex flex-col justify-center border-t border-[#243324]/10 dark:border-white/10 bg-[#F5F2EB] dark:bg-[#182417] text-[#243324] dark:text-[#F4EFE6] transition-colors duration-400">
      <div className="max-w-6xl mx-auto w-full space-y-12">
        {/* Headline */}
        <div className="space-y-4 max-w-4xl text-left">
          <p className="text-sm font-semibold tracking-wide text-[#657351] dark:text-[#A3B59E]">
            Marché de l'Emploi & Filières d'Avenir
          </p>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-[#1F2B1D] dark:text-[#F4EFE6] font-bold leading-[1.1] tracking-tight">
            Une orientation stratégique alignée sur les métiers de 2030
          </h2>
          <p className="text-lg sm:text-xl text-[#4A5D44] dark:text-[#CBD7C7] font-light leading-relaxed">
            La transition numérique, les technologies vertes et la modernisation des soins de santé ouvrent des milliers d'opportunités pour les profils qualifiés et passionnés.
          </p>
        </div>

        {/* Sector Navigation Strip */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-start">
          {SECTOR_DEMANDS.map((item) => {
            const isSelected = selectedSectorName === item.sector;
            return (
              <button
                key={item.sector}
                onClick={() => setSelectedSectorName(item.sector)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#1F2B1D] dark:bg-[#384E36] text-white dark:text-[#F4EFE6] shadow-sm'
                    : 'bg-white dark:bg-[#263925] text-[#3B4D36] dark:text-[#E2EBE0] hover:bg-white/80 dark:hover:bg-[#30482F] border border-[#243324]/10 dark:border-white/12'
                }`}
              >
                {item.sector}
              </button>
            );
          })}
        </div>

        {/* Detailed Sector Spotlight Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDemand.sector}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className="p-8 sm:p-12 rounded-[2.5rem] bg-white dark:bg-[#243723] border border-[#243324]/10 dark:border-white/12 shadow-lg space-y-8 transition-colors duration-400 text-left"
          >
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-[#243324]/10 dark:border-white/10 pb-6">
              <div>
                <span className="text-xs font-semibold text-[#657351] dark:text-[#A3B59E] uppercase tracking-wider block mb-1">
                  Secteur Stratégique
                </span>
                <h3 className="font-display text-3xl sm:text-5xl text-[#1F2B1D] dark:text-[#F4EFE6] font-bold">
                  {selectedDemand.sector}
                </h3>
              </div>

              <div className="flex items-center gap-3 self-start md:self-auto">
                <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+{selectedDemand.demandGrowthPct}% croissance annuelle</span>
                </div>
              </div>
            </div>

            <p className="text-base sm:text-lg text-[#4A5D44] dark:text-[#CBD7C7] font-light leading-relaxed max-w-4xl">
              {selectedDemand.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-[#FBF9F5] dark:bg-[#1C2C1B] border border-[#243324]/5 dark:border-white/5 space-y-2">
                <span className="text-xs font-bold uppercase text-[#3B4D36] dark:text-[#A3B59E] block">
                  Compétences les plus recherchées :
                </span>
                <p className="text-sm text-[#1F2B1D] dark:text-[#F4EFE6] font-medium leading-relaxed">
                  {selectedDemand.primarySkillsNeeded}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FBF9F5] dark:bg-[#1C2C1B] border border-[#243324]/5 dark:border-white/5 space-y-2">
                <span className="text-xs font-bold uppercase text-[#3B4D36] dark:text-[#A3B59E] block">
                  Formations & diplômes recommandés :
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedDemand.topPrograms.map((p, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-white dark:bg-[#283C26] text-xs font-semibold text-[#3B4D36] dark:text-[#D5E2D2] border border-[#243324]/10 dark:border-white/10"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
