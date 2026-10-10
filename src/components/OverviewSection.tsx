import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { AnimatedNumber } from './AnimatedNumber';
import { ORIENTATION_METADATA } from '../data/orientationData';
import { IMAGES } from '../assets/images';

export const OverviewSection: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Smooth parallax scroll tracking mapped safely to card entry and exit
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Clamped parallax ensures the image is always 100% visible and anchored
  const imageY = useTransform(scrollYProgress, [0, 1], ['-20%', '0%'], { clamp: true });

  return (
    <section
      id="overview-section"
      className="relative bg-[#FBF9F5] dark:bg-[#131D12] text-[#243324] dark:text-[#F4EFE6] pt-14 sm:pt-20 pb-16 sm:pb-20 px-4 sm:px-8 lg:px-12 flex flex-col justify-between overflow-hidden transition-colors duration-400"
    >
      <div className="max-w-6xl mx-auto w-full space-y-12 sm:space-y-16">
        {/* Visual Showcase Card Container with Parallax */}
        <div
          ref={cardRef}
          className="relative h-[360px] sm:h-[500px] lg:h-[640px] w-full rounded-[2rem] sm:rounded-[3.5rem] overflow-hidden shadow-2xl bg-[#1F2B1D]"
        >
          <motion.img
            style={{ y: imageY }}
            src={IMAGES.heroCampus}
            alt="Campus universitaires et grandes écoles partenaires"
            referrerPolicy="no-referrer"
            className="absolute top-0 left-0 w-full h-[135%] object-cover object-center max-w-none will-change-transform"
          />

          {/* Subtle bottom gradient overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F2B1D]/90 via-[#1F2B1D]/35 to-transparent pointer-events-none z-10" />

          {/* Overlay Insight */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-12 sm:left-12 sm:right-12 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-[#F4EFE6]">
            <div className="max-w-3xl space-y-2 sm:space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs sm:text-sm font-semibold text-[#F4EFE6]">
                Impact Stratégique de l'Orientation
              </span>
              <p className="font-display text-xl sm:text-4xl lg:text-5xl leading-tight font-light text-[#F4EFE6] drop-shadow-md">
                Plus de 48 000 élèves et étudiants guidés avec succès vers des filières d'excellence.
              </p>
            </div>
          </div>
        </div>

        {/* Quantitative Impact Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 pt-6 pb-4 border-t border-[#243324]/10 dark:border-white/10 text-left">
            <div className="space-y-1">
              <div className="font-display text-4xl sm:text-6xl text-[#1F2B1D] dark:text-[#F4EFE6] font-light tracking-tight">
                <AnimatedNumber value={48.9} decimals={1} suffix=" k" />
              </div>
              <p className="text-base text-[#4A5D44] dark:text-[#CBD7C7] font-semibold">Élèves et étudiants accompagnés</p>
              <p className="text-sm text-[#657351] dark:text-[#A3B59E] font-light">
                Dans les lycées, facultés des sciences et classes préparatoires
              </p>
            </div>

            <div className="space-y-1">
              <div className="font-display text-4xl sm:text-6xl text-[#1F2B1D] dark:text-[#F4EFE6] font-light tracking-tight">
                <AnimatedNumber value={ORIENTATION_METADATA.partnerUniversities} suffix="+" />
              </div>
              <p className="text-base text-[#4A5D44] dark:text-[#CBD7C7] font-semibold">Universités & Grandes Écoles partenaires</p>
              <p className="text-sm text-[#657351] dark:text-[#A3B59E] font-light">
                Offrant des cursus accrédités en ingénierie, santé, gestion et droit
              </p>
            </div>

            <div className="space-y-1">
              <div className="font-display text-4xl sm:text-6xl text-[#1F2B1D] dark:text-[#F4EFE6] font-light tracking-tight">
                <AnimatedNumber value={ORIENTATION_METADATA.graduatesEmployedPct} decimals={1} suffix="%" />
              </div>
              <p className="text-base text-[#4A5D44] dark:text-[#CBD7C7] font-semibold">Taux d'insertion professionnelle</p>
              <p className="text-sm text-[#657351] dark:text-[#A3B59E] font-light">
                Dans les 6 premiers mois suivant l'obtention du diplôme
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
