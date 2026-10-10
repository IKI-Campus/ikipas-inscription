import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  Phone, 
  MapPin, 
  Mail, 
  Send, 
  Check, 
  Copy, 
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  User,
  BookOpen
} from 'lucide-react';
import { HEADQUARTERS_LOCATIONS, IKIPAS_CONTACT_INFO } from '../data/orientationData';
import { loadStoredAdvisors, SYNC_EVENT_NAME } from '../data/schoolsStorage';
import { AcademicAdvisor } from '../types';

export const ContactDirectSection: React.FC = () => {
  // If an advisor is selected, we transition cleanly to a dedicated sub-page
  const [selectedAdvisor, setSelectedAdvisor] = useState<AcademicAdvisor | null>(null);
  const [advisorsList, setAdvisorsList] = useState<AcademicAdvisor[]>(() => loadStoredAdvisors());

  // Sync with live admin updates
  useEffect(() => {
    const handleSync = () => {
      setAdvisorsList(loadStoredAdvisors());
    };
    window.addEventListener(SYNC_EVENT_NAME, handleSync);
    return () => window.removeEventListener(SYNC_EVENT_NAME, handleSync);
  }, []);

  // Simplified student form inputs (only 3 essential fields as requested)
  const [fullName, setFullName] = useState('');
  const [bacYear, setBacYear] = useState('2ème Année Bac (Terminale 2026)');
  const [bacType, setBacType] = useState('Sciences Physiques (PC)');
  const [optionalQuestion, setOptionalQuestion] = useState('');

  // Copy feedback states
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const handleCopyPhone = async (e: React.MouseEvent, phoneNumber: string) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopiedPhone(phoneNumber);
      setTimeout(() => setCopiedPhone(null), 2000);
    } catch {
      // fallback
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(IKIPAS_CONTACT_INFO.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // fallback
    }
  };

  // Build the standardized, formal French WhatsApp message
  const buildWhatsAppMessage = (advisor: AcademicAdvisor) => {
    const student = fullName.trim() || 'Élève / Candidat';
    const note = optionalQuestion.trim()
      ? `\n• Demande spécifique : ${optionalQuestion.trim()}`
      : '';

    return `Bonjour ${advisor.name},

Je vous contacte depuis la plateforme officielle IKIPAS (Orientation scolaire et universitaire).

Mes informations pour l'accompagnement :
• Nom & Prénom : ${student}
• Niveau scolaire : ${bacYear}
• Série du Bac : ${bacType}${note}

Je souhaite bénéficier de vos conseils pour construire mon orientation post-bac.

Merci d'avance pour votre accompagnement !
IKIPAS — Le premier pas vers votre passion`;
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAdvisor) return;

    const message = buildWhatsAppMessage(selectedAdvisor);
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${selectedAdvisor.whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyFormattedText = async () => {
    if (!selectedAdvisor) return;
    try {
      const message = buildWhatsAppMessage(selectedAdvisor);
      await navigator.clipboard.writeText(message);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] dark:bg-[#131D12] text-[#243324] dark:text-[#F4EFE6] transition-colors duration-400">
      <AnimatePresence mode="wait">
        {/* ========================================================================= */}
        {/* VIEW 1: MAIN OVERVIEW OF ADVISORS (when no advisor is selected)           */}
        {/* ========================================================================= */}
        {!selectedAdvisor ? (
          <motion.div
            key="advisors-list-view"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="pb-24"
          >
            {/* Editorial Header */}
            <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#243324]/10 dark:border-white/10 bg-gradient-to-b from-[#EFE9DC]/60 to-[#FBF9F5] dark:from-[#0E170D] dark:to-[#131D12]">
              <div className="max-w-4xl mx-auto space-y-5 text-center">
                <span className="text-xs font-semibold tracking-wider uppercase text-[#556950] dark:text-[#A3B59E] block">
                  Conseil Pédagogique & Orientation Post-Bac
                </span>

                <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-[#1F2B1D] dark:text-[#F4EFE6] tracking-tight leading-tight">
                  Échangez directement avec nos Conseillers Référents
                </h1>

                <p className="text-base sm:text-lg text-[#4A5D44] dark:text-[#CBD7C7] font-light max-w-2xl mx-auto leading-relaxed">
                  Sélectionnez le professeur ou l'expert correspondant à vos ambitions académiques. Cliquez sur sa fiche pour renseigner vos coordonnées et échanger sur WhatsApp.
                </p>

                {/* Subdued trust indicator */}
                <div className="pt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-[#556950] dark:text-[#A3B59E]">
                  <span>Pr. Saad · Ingénierie & CPGE</span>
                  <span aria-hidden="true">/</span>
                  <span>Pr. Mehdi · Santé & Management</span>
                  <span aria-hidden="true">/</span>
                  <span>Samir · Bilan & Stratégie</span>
                </div>
              </div>
            </section>

            {/* The 3 Advisor Cards */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-16">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F2B1D] dark:text-[#F4EFE6]">
                      Nos 3 Conseillers Dédiés
                    </h2>
                    <p className="text-xs sm:text-sm text-[#556950] dark:text-[#A3B59E] mt-1">
                      Choisissez votre interlocuteur privilégié pour ouvrir son formulaire direct.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {advisorsList.map((advisor) => (
                    <div
                      key={advisor.id}
                      className="group relative rounded-3xl p-6 sm:p-7 bg-white dark:bg-[#1A2819] border border-[#243324]/10 dark:border-white/10 hover:border-emerald-600/50 dark:hover:border-emerald-500/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-5">
                        {/* Status bar */}
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Disponible sur WhatsApp</span>
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleCopyPhone(e, advisor.phone)}
                            title="Copier le numéro"
                            className="text-xs font-mono text-[#556950] dark:text-[#A3B59E] hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <span>{advisor.phone}</span>
                            {copiedPhone === advisor.phone ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3 opacity-60" />
                            )}
                          </button>
                        </div>

                        {/* Advisor Photo */}
                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-[#243324]/10 dark:border-white/10">
                          <img
                            src={advisor.photo}
                            alt={advisor.name}
                            className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                            loading="eager"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (advisor.id === 'saad') target.src = '/SAAD.jpeg';
                              else if (advisor.id === 'mehdi') target.src = '/MEHDI.jpeg';
                              else if (advisor.id === 'samir') target.src = '/SAMIR.jpeg';
                            }}
                          />
                        </div>

                        {/* Name & Role */}
                        <div>
                          <h3 className="font-display text-2xl font-bold text-[#1F2B1D] dark:text-[#F4EFE6] group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                            {advisor.name}
                          </h3>
                          <p className="text-xs font-medium text-[#556950] dark:text-[#A3B59E] mt-0.5">
                            {advisor.role}
                          </p>
                        </div>

                        {/* Specialties */}
                        <div className="space-y-2 pt-1 border-t border-[#243324]/5 dark:border-white/5">
                          <span className="text-[11px] font-semibold text-[#556950] dark:text-[#A3B59E] uppercase tracking-wider block">
                            Domaines d'accompagnement :
                          </span>
                          <ul className="space-y-1 text-xs text-[#243324] dark:text-[#E2EDE0]">
                            {advisor.specialties.map((spec, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">·</span>
                                <span>{spec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Main Action Button */}
                      <div className="pt-6 mt-6 border-t border-[#243324]/10 dark:border-white/10">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedAdvisor(advisor);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="w-full py-3 px-4 rounded-2xl bg-[#243324] hover:bg-[#324532] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-sm active:scale-98"
                        >
                          <MessageCircle className="w-4 h-4 text-emerald-400" />
                          <span>Contacter {advisor.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-70" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Physical Office Centers & Official Email */}
              <div className="rounded-3xl p-8 sm:p-10 bg-white dark:bg-[#1A2819] border border-[#243324]/10 dark:border-white/10 space-y-8">
                <div className="max-w-2xl">
                  <h2 className="font-display text-2xl font-bold text-[#1F2B1D] dark:text-[#F4EFE6]">
                    Accompagnement en Présentiel & Sièges IKIPAS
                  </h2>
                  <p className="text-xs sm:text-sm text-[#556950] dark:text-[#A3B59E] mt-1">
                    Nos bureaux vous accueillent également sur rendez-vous pour des entretiens approfondis et le dépôt de vos dossiers.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {HEADQUARTERS_LOCATIONS.map((center, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-[#FBF9F5] dark:bg-[#131D12] border border-[#243324]/10 dark:border-white/10 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                          {center.badge}
                        </span>
                        <MapPin className="w-4 h-4 text-emerald-600" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-[#1F2B1D] dark:text-[#F4EFE6]">
                        {center.city} — {center.address}
                      </h3>
                      <p className="text-xs text-[#556950] dark:text-[#A3B59E]">
                        {center.landmark}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Email Direct */}
                <div className="pt-4 border-t border-[#243324]/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#556950] dark:text-[#A3B59E]">
                        Courriel institutionnel
                      </p>
                      <p className="font-mono text-sm font-bold text-[#1F2B1D] dark:text-[#F4EFE6]">
                        {IKIPAS_CONTACT_INFO.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="px-4 py-2 rounded-xl border border-[#243324]/15 dark:border-white/15 text-xs font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedEmail ? 'Copié' : 'Copier l\'adresse'}</span>
                    </button>
                    <a
                      href={`mailto:${IKIPAS_CONTACT_INFO.email}`}
                      className="px-4 py-2 rounded-xl bg-[#243324] text-white text-xs font-semibold hover:bg-[#324532] transition-colors"
                    >
                      Écrire un e-mail
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ========================================================================= */
          /* VIEW 2: DEDICATED SUB-PAGE FOR THE CHOSEN ADVISOR (Clean 3-Field Form)    */
          /* ========================================================================= */
          <motion.div
            key="advisor-dedicated-subpage"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10"
          >
            {/* Top Back Navigation Button */}
            <div>
              <button
                type="button"
                onClick={() => {
                  setSelectedAdvisor(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#243324]/15 dark:border-white/15 bg-white dark:bg-[#1A2819] text-xs font-semibold text-[#1F2B1D] dark:text-[#F4EFE6] hover:bg-[#F5F2EB] dark:hover:bg-[#253624] transition-colors cursor-pointer shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour à la liste des conseillers</span>
              </button>
            </div>

            {/* Sub-page Main Container */}
            <div className="bg-white dark:bg-[#1A2819] rounded-3xl border border-[#243324]/10 dark:border-white/10 shadow-xl overflow-hidden">
              {/* Header with Advisor Identity */}
              <div className="p-6 sm:p-8 bg-[#F5F2EB] dark:bg-[#142113] border-b border-[#243324]/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-white/10 shadow-md shrink-0">
                    <img
                      src={selectedAdvisor.photo}
                      alt={selectedAdvisor.name}
                      className="w-full h-full object-cover object-center"
                      loading="eager"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (selectedAdvisor.id === 'saad') target.src = '/SAAD.jpeg';
                        else if (selectedAdvisor.id === 'mehdi') target.src = '/MEHDI.jpeg';
                        else if (selectedAdvisor.id === 'samir') target.src = '/SAMIR.jpeg';
                      }}
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-emerald-800 dark:text-emerald-300 block">
                      Demande d'orientation dédiée
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-black text-[#1F2B1D] dark:text-[#F4EFE6] leading-tight">
                      {selectedAdvisor.name}
                    </h2>
                    <p className="text-xs text-[#556950] dark:text-[#A3B59E] mt-0.5">
                      {selectedAdvisor.role} · Téléphone : {selectedAdvisor.phone}
                    </p>
                  </div>
                </div>

                <div className="sm:text-right shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>WhatsApp Référent</span>
                  </span>
                </div>
              </div>

              {/* The Simple 3-Field Form */}
              <form onSubmit={handleSendWhatsApp} className="p-6 sm:p-10 space-y-6">
                <div className="space-y-1">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#1F2B1D] dark:text-[#F4EFE6]">
                    Renseignez vos coordonnées scolaires
                  </h3>
                  <p className="text-xs sm:text-sm text-[#556950] dark:text-[#A3B59E]">
                    Remplissez les 3 champs ci-dessous pour transmettre automatiquement votre profil à {selectedAdvisor.name} sur WhatsApp.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Field 1: Nom et Prénom */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2B1D] dark:text-[#F4EFE6]">
                      1. Nom & Prénom <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ex: Youssef El Amrani"
                        className="w-full px-4 py-3 rounded-2xl border border-[#243324]/20 dark:border-white/20 bg-[#FBF9F5] dark:bg-[#131D12] text-sm text-[#1F2B1D] dark:text-[#F4EFE6] focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all placeholder:text-gray-400"
                      />
                    </div>
                    <span className="text-[11px] text-[#556950] dark:text-[#A3B59E] block">
                      Votre nom complet tel qu'il apparaîtra dans le message WhatsApp.
                    </span>
                  </div>

                  {/* Field 2: Année du Bac / Niveau */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2B1D] dark:text-[#F4EFE6]">
                      2. Niveau Scolaire / Année du Bac <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={bacYear}
                      onChange={(e) => setBacYear(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-[#243324]/20 dark:border-white/20 bg-[#FBF9F5] dark:bg-[#131D12] text-sm text-[#1F2B1D] dark:text-[#F4EFE6] focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    >
                      <option value="2ème Année Bac (Terminale 2026)">2ème Année Bac (Terminale 2026)</option>
                      <option value="1ère Année Bac (Régional)">1ère Année Bac (Préparation Régional)</option>
                      <option value="Baccalauréat antérieur (2025 ou antérieur)">Baccalauréat déjà obtenu (2025 ou avant)</option>
                      <option value="Étudiant en réorientation (Bac+1 / Bac+2)">Étudiant supérieur (Bac+1 / Bac+2)</option>
                    </select>
                    <span className="text-[11px] text-[#556950] dark:text-[#A3B59E] block">
                      Indiquez votre promotion actuelle.
                    </span>
                  </div>

                  {/* Field 3: Série / Type de Bac */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2B1D] dark:text-[#F4EFE6]">
                      3. Série & Filière du Bac <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={bacType}
                      onChange={(e) => setBacType(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-[#243324]/20 dark:border-white/20 bg-[#FBF9F5] dark:bg-[#131D12] text-sm text-[#1F2B1D] dark:text-[#F4EFE6] focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    >
                      <option value="Sciences Mathématiques (SM-A / SM-B)">Sciences Mathématiques (SM-A / SM-B)</option>
                      <option value="Sciences Physiques et Chimiques (PC)">Sciences Physiques et Chimiques (PC)</option>
                      <option value="Sciences de la Vie et de la Terre (SVT)">Sciences de la Vie et de la Terre (SVT)</option>
                      <option value="Sciences Économiques & Gestion (SEG)">Sciences Économiques & Gestion (SEG)</option>
                      <option value="Baccalauréat International (Option Français BIOF)">Baccalauréat International (Option Français BIOF)</option>
                      <option value="Sciences & Technologies Électriques / Mécaniques (STE / STM)">Sciences & Technologies (STE / STM)</option>
                      <option value="Lettres & Sciences Humaines">Lettres & Sciences Humaines</option>
                      <option value="Autre spécialité">Autre spécialité</option>
                    </select>
                  </div>

                  {/* Optional field: Question or Specific Target */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2B1D] dark:text-[#F4EFE6]">
                      Votre question ou école visée <span className="text-gray-400 font-normal">(Optionnel)</span>
                    </label>
                    <input
                      type="text"
                      value={optionalQuestion}
                      onChange={(e) => setOptionalQuestion(e.target.value)}
                      placeholder="Ex: Concours CPGE, médecine, ENSA ou conseil sur mon dossier..."
                      className="w-full px-4 py-3 rounded-2xl border border-[#243324]/20 dark:border-white/20 bg-[#FBF9F5] dark:bg-[#131D12] text-sm text-[#1F2B1D] dark:text-[#F4EFE6] focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Primary Action Button: WhatsApp */}
                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-3 transition-colors shadow-lg shadow-emerald-700/20 cursor-pointer active:scale-98"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Envoyer ma demande sur WhatsApp</span>
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyFormattedText}
                    className="py-4 px-5 rounded-2xl border border-[#243324]/15 dark:border-white/15 bg-white dark:bg-[#1A2819] hover:bg-black/5 dark:hover:bg-white/5 text-xs font-semibold text-[#1F2B1D] dark:text-[#F4EFE6] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    title="Copier le message préparé"
                  >
                    {copiedMessage ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Message copié</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copier le texte</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Assurance note */}
                <p className="text-[11.5px] text-[#556950] dark:text-[#A3B59E] text-center pt-2">
                  En cliquant sur le bouton, l'application WhatsApp s'ouvrira directement avec votre message prêt à l'envoi vers le numéro de {selectedAdvisor.name} ({selectedAdvisor.phone}).
                </p>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
