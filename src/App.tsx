/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { OverviewSection } from './components/OverviewSection';
import { HomeModulesGrid } from './components/HomeModulesGrid';
import { AcademicStreamsExplorer } from './components/AcademicStreamsExplorer';
import { SectorImpactSection } from './components/SectorImpactSection';
import { RooftopCalculator } from './components/RooftopCalculator';
import { EducationSection } from './components/EducationSection';
import { StormwaterClimateSection } from './components/StormwaterClimateSection';
import { FoodSharingSection } from './components/FoodSharingSection';
import { RoadmapGratitudeSection } from './components/RoadmapGratitudeSection';
import { CandidatureSection } from './components/CandidatureSection';
import { ContactDirectSection } from './components/ContactDirectSection';
import { FloatingWhatsAppWidget } from './components/FloatingWhatsAppWidget';
import { ModuleHeader } from './components/ModuleHeader';
import { ModuleFooterNav } from './components/ModuleFooterNav';
import { AdminPortal } from './components/AdminPortal';

function MainContent() {
  const { scrollYProgress } = useScroll();
  const { activeTab } = useNavigation();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Listen for #admin in URL
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      return hash.includes('admin');
    }
    return false;
  });

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      setIsAdminOpen(hash.includes('admin'));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Optional convenient shortcut: Ctrl + Shift + A
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        window.location.hash = '#admin';
      }
    };

    window.addEventListener('hashchange', handleHash);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
  };

  // If in admin mode, render exclusively the standalone Admin Portal page
  if (isAdminOpen) {
    return <AdminPortal onClose={handleCloseAdmin} />;
  }

  return (
    <div className="relative min-h-screen bg-[#FBF9F5] dark:bg-[#131D12] text-[#243324] dark:text-[#F4EFE6] font-sans antialiased selection:bg-[#E8DCC4] dark:selection:bg-[#384F35] selection:text-[#1F2B1D] dark:selection:text-[#F4EFE6] transition-colors duration-400">
      {/* Top Floating Navigation with Tabs, Theme Toggle & Share */}
      <Navbar />

      {/* Top Reading Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-[#3B4D36] dark:bg-[#4A6D47] origin-left z-50 pointer-events-none transition-colors duration-300"
      />

      {/* Main Modular Views with AnimatePresence */}
      <main className="w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'accueil' && (
            <motion.div
              key="accueil-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <HeroSection />
              <OverviewSection />
              <HomeModulesGrid />
              <RoadmapGratitudeSection />
            </motion.div>
          )}

          {activeTab === 'candidature' && (
            <motion.div
              key="candidature-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <ModuleHeader
                tabId="candidature"
                badge="Document Officiel 2026"
                title="Fiche d'Inscription & Choix d'Établissement"
                description="Remplissez votre fiche personnelle et choisissez votre filière universitaire. Téléchargez votre document officiel conforme au format A4."
              />
              <CandidatureSection />
              <ModuleFooterNav currentTab="candidature" />
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ContactDirectSection />
              <ModuleFooterNav currentTab="contact" />
            </motion.div>
          )}

          {activeTab === 'filieres' && (
            <motion.div
              key="filieres-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <ModuleHeader
                tabId="filieres"
                badge="Guide des Filières"
                title="Grandes Écoles & Cursus Universitaires"
                description="Explorez en détail les 8 grandes spécialités, les compétences requises, les salaires moyens et les écoles de référence."
              />
              <AcademicStreamsExplorer />
              <ModuleFooterNav currentTab="filieres" />
            </motion.div>
          )}

          {activeTab === 'simulateur' && (
            <motion.div
              key="simulateur-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <ModuleHeader
                tabId="simulateur"
                badge="Simulateur Test"
                title="Test d'Affinités & Profil Personnalisé"
                description="Ajustez vos 5 compétences clés pour calculer votre correspondance immédiate avec les filières d'excellence."
              />
              <RooftopCalculator />
              <ModuleFooterNav currentTab="simulateur" />
            </motion.div>
          )}

          {activeTab === 'metiers' && (
            <motion.div
              key="metiers-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <ModuleHeader
                tabId="metiers"
                badge="Marché 2030"
                title="Secteurs Porteurs & Débouchés d'Avenir"
                description="Cartographie des opportunités professionnelles dans l'IA, la transition énergétique, la santé biomédicale et la finance."
              />
              <SectorImpactSection />
              <ModuleFooterNav currentTab="metiers" />
            </motion.div>
          )}

          {activeTab === 'accompagnement' && (
            <motion.div
              key="accompagnement-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <ModuleHeader
                tabId="accompagnement"
                badge="Aides & Coaching"
                title="Bourses d'Études, Conseil & Témoignages"
                description="Accédez aux bourses de mérite, aux ateliers d'orientation personnalisés et aux conseils avisés d'étudiants lauréats."
              />
              <EducationSection />
              <FoodSharingSection />
              <StormwaterClimateSection />
              <ModuleFooterNav currentTab="accompagnement" />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating 1-Click WhatsApp Quick Contact Widget */}
      <FloatingWhatsAppWidget />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <MainContent />
      </NavigationProvider>
    </ThemeProvider>
  );
}
