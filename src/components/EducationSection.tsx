import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { ORIENTATION_METADATA } from '../data/orientationData';
import { IMAGES } from '../assets/images';
import { AnimatedNumber } from './AnimatedNumber';
import { useNavigation } from '../context/NavigationContext';

export const EducationSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setActiveTab } = useNavigation();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-20%', '0%'], { clamp: true });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-24 px-4 sm:px-8 lg:px-12 flex flex-col justify-center border-t border-[#243324]/10 dark:border-white/10 bg-[#F5F2EB] dark:bg-[#182417] text-[#243324] dark:text-[#F4EFE6] transition-colors duration-400"
    >
      <div className="max-w-6xl mx-auto w-full space-y-16">
        {/* Headline */}
        <div className="space-y-4 max-w-4xl text-left">
          <p className="text-sm font-semibold tracking-wide text-[#657351] dark:text-[#A3B59E]">
            Accompagnement & Conseil Pédagogique
          </p>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-[#1F2B1D] dark:text-[#F4EFE6] font-bold leading-[1.1] tracking-tight">
            Des séances de conseil individuel pour tracer sa propre voie
          </h2>
          <p className="text-lg sm:text-xl text-[#4A5D44] dark:text-[#CBD7C7] font-light leading-relaxed">
            En partenariat avec des spécialistes de l'orientation et des enseignants universitaires, nous offrons à chaque élève un dialogue approfondi pour révéler ses talents, dissiper les doutes et cibler le cursus idéal.
          </p>
        </div>

        {/* Visual & Education Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Metrics Column - Cards */}
          <div className="lg:col-span-5 space-y-6 order-2 lg:order-1 text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7 }}
              className="p-8 sm:p-10 rounded-[2.5rem] bg-white dark:bg-[#243723] border border-[#243324]/10 dark:border-white/12 shadow-sm space-y-3 transition-colors duration-400"
            >
              <div className="font-display text-5xl sm:text-6xl text-[#1F2B1D] dark:text-[#F4EFE6] font-light tracking-tight">
                <AnimatedNumber value={ORIENTATION_METADATA.counselorHours} suffix=" h" />
              </div>
              <p className="text-base text-[#1F2B1D] dark:text-[#F4EFE6] font-semibold">Heures de conseil et d'écoute personnalisée</p>
              <p className="text-sm text-[#4A5D44] dark:text-[#CBD7C7] font-light leading-relaxed">
                Dispensées par des conseillers pédagogiques pour aider les élèves à bâtir des dossiers solides pour les universités et grandes écoles.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="p-8 sm:p-10 rounded-[2.5rem] bg-white dark:bg-[#243723] border border-[#243324]/10 dark:border-white/12 shadow-sm space-y-3 transition-colors duration-400"
            >
              <div className="font-display text-5xl sm:text-6xl text-[#1F2B1D] dark:text-[#F4EFE6] font-light tracking-tight">
                <AnimatedNumber value={ORIENTATION_METADATA.workshopsConducted} suffix=" ateliers" />
              </div>
              <p className="text-base text-[#1F2B1D] dark:text-[#F4EFE6] font-semibold">Ateliers interactifs dans les lycées</p>
              <p className="text-sm text-[#4A5D44] dark:text-[#CBD7C7] font-light leading-relaxed">
                Préparation aux entretiens d'admission, maîtrise du stress lors des examens et découverte des carrières d'avenir.
              </p>
            </motion.div>

            <motion.button
              type="button"
              onClick={() => setActiveTab('contact')}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform shadow-md cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Contacter nos conseillers sur WhatsApp (Saad, Mehdi, Samir)</span>
            </motion.button>
          </div>

          {/* Visual Column */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative h-[440px] sm:h-[540px] rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden shadow-2xl bg-[#1F2B1D]">
              <motion.img
                style={{ y: imageY }}
                src={IMAGES.studentsMentoring}
                alt="Élèves et étudiants en séance d'orientation avec un conseiller pédagogique"
                referrerPolicy="no-referrer"
                className="absolute top-0 left-0 w-full h-[135%] object-cover object-center max-w-none will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2B1D]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 right-6 left-6 text-[#F4EFE6] text-left">
                <span className="text-xs font-semibold text-[#E5DCC5] uppercase tracking-wider block">
                  Environnement stimulant
                </span>
                <p className="font-display text-xl sm:text-2xl font-light text-[#F4EFE6]">
                  Un échange direct pour ouvrir les horizons et lever les incertitudes post-bac.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
