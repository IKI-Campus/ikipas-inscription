import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { AnimatedNumber } from './AnimatedNumber';
import { ORIENTATION_METADATA } from '../data/orientationData';
import { IMAGES } from '../assets/images';

export const FoodSharingSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-24 px-4 sm:px-8 lg:px-12 flex flex-col justify-center border-t border-[#243324]/10 dark:border-white/10 bg-[#FBF9F5] dark:bg-[#131D12] text-[#243324] dark:text-[#F4EFE6] transition-colors duration-400"
    >
      <div className="max-w-6xl mx-auto w-full space-y-16">
        {/* Headline */}
        <div className="space-y-4 max-w-4xl text-left">
          <p className="text-sm font-semibold tracking-wide text-[#657351] dark:text-[#A3B59E]">
            Égalité des Chances & Bourses d'Études
          </p>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-[#1F2B1D] dark:text-[#F4EFE6] font-bold leading-[1.1] tracking-tight">
            Garantir qu'aucun frein financier ne freine l'ambition d'un étudiant
          </h2>
          <p className="text-lg sm:text-xl text-[#4A5D44] dark:text-[#CBD7C7] font-light leading-relaxed">
            L'orientation ne s'arrête pas au choix du diplôme : nous accompagnons les élèves méritants vers les bourses d'excellence, le logement universitaire et les exonérations de scolarité dans les grandes écoles partenaires.
          </p>
        </div>

        {/* Visual & Metric Integration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visual */}
          <motion.div
            style={{ scale: imageScale }}
            className="lg:col-span-6 h-[440px] sm:h-[520px] rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden shadow-lg relative bg-[#1F2B1D]"
          >
            <img
              src={IMAGES.graduationSuccess}
              alt="Étudiants et lauréats célébrant leur réussite académique"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F2B1D]/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 right-8 left-8 text-white text-left">
              <p className="font-display text-2xl sm:text-3xl font-light">
                Des réussites concrètes prouvant qu'une orientation méthodique transforme le potentiel en accomplissement.
              </p>
            </div>
          </motion.div>

          {/* Impact Stats */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-[#F5F2EB] dark:bg-[#233522] border border-[#243324]/10 dark:border-white/12 shadow-sm space-y-3 transition-colors duration-400">
              <div className="font-display text-5xl sm:text-6xl text-[#1F2B1D] dark:text-[#F4EFE6] font-light tracking-tight">
                <AnimatedNumber value={18.5} decimals={1} suffix=" M MAD" />
              </div>
              <p className="text-base text-[#1F2B1D] dark:text-[#F4EFE6] font-semibold">
                Bourses d'études et aides mobilisées
              </p>
              <p className="text-sm text-[#4A5D44] dark:text-[#CBD7C7] font-light leading-relaxed">
                Sécurisées grâce à des partenariats avec des fondations et le secteur privé pour financer les études d'étudiants méritants en ingénierie et gestion.
              </p>
            </div>

            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-[#F5F2EB] dark:bg-[#233522] border border-[#243324]/10 dark:border-white/12 shadow-sm space-y-3 transition-colors duration-400">
              <div className="font-display text-5xl sm:text-6xl text-[#1F2B1D] dark:text-[#F4EFE6] font-light tracking-tight">
                <AnimatedNumber value={ORIENTATION_METADATA.accreditedTracks} suffix=" filières" />
              </div>
              <p className="text-base text-[#1F2B1D] dark:text-[#F4EFE6] font-semibold">
                Filières & cursus répertoriés en libre accès
              </p>
              <p className="text-sm text-[#4A5D44] dark:text-[#CBD7C7] font-light leading-relaxed">
                Indexées avec conditions d'admission, seuils de sélection et calendriers de concours dans les universités et grandes écoles nationales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
