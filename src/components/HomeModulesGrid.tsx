import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Sparkles, TrendingUp, Award, ArrowRight, LayoutGrid, FileText, MessageCircle } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export const HomeModulesGrid: React.FC = () => {
  const { setActiveTab } = useNavigation();

  const modules = [
    {
      id: 'contact' as const,
      badge: 'WhatsApp Direct • Conseillers Dédiés',
      title: 'Contact Direct avec nos Conseillers (Pr. Saad, Mehdi & Samir)',
      description: 'Posez vos questions ou envoyez votre fiche d\'orientation directement sur WhatsApp à nos professeurs et experts. Rendez-vous également à Tanger et Fès.',
      stat: 'Pr. Saad • Pr. Mehdi • Samir',
      icon: MessageCircle,
      btnLabel: 'Échanger sur WhatsApp',
      color: 'from-emerald-600/15 to-teal-600/15 dark:from-emerald-950/50 dark:to-teal-950/40',
      badgeColor: 'bg-emerald-700/15 text-emerald-800 dark:text-emerald-300 font-bold',
    },
    {
      id: 'candidature' as const,
      badge: 'Nouveau • Dossier Officiel',
      title: 'Fiche d\'Inscription & Choix d\'Établissement (PDF)',
      description: 'Remplissez votre fiche personnelle conforme, sélectionnez votre école supérieure et téléchargez directement votre document officiel en PDF.',
      stat: 'Téléchargement PDF A4',
      icon: FileText,
      btnLabel: 'Remplir ma candidature',
      color: 'from-emerald-600/10 to-green-600/10 dark:from-emerald-950/40 dark:to-green-950/30',
      badgeColor: 'bg-emerald-700/15 text-emerald-800 dark:text-emerald-300',
    },
    {
      id: 'filieres' as const,
      badge: 'Filières & Cursus',
      title: 'Guide des Filières & Grandes Écoles',
      description: 'Découvrez en détail les filières d\'ingénierie, médecine, finance, architecture et droit avec leurs critères d\'admission et salaires.',
      stat: '8 grandes filières',
      icon: BookOpen,
      btnLabel: 'Explorer les filières',
      color: 'from-emerald-500/10 to-teal-500/10 dark:from-emerald-950/40 dark:to-teal-950/30',
      badgeColor: 'bg-emerald-600/10 text-emerald-800 dark:text-emerald-300',
    },
    {
      id: 'simulateur' as const,
      badge: 'Simulateur Interactif',
      title: 'Test d\'Affinités & Scoring Personnalisé',
      description: 'Ajustez 5 curseurs de compétences (logique, sciences, langues, créativité, leadership) pour calculer votre compatibilité immédiate.',
      stat: 'Scoring instantané',
      icon: Sparkles,
      btnLabel: 'Passer le simulateur',
      color: 'from-amber-500/10 to-orange-500/10 dark:from-amber-950/40 dark:to-orange-950/30',
      badgeColor: 'bg-amber-600/10 text-amber-800 dark:text-amber-300',
    },
    {
      id: 'metiers' as const,
      badge: 'Prospective 2030',
      title: 'Secteurs d\'Avenir & Marché du Travail',
      description: 'Les compétences et filières les plus recherchées : IA, transition énergétique, santé biomédicale, supply chain et FinTech.',
      stat: '+44.8% de croissance',
      icon: TrendingUp,
      btnLabel: 'Analyser le marché',
      color: 'from-blue-500/10 to-indigo-500/10 dark:from-blue-950/40 dark:to-indigo-950/30',
      badgeColor: 'bg-blue-600/10 text-blue-800 dark:text-blue-300',
    },
    {
      id: 'accompagnement' as const,
      badge: 'Égalité des Chances',
      title: 'Bourses d\'Études & Coaching Personnalisé',
      description: 'Accédez aux aides financières d\'excellence, découvrez 12 450 heures de conseil individuel et les conseils d\'étudiants lauréats.',
      stat: '18.5M MAD mobilisés',
      icon: Award,
      btnLabel: 'Voir l\'accompagnement',
      color: 'from-purple-500/10 to-pink-500/10 dark:from-purple-950/40 dark:to-pink-950/30',
      badgeColor: 'bg-purple-600/10 text-purple-800 dark:text-purple-300',
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#F5F2EB] dark:bg-[#162215] border-t border-[#243324]/10 dark:border-white/10 transition-colors duration-400">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-left space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B4D36]/10 dark:bg-[#4A6D47]/20 text-[#3B4D36] dark:text-[#A3B59E] text-xs font-semibold tracking-wider">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Modules de la Plateforme</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl text-[#1F2B1D] dark:text-[#F4EFE6] font-bold">
            Une organisation claire et modulaire pour votre parcours
          </h2>
          <p className="text-sm sm:text-base text-[#4A5D44] dark:text-[#CBD7C7] font-light leading-relaxed">
            Consultez directement la section qui vous intéresse, sans navigation encombrante. Chaque espace est pensé pour répondre avec précision à vos besoins d'orientation.
          </p>
        </div>

        {/* 4 Dedicated Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {modules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setActiveTab(mod.id)}
                className="group relative p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] bg-white dark:bg-[#1E2C1D] border border-[#243324]/10 dark:border-white/10 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-5 sm:space-y-6"
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold tracking-wider ${mod.badgeColor}`}>
                      {mod.badge}
                    </span>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#3B4D36]/10 dark:bg-white/10 text-[#3B4D36] dark:text-[#CBD7C7] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>

                  <h3 className="font-display text-xl sm:text-3xl font-bold text-[#1F2B1D] dark:text-[#F4EFE6] group-hover:text-[#3B4D36] dark:group-hover:text-[#CBD7C7] transition-colors leading-snug">
                    {mod.title}
                  </h3>

                  <p className="text-xs sm:text-base text-[#4A5D44] dark:text-[#CBD7C7] font-light leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-[#243324]/10 dark:border-white/10 flex items-center justify-between">
                  <span className="text-[11px] sm:text-xs font-semibold text-[#657351] dark:text-[#A3B59E]">
                    {mod.stat}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#3B4D36] dark:text-[#D5E2D2] group-hover:translate-x-1 transition-transform">
                    <span>{mod.btnLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
