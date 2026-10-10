import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Home, 
  BookOpen, 
  Sparkles, 
  TrendingUp, 
  Award, 
  Compass, 
  ChevronRight, 
  Sun, 
  Moon, 
  Share2,
  FileText,
  MessageCircle
} from 'lucide-react';
import { useNavigation, TabId } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';
import { OfficialLogo } from './OfficialLogo';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenShare: () => void;
}

interface MenuItem {
  id: TabId;
  label: string;
  badge?: string;
  desc: string;
  icon: React.ElementType;
  accent: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'accueil',
    label: 'Accueil (Vue d\'ensemble)',
    desc: 'Présentation générale, chiffres clés et feuille de route',
    icon: Home,
    accent: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300',
  },
  {
    id: 'candidature',
    label: 'Fiche d\'Inscription & Choix PDF',
    badge: 'Nouveau',
    desc: 'Informations personnelles & choix d\'école à télécharger en PDF',
    icon: FileText,
    accent: 'bg-emerald-600/15 text-emerald-800 dark:text-emerald-300',
  },
  {
    id: 'contact',
    label: 'Contact & Conseillers Référents',
    badge: 'WhatsApp',
    desc: 'Pr. Saad, Pr. Mehdi & Samir · Échange direct & orientation WhatsApp',
    icon: MessageCircle,
    accent: 'bg-emerald-600/20 text-emerald-800 dark:text-emerald-300',
  },
  {
    id: 'filieres',
    label: 'Guide des Filières & Cursus',
    badge: '8 filières',
    desc: 'Grandes écoles, universités, critères & débouchés',
    icon: BookOpen,
    accent: 'bg-teal-500/15 text-teal-800 dark:text-teal-300',
  },
  {
    id: 'simulateur',
    label: 'Simulateur d\'Orientation Test',
    badge: 'Interactif',
    desc: 'Évaluez vos affinités en 5 critères avec score en temps réel',
    icon: Sparkles,
    accent: 'bg-amber-500/15 text-amber-800 dark:text-amber-300',
  },
  {
    id: 'metiers',
    label: 'Marché du Travail & Métiers 2030',
    badge: 'Perspectives',
    desc: 'Secteurs en forte croissance (IA, santé, énergies, finance)',
    icon: TrendingUp,
    accent: 'bg-blue-500/15 text-blue-800 dark:text-blue-300',
  },
  {
    id: 'accompagnement',
    label: 'Bourses, Conseils & Témoignages',
    badge: '18.5M DH',
    desc: 'Coaching individuel, aides financières et lauréats',
    icon: Award,
    accent: 'bg-purple-500/15 text-purple-800 dark:text-purple-300',
  },
];

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  onOpenShare,
}) => {
  const { activeTab, setActiveTab } = useNavigation();
  const { isDark, toggleTheme } = useTheme();

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSelect = (id: TabId) => {
    setActiveTab(id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Drawer Panel: Slide in from the left (mobile & desktop) */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-[88vw] max-w-md h-full bg-[#FBF9F5] dark:bg-[#152214] text-[#243324] dark:text-[#F4EFE6] border-r border-[#243324]/10 dark:border-white/10 shadow-2xl flex flex-col justify-between overflow-hidden z-10"
          >
            {/* Drawer Header */}
            <div className="p-5 sm:p-6 border-b border-[#243324]/10 dark:border-white/10 flex items-center justify-between bg-[#F5F2EB] dark:bg-[#1A2819]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#152214] border border-[#243324]/10 dark:border-white/10 p-1 flex items-center justify-center shadow-xs">
                  <OfficialLogo size={36} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="font-display text-xl font-black text-[#1F2B1D] dark:text-[#F4EFE6] leading-tight tracking-wider">
                      IKIPAS
                    </h2>
                  </div>
                  <p className="text-[11px] text-[#657351] dark:text-[#A3B59E] font-medium">
                    Le premier pas vers votre passion
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer le menu"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15 text-[#243324] dark:text-[#F4EFE6] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Navigation List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2.5">
              <span className="text-[11px] font-bold tracking-wider text-[#657351] dark:text-[#A3B59E] uppercase px-3 block">
                Sections de la plateforme
              </span>

              {MENU_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item.id)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                      isActive
                        ? 'bg-[#3B4D36] dark:bg-[#344E33] border-[#3B4D36] dark:border-[#4A6D47] text-white shadow-md ring-2 ring-[#3B4D36]/20'
                        : 'bg-white dark:bg-[#1A2819] border-[#243324]/10 dark:border-white/10 text-[#1F2B1D] dark:text-[#F4EFE6] hover:bg-[#F2ECE0] dark:hover:bg-[#223321]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : item.accent
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <h3
                            className={`font-semibold text-sm sm:text-base leading-snug truncate ${
                              isActive ? 'text-white' : 'text-[#1F2B1D] dark:text-[#F4EFE6]'
                            }`}
                          >
                            {item.label}
                          </h3>
                          {item.badge && (
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                                isActive
                                  ? 'bg-white/25 text-white'
                                  : 'bg-[#3B4D36]/10 dark:bg-white/10 text-[#3B4D36] dark:text-[#CBD7C7]'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-xs truncate font-light mt-0.5 ${
                            isActive ? 'text-white/80' : 'text-[#657351] dark:text-[#A3B59E]'
                          }`}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isActive ? 'text-white translate-x-0.5' : 'text-[#657351] dark:text-[#A3B59E]'
                      }`}
                    />
                  </motion.button>
                );
              })}
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 sm:p-5 border-t border-[#243324]/10 dark:border-white/10 bg-[#F5F2EB] dark:bg-[#1A2819] space-y-3">
              <div className="flex items-center gap-2">
                {/* Theme Toggle Button */}
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-[#243324]/10 dark:border-white/10 bg-white dark:bg-[#152214] hover:bg-[#EAE4D7] dark:hover:bg-[#20301F] text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {isDark ? (
                    <>
                      <Sun className="w-4 h-4 text-amber-300" />
                      <span>Mode Clair</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 text-[#3B4D36]" />
                      <span>Mode Sombre</span>
                    </>
                  )}
                </button>

                {/* Share Button */}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenShare();
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-[#3B4D36]/20 bg-[#3B4D36] dark:bg-[#4A6D47] text-white hover:bg-[#2C3B28] text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Partager</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-[#657351] dark:text-[#A3B59E] font-light">
                Plateforme Nationale d'Orientation Scolaire & Universitaire 2026
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
