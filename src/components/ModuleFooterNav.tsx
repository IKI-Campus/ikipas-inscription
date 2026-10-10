import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigation, TabId, TABS } from '../context/NavigationContext';

interface ModuleFooterNavProps {
  currentTab: TabId;
}

export const ModuleFooterNav: React.FC<ModuleFooterNavProps> = ({ currentTab }) => {
  const { setActiveTab } = useNavigation();
  const currentIndex = TABS.findIndex((t) => t.id === currentTab);
  const prevTab = currentIndex > 0 ? TABS[currentIndex - 1] : null;
  const nextTab = currentIndex < TABS.length - 1 ? TABS[currentIndex + 1] : TABS[0];

  return (
    <div className="py-12 px-4 sm:px-8 lg:px-12 bg-[#FBF9F5] dark:bg-[#131D12] border-t border-[#243324]/10 dark:border-white/10 transition-colors duration-400">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevTab ? (
          <button
            type="button"
            onClick={() => setActiveTab(prevTab.id)}
            className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-2 px-5 py-3 rounded-full border border-[#243324]/15 dark:border-white/15 bg-white dark:bg-[#1E2B1D] text-xs sm:text-sm font-semibold text-[#1F2B1D] dark:text-[#F4EFE6] hover:bg-[#F5F2EB] dark:hover:bg-[#2A3B29] transition-all cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Section précédente : {prevTab.label}</span>
          </button>
        ) : (
          <div />
        )}

        {nextTab && (
          <button
            type="button"
            onClick={() => setActiveTab(nextTab.id)}
            className="w-full sm:w-auto flex items-center justify-center sm:justify-end gap-2 px-6 py-3 rounded-full bg-[#3B4D36] dark:bg-[#4A6D47] text-white text-xs sm:text-sm font-semibold hover:bg-[#2C3B28] dark:hover:bg-[#3D5B3A] transition-all cursor-pointer shadow-md"
          >
            <span>Section suivante : {nextTab.label}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
