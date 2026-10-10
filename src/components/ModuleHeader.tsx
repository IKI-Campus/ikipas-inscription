import React from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { useNavigation, TabId, TABS } from '../context/NavigationContext';

interface ModuleHeaderProps {
  tabId: TabId;
  title: string;
  badge: string;
  description: string;
}

export const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  tabId,
  title,
  badge,
  description,
}) => {
  const { setActiveTab } = useNavigation();

  return (
    <div className="pt-20 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-[#ECE7DC] to-[#F5F2EB] dark:from-[#0E150D] dark:to-[#162215] border-b border-[#243324]/10 dark:border-white/10 transition-colors duration-400">
      <div className="max-w-6xl mx-auto space-y-3 sm:space-y-4">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-[#657351] dark:text-[#A3B59E]">
          <button
            type="button"
            onClick={() => setActiveTab('accueil')}
            className="hover:text-[#1F2B1D] dark:hover:text-[#F4EFE6] transition-colors cursor-pointer"
          >
            Accueil
          </button>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          <span className="font-semibold text-[#1F2B1D] dark:text-[#F4EFE6]">
            {TABS.find((t) => t.id === tabId)?.label}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-[#3B4D36]/10 dark:bg-[#4A6D47]/20 text-[#3B4D36] dark:text-[#A3B59E] text-xs font-bold tracking-wider">
              {badge}
            </span>
            <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[#1F2B1D] dark:text-[#F4EFE6] leading-tight">
              {title}
            </h1>
            <p className="text-xs sm:text-base text-[#4A5D44] dark:text-[#CBD7C7] font-light leading-relaxed">
              {description}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('accueil')}
            className="self-start md:self-auto flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#243324]/15 dark:border-white/15 bg-white dark:bg-[#1F2B1D] text-xs font-semibold text-[#1F2B1D] dark:text-[#F4EFE6] hover:bg-[#F5F2EB] dark:hover:bg-[#2A3B29] transition-colors cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour à l'accueil</span>
          </button>
        </div>
      </div>
    </div>
  );
};
