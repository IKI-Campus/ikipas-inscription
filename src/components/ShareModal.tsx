import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Share2, MessageCircle, Send, Twitter, Mail } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('https://ais-pre-bvbwx5klgqvzug4izwa5cp-501809243645.europe-west3.run.app');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const current = window.location.href;
      // Convert dev link to public shared pre link if in preview
      if (current.includes('-dev-')) {
        setShareUrl(current.replace('-dev-', '-pre-'));
      } else {
        setShareUrl(current);
      }
    }
  }, []);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: "Boussole d'Orientation Scolaire & Universitaire 2026",
          text: "Découvrez la Boussole d'Orientation Scolaire & Universitaire 2026 : exploration des filières, débouchés et simulateur interactif.",
          url: shareUrl,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  const shareTitle = encodeURIComponent("Boussole d'Orientation Scolaire & Universitaire 2026");
  const shareText = encodeURIComponent("Découvrez la Boussole d'Orientation Scolaire & Universitaire 2026 : ");
  const encodedUrl = encodeURIComponent(shareUrl);

  const channels = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: `https://api.whatsapp.com/send?text=${shareText}${encodedUrl}`,
      bg: 'hover:bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20',
    },
    {
      name: 'Telegram',
      icon: Send,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${shareTitle}`,
      bg: 'hover:bg-[#229ED9]/10 text-[#229ED9] border-[#229ED9]/20',
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${shareTitle}`,
      bg: 'hover:bg-[#1DA1F2]/10 text-[#1DA1F2] border-[#1DA1F2]/20',
    },
    {
      name: 'E-mail',
      icon: Mail,
      href: `mailto:?subject=${shareTitle}&body=${shareText}${encodedUrl}`,
      bg: 'hover:bg-[#657351]/10 text-[#657351] dark:text-[#A3B59E] border-[#657351]/20',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            id="share-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Dialog Content */}
          <motion.div
            id="share-modal-dialog"
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="relative w-full max-w-lg overflow-hidden rounded-[2rem] bg-[#FBF9F5] dark:bg-[#1A2619] border border-[#243324]/15 dark:border-white/15 p-6 sm:p-8 shadow-2xl z-10 text-[#243324] dark:text-[#F4EFE6] text-left"
          >
            {/* Close Button */}
            <button
              id="share-modal-close-btn"
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-[#4A5D44] dark:text-[#A3B59E] hover:bg-[#243324]/10 dark:hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-2 pr-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B4D36]/10 dark:bg-[#4A6D47]/20 text-[#3B4D36] dark:text-[#A3B59E] text-xs font-semibold tracking-wider">
                <Share2 className="w-3.5 h-3.5" />
                <span>Partager le guide</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-[#1F2B1D] dark:text-[#F4EFE6]">
                Partager la Boussole d'Orientation
              </h3>
              <p className="text-sm text-[#4A5D44] dark:text-[#CBD7C7] font-light leading-relaxed">
                Copiez le lien direct ou choisissez votre plateforme favorite pour envoyer ce guide à vos camarades.
              </p>
            </div>

            {/* Link Box with Copy Button */}
            <div className="mt-6 space-y-2">
              <label htmlFor="share-link-input" className="text-xs font-medium text-[#657351] dark:text-[#A3B59E] uppercase tracking-wider block">
                Lien direct d'accès
              </label>
              <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-2xl bg-white dark:bg-[#131D12] border border-[#243324]/15 dark:border-white/15 focus-within:border-[#3B4D36] dark:focus-within:border-[#A3B59E] transition-colors">
                <input
                  id="share-link-input"
                  type="text"
                  readOnly
                  value={shareUrl}
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                  className="flex-1 bg-transparent px-2 text-xs sm:text-sm font-mono text-[#243324] dark:text-[#F4EFE6] focus:outline-none truncate selection:bg-[#E8DCC4] dark:selection:bg-[#384F35]"
                />
                <button
                  id="copy-share-link-btn"
                  type="button"
                  onClick={handleCopy}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    copied
                      ? 'bg-[#2E6B38] text-white'
                      : 'bg-[#3B4D36] dark:bg-[#4A6D47] text-white hover:bg-[#2C3B28] dark:hover:bg-[#3D5B3A]'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copié !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copier</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Share Channels */}
            <div className="mt-6 space-y-3">
              <span className="text-xs font-medium text-[#657351] dark:text-[#A3B59E] uppercase tracking-wider block">
                Partage rapide
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {channels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <a
                      key={channel.name}
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2.5 p-3 rounded-xl border bg-white dark:bg-[#131D12] text-xs sm:text-sm font-medium transition-all duration-200 ${channel.bg}`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{channel.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Native Mobile Share Button (if supported) */}
            {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
              <div className="mt-4 pt-4 border-t border-[#243324]/10 dark:border-white/10">
                <button
                  id="native-device-share-btn"
                  type="button"
                  onClick={handleNativeShare}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#3B4D36]/20 dark:border-white/20 bg-[#3B4D36]/5 dark:bg-white/5 hover:bg-[#3B4D36]/10 dark:hover:bg-white/10 text-xs sm:text-sm font-medium text-[#3B4D36] dark:text-[#A3B59E] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Ouvrir les options de partage de l'appareil</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
