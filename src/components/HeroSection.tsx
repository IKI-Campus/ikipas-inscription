import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown, Compass, Sparkles, BookOpen, TrendingUp, Users } from 'lucide-react';
import beesVideo from '../assets/images/gorgeous-bees.webm';
import { IMAGES } from '../assets/images';
import { useNavigation } from '../context/NavigationContext';
import { OfficialLogo } from './OfficialLogo';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setActiveTab } = useNavigation();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback handled automatically
        });
      }
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleScrollToNext = () => {
    const nextSection = document.getElementById('overview-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative min-h-[92vh] w-full flex flex-col justify-center items-center overflow-hidden px-4 sm:px-8 lg:px-12 text-center bg-[#182618]"
    >
      {/* Background Video with subtle fallback image */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={IMAGES.heroCampus}
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={beesVideo} type="video/webm" />
      </video>

      {/* Cinematic Dark Emerald Overlay matching the aesthetic */}
      <div className="absolute inset-0 bg-[#162215]/65 dark:bg-[#0D150C]/75 backdrop-blur-[1px] pointer-events-none z-10" />

      {/* Foreground Content with Fluid Motion */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 max-w-5xl mx-auto w-full flex flex-col items-center justify-center space-y-6 sm:space-y-8 text-[#F4EFE6] drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)] pt-16 pb-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 20 }}
          className="space-y-5 sm:space-y-7"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[#F4EFE6] text-xs sm:text-sm font-semibold tracking-wide">
            <OfficialLogo size={24} className="rounded-md" />
            <span>IKIPAS • Le premier pas vers votre passion</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tight leading-[1.15] text-[#F4EFE6] font-bold max-w-4xl mx-auto px-2">
            Construisez votre avenir académique et professionnel avec clarté
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-[#E5E0D6] font-light max-w-3xl mx-auto pt-1 leading-relaxed px-2">
            Votre plateforme modulaire pour explorer les filières d'excellence, évaluer vos affinités avec le simulateur, et anticiper les métiers porteurs de 2030.
          </p>

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 w-full max-w-md mx-auto sm:max-w-none">
            <button
              id="hero-explore-btn"
              type="button"
              onClick={() => setActiveTab('filieres')}
              className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-[#E5DCC5] hover:bg-[#F2ECE0] text-[#1F2B1D] font-semibold text-sm sm:text-base shadow-lg transition-transform duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explorer les filières</span>
            </button>
            <button
              id="hero-calculator-btn"
              type="button"
              onClick={() => setActiveTab('simulateur')}
              className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-[#F4EFE6] font-medium text-sm sm:text-base backdrop-blur-md transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#E5DCC5]" />
              <span>Simulateur d'orientation</span>
            </button>
          </div>

          {/* Quick Module Discovery Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
            <span className="text-[#D8E6D3]/70 font-light hidden sm:inline">Accès rapide aux sections :</span>
            <button
              type="button"
              onClick={() => setActiveTab('contact')}
              className="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 border border-emerald-300/40 text-white flex items-center gap-1.5 transition-all cursor-pointer font-bold shadow-md hover:scale-105"
            >
              <span>💬 Conseillers WhatsApp (Saad, Mehdi, Samir)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('candidature')}
              className="px-3.5 py-1.5 rounded-full bg-emerald-700/80 hover:bg-emerald-600 border border-emerald-400/40 text-white flex items-center gap-1.5 transition-colors cursor-pointer font-semibold shadow-xs"
            >
              <span>📄 Fiche d'Inscription PDF</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('metiers')}
              className="px-3 py-1 rounded-full bg-black/25 hover:bg-black/40 border border-white/15 text-[#E5E0D6] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Métiers 2030</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('accompagnement')}
              className="px-3 py-1 rounded-full bg-black/25 hover:bg-black/40 border border-white/15 text-[#E5E0D6] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Users className="w-3.5 h-3.5 text-amber-300" />
              <span>Bourses & Conseils</span>
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Down Hint for Overview section */}
      <motion.button
        id="hero-scroll-down-btn"
        type="button"
        onClick={handleScrollToNext}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 0.6, duration: 0.8 },
          y: { repeat: Infinity, duration: 2.4, ease: 'easeInOut' },
        }}
        className="absolute bottom-6 sm:bottom-8 z-20 flex flex-col items-center gap-1.5 text-[#F4EFE6] hover:text-white transition-colors cursor-pointer group"
      >
        <span className="text-xs font-semibold tracking-widest uppercase text-[#F4EFE6]/80 group-hover:text-white">
          Chiffres clés & étapes
        </span>
        <ChevronDown className="w-4 h-4 text-[#F4EFE6] group-hover:translate-y-0.5 transition-transform" />
      </motion.button>
    </section>
  );
};
