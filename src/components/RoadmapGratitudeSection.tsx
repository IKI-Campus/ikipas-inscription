import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Share2, Copy, Check, Compass, MapPin, Mail, Phone, MessageCircle } from 'lucide-react';
import { PATHWAY_MILESTONES, HEADQUARTERS_LOCATIONS, IKIPAS_CONTACT_INFO, ADVISORS_DATA } from '../data/orientationData';
import { useNavigation } from '../context/NavigationContext';
import { ShareModal } from './ShareModal';

export const RoadmapGratitudeSection: React.FC = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { setActiveTab } = useNavigation();

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      const cur = window.location.href;
      return cur.includes('-dev-') ? cur.replace('-dev-', '-pre-') : cur;
    }
    return 'https://ais-pre-7a7evxalcwim6udowrdlqn-707985151027.europe-west2.run.app';
  };

  const handleCopy = async () => {
    const url = getShareUrl();
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      } else {
        const ta = document.createElement('textarea');
        ta.value = url;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="relative min-h-screen py-24 px-4 sm:px-8 lg:px-12 flex flex-col justify-center border-t border-[#243324]/10 dark:border-white/10 bg-white dark:bg-[#131D12] text-[#243324] dark:text-[#F4EFE6] transition-colors duration-400">
      <div className="max-w-6xl mx-auto w-full space-y-20">
        {/* Section Headline */}
        <div className="space-y-4 max-w-4xl text-left">
          <p className="text-sm font-semibold tracking-wide text-[#657351] dark:text-[#A3B59E]">
            Feuille de Route Stratégique
          </p>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-[#1F2B1D] dark:text-[#F4EFE6] font-bold leading-[1.1] tracking-tight">
            Quatre étapes décisives pour réussir son orientation post-bac
          </h2>
          <p className="text-lg sm:text-xl text-[#4A5D44] dark:text-[#CBD7C7] font-light leading-relaxed">
            La réussite académique est une démarche méthodique : de la découverte de soi jusqu'au dépôt rigoureux des candidatures dans les délais impartis.
          </p>
        </div>

        {/* 4 Strategic Milestones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
          {PATHWAY_MILESTONES.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-8 sm:p-10 rounded-[2.5rem] bg-[#F5F2EB] dark:bg-[#1E2B1D] border border-[#243324]/10 dark:border-white/10 space-y-4 transition-colors duration-400"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#3B4D36]/10 dark:bg-white/10 text-[#3B4D36] dark:text-[#A3B59E]">
                  {item.step}
                </span>
                <Compass className="w-5 h-5 text-[#3B4D36] dark:text-[#A3B59E]" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1F2B1D] dark:text-[#F4EFE6]">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-[#4A5D44] dark:text-[#CBD7C7] font-light leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Share with Friends & Community Banner */}
        <motion.div
          id="share-banner-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 sm:p-10 rounded-[2.5rem] bg-[#F5F2EB] dark:bg-[#1F2B1D] border border-[#243324]/10 dark:border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-colors duration-400 text-left"
        >
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B4D36]/10 dark:bg-[#4A6D47]/30 text-[#3B4D36] dark:text-[#A3B59E] text-xs font-semibold tracking-wider">
              <Share2 className="w-3.5 h-3.5" />
              <span>Partager avec vos proches</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-[#1F2B1D] dark:text-[#F4EFE6] font-bold">
              Cette boussole d'orientation vous a été utile ? Partagez-la !
            </h3>
            <p className="text-sm sm:text-base text-[#4A5D44] dark:text-[#CBD7C7] font-light leading-relaxed">
              Aidez vos camarades de lycée et d'université à explorer les bonnes filières et à tester leur profil en toute autonomie.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
            <button
              id="footer-copy-link-btn"
              type="button"
              onClick={handleCopy}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white dark:bg-[#2A3C28] border border-[#243324]/15 dark:border-white/15 text-xs sm:text-sm font-medium text-[#1F2B1D] dark:text-[#F4EFE6] hover:bg-[#F9F7F2] dark:hover:bg-[#344B32] transition-colors cursor-pointer shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Lien copié !</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copier le lien</span>
                </>
              )}
            </button>

            <button
              id="footer-open-share-modal-btn"
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#3B4D36] dark:bg-[#4A6D47] text-white hover:bg-[#2C3B28] dark:hover:bg-[#3D5B3A] text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-md"
            >
              <Share2 className="w-4 h-4" />
              <span>Options de partage</span>
            </button>
          </div>
        </motion.div>

        {/* Dedicated Headquarters & Advisors Direct Card */}
        <div className="p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-br from-[#273B25] to-[#152214] text-white border border-emerald-500/20 shadow-xl space-y-8 text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Contact & Centres IKIPAS
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F7F4EB]">
                Besoin d'un accompagnement personnalisé ou d'un échange direct ?
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('contact')}
              className="self-start md:self-auto px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-transform active:scale-95 cursor-pointer shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Ouvrir l'espace WhatsApp & Conseillers</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sièges */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase">
                <MapPin className="w-3.5 h-3.5" />
                <span>Siège Tanger</span>
              </span>
              <p className="font-semibold text-sm text-[#F7F4EB]">
                Tanger — Résidence 4 Temps ★ — Tanger
              </p>
              <p className="text-xs text-white/70">
                إقامة 4 Temps ★ — طنجة
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase">
                <MapPin className="w-3.5 h-3.5" />
                <span>Siège Fès</span>
              </span>
              <p className="font-semibold text-sm text-[#F7F4EB]">
                Fès — Avenue Ibn Al Haytham, Sidi Brahim, Fès
              </p>
              <p className="text-xs text-white/70">
                شارع ابن الهيثم، سيدي براهيم، فاس
              </p>
            </div>

            {/* Email & Hotline */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase">
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Central</span>
              </span>
              <a
                href={`mailto:${IKIPAS_CONTACT_INFO.email}`}
                className="block font-semibold text-sm text-[#F7F4EB] hover:text-emerald-300 transition-colors"
              >
                {IKIPAS_CONTACT_INFO.email}
              </a>
              <div className="flex flex-wrap gap-2 text-[11px] text-white/80 font-mono">
                <span>Saad: 06 06 79 93 30</span>
                <span>•</span>
                <span>Mehdi: 07 00 63 56 66</span>
                <span>•</span>
                <span>Samir: 06 61 86 25 06</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-8 border-t border-[#243324]/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#657351] dark:text-[#A3B59E] font-light text-left">
          <p>© 2026 IKIPAS • Le premier pas vers votre passion. Tous droits réservés.</p>
          <div className="flex items-center gap-3">
            <p>Plateforme d'orientation scolaire & universitaire - Maroc.</p>
            <a
              href="#admin"
              className="text-[#657351]/40 dark:text-[#A3B59E]/40 hover:text-emerald-600 transition-colors cursor-pointer text-[11px]"
              title="Portail d'administration"
            >
              •
            </a>
          </div>
        </footer>
      </div>

      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </section>
  );
};
