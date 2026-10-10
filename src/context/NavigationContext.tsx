import React, { createContext, useContext, useState, useEffect } from 'react';

export type TabId = 'accueil' | 'candidature' | 'contact' | 'filieres' | 'simulateur' | 'metiers' | 'accompagnement';

export interface TabConfig {
  id: TabId;
  label: string;
  badge?: string;
  shortDesc: string;
}

export const TABS: TabConfig[] = [
  { id: 'accueil', label: 'Vue d\'ensemble', shortDesc: 'Rapport général & étapes clés' },
  { id: 'candidature', label: 'Fiche & Candidature', badge: 'Officiel', shortDesc: 'Fiche d\'informations et choix d\'école en PDF' },
  { id: 'contact', label: 'Conseillers & Contact', badge: 'WhatsApp', shortDesc: 'Pr. Saad, Pr. Mehdi, Samir (Tanger / Fès)' },
  { id: 'filieres', label: 'Filières & Cursus', badge: '8 domaines', shortDesc: 'Guide des grandes écoles et universités' },
  { id: 'simulateur', label: 'Simulateur Test', badge: 'Interactif', shortDesc: 'Test d\'affinités & scoring en temps réel' },
  { id: 'metiers', label: 'Métiers 2030', badge: 'Marché', shortDesc: 'Secteurs porteurs & croissance' },
  { id: 'accompagnement', label: 'Bourses & Conseils', badge: '18.5M DH', shortDesc: 'Coaching, bourses et témoignages' },
];

interface NavigationContextType {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  nextTab: () => void;
  prevTab: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<TabId>('accueil');

  const setActiveTab = (tab: TabId) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentIndex = TABS.findIndex((t) => t.id === activeTab);

  const nextTab = () => {
    const nextIndex = (currentIndex + 1) % TABS.length;
    setActiveTab(TABS[nextIndex].id);
  };

  const prevTab = () => {
    const prevIndex = (currentIndex - 1 + TABS.length) % TABS.length;
    setActiveTab(TABS[prevIndex].id);
  };

  return (
    <NavigationContext.Provider value={{ activeTab, setActiveTab, nextTab, prevTab }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
