import { SchoolItem } from '../types';

export interface SchoolCategory {
  id: string;
  label: string;
  iconName: string;
  badge: string;
}

export const SCHOOL_CATEGORIES: SchoolCategory[] = [
  { id: 'ingenierie', label: 'Ingénierie & Technologie', iconName: 'Cpu', badge: 'Bac+5 / Diplôme Ingénieur' },
  { id: 'commerce', label: 'Commerce & Management', iconName: 'TrendingUp', badge: 'Bac+5 / Bac+3 Grande École' },
  { id: 'prepas_archi', label: 'CPGE, Agriculture & Architecture', iconName: 'Compass', badge: 'Prépas & Spécialités' },
  { id: 'medecine_sciences', label: 'Médecine, FST & EST (CursusSup)', iconName: 'Activity', badge: 'Santé & Sciences Appliquées' },
  { id: 'ispits_sante', label: 'Professions de Santé (ISPITS, ISSS & IFMSAS)', iconName: 'HeartPulse', badge: 'Paramédical & Soins' },
  { id: 'art_media_tourisme', label: 'Arts, Médias, Cinéma & Tourisme', iconName: 'Film', badge: 'Création & Communication' },
  { id: 'sport', label: 'Sciences & Métiers du Sport', iconName: 'Trophy', badge: 'Management & Entraînement' },
  { id: 'transport_logistique', label: 'Transport, Aéro, BTP & Pêche', iconName: 'Plane', badge: 'Aéronautique, Logistique & Mer' },
  { id: 'militaire', label: 'Formations Militaires & Sécurité', iconName: 'Shield', badge: 'Officiers & Sous-Officiers' },
  { id: 'bts_dut', label: 'BTS & Diplômes Technologiques', iconName: 'Wrench', badge: 'Bac+2 Technologique' },
  { id: 'education', label: 'Licences d\'Éducation & Études Supérieures', iconName: 'GraduationCap', badge: 'Enseignement & Recherche' },
];

export const SCHOOLS_CATALOG: SchoolItem[] = [
  // =========================================================================
  // 1. Ingénierie & Technologie
  // =========================================================================
  {
    id: 'ensa',
    name: 'ENSA - Écoles Nationales des Sciences Appliquées',
    category: 'ingenierie',
    categoryLabel: 'Ingénierie & Technologie',
    villes: ['Tanger', 'Tétouan', 'Fès', 'Oujda', 'Marrakech', 'Agadir', 'Safi', 'Khouribga', 'Al Hoceima', 'Kénitra', 'El Jadida', 'Berrechid', 'Béni Mellal'],
    options: ['Génie Informatique & IA', 'Génie Civil & BTP', 'Génie Télécoms & Réseaux', 'Génie Industriel & Logistique', 'Génie Mécatronique & Électromécanique', 'Génie Énergétique & Environnement'],
    description: 'Réseau national d\'ingénieurs d\'État avec 2 ans de cycle préparatoire intégré + 3 ans de spécialisation d\'ingénierie.',
    duree: '5 ans',
    diplome: 'Diplôme d\'Ingénieur d\'État',
  },
  {
    id: 'ensam',
    name: 'ENSAM - Écoles Nationales Supérieures des Arts et Métiers',
    category: 'ingenierie',
    categoryLabel: 'Ingénierie & Technologie',
    villes: ['Meknès', 'Casablanca', 'Rabat', 'Fès'],
    options: ['Génie Mécanique & Structures', 'Génie Industriel & Productique', 'Génie Électrique & Systèmes Embarqués', 'Intelligence Artificielle & Génie Logiciel'],
    description: 'Formation d\'excellence en ingénierie mécanique, industrielle et transformation technologique 4.0.',
    duree: '5 ans',
    diplome: 'Diplôme d\'Ingénieur d\'État',
  },
  {
    id: 'ensck',
    name: 'ENSCK - École Nationale Supérieure de Chimie de Kénitra',
    category: 'ingenierie',
    categoryLabel: 'Ingénierie & Technologie',
    villes: ['Kénitra'],
    options: ['Génie Chimique & Procédés Industriels', 'Chimie des Matériaux & Polymères', 'Génie de l\'Environnement'],
    description: 'Première école d\'ingénieurs d\'État marocaine spécialisée dans le génie chimique et l\'innovation industrielle.',
    duree: '5 ans',
    diplome: 'Diplôme d\'Ingénieur d\'État',
  },
  {
    id: 'inau',
    name: 'INAU - Institut National d\'Aménagement et d\'Urbanisme',
    category: 'ingenierie',
    categoryLabel: 'Ingénierie & Technologie',
    villes: ['Rabat'],
    options: ['Aménagement du Territoire & Urbanisme', 'Gouvernance Urbaine & Villes Durables'],
    description: 'Institut de référence formant les cadres supérieurs en planification urbaine et développement territorial.',
    duree: '5 ans',
    diplome: 'Diplôme d\'Urbaniste (Grade Master)',
  },
  {
    id: 'est_fquih_ben_salah',
    name: 'EST Fquih Ben Salah - Biotechnologies & Chimie Appliquée',
    category: 'ingenierie',
    categoryLabel: 'Ingénierie & Technologie',
    villes: ['Fquih Ben Salah'],
    options: ['Biotechnologie Agroalimentaire & Qualité', 'Génie Chimique et Procédés'],
    description: 'École supérieure de technologie orientée vers les biotechnologies appliquées et les procédés agro-industriels.',
    duree: '2 ans',
    diplome: 'Diplôme Universitaire de Technologie (DUT)',
  },

  // =========================================================================
  // 2. Commerce & Management
  // =========================================================================
  {
    id: 'encg',
    name: 'ENCG - Écoles Nationales de Commerce et de Gestion',
    category: 'commerce',
    categoryLabel: 'Commerce & Management',
    villes: ['Settat', 'Tanger', 'Casablanca', 'Marrakech', 'Agadir', 'Kénitra', 'Oujda', 'El Jadida', 'Fès', 'Dakhla', 'Meknès', 'Béni Mellal'],
    options: ['Gestion Financière & Comptable (GFC)', 'Marketing & Action Commerciale (MAC)', 'Audit & Contrôle de Gestion (ACG)', 'Commerce International (CI)', 'Management des Ressources Humaines (MRH)'],
    description: 'Grandes écoles de management formant les cadres dirigeants des entreprises nationales et multinationales.',
    duree: '5 ans',
    diplome: 'Diplôme des Écoles Nationales de Commerce et de Gestion',
  },
  {
    id: 'iscae',
    name: 'ISCAE - Institut Supérieur de Commerce et d\'Administration des Entreprises',
    category: 'commerce',
    categoryLabel: 'Commerce & Management',
    villes: ['Casablanca', 'Rabat'],
    options: ['Finance d\'Entreprise & de Marché', 'Marketing & Stratégie Commerciale', 'Comptabilité & Contrôle de Gestion'],
    description: 'Pôle d\'excellence historique du management et de la finance au Maroc, reconnu pour sa forte sélectivité.',
    duree: '3 ans (après prépa ou Bac+2)',
    diplome: 'Diplôme du Cycle Grande École ISCAE',
  },
  {
    id: 'dut_enset',
    name: 'DUT ENSET Mohammedia - Gestion & Alternance Industrielle',
    category: 'commerce',
    categoryLabel: 'Commerce & Management',
    villes: ['Mohammedia'],
    options: ['Finance et Comptabilité (FC)', 'Administration et Organisation de l\'Entreprise (AOE)', 'Qualité Industrielle par Alternance (Groupe Hirschmann Automotive)'],
    description: 'Filières courtes de gestion et de qualité industrielle réputées pour leurs parcours en alternance directe.',
    duree: '2 ans',
    diplome: 'Diplôme Universitaire de Technologie (DUT)',
  },

  // =========================================================================
  // 3. CPGE, Agriculture & Architecture
  // =========================================================================
  {
    id: 'cpge',
    name: 'CPGE - Classes Préparatoires aux Grandes Écoles',
    category: 'prepas_archi',
    categoryLabel: 'CPGE, Agriculture & Architecture',
    villes: ['Rabat (Moulay Youssef / Omar Khayyam)', 'Casablanca (Mohamed V / Al Khansaa)', 'Fès (Moulay Idriss)', 'Marrakech (Ibn Timiya)', 'Tanger (Moulay Al Hassan)', 'Kénitra (Ibn Al Khatib)', 'Oujda (Omar Ibn Abdelaziz)', 'Agadir (Reda Slaoui)', 'Meknès (Moulay Ismail)', 'Béni Mellal', 'Safi'],
    options: ['MPSI (Mathématiques, Physique & Sciences de l\'Ingénieur)', 'PCSI (Physique, Chimie & Sciences de l\'Ingénieur)', 'ECS (Économique & Commerciale option Scientifique)', 'ECT (Économique & Commerciale option Technologique)'],
    description: 'Deux années de préparation intensive aux concours nationaux communs (CNC) et aux concours des grandes écoles françaises.',
    duree: '2 ans',
    diplome: 'Attestation d\'admissibilité aux Grandes Écoles',
  },
  {
    id: 'apesa',
    name: 'APESA - Institut Agronomique et Vétérinaire Hassan II',
    category: 'prepas_archi',
    categoryLabel: 'CPGE, Agriculture & Architecture',
    villes: ['Rabat'],
    options: ['Agronomie Générale', 'Médecine Vétérinaire', 'Génie Rural', 'Sciences Géomatiques & Ingénierie Topographique', 'Industries Agroalimentaires'],
    description: 'Année préparatoire sélective ouvrant la voie aux filières d\'ingénieurs agronomes, vétérinaires et géomètres-topographes.',
    duree: '1 an préparatoire (puis 4 à 5 ans)',
    diplome: 'Diplôme d\'Ingénieur d\'État / Docteur Vétérinaire',
  },
  {
    id: 'enam',
    name: 'ENAM - École Nationale d\'Agriculture de Meknès',
    category: 'prepas_archi',
    categoryLabel: 'CPGE, Agriculture & Architecture',
    villes: ['Meknès'],
    options: ['Ingénierie Agro-Économie', 'Production Végétale & Protection des Cultures', 'Élevage & Nutrition Animale', 'Développement Rural & Environnement'],
    description: 'Institution historique dédiée à l\'ingénierie agronomique, la souveraineté alimentaire et la modernisation agricole.',
    duree: '5 ans',
    diplome: 'Diplôme d\'Ingénieur Agronome',
  },
  {
    id: 'ena',
    name: 'ENA - Écoles Nationales d\'Architecture',
    category: 'prepas_archi',
    categoryLabel: 'CPGE, Agriculture & Architecture',
    villes: ['Rabat', 'Fès', 'Tétouan', 'Marrakech', 'Oujda', 'Agadir'],
    options: ['Architecture & Conception Spatiale', 'Urbanisme & Paysage Durable', 'Patrimoine Bâti & Réhabilitation'],
    description: 'Formation supérieure d\'architectes agréés alliant art, sociologie urbaine, éco-construction et ingénierie du bâtiment.',
    duree: '6 ans',
    diplome: 'Diplôme d\'Architecte (Autorisation d\'exercer)',
  },

  // =========================================================================
  // 4. Médecine, FST & EST (CursusSup)
  // =========================================================================
  {
    id: 'fmp_fmd',
    name: 'FMP / FMD - Facultés de Médecine, Pharmacie et Dentaire',
    category: 'medecine_sciences',
    categoryLabel: 'Médecine, FST & EST (CursusSup)',
    villes: ['Rabat', 'Casablanca', 'Fès', 'Marrakech', 'Oujda', 'Tanger', 'Agadir', 'Laâyoune', 'Béni Mellal', 'Guelmim'],
    options: ['Doctorat en Médecine Générale', 'Doctorat en Pharmacie', 'Doctorat en Médecine Dentaire'],
    description: 'Formation médicale d\'excellence via le concours national unifié CursusSup pour former les futurs praticiens du Royaume.',
    duree: '6 ans (Médecine / Dentaire) ou 5 ans (Pharmacie)',
    diplome: 'Diplôme National de Docteur en Médecine / Pharmacie / Dentaire',
  },
  {
    id: 'fst',
    name: 'FST - Facultés des Sciences et Techniques',
    category: 'medecine_sciences',
    categoryLabel: 'Médecine, FST & EST (CursusSup)',
    villes: ['Fès', 'Mohammedia', 'Marrakech', 'Settat', 'Tanger', 'Errachidia', 'Béni Mellal', 'Al Hoceima'],
    options: ['MIPC (Mathématiques, Informatique, Physique, Chimie)', 'BCG (Biologie, Chimie, Géologie)', 'GE-GM (Génie Électrique & Génie Mécanique)'],
    description: 'Enseignement universitaire professionnalisant combinant sciences fondamentales et technologies de pointe.',
    duree: '3 ans (Licence) / 5 ans (Master / Ingénieur)',
    diplome: 'Licence Sciences et Techniques (LST) / Diplôme d\'Ingénieur',
  },
  {
    id: 'est',
    name: 'EST - Écoles Supérieures de Technologie (DUT)',
    category: 'medecine_sciences',
    categoryLabel: 'Médecine, FST & EST (CursusSup)',
    villes: ['Salé', 'Casablanca', 'Fès', 'Meknès', 'Oujda', 'Agadir', 'Essaouira', 'Guelmim', 'Kénitra', 'Sidi Bennour', 'Dakhla', 'Safi', 'Laâyoune', 'Béni Mellal'],
    options: ['Génie Logiciel & Développement Web', 'Réseaux Informatiques & Télécoms', 'Génie Mécanique & Productique', 'Gestion des Entreprises & des Administrations', 'Techniques de Commercialisation & Communication'],
    description: 'Formation technologique courte et réputée pour son insertion rapide sur le marché du travail ou la poursuite en cycle ingénieur.',
    duree: '2 ans',
    diplome: 'Diplôme Universitaire de Technologie (DUT)',
  },
  {
    id: 'dut_dentaire',
    name: 'DUT Médecine Dentaire (FMD Rabat & Casablanca)',
    category: 'medecine_sciences',
    categoryLabel: 'Médecine, FST & EST (CursusSup)',
    villes: ['Rabat', 'Casablanca'],
    options: ['DUT Assistant Dentaire', 'DUT Prothèse Dentaire (Prothésiste)'],
    description: 'Formations universitaires technologiques au sein des Facultés de Médecine Dentaire pour les auxiliaires dentaires et prothésistes.',
    duree: '2 ans',
    diplome: 'Diplôme Universitaire de Technologie (DUT Dentaire)',
  },
  {
    id: 'ensad',
    name: 'ENSAD - École Nationale Supérieure de l\'Art et du Design',
    category: 'medecine_sciences',
    categoryLabel: 'Médecine, FST & EST (CursusSup)',
    villes: ['Casablanca'],
    options: ['Design Graphique & Numérique', 'Métiers du Cinéma & de l\'Audiovisuel', 'Photographie & Médias'],
    description: 'École publique innovante formant les créateurs visuels, directeurs artistiques et concepteurs de médias immersifs.',
    duree: '2 ans (DUT) / 3 ans (Licence)',
    diplome: 'Diplôme des Métiers d\'Art et du Design (DMAD)',
  },

  // =========================================================================
  // 5. Professions de Santé (ISPITS, ISSS & IFMSAS)
  // =========================================================================
  {
    id: 'ispits',
    name: 'ISPITS - Instituts Supérieurs des Professions Infirmières',
    category: 'ispits_sante',
    categoryLabel: 'Professions de Santé (ISPITS, ISSS & IFMSAS)',
    villes: ['Rabat', 'Casablanca', 'Fès', 'Marrakech', 'Oujda', 'Agadir', 'Tanger', 'Tétouan', 'Béni Mellal', 'Errachidia', 'Laâyoune', 'Dakhla', 'Ouarzazate', 'Guelmim', 'Safi'],
    options: [
      'Infirmier Polyvalent (Soins Généraux)',
      'Anesthésie & Réanimation',
      'Soins d\'Urgence et Soins Intensifs',
      'Santé Mentale & Psychiatrie',
      'Néphrologie et Hémodialyse',
      'Gériatrie & Soins aux Personnes Âgées',
      'Santé de Famille et Santé Communautaire',
      'Sage-Femme',
      'Radiologie & Imagerie Médicale',
      'Préparateur en Pharmacie',
      'Technicien de Laboratoire Médical',
      'Santé & Environnement',
      'Kinésithérapie & Rééducation',
      'Orthophonie',
      'Psychomotricité',
      'Orthoptie',
      'Assistance Sociale en Santé'
    ],
    description: 'Réseau public officiel formant les infirmiers spécialisés, sages-femmes et techniciens de santé du Ministère de la Santé.',
    duree: '3 ans (Licence) / 5 ans (Master)',
    diplome: 'Licence Professionnelle en Sciences Infirmières et Techniques de Santé',
  },
  {
    id: 'isss',
    name: 'ISSS - Institut Supérieur des Sciences de la Santé de Settat',
    category: 'ispits_sante',
    categoryLabel: 'Professions de Santé (ISPITS, ISSS & IFMSAS)',
    villes: ['Settat'],
    options: [
      'Sciences Infirmières',
      'Sage-Femme',
      'Technologies de Laboratoires Biomédicaux',
      'Technologie en Radiophysique, Radiobiologie & Radioprotection',
      'Technologie en Instrumentation & Maintenance Biomédicale',
      'Technologue de Santé et Environnement (TSENV)'
    ],
    description: 'Institut universitaire d\'élite rattaché à l\'Université Hassan 1er de Settat spécialisé dans les technologies biomédicales avancées.',
    duree: '3 ans (Licence) / 5 ans (Master)',
    diplome: 'Licence Professionnelle / Master Spécialisé en Sciences de la Santé',
  },
  {
    id: 'ifmsas_sante',
    name: 'IFMSAS - Instituts de Formation aux Métiers de la Santé et du Social',
    category: 'ispits_sante',
    categoryLabel: 'Professions de Santé (ISPITS, ISSS & IFMSAS)',
    villes: ['Oujda', 'Meknès', 'Béni Mellal', 'Fès', 'Rabat'],
    options: [
      'Analyses Médicales',
      'Radiologie Diagnostique',
      'Installation et Maintenance Biomédicale',
      'Auxiliaire de Soins'
    ],
    description: 'Instituts spécialisés dédiés à la formation technique paramédicale, à la maintenance des dispositifs médicaux et à l\'assistance de soins.',
    duree: '2 ans à 3 ans',
    diplome: 'Diplôme de Technicien Spécialisé de la Santé',
  },

  // =========================================================================
  // 6. Arts, Médias, Cinéma & Tourisme
  // =========================================================================
  {
    id: 'isic',
    name: 'ISIC - Institut Supérieur de l\'Information et de la Communication',
    category: 'art_media_tourisme',
    categoryLabel: 'Arts, Médias, Cinéma & Tourisme',
    villes: ['Rabat'],
    options: ['Journalisme Écrit & Électronique', 'Journalisme Audiovisuel', 'Communication des Organisations'],
    description: 'Institution nationale historique formant les journalistes et les professionnels de la communication d\'influence au Maroc.',
    duree: '3 ans (Licence) / 5 ans (Master)',
    diplome: 'Licence d\'Études Fondamentales / Master en Information et Communication',
  },
  {
    id: 'ismac',
    name: 'ISMAC - Institut Supérieur des Métiers de l\'Audiovisuel et du Cinéma',
    category: 'art_media_tourisme',
    categoryLabel: 'Arts, Médias, Cinéma & Tourisme',
    villes: ['Rabat'],
    options: [
      'Techniques et Ingénierie Audiovisuelle',
      'Réalisation Audiovisuelle et Cinéma',
      'Écriture Scénaristique',
      'Post-Production & Effets Spéciaux',
      'Image et Cadre',
      'Son et Prise de Son',
      'Gestion de Production Audiovisuelle'
    ],
    description: 'Grande école publique supérieure formant les cinéastes, ingénieurs du son, chefs monteurs et producteurs audiovisuels.',
    duree: '3 ans (Licence) / 5 ans (Master)',
    diplome: 'Licence Professionnelle / Master Spécialisé en Métiers de l\'Audiovisuel',
  },
  {
    id: 'insap',
    name: 'INSAP - Institut National des Sciences de l\'Archéologie et du Patrimoine',
    category: 'art_media_tourisme',
    categoryLabel: 'Arts, Médias, Cinéma & Tourisme',
    villes: ['Rabat'],
    options: [
      'Archéologie Préhistorique et Géologie du Quaternaire',
      'Archéologie des Périodes Antiques',
      'Archéologie Islamique',
      'Monuments Historiques et Sites',
      'Anthropologie & Patrimoine Immatériel'
    ],
    description: 'Seul institut national dédié à la recherche archéologique, la préservation des monuments et la valorisation du patrimoine marocain.',
    duree: '3 ans',
    diplome: 'Diplôme du Cycle Fondamental de l\'INSAP (Grade Licence)',
  },
  {
    id: 'inbat',
    name: 'INBAT - Institut National des Beaux-Arts de Tétouan',
    category: 'art_media_tourisme',
    categoryLabel: 'Arts, Médias, Cinéma & Tourisme',
    villes: ['Tétouan'],
    options: ['Arts Plastiques & Peinture', 'Bande Dessinée (BD) & Illustration', 'Design Graphique'],
    description: 'Haut lieu de formation artistique réputé pour sa filière d\'excellence unique au Maroc en bande dessinée et arts plastiques.',
    duree: '4 ans',
    diplome: 'Diplôme National des Beaux-Arts',
  },
  {
    id: 'esba',
    name: 'ESBA - École Supérieure des Beaux-Arts de Casablanca',
    category: 'art_media_tourisme',
    categoryLabel: 'Arts, Médias, Cinéma & Tourisme',
    villes: ['Casablanca'],
    options: ['Arts Plastiques', 'Design Graphique', 'Design d\'Espace & Architecture Intérieure', 'Scénographie'],
    description: 'École d\'art formant les artistes visuels, designers d\'espace et directeurs artistiques depuis plus de 70 ans.',
    duree: '4 ans',
    diplome: 'Diplôme de l\'École Supérieure des Beaux-Arts (Grade Master)',
  },
  {
    id: 'isadac',
    name: 'ISADAC - Institut Supérieur d\'Art Dramatique et d\'Animation Culturelle',
    category: 'art_media_tourisme',
    categoryLabel: 'Arts, Médias, Cinéma & Tourisme',
    villes: ['Rabat'],
    options: ['Interprétation & Jeu d\'Acteur (Théâtre & Cinéma)', 'Scénographie & Décors de Spectacle', 'Animation Culturelle & Médiation'],
    description: 'L\'institut national formateur des acteurs de cinéma, metteurs en scène, scénographes et cadres culturels du Royaume.',
    duree: '4 ans',
    diplome: 'Diplôme de l\'ISADAC (Grade Bac+4 / Master)',
  },
  {
    id: 'ismc_ouarzazate',
    name: 'ISMC - Institut Spécialisé des Métiers du Cinéma d\'Ouarzazate',
    category: 'art_media_tourisme',
    categoryLabel: 'Arts, Médias, Cinéma & Tourisme',
    villes: ['Ouarzazate'],
    options: [
      'Gestion et Régie de Production Cinématographique',
      'Décor, Costumes, Maquillage & Effets Spéciaux',
      'Son, Image et Montage Numérique'
    ],
    description: 'Institut situé au cœur des studios internationaux d\'Ouarzazate formant les techniciens de plateau et de post-production.',
    duree: '2 ans',
    diplome: 'Diplôme de Technicien Spécialisé en Cinéma (DTS)',
  },
  {
    id: 'isit_tanger',
    name: 'ISIT - Institut Supérieur International de Tourisme de Tanger',
    category: 'art_media_tourisme',
    categoryLabel: 'Arts, Médias, Cinéma & Tourisme',
    villes: ['Tanger'],
    options: [
      'Management Touristique',
      'Management Opérationnel de l\'Hôtellerie et de la Restauration',
      'Tourisme d\'Affaires & Événementiel',
      'Gestion des Destinations Touristiques'
    ],
    description: 'Pôle d\'excellence national et international formant les directeurs d\'hôtels, managers de resorts et cadres du tourisme.',
    duree: '3 ans (Licence) / 5 ans (Master)',
    diplome: 'Diplôme du Cycle Supérieur de l\'ISIT (Grade Licence / Master)',
  },
  {
    id: 'isat_hotellerie',
    name: 'Instituts Spécialisés d\'Hôtellerie et de Tourisme (ISAH Tanger & Ouarzazate)',
    category: 'art_media_tourisme',
    categoryLabel: 'Arts, Médias, Cinéma & Tourisme',
    villes: ['Tanger', 'Ouarzazate', 'Marrakech', 'Agadir', 'Fès'],
    options: [
      'Assistant de Direction d\'Hébergement',
      'Tourisme d\'Affaires et Événementiel',
      'Gestion des Destinations Touristiques',
      'Hôtellerie Internationale et de Luxe',
      'Gestion et Ingénierie de la Restauration',
      'Gestion de la Qualité, Hygiène et Salubrité (QHSE)',
      'Promotion et Commercialisation des Produits de Terroir',
      'E-Tourisme et E-Réputation',
      'Cuisine Marocaine Traditionnelle'
    ],
    description: 'Réseau d\'instituts spécialisés dans les métiers hôteliers de luxe, la gastronomie marocaine et l\'écotourisme.',
    duree: '2 ans',
    diplome: 'Diplôme de Technicien Spécialisé en Tourisme et Hôtellerie (DTS)',
  },
  {
    id: 'inas_tanger',
    name: 'INAS - Institut National de l\'Action Sociale de Tanger',
    category: 'art_media_tourisme',
    categoryLabel: 'Arts, Médias, Cinéma & Tourisme',
    villes: ['Tanger'],
    options: ['Travail Social & Développement Communautaire', 'Protection de l\'Enfance & Médiation Familiale', 'Accompagnement Médico-Social'],
    description: 'Institut public d\'État formant les assistants sociaux, médiateurs et cadres du développement solidaire et humanitaire.',
    duree: '3 ans',
    diplome: 'Diplôme d\'État en Travail Social (Grade Licence)',
  },

  // =========================================================================
  // 7. Sciences & Métiers du Sport
  // =========================================================================
  {
    id: 'iss_kenitra',
    name: 'IUSS - Institut des Sciences du Sport de Kénitra',
    category: 'sport',
    categoryLabel: 'Sciences & Métiers du Sport',
    villes: ['Kénitra'],
    options: [
      'Management du Sport et Loisirs',
      'Entraînement et Encadrement Sportif',
      'Administration des Affaires & Gestion des Organisations Sportives',
      'Commercialisation des Produits et des Services Sportifs',
      'Analyse du Sport & Technologies Sportives',
      'Digital Sport Entrepreneurship',
      'Métiers du Parasport'
    ],
    description: 'Institut universitaire de pointe à l\'Université Ibn Tofail dédié aux technologies sportives, à l\'e-sport et au management.',
    duree: '3 ans',
    diplome: 'Licence Professionnelle en Sciences du Sport',
  },
  {
    id: 'iss_settat_fes',
    name: 'ISS - Instituts des Sciences du Sport (Settat & Fès)',
    category: 'sport',
    categoryLabel: 'Sciences & Métiers du Sport',
    villes: ['Settat', 'Fès'],
    options: [
      'Éducation Physique et Sciences des Activités Sportives',
      'Management du Sport',
      'Entraînement Sportif',
      'Technologies du Sport'
    ],
    description: 'Instituts universitaires formant les entraîneurs professionnels, managers de clubs et préparateurs physiques.',
    duree: '3 ans',
    diplome: 'Licence en Sciences et Technologies du Sport',
  },
  {
    id: 'irfc_js',
    name: 'IRFC/JS - Institut Royal de Formation des Cadres de la Jeunesse et des Sports',
    category: 'sport',
    categoryLabel: 'Sciences & Métiers du Sport',
    villes: ['Rabat'],
    options: [
      'Entraînement Sportif & Performance',
      'Protection de l\'Enfance et Soutien de la Famille',
      'Éducation de la Petite Enfance'
    ],
    description: 'Institution historique sous tutelle ministérielle formant les cadres nationaux du sport, de la jeunesse et de l\'action éducative.',
    duree: '3 ans',
    diplome: 'Licence Professionnelle de l\'IRFC/JS',
  },

  // =========================================================================
  // 8. Transport, Aéronautique, Pêche Maritime & BTP
  // =========================================================================
  {
    id: 'ism_aero_nouaceur',
    name: 'Institut de l\'Aéronautique et de la Logistique Aéroportuaire (Nouaceur)',
    category: 'transport_logistique',
    categoryLabel: 'Transport, Aéro, BTP & Pêche',
    villes: ['Casablanca (Nouaceur)'],
    options: [
      'Logistique Aéroportuaire et Gestion de Fret',
      'Météorologie Aéronautique',
      'Usinage sur Machines-Outils à Commande Numérique',
      'Mécatronique Aéronautique',
      'Traitement de Surface Aéronautique'
    ],
    description: 'Pôle aéronautique d\'élite implanté au cœur de la zone industrielle de Nouaceur en partenariat avec les grands constructeurs.',
    duree: '2 ans',
    diplome: 'Diplôme de Technicien Spécialisé en Aéronautique (DTS)',
  },
  {
    id: 'istl_transport',
    name: 'Instituts Spécialisés du Transport Routier et de la Logistique (ISTL)',
    category: 'transport_logistique',
    categoryLabel: 'Transport, Aéro, BTP & Pêche',
    villes: ['Tanger', 'Casablanca', 'Agadir', 'Taourirt'],
    options: [
      'Logistique & Chaîne d\'Approvisionnement',
      'Mécatronique et Diagnostic Poids Lourds',
      'Exploitation et Gestion des Flottes de Transport'
    ],
    description: 'Instituts de pointe formant les experts de la logistique portuaire, aéroportuaire et des flux industriels du Maroc.',
    duree: '2 ans',
    diplome: 'Diplôme de Technicien Spécialisé en Transport et Logistique (DTS)',
  },
  {
    id: 'emf_mbtp_settat',
    name: 'École Mohammed VI des Métiers du Bâtiment et des Travaux Publics (Settat)',
    category: 'transport_logistique',
    categoryLabel: 'Transport, Aéro, BTP & Pêche',
    villes: ['Settat'],
    options: [
      'Génie Civil & Bâtiment',
      'Géomètre Topographe',
      'Maintenance des Engins du BTP',
      'Conduite de Travaux BTP'
    ],
    description: 'Grande école de référence continentale dédiée aux grands chantiers d\'infrastructures routières, ferroviaires et de génie civil.',
    duree: '2 ans',
    diplome: 'Diplôme de Technicien Spécialisé en BTP (DTS)',
  },
  {
    id: 'ispm_agadir',
    name: 'ISPM - Institut Supérieur des Pêches Maritimes d\'Agadir',
    category: 'transport_logistique',
    categoryLabel: 'Transport, Aéro, BTP & Pêche',
    villes: ['Agadir'],
    options: [
      'Pêche Maritime & Conduite de Navires',
      'Mécanique Navale & Systèmes de Propulsion',
      'Traitement et Valorisation des Produits de la Mer',
      'Aquaculture Durable'
    ],
    description: 'Institut supérieur formant les officiers de pêche, ingénieurs d\'armement naval et cadres de l\'industrie maritime marocaine.',
    duree: '3 ans',
    diplome: 'Licence Professionnelle en Sciences Halieutiques et Pêches Maritimes',
  },

  // =========================================================================
  // 9. Formations Militaires & Paramilitaires
  // =========================================================================
  {
    id: 'arm',
    name: 'ARM - Académie Royale Militaire de Meknès (Officiers)',
    category: 'militaire',
    categoryLabel: 'Formations Militaires & Sécurité',
    villes: ['Meknès'],
    options: ['Sciences et Techniques (Officiers Armes)', 'Sciences Juridiques & Économiques', 'Langues & Littérature'],
    description: 'Institution militaire prestigieuse formant les officiers d\'active des Forces Armées Royales (Terre).',
    duree: '4 ans',
    diplome: 'Diplôme d\'Études Universitaires et Militaires (Grade Sous-Lieutenant)',
  },
  {
    id: 'era',
    name: 'ERA - École Royale de l\'Air de Marrakech (Officiers)',
    category: 'militaire',
    categoryLabel: 'Formations Militaires & Sécurité',
    villes: ['Marrakech'],
    options: [
      'Classes Préparatoires Intégrées CPGE (ERA)',
      'Cycle Ingénieur Aéronautique Militaire',
      'Cycle Licence Aéronautique option Pilotage (Chasse, Transport, Hélicoptère)'
    ],
    description: 'Grande école militaire formant les officiers ingénieurs et pilotes des Forces Royales Air.',
    duree: '5 ans',
    diplome: 'Diplôme d\'Ingénieur d\'État / Brevet de Pilote Militaire (Sous-Lieutenant)',
  },
  {
    id: 'ern',
    name: 'ERN - École Royale Navale de Casablanca (Officiers)',
    category: 'militaire',
    categoryLabel: 'Formations Militaires & Sécurité',
    villes: ['Casablanca'],
    options: [
      'Classes Préparatoires Intégrées CPGE (ERN)',
      'Cycle Ingénieur Navale & Énergie',
      'Cycle Licence Navale (Opérations & Conduite Nautique)'
    ],
    description: 'Formation d\'officiers de marine de la Marine Royale marocaine.',
    duree: '5 ans',
    diplome: 'Diplôme d\'Ingénieur d\'État / Licence Navale (Grade Enseigne de Vaisseau)',
  },
  {
    id: 'erssm',
    name: 'ERSSM - École Royale du Service de Santé Militaire (Officiers)',
    category: 'militaire',
    categoryLabel: 'Formations Militaires & Sécurité',
    villes: ['Rabat'],
    options: ['Médecine Générale Militaire', 'Chirurgie Dentaire Militaire', 'Pharmacie Militaire'],
    description: 'Formation des médecins, pharmaciens et dentistes officiers des Forces Armées Royales.',
    duree: '6 ans',
    diplome: 'Docteur en Médecine / Pharmacie / Dentaire (Grade Médecin Sous-Lieutenant)',
  },
  {
    id: 'sous_officiers_far',
    name: 'Écoles des Sous-Officiers des Forces Armées Royales (FAR, Air, Marine & Gendarmerie)',
    category: 'militaire',
    categoryLabel: 'Formations Militaires & Sécurité',
    villes: ['Marrakech', 'Casablanca', 'Rabat', 'Benslimane', 'Salé', 'Agadir', 'Laâyoune'],
    options: [
      'Sous-Officiers Terre (Infanterie, Blindés, Génie Militaire, Transmissions, Matériel, Santé Militaire)',
      'Sous-Officiers Air : Fusiliers Commando de l\'Air',
      'Sous-Officiers Air : Contrôleur Aérien, Personnel Navigant & Météorologie',
      'Sous-Officiers Marine Royale : Fusiliers Marins & Personnel Navigant',
      'Sous-Officiers de Gendarmerie Royale (Marrakech)',
      'Sous-Officiers des Forces Auxiliaires (Benslimane & Laâyoune)',
      'Sous-Officiers de la Protection Civile (Secourisme & Sauvetage)',
      'Administration des Douanes & Impôts Indirects',
      'Administration Pénitentiaire (Surveillants Éducateurs des Prisons)'
    ],
    description: 'Cycles de formation des sous-officiers d\'active des différents corps armés et de sécurité nationale.',
    duree: '2 ans',
    diplome: 'Brevet de Sous-Officier d\'Active (Sergent / Maréchal des Logis / Brigadier)',
  },

  // =========================================================================
  // 10. BTS & Diplômes Technologiques
  // =========================================================================
  {
    id: 'bts_maroc',
    name: 'BTS - Brevet de Technicien Supérieur (Centres Publics)',
    category: 'bts_dut',
    categoryLabel: 'BTS & Diplômes Technologiques',
    villes: ['Rabat', 'Casablanca', 'Fès', 'Tanger', 'Marrakech', 'Meknès', 'Oujda', 'Agadir', 'Ben Guerir', 'Kénitra', 'Tétouan', 'Safi'],
    options: [
      'Comptabilité et Gestion (CG)',
      'Électrotechnique & Énergies Renouvelables',
      'Productique & Conception Mécanique',
      'Bâtiment et Travaux Publics (BTP)',
      'Développement des Systèmes d\'Information (DSI)',
      'Traitement des Eaux et Énergies Renouvelables (Ben Guerir)',
      'Gestion des PME / PMI',
      'Conception et Réalisation de Produits Industriels'
    ],
    description: 'Diplôme d\'État supérieur de 2 ans dispensé dans les grands lycées techniques, hautement professionnalisant.',
    duree: '2 ans',
    diplome: 'Brevet de Technicien Supérieur (BTS)',
  },
  {
    id: 'ista_sefrou_digital',
    name: 'ISTA Sefrou - Institut Spécialisé de Technologie Appliquée',
    category: 'bts_dut',
    categoryLabel: 'BTS & Diplômes Technologiques',
    villes: ['Sefrou'],
    options: [
      'Tronc Commun : Gestion des Entreprises',
      'Infrastructure Digitale (Réseaux & Cloud)',
      'Développement Digital (Web & Mobile Full Stack)',
      'Intelligence Artificielle & Data'
    ],
    description: 'Institut spécialisé de nouvelle génération formant les talents du numérique et de la gestion d\'entreprise.',
    duree: '2 ans',
    diplome: 'Diplôme de Technicien Spécialisé (DTS)',
  },

  // =========================================================================
  // 11. Licences d'Éducation & Études Supérieures Spécialisées
  // =========================================================================
  {
    id: 'ens_enset',
    name: 'ENS / ENSET - Écoles Normales Supérieures (Licences d\'Éducation)',
    category: 'education',
    categoryLabel: 'Licences d\'Éducation & Études Supérieures',
    villes: ['Rabat', 'Casablanca', 'Fès', 'Meknès', 'Marrakech', 'Tétouan', 'Mohammedia', 'Agadir', 'Béni Mellal', 'Oujda', 'El Jadida'],
    options: [
      'Enseignement Primaire (Bilingue)',
      'Enseignement Secondaire - Mathématiques',
      'Enseignement Secondaire - Physique-Chimie',
      'Enseignement Secondaire - SVT',
      'Enseignement Secondaire - Informatique',
      'Enseignement Secondaire - Français',
      'Enseignement Secondaire - Anglais',
      'Enseignement Secondaire - Philosophie',
      'Licence Sciences des Matériaux et Énergies Renouvelables (ENS Rabat)',
      'Langues Étrangères Appliquées aux Organisations (ENS Casablanca)'
    ],
    description: 'Cursus public sélectif de formation des futurs professeurs du primaire et du secondaire du Royaume.',
    duree: '3 ans',
    diplome: 'Licence d\'Éducation (Accès direct aux Centres Régionaux CRMEF)',
  },
  {
    id: 'dar_al_hadith',
    name: 'Dar El Hadith El Hassania & Al Quaraouiyine (Études Islamiques & Charia)',
    category: 'education',
    categoryLabel: 'Licences d\'Éducation & Études Supérieures',
    villes: ['Rabat', 'Fès', 'Casablanca'],
    options: [
      'Sciences Islamiques & Études Coraniques (Dar El Hadith Rabat)',
      'Sciences du Hadith & Droit Musulman Comparé',
      'Sciences Islamiques & Charia (Université Al Quaraouiyine Fès)'
    ],
    description: 'Institutions prestigieuses sous patronage royal dédiées aux hautes études islamiques, au droit musulman et à la pensée contemporaine.',
    duree: '3 ans à 4 ans',
    diplome: 'Diplôme de Dar El Hadith / Licence Al Alamiyya',
  },
];
