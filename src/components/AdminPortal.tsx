import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  Unlock, 
  KeyRound, 
  LogOut, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  ExternalLink, 
  Check, 
  Download, 
  Upload, 
  RefreshCw, 
  Search, 
  Building2, 
  Users, 
  Globe, 
  GraduationCap, 
  Phone, 
  MessageCircle, 
  AlertCircle,
  ArrowLeft,
  Settings
} from 'lucide-react';
import { SchoolItem, AcademicAdvisor } from '../types';
import { SCHOOL_CATEGORIES } from '../data/schoolsCatalog';
import { 
  loadStoredSchools, 
  saveStoredSchools, 
  resetSchoolsToDefault, 
  loadStoredAdvisors, 
  saveStoredAdvisors, 
  exportDataBackup, 
  importDataBackup 
} from '../data/schoolsStorage';
import { OfficialLogo } from './OfficialLogo';

interface AdminPortalProps {
  onClose: () => void;
}

// Credentials defined by the admin user
const VALID_USERNAME = 'مهدي@2003';
const VALID_PASSWORD = 'Aa123456789@';
const SESSION_STORAGE_KEY = 'ikipas_admin_auth_session_token';

export const AdminPortal: React.FC<AdminPortalProps> = ({ onClose }) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(SESSION_STORAGE_KEY) === 'authenticated_true';
    }
    return false;
  });

  // Login form state
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Active admin tab: 'ecoles' | 'conseillers' | 'sauvegarde'
  const [activeTab, setActiveTab] = useState<'ecoles' | 'conseillers' | 'sauvegarde'>('ecoles');

  // Loaded data
  const [schools, setSchools] = useState<SchoolItem[]>(() => loadStoredSchools());
  const [advisors, setAdvisors] = useState<AcademicAdvisor[]>(() => loadStoredAdvisors());

  // Search & filter in schools tab
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCatFilter, setSelectedCatFilter] = useState('all');

  // School modal state (add or edit)
  const [editingSchool, setEditingSchool] = useState<SchoolItem | null>(null);
  const [isNewSchool, setIsNewSchool] = useState(false);
  const [schoolFormData, setSchoolFormData] = useState({
    id: '',
    name: '',
    category: 'ingenierie',
    categoryLabel: 'Ingénierie & Technologie',
    villesInput: '',
    optionsInput: '',
    description: '',
    duree: '5 ans',
    diplome: "Diplôme d'Ingénieur d'État",
    inscriptionUrl: '',
    conditionsAcces: '',
    seuilSelection: '',
  });

  // Advisor edit modal
  const [editingAdvisor, setEditingAdvisor] = useState<AcademicAdvisor | null>(null);
  const [advisorFormData, setAdvisorFormData] = useState({
    name: '',
    nameAr: '',
    role: '',
    roleAr: '',
    phone: '',
    whatsappNumber: '',
    specialtiesInput: '',
    bio: '',
  });

  // Alert feedback
  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setAlertSuccess(msg);
    setTimeout(() => setAlertSuccess(null), 3000);
  };

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim() === VALID_USERNAME && passwordInput.trim() === VALID_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem(SESSION_STORAGE_KEY, 'authenticated_true');
      setLoginError('');
    } else {
      setLoginError('Identifiant ou mot de passe incorrect. Veuillez réessayer.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    setUsernameInput('');
    setPasswordInput('');
  };

  // Open school modal for Add
  const handleOpenAddSchool = () => {
    setIsNewSchool(true);
    setSchoolFormData({
      id: 'ecole_' + Date.now(),
      name: '',
      category: 'ingenierie',
      categoryLabel: 'Ingénierie & Technologie',
      villesInput: 'Rabat, Casablanca',
      optionsInput: 'Option 1, Option 2',
      description: '',
      duree: '5 ans',
      diplome: "Diplôme d'Ingénieur d'État",
      inscriptionUrl: '',
      conditionsAcces: '',
      seuilSelection: '',
    });
    setEditingSchool({
      id: 'ecole_' + Date.now(),
      name: '',
      category: 'ingenierie',
      categoryLabel: 'Ingénierie & Technologie',
      villes: ['Rabat'],
      options: ['Option 1'],
      description: '',
      duree: '5 ans',
      diplome: "Diplôme d'Ingénieur d'État",
    });
  };

  // Open school modal for Edit
  const handleOpenEditSchool = (school: SchoolItem) => {
    setIsNewSchool(false);
    setSchoolFormData({
      id: school.id,
      name: school.name,
      category: school.category,
      categoryLabel: school.categoryLabel,
      villesInput: school.villes.join(', '),
      optionsInput: (school.options || []).join(', '),
      description: school.description,
      duree: school.duree,
      diplome: school.diplome,
      inscriptionUrl: school.inscriptionUrl || '',
      conditionsAcces: school.conditionsAcces || '',
      seuilSelection: school.seuilSelection || '',
    });
    setEditingSchool(school);
  };

  // Save School (Add or Edit)
  const handleSaveSchool = (e: React.FormEvent) => {
    e.preventDefault();
    const villes = schoolFormData.villesInput
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean);
    const options = schoolFormData.optionsInput
      .split(',')
      .map((o) => o.trim())
      .filter(Boolean);

    const catObj = SCHOOL_CATEGORIES.find((c) => c.id === schoolFormData.category);
    const categoryLabel = catObj ? catObj.label : schoolFormData.categoryLabel;

    const newOrUpdatedSchool: SchoolItem = {
      id: schoolFormData.id || 'ecole_' + Date.now(),
      name: schoolFormData.name.trim(),
      category: schoolFormData.category,
      categoryLabel,
      villes: villes.length > 0 ? villes : ['National'],
      options: options.length > 0 ? options : ['Tronc Commun'],
      description: schoolFormData.description.trim() || 'Établissement supérieur partenaire IKIPAS.',
      duree: schoolFormData.duree.trim(),
      diplome: schoolFormData.diplome.trim(),
      inscriptionUrl: schoolFormData.inscriptionUrl.trim() || undefined,
      conditionsAcces: schoolFormData.conditionsAcces.trim() || undefined,
      seuilSelection: schoolFormData.seuilSelection.trim() || undefined,
    };

    let updatedList: SchoolItem[];
    if (isNewSchool) {
      updatedList = [newOrUpdatedSchool, ...schools];
      showNotification(`Établissement "${newOrUpdatedSchool.name}" ajouté avec succès !`);
    } else {
      updatedList = schools.map((s) => (s.id === newOrUpdatedSchool.id ? newOrUpdatedSchool : s));
      showNotification(`Établissement "${newOrUpdatedSchool.name}" mis à jour !`);
    }

    setSchools(updatedList);
    saveStoredSchools(updatedList);
    setEditingSchool(null);
  };

  // Delete School
  const handleDeleteSchool = (id: string, name: string) => {
    if (window.confirm(`Confirmez-vous la suppression de l'établissement "${name}" ?`)) {
      const updatedList = schools.filter((s) => s.id !== id);
      setSchools(updatedList);
      saveStoredSchools(updatedList);
      showNotification(`"${name}" supprimé de la liste.`);
    }
  };

  // Open Advisor Edit
  const handleOpenEditAdvisor = (advisor: AcademicAdvisor) => {
    setEditingAdvisor(advisor);
    setAdvisorFormData({
      name: advisor.name,
      nameAr: advisor.nameAr,
      role: advisor.role,
      roleAr: advisor.roleAr,
      phone: advisor.phone,
      whatsappNumber: advisor.whatsappNumber,
      specialtiesInput: advisor.specialties.join(', '),
      bio: advisor.bio,
    });
  };

  // Save Advisor
  const handleSaveAdvisor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAdvisor) return;

    const specs = advisorFormData.specialtiesInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const updatedAdvisor: AcademicAdvisor = {
      ...editingAdvisor,
      name: advisorFormData.name.trim(),
      nameAr: advisorFormData.nameAr.trim(),
      role: advisorFormData.role.trim(),
      roleAr: advisorFormData.roleAr.trim(),
      phone: advisorFormData.phone.trim(),
      phoneFormatted: advisorFormData.phone.trim(),
      whatsappNumber: advisorFormData.whatsappNumber.trim().replace(/\D/g, ''),
      specialties: specs.length > 0 ? specs : editingAdvisor.specialties,
      bio: advisorFormData.bio.trim(),
    };

    const updatedList = advisors.map((a) => (a.id === updatedAdvisor.id ? updatedAdvisor : a));
    setAdvisors(updatedList);
    saveStoredAdvisors(updatedList);
    setEditingAdvisor(null);
    showNotification(`Informations de ${updatedAdvisor.name} mises à jour !`);
  };

  // Export JSON Backup
  const handleExportBackup = () => {
    const data = exportDataBackup();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `IKIPAS_Sauvegarde_Catalogue_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('Sauvegarde JSON téléchargée avec succès.');
  };

  // Import JSON Backup
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const ok = importDataBackup(content);
        if (ok) {
          setSchools(loadStoredSchools());
          setAdvisors(loadStoredAdvisors());
          showNotification('Sauvegarde restaurée avec succès !');
        } else {
          alert('Fichier JSON invalide. Restauration échouée.');
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Reset to default
  const handleResetToDefault = () => {
    if (window.confirm('Voulez-vous vraiment réinitialiser le catalogue aux 46 écoles officielles par défaut ?')) {
      const def = resetSchoolsToDefault();
      setSchools(def);
      showNotification('Catalogue réinitialisé aux valeurs d\'origine.');
    }
  };

  // Filter schools
  const filteredSchools = schools.filter((s) => {
    const matchesCat = selectedCatFilter === 'all' || s.category === selectedCatFilter;
    if (!matchesCat) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      s.name.toLowerCase().includes(q) ||
      s.villes.some((v) => v.toLowerCase().includes(q)) ||
      (s.options || []).some((o) => o.toLowerCase().includes(q)) ||
      (s.diplome && s.diplome.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen w-full bg-[#0F1710] text-[#F4EFE6] font-sans antialiased">
      {/* Top Notification Toast */}
      <AnimatePresence>
        {alertSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-2xl bg-emerald-700 text-white shadow-2xl flex items-center gap-2 text-xs sm:text-sm font-bold"
          >
            <Check className="w-4 h-4" />
            <span>{alertSuccess}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* LOGIN SCREEN (WHEN NOT AUTHENTICATED)                                     */}
      {/* ========================================================================= */}
      {!isAuthenticated ? (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-radial from-[#1A2B19] to-[#0A120A]">
          <div className="w-full max-w-md bg-[#131D12] border border-white/15 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-white p-2 border border-white/20 mx-auto flex items-center justify-center shadow-lg">
                <OfficialLogo size={42} />
              </div>
              <h1 className="font-display text-2xl font-black text-white">
                Portail Administration IKIPAS
              </h1>
              <p className="text-xs text-gray-400">
                Espace sécurisé de gestion du catalogue des écoles et des conseillers.
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-900/40 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Nom d'utilisateur (Identifiant)
                </label>
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Entrez votre identifiant"
                  className="w-full px-4 py-3 rounded-2xl border border-white/15 bg-white/5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Entrez votre mot de passe"
                    className="w-full px-4 py-3 rounded-2xl border border-white/15 bg-white/5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs cursor-pointer"
                  >
                    {showPassword ? 'Masquer' : 'Afficher'}
                  </button>
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Accéder à l'Administration</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 px-4 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Retour au site public</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* AUTHENTICATED ADMIN DASHBOARD                                             */
        /* ========================================================================= */
        <div className="min-h-screen flex flex-col">
          {/* Admin Header Bar */}
          <header className="sticky top-0 z-40 bg-[#121B11]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white p-1 flex items-center justify-center shrink-0">
                <OfficialLogo size={28} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm sm:text-base font-bold text-white leading-tight">
                    IKIPAS Administration
                  </h1>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                    Session Active
                  </span>
                </div>
                <p className="text-[11px] text-gray-400">
                  Connecté : <strong className="text-gray-200">{VALID_USERNAME}</strong>
                </p>
              </div>
            </div>

            {/* Quick Actions & Logout */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-200 flex items-center gap-1.5 cursor-pointer"
                title="Quitter et revenir au site public"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Voir le site</span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-500/30 text-xs font-semibold text-red-200 flex items-center gap-1.5 cursor-pointer"
                title="Fermer la session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </div>
          </header>

          {/* Subheader Navigation Tabs */}
          <div className="bg-[#162215] border-b border-white/10 px-4 sm:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('ecoles')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
                  activeTab === 'ecoles'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Établissements & Écoles ({schools.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('conseillers')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
                  activeTab === 'conseillers'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Conseillers ({advisors.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('sauvegarde')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
                  activeTab === 'sauvegarde'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Sauvegarde & Données</span>
              </button>
            </div>
          </div>

          {/* Main Dashboard Content */}
          <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
            {/* ========================================================================= */}
            {/* TAB 1: GESTION DES ÉCOLES                                                 */}
            {/* ========================================================================= */}
            {activeTab === 'ecoles' && (
              <div className="space-y-6">
                {/* Actions & Filters Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#142013] p-4 sm:p-5 rounded-2xl border border-white/10">
                  <div className="flex flex-wrap items-center gap-3 flex-1">
                    <div className="relative flex-1 min-w-[220px]">
                      <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Rechercher par école, ville ou spécialité..."
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-white/15 bg-white/5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <select
                      value={selectedCatFilter}
                      onChange={(e) => setSelectedCatFilter(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-white/15 bg-[#1A2819] text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="all">Toutes les catégories ({schools.length})</option>
                      {SCHOOL_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label} ({schools.filter((s) => s.category === c.id).length})
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={handleOpenAddSchool}
                    className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Ajouter un établissement</span>
                  </button>
                </div>

                {/* Schools Grid / Table */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>
                      Affichage de <strong>{filteredSchools.length}</strong> établissement(s) sur {schools.length}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredSchools.map((school) => (
                      <div
                        key={school.id}
                        className="bg-[#142013] border border-white/10 hover:border-emerald-500/40 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4 transition-all"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                              {school.categoryLabel}
                            </span>
                            <span className="text-[10px] text-gray-400 font-mono">
                              {school.duree}
                            </span>
                          </div>

                          <h3 className="font-bold text-base text-white leading-tight">
                            {school.name}
                          </h3>

                          <div className="text-xs text-gray-300 space-y-1">
                            <p>
                              <strong className="text-gray-400">Villes : </strong>
                              {school.villes.slice(0, 4).join(', ')}
                              {school.villes.length > 4 ? ` (+${school.villes.length - 4})` : ''}
                            </p>
                            <p>
                              <strong className="text-gray-400">Diplôme : </strong>
                              {school.diplome}
                            </p>
                            {school.conditionsAcces && (
                              <p className="text-emerald-400/90 text-[11px]">
                                <strong>Conditions : </strong>{school.conditionsAcces}
                              </p>
                            )}
                            {school.inscriptionUrl && (
                              <p className="text-[11px] text-blue-400 truncate flex items-center gap-1">
                                <ExternalLink className="w-3 h-3 shrink-0" />
                                <a href={school.inscriptionUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                  {school.inscriptionUrl}
                                </a>
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                          <span className="text-[10px] text-gray-500">
                            {(school.options || []).length} spécialités
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEditSchool(school)}
                              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white font-medium flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <Edit3 className="w-3 h-3 text-emerald-400" />
                              <span>Modifier</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteSchool(school.id, school.name)}
                              className="px-2 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900 border border-red-500/20 text-xs text-red-300 cursor-pointer transition-colors"
                              title="Supprimer cette école"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 2: GESTION DES CONSEILLERS                                            */}
            {/* ========================================================================= */}
            {activeTab === 'conseillers' && (
              <div className="space-y-6">
                <div className="bg-[#142013] p-5 rounded-2xl border border-white/10">
                  <h2 className="text-lg font-bold text-white">
                    Équipe des Conseillers Pédagogiques Référents
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Modifiez les numéros de téléphone, les numéros WhatsApp, ou les spécialités de chaque conseiller.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {advisors.map((advisor) => (
                    <div
                      key={advisor.id}
                      className="bg-[#142013] border border-white/10 rounded-2xl p-5 space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={advisor.photo}
                            alt={advisor.name}
                            className="w-14 h-14 rounded-xl object-cover border border-white/20"
                          />
                          <div>
                            <h3 className="font-bold text-base text-white">{advisor.name}</h3>
                            <p className="text-xs text-emerald-400">{advisor.nameAr}</p>
                            <p className="text-[11px] text-gray-400">{advisor.role}</p>
                          </div>
                        </div>

                        <div className="space-y-1.5 text-xs text-gray-300">
                          <p className="flex items-center gap-1.5 font-mono">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            <span>{advisor.phone}</span>
                          </p>
                          <p className="flex items-center gap-1.5 font-mono text-emerald-400">
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp : +{advisor.whatsappNumber}</span>
                          </p>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                            Spécialités :
                          </span>
                          <ul className="text-xs space-y-0.5 text-gray-200">
                            {advisor.specialties.map((s, idx) => (
                              <li key={idx} className="flex items-start gap-1">
                                <span className="text-emerald-400">·</span>
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => handleOpenEditAdvisor(advisor)}
                          className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center justify-center gap-2 cursor-pointer transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Modifier les coordonnées</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 3: SAUVEGARDE & SÉCURITÉ                                              */}
            {/* ========================================================================= */}
            {activeTab === 'sauvegarde' && (
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-[#142013] p-6 rounded-2xl border border-white/10 space-y-3">
                  <h2 className="text-lg font-bold text-white">
                    Exportation & Sauvegarde du Catalogue
                  </h2>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Téléchargez l'intégralité du catalogue des écoles et des conseillers sous forme de fichier JSON sécurisé. Vous pouvez conserver cette sauvegarde sur votre ordinateur ou la transférer vers un autre poste.
                  </p>
                  <button
                    type="button"
                    onClick={handleExportBackup}
                    className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>Télécharger la Sauvegarde JSON ({schools.length} écoles)</span>
                  </button>
                </div>

                <div className="bg-[#142013] p-6 rounded-2xl border border-white/10 space-y-3">
                  <h2 className="text-lg font-bold text-white">
                    Restauration depuis un fichier JSON
                  </h2>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Si vous avez préparé une liste ou souhaitez restaurer une sauvegarde précédente, sélectionnez votre fichier JSON :
                  </p>
                  <label className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-xs cursor-pointer transition-colors">
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span>Sélectionner le fichier JSON</span>
                    <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
                  </label>
                </div>

                <div className="bg-red-950/20 p-6 rounded-2xl border border-red-500/20 space-y-3">
                  <h2 className="text-base font-bold text-red-200">
                    Zone de Réinitialisation
                  </h2>
                  <p className="text-xs text-red-300/80 leading-relaxed">
                    En cas de besoin, vous pouvez réinitialiser le catalogue pour restaurer les 46 écoles officielles d'origine.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetToDefault}
                    className="py-2 px-4 rounded-xl bg-red-900/60 hover:bg-red-800 border border-red-500/30 text-red-100 font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Restaurer les 46 écoles d'origine</span>
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT SCHOOL                                                  */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {editingSchool && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
              onClick={() => setEditingSchool(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#142013] border border-white/20 rounded-3xl p-6 sm:p-8 space-y-5 z-10 my-8 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-display text-xl font-bold text-white">
                  {isNewSchool ? 'Ajouter un Nouvel Établissement' : `Modifier "${editingSchool.name}"`}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingSchool(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveSchool} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-gray-300 mb-1">
                      Nom complet de l'établissement <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={schoolFormData.name}
                      onChange={(e) => setSchoolFormData({ ...schoolFormData, name: e.target.value })}
                      placeholder="Ex: EMI - École Mohammadia d'Ingénieurs"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 mb-1">
                      Catégorie <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={schoolFormData.category}
                      onChange={(e) => setSchoolFormData({ ...schoolFormData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#1A2819] text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {SCHOOL_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 mb-1">
                      Diplôme délivré
                    </label>
                    <input
                      type="text"
                      value={schoolFormData.diplome}
                      onChange={(e) => setSchoolFormData({ ...schoolFormData, diplome: e.target.value })}
                      placeholder="Ex: Diplôme d'Ingénieur d'État"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 mb-1">
                      Durée d'études
                    </label>
                    <input
                      type="text"
                      value={schoolFormData.duree}
                      onChange={(e) => setSchoolFormData({ ...schoolFormData, duree: e.target.value })}
                      placeholder="Ex: 5 ans, 3 ans, 2 ans"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 mb-1">
                      Lien Officiel d'Inscription (URL)
                    </label>
                    <input
                      type="url"
                      value={schoolFormData.inscriptionUrl}
                      onChange={(e) => setSchoolFormData({ ...schoolFormData, inscriptionUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-gray-300 mb-1">
                      Villes d'implantation (séparées par des virgules) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={schoolFormData.villesInput}
                      onChange={(e) => setSchoolFormData({ ...schoolFormData, villesInput: e.target.value })}
                      placeholder="Ex: Rabat, Casablanca, Fès, Tanger"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-gray-300 mb-1">
                      Filières et Spécialités (séparées par des virgules) <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={schoolFormData.optionsInput}
                      onChange={(e) => setSchoolFormData({ ...schoolFormData, optionsInput: e.target.value })}
                      placeholder="Ex: Génie Civil, Génie Informatique & IA, Génie Électrique"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-gray-300 mb-1">
                      Conditions d'accès et Seuils d'admission
                    </label>
                    <input
                      type="text"
                      value={schoolFormData.conditionsAcces}
                      onChange={(e) => setSchoolFormData({ ...schoolFormData, conditionsAcces: e.target.value })}
                      placeholder="Ex: Sélection sur dossier Bac Sciences Maths / PC + Concours écrit"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-gray-300 mb-1">
                      Description de la formation
                    </label>
                    <textarea
                      rows={2}
                      value={schoolFormData.description}
                      onChange={(e) => setSchoolFormData({ ...schoolFormData, description: e.target.value })}
                      placeholder="Courte description de l'école..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingSchool(null)}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Enregistrer</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL: EDIT ADVISOR                                                       */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {editingAdvisor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
              onClick={() => setEditingAdvisor(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#142013] border border-white/20 rounded-3xl p-6 sm:p-8 space-y-5 z-10 my-8 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-display text-xl font-bold text-white">
                  Modifier les coordonnées de {editingAdvisor.name}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingAdvisor(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveAdvisor} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-300 mb-1">Nom affiché</label>
                  <input
                    type="text"
                    required
                    value={advisorFormData.name}
                    onChange={(e) => setAdvisorFormData({ ...advisorFormData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-300 mb-1">Téléphone affiché</label>
                    <input
                      type="text"
                      required
                      value={advisorFormData.phone}
                      onChange={(e) => setAdvisorFormData({ ...advisorFormData, phone: e.target.value })}
                      placeholder="06... ou 07..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 mb-1">N° WhatsApp (avec indicatif)</label>
                    <input
                      type="text"
                      required
                      value={advisorFormData.whatsappNumber}
                      onChange={(e) => setAdvisorFormData({ ...advisorFormData, whatsappNumber: e.target.value })}
                      placeholder="212606..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1">Rôle & Titre</label>
                  <input
                    type="text"
                    required
                    value={advisorFormData.role}
                    onChange={(e) => setAdvisorFormData({ ...advisorFormData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1">
                    Spécialités d'accompagnement (séparées par virgules)
                  </label>
                  <textarea
                    rows={2}
                    value={advisorFormData.specialtiesInput}
                    onChange={(e) => setAdvisorFormData({ ...advisorFormData, specialtiesInput: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingAdvisor(null)}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Enregistrer</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
