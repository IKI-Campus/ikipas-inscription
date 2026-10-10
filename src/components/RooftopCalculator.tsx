import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  SlidersHorizontal,
  Sparkles,
  CheckCircle,
  HelpCircle,
  BrainCircuit
} from 'lucide-react';

interface StudentProfileQuestions {
  mathLogicScore: number; // 0 - 20
  verbalScore: number; // 0 - 20
  scienceInterest: number; // 0 - 20
  creativeInterest: number; // 0 - 20
  leadershipInterest: number; // 0 - 20
}

interface MatchResult {
  title: string;
  category: string;
  matchScore: number; // percentage
  suitabilityReason: string;
  recommendedPathway: string;
  keyAdvice: string;
}

export const OrientationCalculator: React.FC = () => {
  const [scores, setScores] = useState<StudentProfileQuestions>({
    mathLogicScore: 16,
    verbalScore: 14,
    scienceInterest: 17,
    creativeInterest: 12,
    leadershipInterest: 15,
  });

  // Dynamic matching algorithm based on weighted competencies
  const calculateMatches = (): MatchResult[] => {
    const { mathLogicScore, verbalScore, scienceInterest, creativeInterest, leadershipInterest } = scores;

    const matches: MatchResult[] = [
      {
        title: 'Ingénierie Logicielle & Intelligence Artificielle',
        category: 'Filière Technologies Avancées',
        matchScore: Math.min(99, Math.round((mathLogicScore * 2.2 + scienceInterest * 1.8 + creativeInterest * 0.8) / 0.96)),
        suitabilityReason: 'Vous disposez d\'un esprit d\'analyse affûté et d\'un intérêt marqué pour l\'abstraction, les algorithmes et les systèmes intelligents.',
        recommendedPathway: 'Classes Préparatoires (CPGE) / ENSA / ENSIAS / Facultés des Sciences et Techniques (FST)',
        keyAdvice: 'Initiez-vous à la programmation (Python) et aux structures de données en consolidant vos bases en mathématiques.',
      },
      {
        title: 'Sciences Médicales & Pharmacie Clinique',
        category: 'Filière Santé & Sciences de la Vie',
        matchScore: Math.min(99, Math.round((scienceInterest * 2.4 + mathLogicScore * 1.2 + verbalScore * 1.0) / 0.92)),
        suitabilityReason: 'Excellente curiosité biologique, rigueur d\'observation et forte vocation pour le service à la personne.',
        recommendedPathway: 'Facultés de Médecine et Pharmacie (FMP) / Médecine Dentaire / ISPITS',
        keyAdvice: 'Approfondissez les SVT et la chimie, et développez votre constance dans le travail régulier.',
      },
      {
        title: 'Management Stratégique & Finance Internationale',
        category: 'Économie, Gestion & Leadership',
        matchScore: Math.min(99, Math.round((leadershipInterest * 2.2 + verbalScore * 1.5 + mathLogicScore * 1.1) / 0.94)),
        suitabilityReason: 'Profil équilibré alliant vision globale, sens de la négociation et aisance avec les indicateurs économiques.',
        recommendedPathway: 'Réseau ENCG / ISCAE / CPGE Économiques (ECT) / Universités de Gestion',
        keyAdvice: 'Perfectionnez votre maîtrise des langues étrangères et suivez l\'actualité économique et l\'écosystème startup.',
      },
      {
        title: 'Architecture & Urbanisme Durable',
        category: 'Conception Spatiale & Arts Appliqués',
        matchScore: Math.min(99, Math.round((creativeInterest * 2.3 + mathLogicScore * 1.3 + scienceInterest * 0.9) / 0.90)),
        suitabilityReason: 'Imagination visuelle et spatiale développée avec le souci de structurer concrètement des projets esthétiques et durables.',
        recommendedPathway: 'École Nationale d\'Architecture (ENA) / Écoles de Design et d\'Urbanisme',
        keyAdvice: 'Entraînez-vous au dessin de perspective et explorez les enjeux des bâtiments à faible empreinte carbone.',
      },
    ];

    return matches.sort((a, b) => b.matchScore - a.matchScore);
  };

  const topMatches = calculateMatches();
  const primaryMatch = topMatches[0];

  return (
    <section
      id="calculator-section"
      className="relative bg-[#FBF9F5] dark:bg-[#131D12] text-[#243324] dark:text-[#F4EFE6] py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-t border-[#243324]/10 dark:border-white/10 transition-colors duration-400"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-left space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B4D36]/10 dark:bg-[#4A6D47]/20 text-[#3B4D36] dark:text-[#A3B59E] text-xs font-semibold tracking-wider">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Simulateur d'Orientation & Affinités Académiques</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl text-[#1F2B1D] dark:text-[#F4EFE6] font-bold">
            Ajustez vos aptitudes et découvrez vos filières idéales
          </h2>
          <p className="text-sm sm:text-base text-[#4A5D44] dark:text-[#CBD7C7] font-light leading-relaxed">
            Faites glisser les curseurs ci-dessous pour évaluer vos points forts. Le modèle interactif calcule instantanément votre taux d'affinité avec les grandes voies d'études supérieures.
          </p>
        </div>

        {/* Main Grid: Sliders Controls & Dynamic Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sliders Control Panel */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-[2.5rem] bg-white dark:bg-[#1A2619] border border-[#243324]/10 dark:border-white/10 shadow-lg space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-[#243324]/10 dark:border-white/10 pb-4">
              <span className="text-xs font-semibold text-[#657351] dark:text-[#A3B59E] uppercase tracking-wider">
                Indicateurs d'auto-évaluation (sur 20)
              </span>
              <SlidersHorizontal className="w-4 h-4 text-[#3B4D36] dark:text-[#A3B59E]" />
            </div>

            {/* Slider 1: Math & Logic */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-[#1F2B1D] dark:text-[#F4EFE6]">
                  Logique, Mathématiques & Résolution de problèmes
                </span>
                <span className="font-mono font-bold px-2 py-0.5 rounded bg-[#3B4D36]/10 text-[#3B4D36] dark:bg-white/10 dark:text-[#CBD7C7]">
                  {scores.mathLogicScore} / 20
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="20"
                step="1"
                value={scores.mathLogicScore}
                onChange={(e) => setScores({ ...scores, mathLogicScore: Number(e.target.value) })}
                className="w-full accent-[#3B4D36] dark:accent-[#6B9E66] cursor-pointer"
              />
            </div>

            {/* Slider 2: Science & Biology */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-[#1F2B1D] dark:text-[#F4EFE6]">
                  Sciences Expérimentales, Biologie & Médecine
                </span>
                <span className="font-mono font-bold px-2 py-0.5 rounded bg-[#3B4D36]/10 text-[#3B4D36] dark:bg-white/10 dark:text-[#CBD7C7]">
                  {scores.scienceInterest} / 20
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="20"
                step="1"
                value={scores.scienceInterest}
                onChange={(e) => setScores({ ...scores, scienceInterest: Number(e.target.value) })}
                className="w-full accent-[#3B4D36] dark:accent-[#6B9E66] cursor-pointer"
              />
            </div>

            {/* Slider 3: Verbal & Languages */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-[#1F2B1D] dark:text-[#F4EFE6]">
                  Expression Écrite, Langues & Communication
                </span>
                <span className="font-mono font-bold px-2 py-0.5 rounded bg-[#3B4D36]/10 text-[#3B4D36] dark:bg-white/10 dark:text-[#CBD7C7]">
                  {scores.verbalScore} / 20
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="20"
                step="1"
                value={scores.verbalScore}
                onChange={(e) => setScores({ ...scores, verbalScore: Number(e.target.value) })}
                className="w-full accent-[#3B4D36] dark:accent-[#6B9E66] cursor-pointer"
              />
            </div>

            {/* Slider 4: Creativity & Design */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-[#1F2B1D] dark:text-[#F4EFE6]">
                  Sensibilité Créative, Design & Innovation
                </span>
                <span className="font-mono font-bold px-2 py-0.5 rounded bg-[#3B4D36]/10 text-[#3B4D36] dark:bg-white/10 dark:text-[#CBD7C7]">
                  {scores.creativeInterest} / 20
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="20"
                step="1"
                value={scores.creativeInterest}
                onChange={(e) => setScores({ ...scores, creativeInterest: Number(e.target.value) })}
                className="w-full accent-[#3B4D36] dark:accent-[#6B9E66] cursor-pointer"
              />
            </div>

            {/* Slider 5: Leadership & Management */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-[#1F2B1D] dark:text-[#F4EFE6]">
                  Leadership, Esprit d'Entreprise & Négociation
                </span>
                <span className="font-mono font-bold px-2 py-0.5 rounded bg-[#3B4D36]/10 text-[#3B4D36] dark:bg-white/10 dark:text-[#CBD7C7]">
                  {scores.leadershipInterest} / 20
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="20"
                step="1"
                value={scores.leadershipInterest}
                onChange={(e) => setScores({ ...scores, leadershipInterest: Number(e.target.value) })}
                className="w-full accent-[#3B4D36] dark:accent-[#6B9E66] cursor-pointer"
              />
            </div>

            {/* Helper note */}
            <div className="pt-2 text-xs text-[#657351] dark:text-[#A3B59E] flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Taux d'affinité académique calculé en temps réel selon les référentiels universitaires.</span>
            </div>
          </div>

          {/* Dynamic Result Card */}
          <div className="lg:col-span-6 space-y-6">
            {/* Top Match Spotlight */}
            <motion.div
              layout
              className="p-6 sm:p-8 rounded-[2.5rem] bg-gradient-to-br from-[#3B4D36] to-[#273823] dark:from-[#20321E] dark:to-[#142013] text-[#F4EFE6] shadow-xl space-y-6 text-left border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#E5DCC5]" />
                  <span>Votre Meilleure Affinité</span>
                </div>
                <div className="text-3xl font-display font-bold text-[#E5DCC5]">
                  {primaryMatch.matchScore}%
                </div>
              </div>

              <div>
                <span className="text-xs text-[#CBD7C7] block mb-1">{primaryMatch.category}</span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F4EFE6]">
                  {primaryMatch.title}
                </h3>
              </div>

              <p className="text-sm text-[#D8E6D3] font-light leading-relaxed">
                {primaryMatch.suitabilityReason}
              </p>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1.5 text-xs sm:text-sm">
                <span className="font-semibold text-[#E5DCC5] block">Cursus académique recommandé :</span>
                <p className="text-[#F4EFE6]">{primaryMatch.recommendedPathway}</p>
              </div>

              <div className="text-xs text-[#CBD7C7] flex items-start gap-2 pt-1">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Conseil stratégique :</strong> {primaryMatch.keyAdvice}</span>
              </div>
            </motion.div>

            {/* Other Close Matches List */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-[#657351] dark:text-[#A3B59E] uppercase tracking-wider block text-left">
                Autres filières complémentaires compatibles :
              </span>
              {topMatches.slice(1, 3).map((match, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white dark:bg-[#1A2619] border border-[#243324]/10 dark:border-white/10 flex items-center justify-between text-left shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#3B4D36]/10 dark:bg-white/10 flex items-center justify-center font-bold text-xs text-[#3B4D36] dark:text-[#CBD7C7]">
                      {idx + 2}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-[#1F2B1D] dark:text-[#F4EFE6]">
                        {match.title}
                      </h4>
                      <p className="text-xs text-[#657351] dark:text-[#A3B59E]">{match.category}</p>
                    </div>
                  </div>
                  <span className="font-mono text-sm font-bold text-[#3B4D36] dark:text-[#A3B59E]">
                    {match.matchScore}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const RooftopCalculator = OrientationCalculator;
