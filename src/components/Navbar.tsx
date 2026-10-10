import React, { useState } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';
import { 
  Menu, 
  Sun, 
  Moon, 
  Share2, 
  Compass, 
  BookOpen, 
  Sparkles, 
  TrendingUp, 
  Award, 
  Home,
  FileText,
  MessageCircle 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigation, TABS, TabId } from '../context/NavigationContext';
import { ShareModal } from './ShareModal';
import { NavigationDrawer } from './NavigationDrawer';
import { OfficialLogo } from './OfficialLogo';

const tabIconMap: Record<TabId, React.ElementType> = {
  accueil: Home,
  candidature: FileText,
  contact: MessageCircle,
  filieres: BookOpen,
  simulateur: Sparkles,
  metiers: TrendingUp,
  accompagnement: Award,
};

export const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const { isDark, toggleTheme } = useTheme();
  const { activeTab, setActiveTab } = useNavigation();
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const threshold = typeof window !== 'undefined' ? window.innerHeight * 0.45 : 350;
    setIsScrolledPastHero(latest >= threshold);
  });

  const isHeroMode = activeTab === 'accueil' && !isScrolledPastHero;

  const headerBgClass = isHeroMode
    ? 'bg-transparent border-transparent'
    : 'bg-[#FBF9F5]/92 dark:bg-[#131D12]/92 backdrop-blur-md border-b border-[#243324]/10 dark:border-white/10 shadow-xs';

  const brandTextColor = isHeroMode
    ? 'text-[#F4EFE6] drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]'
    : 'text-[#1F2B1D] dark:text-[#F4EFE6]';

  const actionBtnClasses = isHeroMode
    ? 'bg-black/25 border-white/30 text-white hover:bg-black/40'
    : 'bg-white dark:bg-[#1F2B1D] border-[#243324]/15 dark:border-white/15 text-[#1F2B1D] dark:text-[#F4EFE6] hover:bg-[#F5F2EB] dark:hover:bg-[#2A3B29] shadow-xs';

  const activeTabConfig = TABS.find((t) => t.id === activeTab) || TABS[0];
  const ActiveIcon = tabIconMap[activeTab];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 py-2.5 sm:py-3 px-3 sm:px-6 lg:px-10 transition-all duration-300 ${headerBgClass}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left: The 3 lines (Hamburger Menu Button) & Brand */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* The 3 Lines Hamburger Menu Button (ثلاثة الشريطات) */}
            <button
              id="hamburger-menu-btn"
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Ouvrir le menu de navigation"
              title="Menu des rubriques"
              className={`flex items-center gap-2 px-3 py-2 rounded-2xl border transition-all duration-200 cursor-pointer active:scale-95 shadow-xs ${
                isHeroMode
                  ? 'bg-white/15 hover:bg-white/25 border-white/30 text-white backdrop-blur-md'
                  : 'bg-white dark:bg-[#1E2B1D] hover:bg-[#F2ECE0] dark:hover:bg-[#283927] border-[#243324]/15 dark:border-white/15 text-[#1F2B1D] dark:text-[#F4EFE6]'
              }`}
            >
              {/* 3 Horizontal Lines Icon */}
              <Menu className="w-5 h-5 text-[#3B4D36] dark:text-[#CBD7C7]" strokeWidth={2.5} />
              <span className="text-xs font-bold hidden xs:inline">Menu</span>
            </button>

            {/* Logo / Brand Name: IKIPAS */}
            <button
              type="button"
              onClick={() => setActiveTab('accueil')}
              className="flex items-center gap-2.5 group cursor-pointer text-left"
            >
              <div className="w-10 h-10 rounded-2xl bg-white p-1 border border-[#243324]/15 dark:border-white/15 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
                <OfficialLogo size={34} />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className={`text-base sm:text-lg font-black tracking-wider transition-colors ${brandTextColor}`}>
                    IKIPAS
                  </span>
                </div>
                <span className="text-[9.5px] text-[#657351] dark:text-[#A3B59E] font-medium hidden sm:inline leading-none">
                  Le premier pas vers votre passion
                </span>
              </div>
            </button>
          </div>

          {/* Center (Desktop only): Quick navigation shortcuts */}
          <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-md">
            {TABS.map((tab) => {
              const Icon = tabIconMap[tab.id];
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#E5DCC5] dark:bg-[#D4E8CF] text-[#1F2B1D] dark:text-[#131D12] shadow-xs font-bold'
                      : isHeroMode
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-[#4A5D44] dark:text-[#CBD7C7] hover:text-[#1F2B1D] dark:hover:text-[#F4EFE6] hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right: Share & Sun/Moon Dark Mode Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Share Button */}
            <button
              id="navbar-share-btn"
              type="button"
              onClick={() => setIsShareOpen(true)}
              aria-label="Partager le guide"
              title="Partager le guide d'orientation"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl border text-xs font-medium transition-all duration-200 cursor-pointer backdrop-blur-md ${actionBtnClasses}`}
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden md:inline">Partager</span>
            </button>

            {/* Sun / Moon Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Passer au mode clair' : 'Passer au mode sombre'}
              title={isDark ? 'Mode clair' : 'Mode sombre'}
              className={`p-2 rounded-2xl border transition-colors duration-200 cursor-pointer flex items-center justify-center ${actionBtnClasses}`}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-[#3B4D36]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hamburger Navigation Drawer (3 Lines Menu) */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpenShare={() => setIsShareOpen(true)}
      />

      {/* Share Modal */}
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
    </>
  );
};
