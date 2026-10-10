export interface AcademicStream {
  id: string;
  name: string;
  category: 'sciences' | 'technology' | 'humanities' | 'economics' | 'arts';
  categoryLabel: string;
  duration: string;
  description: string;
  keySkills: string[];
  careerProspects: string[];
  difficultyLevel: number; // 1-5
  employmentRate: number; // percentage
  recommendedSubjects: string[];
  iconName: string;
  averageStartingSalary: string;
  topInstitutes: string[];
}

export interface OrientationProfile {
  scientificAptitude: number; // 0-100
  logicMath: number;
  verbalLanguage: number;
  creativityDesign: number;
  socialHumanities: number;
  businessLeadership: number;
}

export interface OrientationReportMetadata {
  academicYear: string;
  edition: string;
  totalStudentsGuided: number;
  partnerUniversities: number;
  accreditedTracks: number;
  satisfactionRate: number;
  graduatesEmployedPct: number;
  counselorHours: number;
  workshopsConducted: number;
  scholarshipsSecuredMAD: number;
}

export interface CareerSectorDemand {
  sector: string;
  demandGrowthPct: number;
  openPositionsEstimate: number;
  primarySkillsNeeded: string;
  topPrograms: string[];
  description: string;
}

export interface StudentSuccessStory {
  studentName: string;
  track: string;
  currentRoleOrSchool: string;
  background: string;
  heroStat: string;
  statLabel: string;
  quote: string;
  advice: string;
}

export interface StudentRegistrationData {
  // Informations de l'élève
  nomPrenom: string;
  nomPrenomAr: string;
  codeMassar: string;
  cin: string;
  dateNaissance: string;
  lieuNaissance: string;
  adresse: string;
  ville: string;
  codePostal: string;
  telephone: string;
  whatsapp: string;
  email: string;
  lyceeActuel: string;
  filiereBac: string;
  noteRegional: string;
  noteControleContinu: string;

  // Informations des parents
  nomPere: string;
  professionPere: string;
  telPere: string;
  emailPere: string;

  nomMere: string;
  professionMere: string;
  telMere: string;

  // Tuteur & Couverture médicale
  tuteurType: 'pere' | 'mere' | 'autre';
  nomTuteur: string;
  couvertureMedicale: 'CNOPS' | 'CNSS' | 'FAR' | 'AUTRE' | 'AUCUNE';

  // Choix des établissements & spécialités
  selectedCategory: string;
  selectedSchoolId: string;
  selectedSchoolName: string;
  selectedCity: string;
  selectedOption: string;
  selectedChoices: SchoolChoice[];
  dateCandidature: string;

  // Signatures électroniques
  signatureEleve?: string; // base64 image data URL
  signatureTuteur?: string; // base64 image data URL
}

export interface SchoolChoice {
  id: string;
  schoolId: string;
  schoolName: string;
  category: string;
  categoryLabel: string;
  city: string;
  option: string;
}

export interface SchoolItem {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  villes: string[];
  options?: string[];
  description: string;
  duree: string;
  diplome: string;
  inscriptionUrl?: string;
  conditionsAcces?: string;
  seuilSelection?: string;
  contactInfo?: string;
}

export interface AcademicAdvisor {
  id: 'saad' | 'mehdi' | 'samir';
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  phone: string;
  phoneFormatted: string;
  whatsappNumber: string;
  photo: string;
  specialties: string[];
  bio: string;
  bioAr: string;
  isAvailable: boolean;
}

export interface IkipasCenterLocation {
  city: string;
  cityAr: string;
  address: string;
  landmark?: string;
  badge: string;
  googleMapsUrl: string;
}

export interface DirectContactRequest {
  advisorId: 'saad' | 'mehdi' | 'samir' | 'all';
  fullName: string;
  city: string;
  phone: string;
  currentLevel: string;
  targetTrack: string;
  requestType: string;
  message: string;
}

// Backward compatibility types
export interface BoroughData {
  borough: string;
  hives: number;
  sites: number;
  description: string;
}

export interface RooftopSite {
  id: string;
  name: string;
  borough: string;
  buildingType: string;
  hives: number;
  wildflowerAreaSqM: number;
  honeyHarvestKg: number;
  jarsDonated: number;
  rainwaterL: number;
  x: number;
  y: number;
  isKeyStory?: boolean;
  storyNote?: string;
  addressSnippet?: string;
}

export interface SectorImpact {
  buildingType: string;
  sites: number;
  hives: number;
  wildflowerArea: number;
  honeyHarvestKg: number;
  jarsDonated: number;
  corporateSponsorship: number;
  primaryRole: string;
}

export interface StrategicGoal {
  title: string;
  pillar: string;
  metric: string;
  description: string;
  targetDate: string;
}

export interface NarrativeStory {
  title: string;
  location: string;
  borough: string;
  heroStat: string;
  statLabel: string;
  body: string;
  quote?: string;
  quoteAuthor?: string;
}

