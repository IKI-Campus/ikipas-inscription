import { SchoolItem, AcademicAdvisor } from '../types';
import { SCHOOLS_CATALOG } from './schoolsCatalog';
import { ADVISORS_DATA } from './orientationData';

const SCHOOLS_STORAGE_KEY = 'ikipas_admin_schools_catalog_v2';
const ADVISORS_STORAGE_KEY = 'ikipas_admin_advisors_data_v2';
const SYNC_EVENT_NAME = 'ikipas_data_sync';

/**
 * Load schools, prioritizing localStorage customizations over defaults
 */
export function loadStoredSchools(): SchoolItem[] {
  if (typeof window === 'undefined') return SCHOOLS_CATALOG;
  try {
    const raw = localStorage.getItem(SCHOOLS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading stored schools:', e);
  }
  return SCHOOLS_CATALOG;
}

/**
 * Save schools to localStorage and trigger live update
 */
export function saveStoredSchools(schools: SchoolItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SCHOOLS_STORAGE_KEY, JSON.stringify(schools));
    window.dispatchEvent(new CustomEvent(SYNC_EVENT_NAME, { detail: { type: 'schools', count: schools.length } }));
  } catch (e) {
    console.error('Error saving stored schools:', e);
  }
}

/**
 * Reset schools back to standard system defaults
 */
export function resetSchoolsToDefault(): SchoolItem[] {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SCHOOLS_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(SYNC_EVENT_NAME, { detail: { type: 'schools', reset: true } }));
  }
  return SCHOOLS_CATALOG;
}

/**
 * Load advisors, prioritizing localStorage customizations
 */
export function loadStoredAdvisors(): AcademicAdvisor[] {
  if (typeof window === 'undefined') return ADVISORS_DATA;
  try {
    const raw = localStorage.getItem(ADVISORS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading stored advisors:', e);
  }
  return ADVISORS_DATA;
}

/**
 * Save advisors to localStorage and trigger live update
 */
export function saveStoredAdvisors(advisors: AcademicAdvisor[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ADVISORS_STORAGE_KEY, JSON.stringify(advisors));
    window.dispatchEvent(new CustomEvent(SYNC_EVENT_NAME, { detail: { type: 'advisors', count: advisors.length } }));
  } catch (e) {
    console.error('Error saving stored advisors:', e);
  }
}

/**
 * Export complete backup payload
 */
export function exportDataBackup(): string {
  const payload = {
    version: '2.0',
    exportDate: new Date().toISOString(),
    schools: loadStoredSchools(),
    advisors: loadStoredAdvisors(),
  };
  return JSON.stringify(payload, null, 2);
}

/**
 * Import and validate backup payload
 */
export function importDataBackup(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.schools && Array.isArray(parsed.schools)) {
      saveStoredSchools(parsed.schools);
    }
    if (parsed.advisors && Array.isArray(parsed.advisors)) {
      saveStoredAdvisors(parsed.advisors);
    }
    return true;
  } catch (e) {
    console.error('Failed to import backup:', e);
    return false;
  }
}

export { SYNC_EVENT_NAME };
