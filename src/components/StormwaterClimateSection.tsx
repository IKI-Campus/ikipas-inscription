import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { IMAGES } from '../assets/images';
import { SUCCESS_STORIES } from '../data/orientationData';
import { Quote } from 'lucide-react';

export const StormwaterClimateSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-20%', '0%'], { clamp: true });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-24 px-4 sm:px-8 lg:px-12 flex flex-col justify-center border-t border-[#243324]/10 dark:border-white/10 bg-[#FBF9F5] dark:bg-[#131D12] text-[#243324] dark:text-[#F4EFE6] transition-colors duration-400"
    >
      <div className="max-w-6xl mx-auto w-full space-y-16">
        {/* Section Headline */}
        <div className="space-y-4 max-w-4xl text-left">
          <p className="text-sm font-semibold tracking-wide text-[#657351] dark:text-[#A3B59E]">
            Témoignages & Retours d'Expérience
          </p>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-[#1F2B1D] dark:text-[#F4EFE6] font-bold leading-[1.1] tracking-tight">
            Parcours inspirants d'étudiants vers l'excellence académique
          </h2>
          <p className="text-lg sm:text-xl text-[#4A5D44] dark:text-[#CBD7C7] font-light leading-relaxed">
            Découvrez les conseils d'étudiants lauréats : comment ils ont choisi leur cursus et surmonté leurs hésitations lors des moments décisifs de l'orientation.
          </p>
        </div>

        {/* Visual & Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visual Image with Parallax Scroll */}
          <div className="lg:col-span-7 h-[420px] sm:h-[500px] rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden shadow-lg relative bg-[#1F2B1D]">
            <motion.img
              style={{ y: imageY }}
              src={IMAGES.futureTechLab}
              alt="Laboratoire de recherche technologique et innovation étudiante"
              className="absolute top-0 left-0 w-full h-[135%] object-cover object-center max-w-none will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F2B1D]/85 via-transparent to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-8 right-8 left-8 text-white z-20 text-left">
              <span className="text-xs font-semibold text-[#E5DCC5] block mb-1">Campus d'Innovation</span>
              <p className="font-display text-2xl sm:text-3xl font-light">
                Les spécialités technologiques modernes ouvrent les portes des laboratoires d'avant-garde et des carrières internationales.
              </p>
            </div>
          </div>

          {/* Key Story Spotlight Card */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7 }}
              className="p-8 sm:p-10 rounded-[2.5rem] bg-[#F5F2EB] dark:bg-[#233522] border border-[#243324]/10 dark:border-white/12 shadow-sm space-y-4 transition-colors duration-400"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#3B4D36]/10 dark:bg-white/10 text-[#3B4D36] dark:text-[#A3B59E]">
                  Témoignage Inspirant
                </span>
                <Quote className="w-6 h-6 text-[#3B4D36] dark:text-[#A3B59E] opacity-50" />
              </div>

              <div>
                <h4 className="font-display text-2xl font-bold text-[#1F2B1D] dark:text-[#F4EFE6]">
                  {SUCCESS_STORIES[0].studentName}
                </h4>
                <p className="text-xs text-[#657351] dark:text-[#A3B59E] font-medium">
                  {SUCCESS_STORIES[0].track}
                </p>
              </div>

              <p className="text-sm text-[#4A5D44] dark:text-[#CBD7C7] font-light leading-relaxed italic">
                « {SUCCESS_STORIES[0].quote} »
              </p>

              <div className="pt-2 border-t border-[#243324]/10 dark:border-white/10 text-xs text-[#2E6B38] dark:text-[#78C986] font-semibold">
                Conseil aux futurs bacheliers : {SUCCESS_STORIES[0].advice}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
