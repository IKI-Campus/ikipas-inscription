import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, ExternalLink, ArrowRight, Phone } from 'lucide-react';
import { ADVISORS_DATA, IKIPAS_CONTACT_INFO } from '../data/orientationData';
import { useNavigation } from '../context/NavigationContext';

export const FloatingWhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setActiveTab } = useNavigation();

  return (
    <div className="fixed bottom-5 right-5 z-40 print:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="mb-3 w-80 sm:w-88 rounded-3xl bg-white dark:bg-[#1A2819] border border-[#243324]/15 dark:border-white/15 shadow-2xl overflow-hidden text-left"
          >
            {/* Widget Top Header */}
            <div className="p-4 bg-gradient-to-r from-emerald-700 to-green-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight">Conseillers IKIPAS</h4>
                  <p className="text-[11px] text-emerald-100">En ligne sur WhatsApp</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List of Advisors */}
            <div className="p-3.5 space-y-2 max-h-72 overflow-y-auto">
              <p className="text-[11px] text-[#657351] dark:text-[#A3B59E] px-1 font-medium">
                Sélectionnez un conseiller pour échanger sur WhatsApp :
              </p>

              {ADVISORS_DATA.map((advisor) => (
                <a
                  key={advisor.id}
                  href={`https://wa.me/${advisor.whatsappNumber}?text=${encodeURIComponent(
                    `Bonjour ${advisor.name}, je vous contacte depuis la plateforme IKIPAS pour une demande d'orientation.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2.5 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-transparent hover:border-emerald-500/30 transition-all group cursor-pointer"
                >
                  <img
                    src={advisor.photo}
                    alt={advisor.name}
                    className="w-11 h-11 rounded-xl object-cover shrink-0 border border-emerald-600/30 group-hover:scale-105 transition-transform"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-xs text-[#1F2B1D] dark:text-[#F4EFE6] truncate">
                        {advisor.name}
                      </p>
                      <span className="text-[9.5px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                        {advisor.phone}
                      </span>
                    </div>
                    <p className="text-[10.5px] text-[#657351] dark:text-[#A3B59E] truncate">
                      {advisor.role}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Footer with full form link */}
            <div className="p-3 bg-[#F5F2EB] dark:bg-[#152214] border-t border-[#243324]/10 dark:border-white/10 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setActiveTab('contact');
                }}
                className="w-full py-2 px-3 rounded-xl bg-[#3B4D36] dark:bg-emerald-600 hover:bg-[#2C3B28] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span>Remplir le formulaire & voir les sièges</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-xl shadow-emerald-950/30 font-bold text-xs sm:text-sm cursor-pointer border-2 border-white/40"
        title="Contacter nos conseillers sur WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden xs:inline">WhatsApp Conseillers</span>
        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
      </motion.button>
    </div>
  );
};
