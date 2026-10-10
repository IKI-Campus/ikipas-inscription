import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  FileText, 
  GraduationCap, 
  Download, 
  Printer, 
  CheckCircle2, 
  Building2, 
  RotateCcw,
  X,
  ArrowRight,
  Plus,
  Trash2,
  ListOrdered,
  Loader2,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  MapPin,
  Sparkles,
  PenTool,
  Check,
  MessageCircle
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { StudentRegistrationData, SchoolItem, SchoolChoice } from '../types';
import { SCHOOL_CATEGORIES } from '../data/schoolsCatalog';
import { loadStoredSchools, SYNC_EVENT_NAME } from '../data/schoolsStorage';
import { OfficialPrintableSheet } from './OfficialPrintableSheet';
import { downloadElementAsPdf } from '../utils/pdfExport';
import { DigitalSignaturePad } from './DigitalSignaturePad';
import { OfficialLogo } from './OfficialLogo';

const STORAGE_KEY = 'orientation_student_candidature_2026';

// All inputs are 100% empty by default - no pre-filled personal examples
const emptyRegistrationData: StudentRegistrationData = {
  nomPrenom: '',
  nomPrenomAr: '',
  codeMassar: '',
  cin: '',
  dateNaissance: '',
  lieuNaissance: '',
  adresse: '',
  ville: '',
  codePostal: '',
  telephone: '',
  whatsapp: '',
  email: '',
  lyceeActuel: '',
  filiereBac: '',
  noteRegional: '',
  noteControleContinu: '',
  nomPere: '',
  professionPere: '',
  telPere: '',
  emailPere: '',
  nomMere: '',
  professionMere: '',
  telMere: '',
  tuteurType: 'pere',
  nomTuteur: '',
  couvertureMedicale: 'AUCUNE',
  selectedCategory: '',
  selectedSchoolId: '',
  selectedSchoolName: '',
  selectedCity: '',
  selectedOption: '',
  selectedChoices: [],
  dateCandidature: new Date().toLocaleDateString('fr-FR'),
  signatureEleve: undefined,
  signatureTuteur: undefined,
};

export const CandidatureSection: React.FC = () => {
  const [data, setData] = useState<StudentRegistrationData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            ...emptyRegistrationData,
            ...parsed,
            selectedChoices: parsed.selectedChoices || [],
          };
        }
      } catch {
        // Fallback to empty
      }
    }
    return emptyRegistrationData;
  });

  const [activeStep, setActiveStep] = useState<'personnel' | 'ecole' | 'apercu'>('personnel');
  const [printModalMode, setPrintModalMode] = useState<'personal_only' | 'complete' | null>(null);
  const [pdfModeForExport, setPdfModeForExport] = useState<'personal_only' | 'complete'>('complete');
  const { setActiveTab } = useNavigation();
  
  // Signature pad modal state
  const [signatureModalRole, setSignatureModalRole] = useState<'eleve' | 'tuteur' | null>(null);

  // School selection controls
  const [catalogSchools, setCatalogSchools] = useState<SchoolItem[]>(() => loadStoredSchools());
  const [selectedCatId, setSelectedCatId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSchoolId, setActiveSchoolId] = useState<string | null>(null);

  // Sync with live admin updates
  useEffect(() => {
    const handleSync = () => {
      setCatalogSchools(loadStoredSchools());
    };
    window.addEventListener(SYNC_EVENT_NAME, handleSync);
    return () => window.removeEventListener(SYNC_EVENT_NAME, handleSync);
  }, []);

  // Per-school active configuration (city & selected specialty)
  const [schoolConfigs, setSchoolConfigs] = useState<Record<string, { city: string; option: string }>>({});

  // PDF export state
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [lastGeneratedPdf, setLastGeneratedPdf] = useState<{
    url: string;
    fileName: string;
    mode: 'personal_only' | 'complete';
  } | null>(null);

  // Auto-save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {
        // Ignored
      }
    }
  }, [data]);

  const handleChange = (field: keyof StudentRegistrationData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveSignature = (role: 'eleve' | 'tuteur', dataUrl: string) => {
    if (role === 'eleve') {
      setData((prev) => ({ ...prev, signatureEleve: dataUrl }));
    } else {
      setData((prev) => ({ ...prev, signatureTuteur: dataUrl }));
    }
  };

  const handleClearSignature = (role: 'eleve' | 'tuteur') => {
    if (role === 'eleve') {
      setData((prev) => ({ ...prev, signatureEleve: undefined }));
    } else {
      setData((prev) => ({ ...prev, signatureTuteur: undefined }));
    }
  };

  // Get current city/option selected for a school in UI
  const getSchoolConfig = (school: SchoolItem) => {
    const temp = schoolConfigs[school.id];
    if (temp) return temp;
    const existing = data.selectedChoices.find((c) => c.schoolId === school.id);
    if (existing) {
      return { city: existing.city, option: existing.option };
    }
    return {
      city: school.villes[0] || '',
      option: school.options && school.options.length > 0 ? school.options[0] : 'Tronc commun',
    };
  };

  const updateSchoolConfig = (schoolId: string, city: string, option: string) => {
    setSchoolConfigs((prev) => ({
      ...prev,
      [schoolId]: { city, option },
    }));
  };

  // Add a specific choice (school + specialty + city)
  const handleAddChoice = (school: SchoolItem, option: string, city: string) => {
    const exists = data.selectedChoices.some(
      (c) => c.schoolId === school.id && c.option === option && c.city === city
    );

    if (exists) {
      return;
    }

    const newChoice: SchoolChoice = {
      id: `${school.id}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      schoolId: school.id,
      schoolName: school.name,
      category: school.category,
      categoryLabel: school.categoryLabel,
      city,
      option,
    };

    const updatedChoices = [...data.selectedChoices, newChoice];

    setData((prev) => ({
      ...prev,
      selectedChoices: updatedChoices,
      selectedSchoolName: updatedChoices[0]?.schoolName || '',
      selectedCity: updatedChoices[0]?.city || '',
      selectedOption: updatedChoices[0]?.option || '',
    }));
  };

  // Remove a specific choice by its unique ID
  const handleRemoveChoiceById = (choiceId: string) => {
    const updatedChoices = data.selectedChoices.filter((c) => c.id !== choiceId);
    setData((prev) => ({
      ...prev,
      selectedChoices: updatedChoices,
      selectedSchoolName: updatedChoices[0]?.schoolName || '',
      selectedCity: updatedChoices[0]?.city || '',
      selectedOption: updatedChoices[0]?.option || '',
    }));
  };

  // Remove all choices associated with a school
  const handleRemoveAllChoicesForSchool = (schoolId: string) => {
    const updatedChoices = data.selectedChoices.filter((c) => c.schoolId !== schoolId);
    setData((prev) => ({
      ...prev,
      selectedChoices: updatedChoices,
      selectedSchoolName: updatedChoices[0]?.schoolName || '',
      selectedCity: updatedChoices[0]?.city || '',
      selectedOption: updatedChoices[0]?.option || '',
    }));
  };

  // Check choices for a given school
  const getSchoolChoices = (schoolId: string) => {
    return data.selectedChoices.filter((c) => c.schoolId === schoolId);
  };

  const handleResetForm = () => {
    if (window.confirm('Voulez-vous réinitialiser tous les champs et choix du formulaire ?')) {
      setData(emptyRegistrationData);
      setSchoolConfigs({});
      setLastGeneratedPdf(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  };

  // Reliable Direct PDF Download function (Page-by-page rendering)
  const handleDownloadPdf = async (mode: 'personal_only' | 'complete') => {
    setPdfModeForExport(mode);
    setIsGeneratingPdf(true);

    const fileName = mode === 'personal_only'
      ? `Fiche_Renseignements_${data.codeMassar || 'Candidat'}.pdf`
      : `Dossier_Candidature_Orientation_${data.codeMassar || '2026'}.pdf`;

    // Wait a brief layout tick so the hidden element updates its mode
    await new Promise((resolve) => setTimeout(resolve, 80));

    const result = await downloadElementAsPdf(
      'official-printable-sheet-export-source',
      fileName,
      setIsGeneratingPdf
    );

    if (result.success && result.blobUrl) {
      setLastGeneratedPdf({
        url: result.blobUrl,
        fileName,
        mode,
      });
    }
  };

  // Filter schools based on category and live search
  const filteredSchools = catalogSchools.filter((school) => {
    const matchesCategory = selectedCatId === 'all' || school.category === selectedCatId;
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase().trim();
    const matchesName = school.name.toLowerCase().includes(q);
    const matchesCategoryLabel = school.categoryLabel.toLowerCase().includes(q);
    const matchesCity = school.villes.some((v) => v.toLowerCase().includes(q));
    const matchesOption = school.options?.some((opt) => opt.toLowerCase().includes(q));
    const matchesDesc = school.description.toLowerCase().includes(q);

    return matchesName || matchesCategoryLabel || matchesCity || matchesOption || matchesDesc;
  });

  return (
    <section className="py-8 sm:py-14 px-3 sm:px-8 lg:px-12 bg-[#FBF9F5] dark:bg-[#131D12] text-[#243324] dark:text-[#F4EFE6] transition-colors duration-400 min-h-screen">
      {/* Hidden dedicated export source node - ALWAYS available in DOM */}
      <div
        className="sr-only pointer-events-none"
        aria-hidden="true"
        style={{ position: 'fixed', left: '-9999px', top: '0', zIndex: -100 }}
      >
        <div id="official-printable-sheet-export-source">
          <OfficialPrintableSheet data={data} mode={pdfModeForExport} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Step Tabs Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 rounded-2xl bg-white dark:bg-[#1A2819] border border-[#243324]/10 dark:border-white/10 shadow-xs">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveStep('personnel')}
              className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeStep === 'personnel'
                  ? 'bg-[#3B4D36] dark:bg-[#4A6D47] text-white shadow-xs'
                  : 'text-[#4A5D44] dark:text-[#CBD7C7] hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <User className="w-4 h-4" />
              <span>1. Fiche Personnelle & Signature</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveStep('ecole')}
              className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeStep === 'ecole'
                  ? 'bg-[#3B4D36] dark:bg-[#4A6D47] text-white shadow-xs'
                  : 'text-[#4A5D44] dark:text-[#CBD7C7] hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>2. Choix des Écoles & Spécialités</span>
              {data.selectedChoices.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-400 text-[#131D12] text-[10px] font-bold">
                  {data.selectedChoices.length} choix
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveStep('apercu')}
              className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeStep === 'apercu'
                  ? 'bg-[#3B4D36] dark:bg-[#4A6D47] text-white shadow-xs'
                  : 'text-[#4A5D44] dark:text-[#CBD7C7] hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>3. Aperçu & Télécharger PDF</span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-[#243324]/10 dark:border-white/10">
            <button
              type="button"
              onClick={handleResetForm}
              title="Effacer et réinitialiser"
              className="px-3 py-2 text-xs font-medium text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Effacer tout</span>
            </button>
          </div>
        </div>

        {/* Success Alert Banner if PDF was generated */}
        {lastGeneratedPdf && (
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/40 text-emerald-950 dark:text-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-bold">
                  Votre fichier PDF a été généré avec succès sans coupure !
                </p>
                <p className="text-[11px] text-emerald-800 dark:text-emerald-300">
                  {lastGeneratedPdf.fileName} • Page A4 paginée et structurée.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={lastGeneratedPdf.url}
                download={lastGeneratedPdf.fileName}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Télécharger directement</span>
              </a>
              <a
                href={lastGeneratedPdf.url}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl border border-emerald-600/40 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/40 text-xs font-semibold flex items-center gap-1 text-emerald-900 dark:text-emerald-100"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Ouvrir</span>
              </a>
            </div>
          </div>
        )}

        {/* STEP 1: FICHE D'INFORMATIONS PERSONNELLES & PARENTS */}
        {activeStep === 'personnel' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Header banner */}
            <div className="p-6 sm:p-8 rounded-[2rem] bg-white dark:bg-[#1A2819] border border-[#243324]/10 dark:border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-[#F5F2EB] dark:bg-[#152214] border border-[#243324]/10 dark:border-white/10 p-1.5 items-center justify-center shrink-0 shadow-xs">
                  <OfficialLogo size={48} />
                </div>
                <div className="space-y-1">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-600/10 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                    IKIPAS • وثيقة رسمية للتسجيل والتوجيه
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F2B1D] dark:text-[#F4EFE6]">
                    Renseignements sur l'Élève & les Parents
                  </h2>
                  <p className="text-xs sm:text-sm text-[#4A5D44] dark:text-[#CBD7C7] font-light">
                    Remplissez vos informations ci-dessous. Vous pouvez également apposer votre signature électronique directement depuis votre téléphone ou ordinateur.
                  </p>
                </div>
              </div>

              {/* Direct PDF Download button for personal info */}
              <button
                type="button"
                onClick={() => handleDownloadPdf('personal_only')}
                disabled={isGeneratingPdf}
                className="self-start md:self-center px-4 sm:px-5 py-2.5 rounded-full bg-[#3B4D36] dark:bg-[#4A6D47] text-white hover:bg-[#2C3B28] text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-md shrink-0"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Génération du PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Télécharger la Fiche (PDF)</span>
                  </>
                )}
              </button>
            </div>

            {/* Form Box 1: Informations du Candidat */}
            <div className="p-6 sm:p-8 rounded-[2rem] bg-white dark:bg-[#1A2819] border border-[#243324]/10 dark:border-white/10 shadow-sm space-y-6">
              <h3 className="font-display text-lg font-bold text-[#1F2B1D] dark:text-[#F4EFE6] border-b border-[#243324]/10 dark:border-white/10 pb-3 flex items-center gap-2">
                <User className="w-5 h-5 text-[#3B4D36] dark:text-[#CBD7C7]" />
                <span>Informations Personnelles de l'Élève (معلومات التلميذ)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#4A5D44] dark:text-[#CBD7C7] mb-1.5">
                    Nom et Prénom (en français) *
                  </label>
                  <input
                    type="text"
                    value={data.nomPrenom}
                    onChange={(e) => handleChange('nomPrenom', e.target.value)}
                    placeholder="Votre nom et prénom"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243324]/15 dark:border-white/15 bg-[#FBF9F5] dark:bg-[#152214] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#3B4D36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A5D44] dark:text-[#CBD7C7] mb-1.5 text-right" dir="rtl">
                    الاسم والنسب (بالعربية) *
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    value={data.nomPrenomAr}
                    onChange={(e) => handleChange('nomPrenomAr', e.target.value)}
                    placeholder="الاسم العائلي والشخصي"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243324]/15 dark:border-white/15 bg-[#FBF9F5] dark:bg-[#152214] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#3B4D36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A5D44] dark:text-[#CBD7C7] mb-1.5">
                    Code Massar (رقم مسار) *
                  </label>
                  <input
                    type="text"
                    value={data.codeMassar}
                    onChange={(e) => handleChange('codeMassar', e.target.value.toUpperCase())}
                    placeholder="Ex: G134567890"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243324]/15 dark:border-white/15 bg-[#FBF9F5] dark:bg-[#152214] text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#3B4D36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A5D44] dark:text-[#CBD7C7] mb-1.5">
                    N° CIN (رقم البطاقة الوطنية)
                  </label>
                  <input
                    type="text"
                    value={data.cin}
                    onChange={(e) => handleChange('cin', e.target.value.toUpperCase())}
                    placeholder="Ex: AB123456"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243324]/15 dark:border-white/15 bg-[#FBF9F5] dark:bg-[#152214] text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#3B4D36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A5D44] dark:text-[#CBD7C7] mb-1.5">
                    Date de Naissance
                  </label>
                  <input
                    type="date"
                    value={data.dateNaissance}
                    onChange={(e) => handleChange('dateNaissance', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243324]/15 dark:border-white/15 bg-[#FBF9F5] dark:bg-[#152214] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#3B4D36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A5D44] dark:text-[#CBD7C7] mb-1.5">
                    Lieu de Naissance (Ville)
                  </label>
                  <input
                    type="text"
                    value={data.lieuNaissance}
                    onChange={(e) => handleChange('lieuNaissance', e.target.value)}
                    placeholder="Ville de naissance"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243324]/15 dark:border-white/15 bg-[#FBF9F5] dark:bg-[#152214] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#3B4D36]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#4A5D44] dark:text-[#CBD7C7] mb-1.5">
                    Adresse Résidentielle Complète
                  </label>
                  <input
                    type="text"
                    value={data.adresse}
                    onChange={(e) => handleChange('adresse', e.target.value)}
                    placeholder="Adresse de résidence de l'élève"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243324]/15 dark:border-white/15 bg-[#FBF9F5] dark:bg-[#152214] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#3B4D36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A5D44] dark:text-[#CBD7C7] mb-1.5">
                    Ville de résidence
                  </label>
                  <input
                    type="text"
                    value={data.ville}
                    onChange={(e) => handleChange('ville', e.target.value)}
                    placeholder="Ville actuelle"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243324]/15 dark:border-white/15 bg-[#FBF9F5] dark:bg-[#152214] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#3B4D36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A5D44] dark:text-[#CBD7C7] mb-1.5">
                    Téléphone Candidat
                  </label>
                  <input
                    type="tel"
                    value={data.telephone}
                    onChange={(e) => handleChange('telephone', e.target.value)}
                    placeholder="06... ou 07..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243324]/15 dark:border-white/15 bg-[#FBF9F5] dark:bg-[#152214] text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#3B4D36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A5D44] dark:text-[#CBD7C7] mb-1.5">
                    N° WhatsApp (pour notifications)
                  </label>
                  <input
                    type="tel"
                    value={data.whatsapp}
                    onChange={(e) => handleChange('whatsapp', e.target.value)}
                    placeholder="06..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243324]/15 dark:border-white/15 bg-[#FBF9F5] dark:bg-[#152214] text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#3B4D36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A5D44] dark:text-[#CBD7C7] mb-1.5">
                    Adresse E-mail
                  </label>
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="votre.email@domaine.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243324]/15 dark:border-white/15 bg-[#FBF9F5] dark:bg-[#152214] text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#3B4D36]"
                  />
                </div>
              </div>
            </div>

            {/* Form Box 2: Scolarité & Résultats du Bac */}
            <div className="p-6 sm:p-8 rounded-[2rem] bg-white dark:bg-[#1A2819] border border-[#243324]/10 dark:border-white/10 shadow-sm space-y-6">
              <h3 className="font-display text-lg font-bold text-[#1F2B1D] dark:text-[#F4EFE6] border-b border-[#243324]/10 dark:border-white/10 pb-3 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#3B4D36] dark:text-[#CBD7C7]" />
                <span>Scolarité Actuelle & Résultats du Baccalauréat (المسار الدراسي)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#4A5D44] dark:text-[#CBD7C7] mb-1.5">
                    Lycée Actuel
                  </label>
                  <input
                    type="text"
                    value={data.lyceeActuel}
                    onChange={(e) => handleChange('lyceeActuel', e.target.value)}
                    placeholder="Nom du lycée"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243324]/15 dark:border-white/15 bg-[#FBF9F5] dark:bg-[#152214] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#3B4D36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A5D44] dark:text-[#CBD7C7] mb-1.5">
                    Filière du Baccalauréat
                  </label>
                  <select
                    value={data.filiereBac}
                    onChange={(e) => handleChange('filiereBac', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243324]/15 dark:border-white/15 bg-[#FBF9F5] dark:bg-[#152214] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#3B4D36]"
                  >
                    <option value="">-- Choisissez votre filière --</option>
                    <option value="Sciences Mathématiques A">Sciences Mathématiques A</option>
                    <option value="Sciences Mathématiques B">Sciences Mathématiques B</option>
                    <option value="Sciences Physiques - Chimie (PC)">Sciences Physiques - Chimie (PC)</option>
                    <option value="Sciences de la Vie et de la Terre (SVT)">Sciences de la Vie et de la Terre (SVT)</option>
                    <option value="Sciences et Technologies Électriques (STE)">Sciences et Technologies Électriques (STE)</option>
                    <option value="Sciences et Technologies Mécaniques (STM)">Sciences et Technologies Mécaniques (STM)</option>
                    <option value="Sciences Économiques">Sciences Économiques</option>
                    <option value="Techniques de Gestion et Comptabilité (TGC)">Techniques de Gestion et Comptabilité (TGC)</option>
                    <option value="Lettres et Sciences Humaines">Lettres et Sciences Humaines</option>
                    <option value="Baccalauréat International (BIOF)">Baccalauréat International (BIOF)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A5D44] dark:text-[#CBD7C7] mb-1.5">
                    Note Examen Régional (1ère Bac)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="20"
                    value={data.noteRegional}
                    onChange={(e) => handleChange('noteRegional', e.target.value)}
                    placeholder="Ex: 16.50"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243324]/15 dark:border-white/15 bg-[#FBF9F5] dark:bg-[#152214] text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#3B4D36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A5D44] dark:text-[#CBD7C7] mb-1.5">
                    Moyenne Contrôle Continu
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="20"
                    value={data.noteControleContinu}
                    onChange={(e) => handleChange('noteControleContinu', e.target.value)}
                    placeholder="Ex: 17.20"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243324]/15 dark:border-white/15 bg-[#FBF9F5] dark:bg-[#152214] text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#3B4D36]"
                  />
                </div>
              </div>
            </div>

            {/* Form Box 3: Informations des Parents & Tuteur */}
            <div className="p-6 sm:p-8 rounded-[2rem] bg-white dark:bg-[#1A2819] border border-[#243324]/10 dark:border-white/10 shadow-sm space-y-6">
              <h3 className="font-display text-lg font-bold text-[#1F2B1D] dark:text-[#F4EFE6] border-b border-[#243324]/10 dark:border-white/10 pb-3 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#3B4D36] dark:text-[#CBD7C7]" />
                <span>Informations des Parents et Tuteur (معلومات الوالدين والولي)</span>
              </h3>

              {/* Père */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FBF9F5] dark:bg-[#152214] border border-[#243324]/5 dark:border-white/5 space-y-4">
                <span className="text-xs font-bold text-[#3B4D36] dark:text-[#A3B59E] uppercase tracking-wider block">
                  Informations du Père (الأب)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A5D44] dark:text-[#CBD7C7] mb-1">
                      Nom et Prénom du Père
                    </label>
                    <input
                      type="text"
                      value={data.nomPere}
                      onChange={(e) => handleChange('nomPere', e.target.value)}
                      placeholder="Nom complet du père"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#243324]/15 dark:border-white/15 bg-white dark:bg-[#1C2C1B] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#3B4D36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A5D44] dark:text-[#CBD7C7] mb-1">
                      Profession du Père
                    </label>
                    <input
                      type="text"
                      value={data.professionPere}
                      onChange={(e) => handleChange('professionPere', e.target.value)}
                      placeholder="Fonction / Métier"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#243324]/15 dark:border-white/15 bg-white dark:bg-[#1C2C1B] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#3B4D36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A5D44] dark:text-[#CBD7C7] mb-1">
                      Téléphone du Père
                    </label>
                    <input
                      type="tel"
                      value={data.telPere}
                      onChange={(e) => handleChange('telPere', e.target.value)}
                      placeholder="06... ou 05..."
                      className="w-full px-3.5 py-2 rounded-xl border border-[#243324]/15 dark:border-white/15 bg-white dark:bg-[#1C2C1B] text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#3B4D36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A5D44] dark:text-[#CBD7C7] mb-1">
                      E-mail du Père
                    </label>
                    <input
                      type="email"
                      value={data.emailPere}
                      onChange={(e) => handleChange('emailPere', e.target.value)}
                      placeholder="email.pere@domaine.com"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#243324]/15 dark:border-white/15 bg-white dark:bg-[#1C2C1B] text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#3B4D36]"
                    />
                  </div>
                </div>
              </div>

              {/* Mère */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FBF9F5] dark:bg-[#152214] border border-[#243324]/5 dark:border-white/5 space-y-4">
                <span className="text-xs font-bold text-[#3B4D36] dark:text-[#A3B59E] uppercase tracking-wider block">
                  Informations de la Mère (الأم)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A5D44] dark:text-[#CBD7C7] mb-1">
                      Nom et Prénom de la Mère
                    </label>
                    <input
                      type="text"
                      value={data.nomMere}
                      onChange={(e) => handleChange('nomMere', e.target.value)}
                      placeholder="Nom complet de la mère"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#243324]/15 dark:border-white/15 bg-white dark:bg-[#1C2C1B] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#3B4D36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A5D44] dark:text-[#CBD7C7] mb-1">
                      Profession de la Mère
                    </label>
                    <input
                      type="text"
                      value={data.professionMere}
                      onChange={(e) => handleChange('professionMere', e.target.value)}
                      placeholder="Fonction / Métier"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#243324]/15 dark:border-white/15 bg-white dark:bg-[#1C2C1B] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#3B4D36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A5D44] dark:text-[#CBD7C7] mb-1">
                      Téléphone de la Mère
                    </label>
                    <input
                      type="tel"
                      value={data.telMere}
                      onChange={(e) => handleChange('telMere', e.target.value)}
                      placeholder="06... ou 05..."
                      className="w-full px-3.5 py-2 rounded-xl border border-[#243324]/15 dark:border-white/15 bg-white dark:bg-[#1C2C1B] text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#3B4D36]"
                    />
                  </div>
                </div>
              </div>

              {/* Tuteur & Couverture Médicale */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-[#4A5D44] dark:text-[#CBD7C7] mb-1.5">
                    Tuteur Légal de l'élève (الولي الشرعي)
                  </label>
                  <select
                    value={data.tuteurType}
                    onChange={(e) => handleChange('tuteurType', e.target.value as 'pere' | 'mere' | 'autre')}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243324]/15 dark:border-white/15 bg-[#FBF9F5] dark:bg-[#152214] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#3B4D36]"
                  >
                    <option value="pere">Le Père (الأب)</option>
                    <option value="mere">La Mère (الأم)</option>
                    <option value="autre">Autre tuteur légal (ولي آخر)</option>
                  </select>

                  {data.tuteurType === 'autre' && (
                    <input
                      type="text"
                      value={data.nomTuteur}
                      onChange={(e) => handleChange('nomTuteur', e.target.value)}
                      placeholder="Nom complet du tuteur"
                      className="mt-2 w-full px-4 py-2 rounded-xl border border-[#243324]/15 dark:border-white/15 bg-[#FBF9F5] dark:bg-[#152214] text-xs sm:text-sm"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A5D44] dark:text-[#CBD7C7] mb-1.5">
                    Couverture Médicale (التغطية الصحية)
                  </label>
                  <select
                    value={data.couvertureMedicale}
                    onChange={(e) => handleChange('couvertureMedicale', e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243324]/15 dark:border-white/15 bg-[#FBF9F5] dark:bg-[#152214] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#3B4D36]"
                  >
                    <option value="CNOPS">CNOPS (الصندوق الوطني لمنظمات الاحتياط الاجتماعي)</option>
                    <option value="CNSS">CNSS (الصندوق الوطني للضمان الاجتماعي / AMO)</option>
                    <option value="FAR">FAR (القوات المسلحة الملكية / Mutuelle FAR)</option>
                    <option value="AUTRE">Autre assurance médicale privée</option>
                    <option value="AUCUNE">Sans couverture médicale déclarée</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Form Box 4: Signatures Électroniques (التوقيع الإلكتروني من الهاتف أو الحاسوب) */}
            <div className="p-6 sm:p-8 rounded-[2rem] bg-white dark:bg-[#1A2819] border border-[#243324]/10 dark:border-white/10 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#243324]/10 dark:border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <PenTool className="w-5 h-5 text-[#3B4D36] dark:text-[#CBD7C7]" />
                  <h3 className="font-display text-lg font-bold text-[#1F2B1D] dark:text-[#F4EFE6]">
                    Signatures Électroniques (التوقيع الإلكتروني)
                  </h3>
                </div>
                <span className="text-xs text-[#657351] dark:text-[#A3B59E]">
                  Tracer avec le doigt sur smartphone ou la souris sur PC
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* 1. Candidate Signature Card */}
                <div className="p-5 rounded-2xl bg-[#FBF9F5] dark:bg-[#152214] border border-[#243324]/10 dark:border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#3B4D36] dark:text-[#A3B59E] uppercase tracking-wider">
                      Signature de l'Élève (توقيع التلميذ)
                    </span>
                    {data.signatureEleve && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Signé</span>
                      </span>
                    )}
                  </div>

                  <div className="h-28 rounded-xl bg-white dark:bg-[#1C2C1B] border border-dashed border-[#243324]/20 dark:border-white/20 flex flex-col items-center justify-center p-2 relative overflow-hidden">
                    {data.signatureEleve ? (
                      <img
                        src={data.signatureEleve}
                        alt="Signature élève"
                        className="max-h-20 max-w-full object-contain"
                      />
                    ) : (
                      <div className="text-center text-gray-400 space-y-1">
                        <PenTool className="w-6 h-6 mx-auto stroke-1" />
                        <span className="text-[11px] block">Aucune signature enregistrée</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSignatureModalRole('eleve')}
                      className="flex-1 py-2 rounded-xl bg-[#3B4D36] dark:bg-[#4A6D47] text-white hover:bg-[#2C3B28] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      <span>{data.signatureEleve ? 'Modifier la signature' : 'Signer maintenant'}</span>
                    </button>

                    {data.signatureEleve && (
                      <button
                        type="button"
                        onClick={() => handleClearSignature('eleve')}
                        className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-medium cursor-pointer"
                        title="Effacer la signature"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. Guardian Signature Card */}
                <div className="p-5 rounded-2xl bg-[#FBF9F5] dark:bg-[#152214] border border-[#243324]/10 dark:border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#3B4D36] dark:text-[#A3B59E] uppercase tracking-wider">
                      Signature du Tuteur (توقيع ولي الأمر)
                    </span>
                    {data.signatureTuteur && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Signé</span>
                      </span>
                    )}
                  </div>

                  <div className="h-28 rounded-xl bg-white dark:bg-[#1C2C1B] border border-dashed border-[#243324]/20 dark:border-white/20 flex flex-col items-center justify-center p-2 relative overflow-hidden">
                    {data.signatureTuteur ? (
                      <img
                        src={data.signatureTuteur}
                        alt="Signature tuteur"
                        className="max-h-20 max-w-full object-contain"
                      />
                    ) : (
                      <div className="text-center text-gray-400 space-y-1">
                        <PenTool className="w-6 h-6 mx-auto stroke-1" />
                        <span className="text-[11px] block">Accord et visa du tuteur</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSignatureModalRole('tuteur')}
                      className="flex-1 py-2 rounded-xl bg-[#3B4D36] dark:bg-[#4A6D47] text-white hover:bg-[#2C3B28] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      <span>{data.signatureTuteur ? 'Modifier la signature' : 'Signer (Tuteur)'}</span>
                    </button>

                    {data.signatureTuteur && (
                      <button
                        type="button"
                        onClick={() => handleClearSignature('tuteur')}
                        className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-medium cursor-pointer"
                        title="Effacer la signature"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Navigation Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
              <button
                type="button"
                onClick={() => handleDownloadPdf('personal_only')}
                disabled={isGeneratingPdf}
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#3B4D36] text-[#3B4D36] dark:text-[#CBD7C7] hover:bg-[#3B4D36]/10 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger directement cette fiche (PDF)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveStep('ecole')}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#3B4D36] dark:bg-[#4A6D47] text-white hover:bg-[#2C3B28] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <span>Passer au choix des écoles & spécialités</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: CHOIX DES ÉCOLES & SPÉCIALITÉS (MULTI-ÉCOLES & SÉLECTION LIBRE) */}
        {activeStep === 'ecole' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Header banner */}
            <div className="p-6 sm:p-8 rounded-[2rem] bg-white dark:bg-[#1A2819] border border-[#243324]/10 dark:border-white/10 shadow-sm space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-600/10 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                  Sélection Multi-Écoles & Spécialités
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#3B4D36] text-white">
                  {data.selectedChoices.length} choix validé(s)
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F2B1D] dark:text-[#F4EFE6]">
                Choisissez vos Écoles et Spécialités Souhaitées
              </h2>
              <p className="text-xs sm:text-sm text-[#4A5D44] dark:text-[#CBD7C7] font-light leading-relaxed">
                Toutes les écoles sont à votre disposition ci-dessous. Cliquez sur n'importe quel établissement de votre choix pour voir ses filières et ses villes, sélectionnez la spécialité souhaitée et ajoutez-la à votre dossier. Vous pouvez choisir autant d'écoles et de filières que vous le souhaitez.
              </p>
            </div>

            {/* List of currently selected schools summary box */}
            {data.selectedChoices.length > 0 && (
              <div className="p-5 sm:p-6 rounded-[2rem] bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-950 dark:text-emerald-100 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                  <div className="flex items-center gap-2">
                    <ListOrdered className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                    <h3 className="font-bold text-sm sm:text-base">
                      Mes Candidatures & Spécialités Retenues ({data.selectedChoices.length})
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveStep('apercu')}
                    className="text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Voir le document A4 prêt</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.selectedChoices.map((choice, idx) => (
                    <div
                      key={choice.id || idx}
                      className="p-3.5 rounded-xl bg-white dark:bg-[#1E2D1D] border border-emerald-500/30 shadow-xs flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-emerald-700 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="font-bold text-[#1F2B1D] dark:text-[#F4EFE6] truncate">
                            {choice.schoolName}
                          </span>
                        </div>
                        <div className="pl-7 text-[11px] space-y-0.5">
                          <p className="text-emerald-700 dark:text-emerald-300 font-semibold truncate">
                            • Filière : {choice.option}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span>Ville : {choice.city}</span>
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveChoiceById(choice.id)}
                        title="Retirer ce choix"
                        className="p-2 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search & Filter Controls */}
            <div className="space-y-4 p-5 rounded-2xl bg-white dark:bg-[#1A2819] border border-[#243324]/10 dark:border-white/10 shadow-xs">
              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher par école, spécialité (informatique, médecine, finance, architecture...), ville (Rabat, Casablanca...)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#243324]/15 dark:border-white/15 bg-[#FBF9F5] dark:bg-[#152214] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#3B4D36]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Categories filter pills */}
              <div>
                <span className="text-[11px] font-bold text-[#657351] dark:text-[#A3B59E] uppercase tracking-wider block mb-2">
                  Filtrer par filière ou domaine :
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCatId('all')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedCatId === 'all'
                        ? 'bg-[#3B4D36] dark:bg-[#4A6D47] text-white shadow-xs'
                        : 'bg-[#FBF9F5] dark:bg-[#152214] text-[#4A5D44] dark:text-[#CBD7C7] hover:bg-[#F2ECE0] border border-[#243324]/10 dark:border-white/10'
                    }`}
                  >
                    Toutes les écoles ({catalogSchools.length})
                  </button>
                  {SCHOOL_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCatId(cat.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        selectedCatId === cat.id
                          ? 'bg-[#3B4D36] dark:bg-[#4A6D47] text-white shadow-xs'
                          : 'bg-[#FBF9F5] dark:bg-[#152214] text-[#4A5D44] dark:text-[#CBD7C7] hover:bg-[#F2ECE0] border border-[#243324]/10 dark:border-white/10'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* All Schools in Catalog - Interactive Cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#657351] dark:text-[#A3B59E] uppercase tracking-wider">
                  Établissements disponibles ({filteredSchools.length}) :
                </span>
                <span className="text-[11px] text-gray-500">
                  Cliquez sur une école pour choisir votre filière
                </span>
              </div>

              {filteredSchools.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-white dark:bg-[#1A2819] border border-[#243324]/10 dark:border-white/10 text-gray-500">
                  Aucun établissement ne correspond à votre recherche « {searchQuery} ».
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {filteredSchools.map((school) => {
                    const schoolChoices = getSchoolChoices(school.id);
                    const isSelected = schoolChoices.length > 0;
                    const config = getSchoolConfig(school);
                    const isExpanded = activeSchoolId === school.id || isSelected;

                    return (
                      <div
                        key={school.id}
                        className={`rounded-[1.8rem] border transition-all overflow-hidden ${
                          isSelected
                            ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-500/50 shadow-sm'
                            : 'bg-white dark:bg-[#1A2819] border-[#243324]/10 dark:border-white/10 hover:border-[#3B4D36]/40'
                        }`}
                      >
                        {/* School Card Header - Clickable */}
                        <div
                          onClick={() => setActiveSchoolId(activeSchoolId === school.id ? null : school.id)}
                          className="p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="space-y-1.5 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#3B4D36]/10 dark:bg-white/10 text-[#3B4D36] dark:text-[#CBD7C7]">
                                {school.categoryLabel}
                              </span>
                              <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
                                {school.diplome} • {school.duree}
                              </span>
                              {isSelected && (
                                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white flex items-center gap-1 shadow-xs">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>{schoolChoices.length} filière(s) sélectionnée(s)</span>
                                </span>
                              )}
                            </div>

                            <h4 className="font-display text-base sm:text-lg font-bold text-[#1F2B1D] dark:text-[#F4EFE6]">
                              {school.name}
                            </h4>

                            {school.conditionsAcces && (
                              <div className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/20 inline-block">
                                <strong>Conditions d'accès : </strong>{school.conditionsAcces}
                              </div>
                            )}

                            {school.inscriptionUrl && (
                              <div className="text-[11px] text-blue-600 dark:text-blue-400">
                                <a
                                  href={school.inscriptionUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-1 hover:underline font-medium"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  <span>Portail officiel de candidature</span>
                                </a>
                              </div>
                            )}

                            <p className="text-xs text-[#4A5D44] dark:text-[#CBD7C7] font-light leading-relaxed">
                              {school.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                            {isSelected && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveAllChoicesForSchool(school.id);
                                }}
                                className="px-3 py-1.5 rounded-xl text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Tout retirer</span>
                              </button>
                            )}

                            <span className="text-xs font-semibold text-[#3B4D36] dark:text-[#CBD7C7] flex items-center gap-1">
                              <span>{isExpanded ? 'Réduire' : 'Choisir la filière'}</span>
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </span>
                          </div>
                        </div>

                        {/* Interactive Specialty & City Selector Panel */}
                        {isExpanded && (
                          <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#243324]/10 dark:border-white/10 space-y-5 bg-[#FBF9F5]/50 dark:bg-black/20">
                            {/* 1. Select City / Campus */}
                            <div>
                              <label className="block text-xs font-bold text-[#3B4D36] dark:text-[#CBD7C7] mb-2 flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5" />
                                <span>1. Choisissez la Ville / Centre d'examen ou d'études :</span>
                              </label>

                              <div className="flex flex-wrap gap-2">
                                {school.villes.map((ville) => {
                                  const isCityActive = config.city === ville;
                                  return (
                                    <button
                                      key={ville}
                                      type="button"
                                      onClick={() => updateSchoolConfig(school.id, ville, config.option)}
                                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                                        isCityActive
                                          ? 'bg-[#3B4D36] dark:bg-[#4A6D47] text-white font-bold shadow-xs'
                                          : 'bg-white dark:bg-[#1C2C1B] text-[#4A5D44] dark:text-[#CBD7C7] border border-[#243324]/10 dark:border-white/10 hover:border-[#3B4D36]'
                                      }`}
                                    >
                                      {ville}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* 2. Select Specialty / Filière */}
                            <div>
                              <label className="block text-xs font-bold text-[#3B4D36] dark:text-[#CBD7C7] mb-2 flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                <span>2. Choisissez la Spécialité / Filière souhaitée :</span>
                              </label>

                              {school.options && school.options.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                                  {school.options.map((option) => {
                                    const isChosen = schoolChoices.some(
                                      (c) => c.option === option && c.city === config.city
                                    );
                                    const isCurrentConfigOption = config.option === option;

                                    return (
                                      <button
                                        key={option}
                                        type="button"
                                        onClick={() => {
                                          updateSchoolConfig(school.id, config.city, option);
                                          handleAddChoice(school, option, config.city);
                                        }}
                                        className={`p-3 rounded-xl text-left transition-all cursor-pointer flex items-center justify-between gap-2 border text-xs ${
                                          isChosen
                                            ? 'bg-emerald-600 text-white font-bold border-emerald-700 shadow-xs'
                                            : isCurrentConfigOption
                                            ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-semibold'
                                            : 'bg-white dark:bg-[#1C2C1B] border-[#243324]/10 dark:border-white/10 text-[#243324] dark:text-[#F4EFE6] hover:border-[#3B4D36]'
                                        }`}
                                      >
                                        <span className="truncate">{option}</span>
                                        {isChosen ? (
                                          <CheckCircle2 className="w-4 h-4 shrink-0 text-white" />
                                        ) : (
                                          <Plus className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="flex items-center gap-3">
                                  <span className="text-xs text-gray-600 dark:text-gray-300">
                                    Tronc commun / Cursus standard unique
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => handleAddChoice(school, 'Tronc commun', config.city)}
                                    className="px-4 py-2 rounded-xl bg-[#3B4D36] dark:bg-[#4A6D47] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>Ajouter ce choix ({config.city})</span>
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Summary of choices made for this school */}
                            {schoolChoices.length > 0 && (
                              <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-[#243324]/10 dark:border-white/10">
                                <span className="text-[11px] font-bold text-gray-500">
                                  Filières déjà retenues pour {school.name} :
                                </span>
                                {schoolChoices.map((c) => (
                                  <span
                                    key={c.id}
                                    className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-[11px] font-semibold flex items-center gap-1.5"
                                  >
                                    <span>{c.option} ({c.city})</span>
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveChoiceById(c.id)}
                                      className="text-emerald-700 hover:text-rose-600 cursor-pointer"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#243324]/10 dark:border-white/10">
              <button
                type="button"
                onClick={() => setActiveStep('personnel')}
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#243324]/15 text-[#1F2B1D] dark:text-[#F4EFE6] hover:bg-black/5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                ← Retour aux informations personnelles
              </button>

              <button
                type="button"
                onClick={() => setActiveStep('apercu')}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#3B4D36] dark:bg-[#4A6D47] text-white hover:bg-[#2C3B28] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <span>Aperçu de la fiche officielle ({data.selectedChoices.length} choix)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: APERÇU OFFICIEL & TÉLÉCHARGEMENT PDF */}
        {activeStep === 'apercu' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Action Bar */}
            <div className="p-6 sm:p-8 rounded-[2rem] bg-white dark:bg-[#1A2819] border border-[#243324]/10 dark:border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-[#F5F2EB] dark:bg-[#152214] border border-[#243324]/10 dark:border-white/10 p-1.5 items-center justify-center shrink-0 shadow-xs">
                  <OfficialLogo size={48} />
                </div>
                <div className="space-y-1">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-600/10 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                    IKIPAS • وثيقة معتمدة ومطابقة للمواصفات
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F2B1D] dark:text-[#F4EFE6]">
                    Aperçu de votre Fiche Officielle
                  </h2>
                  <p className="text-xs sm:text-sm text-[#4A5D44] dark:text-[#CBD7C7] font-light">
                    Ce document contient vos informations déclarées, vos {data.selectedChoices.length} choix d'écoles, et vos signatures électroniques. Chaque page A4 est calibrée sans coupure.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleDownloadPdf('personal_only')}
                  disabled={isGeneratingPdf}
                  className="px-4 py-2.5 rounded-xl border border-[#3B4D36] text-[#3B4D36] dark:text-[#CBD7C7] hover:bg-[#3B4D36]/10 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Fiche Personnelle Seule (PDF)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDownloadPdf('complete')}
                  disabled={isGeneratingPdf}
                  className="px-5 py-2.5 rounded-xl bg-[#3B4D36] dark:bg-[#4A6D47] text-white hover:bg-[#2C3B28] text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  {isGeneratingPdf ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Téléchargement PDF...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Télécharger Dossier Complet (PDF)</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-semibold flex items-center justify-center cursor-pointer"
                  title="Imprimer / Enregistrer en PDF (Système)"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Signature Control inside Preview */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1A2819] border border-[#243324]/10 dark:border-white/10 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <PenTool className="w-5 h-5 text-[#3B4D36] dark:text-[#A3B59E]" />
                <div>
                  <span className="text-xs font-bold text-[#1F2B1D] dark:text-[#F4EFE6] block">
                    Signatures Électroniques de la fiche :
                  </span>
                  <span className="text-[11px] text-gray-500">
                    {data.signatureEleve ? '✓ Signature élève apposée' : '• Signature élève en attente'} |{' '}
                    {data.signatureTuteur ? '✓ Signature tuteur apposée' : '• Signature tuteur en attente'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSignatureModalRole('eleve')}
                  className="px-3.5 py-1.5 rounded-xl bg-[#3B4D36]/10 dark:bg-white/10 text-[#3B4D36] dark:text-[#CBD7C7] hover:bg-[#3B4D36]/20 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>{data.signatureEleve ? 'Modifier signature élève' : 'Signer (Élève)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSignatureModalRole('tuteur')}
                  className="px-3.5 py-1.5 rounded-xl bg-[#3B4D36]/10 dark:bg-white/10 text-[#3B4D36] dark:text-[#CBD7C7] hover:bg-[#3B4D36]/20 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>{data.signatureTuteur ? 'Modifier signature tuteur' : 'Signer (Tuteur)'}</span>
                </button>
              </div>
            </div>

            {/* Document Preview Box on Screen */}
            <div className="overflow-x-auto p-2 sm:p-6 rounded-[2rem] bg-gray-200/70 dark:bg-black/50 border border-[#243324]/10 dark:border-white/10">
              <OfficialPrintableSheet data={data} mode="complete" />
            </div>

            {/* Direct Advisor WhatsApp Review Banner */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-900/90 to-teal-900/90 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-md border border-emerald-400/20 text-left">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-300" />
                  <span className="font-bold text-sm text-emerald-200">
                    Faire réviser vos choix d'écoles par un conseiller sur WhatsApp
                  </span>
                </div>
                <p className="text-xs text-emerald-100/80">
                  Pr. Saad (0606799330), Pr. Mehdi (0700635666) ou Samir (0661862506) peuvent relire vos vœux d'écoles et vous orienter.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('contact')}
                className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer shadow-md shrink-0"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Consulter sur WhatsApp</span>
              </button>
            </div>

            {/* Back button and bottom actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setActiveStep('ecole')}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-[#243324]/15 text-xs sm:text-sm font-semibold hover:bg-black/5 transition-colors cursor-pointer"
              >
                ← Modifier la liste des écoles
              </button>

              <button
                type="button"
                onClick={() => handleDownloadPdf('complete')}
                disabled={isGeneratingPdf}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#3B4D36] dark:bg-[#4A6D47] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 hover:bg-[#2C3B28] transition-all cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger le Fichier PDF</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* DIGITAL SIGNATURE PAD MODAL */}
      <DigitalSignaturePad
        isOpen={signatureModalRole !== null}
        onClose={() => setSignatureModalRole(null)}
        onSave={(dataUrl) => {
          if (signatureModalRole) {
            handleSaveSignature(signatureModalRole, dataUrl);
          }
        }}
        title={
          signatureModalRole === 'eleve'
            ? "Apposer la Signature de l'Élève"
            : 'Apposer la Signature du Tuteur Légal'
        }
        signeeName={
          signatureModalRole === 'eleve'
            ? data.nomPrenom || 'Élève'
            : data.tuteurType === 'pere'
            ? data.nomPere || 'Le Père'
            : data.tuteurType === 'mere'
            ? data.nomMere || 'La Mère'
            : data.nomTuteur || 'Tuteur'
        }
        role={signatureModalRole || 'eleve'}
      />

      {/* PRINT & DOWNLOAD MODAL DIALOG */}
      <AnimatePresence>
        {printModalMode && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPrintModalMode(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-[2rem] bg-[#FBF9F5] dark:bg-[#1A2819] border border-[#243324]/20 shadow-2xl flex flex-col z-10"
            >
              {/* Modal Top bar */}
              <div className="p-4 sm:p-5 border-b border-[#243324]/10 dark:border-white/10 flex items-center justify-between bg-white dark:bg-[#152214]">
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-[#1F2B1D] dark:text-[#F4EFE6]">
                    {printModalMode === 'personal_only'
                      ? 'Fiche de Renseignements Personnels'
                      : 'Dossier Complet de Candidature'}
                  </h3>
                  <p className="text-xs text-[#657351] dark:text-[#A3B59E]">
                    {isGeneratingPdf
                      ? 'Génération et téléchargement automatique du fichier PDF en cours...'
                      : 'Document paginé en format A4 sans coupure de texte'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDownloadPdf(printModalMode)}
                    disabled={isGeneratingPdf}
                    className="px-4 py-2 rounded-xl bg-[#3B4D36] dark:bg-[#4A6D47] text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#2C3B28] transition-colors cursor-pointer shadow-sm"
                  >
                    {isGeneratingPdf ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    <span>Télécharger le Fichier PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="p-2 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-semibold flex items-center justify-center cursor-pointer"
                    title="Imprimer directement"
                  >
                    <Printer className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setPrintModalMode(null)}
                    aria-label="Fermer"
                    className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Printable Sheet Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-gray-100 dark:bg-black/50">
                <OfficialPrintableSheet data={data} mode={printModalMode} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
