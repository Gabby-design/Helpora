import fs from 'fs';
import path from 'path';
import {
  Provider,
  Review,
  ServiceCategory,
  EmergencyContact,
  HealthResource,
  StudySubject,
  StudyMaterial,
  Quiz,
  QuizAttempt,
  CommunityReport,
  VolunteerOrganization,
  VolunteerOpportunity,
  SavedItems
} from '../types';
import {
  INITIAL_PROVIDERS,
  INITIAL_REVIEWS,
  INITIAL_EMERGENCY_CONTACTS,
  INITIAL_HEALTH_RESOURCES,
  INITIAL_STUDY_SUBJECTS,
  INITIAL_STUDY_MATERIALS,
  INITIAL_QUIZZES,
  INITIAL_COMMUNITY_REPORTS,
  INITIAL_VOLUNTEER_ORGANIZATIONS,
  INITIAL_VOLUNTEER_OPPORTUNITIES
} from './initialData';
import { CATEGORIES } from './categories';
import { calculateDistanceMiles } from '../utils/distance';
import { getBusinessStatus } from '../utils/hours';

export interface DatabaseSchema {
  providers: Provider[];
  reviews: Review[];
  categories: ServiceCategory[];
  emergencyContacts: EmergencyContact[];
  healthResources: HealthResource[];
  studySubjects: StudySubject[];
  studyMaterials: StudyMaterial[];
  quizzes: Quiz[];
  quizAttempts: QuizAttempt[];
  communityReports: CommunityReport[];
  volunteerOrganizations: VolunteerOrganization[];
  volunteerOpportunities: VolunteerOpportunity[];
  savedItems: { [userId: string]: SavedItems };
  lastUpdated: string;
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

function getDefaultDatabase(): DatabaseSchema {
  return {
    providers: INITIAL_PROVIDERS,
    reviews: INITIAL_REVIEWS,
    categories: CATEGORIES,
    emergencyContacts: INITIAL_EMERGENCY_CONTACTS,
    healthResources: INITIAL_HEALTH_RESOURCES,
    studySubjects: INITIAL_STUDY_SUBJECTS,
    studyMaterials: INITIAL_STUDY_MATERIALS,
    quizzes: INITIAL_QUIZZES,
    quizAttempts: [],
    communityReports: INITIAL_COMMUNITY_REPORTS,
    volunteerOrganizations: INITIAL_VOLUNTEER_ORGANIZATIONS,
    volunteerOpportunities: INITIAL_VOLUNTEER_OPPORTUNITIES,
    savedItems: {
      'usr-demo-1': {
        providers: ['prov-demo-elec-1'],
        materials: ['mat-elec-ohms'],
        health: ['health-nat-hosp-abuja'],
        volunteer: ['vol-drain-clean']
      }
    },
    lastUpdated: new Date().toISOString()
  };
}

function getDatabase(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }

    if (!fs.existsSync(DB_FILE)) {
      const initialDb = getDefaultDatabase();
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
      return initialDb;
    }

    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);

    // Merge in any missing entities if db was created with older schema
    let modified = false;
    if (!parsed.categories || parsed.categories.length === 0) {
      parsed.categories = CATEGORIES;
      modified = true;
    }
    if (!parsed.emergencyContacts || parsed.emergencyContacts.length === 0) {
      parsed.emergencyContacts = INITIAL_EMERGENCY_CONTACTS;
      modified = true;
    }
    if (!parsed.healthResources || parsed.healthResources.length === 0) {
      parsed.healthResources = INITIAL_HEALTH_RESOURCES;
      modified = true;
    }
    if (!parsed.studySubjects || parsed.studySubjects.length === 0) {
      parsed.studySubjects = INITIAL_STUDY_SUBJECTS;
      modified = true;
    }
    if (!parsed.studyMaterials || parsed.studyMaterials.length === 0) {
      parsed.studyMaterials = INITIAL_STUDY_MATERIALS;
      modified = true;
    }
    if (!parsed.quizzes || parsed.quizzes.length === 0) {
      parsed.quizzes = INITIAL_QUIZZES;
      modified = true;
    }
    if (!parsed.communityReports || parsed.communityReports.length === 0) {
      parsed.communityReports = INITIAL_COMMUNITY_REPORTS;
      modified = true;
    }
    if (!parsed.volunteerOrganizations || parsed.volunteerOrganizations.length === 0) {
      parsed.volunteerOrganizations = INITIAL_VOLUNTEER_ORGANIZATIONS;
      modified = true;
    }
    if (!parsed.volunteerOpportunities || parsed.volunteerOpportunities.length === 0) {
      parsed.volunteerOpportunities = INITIAL_VOLUNTEER_OPPORTUNITIES;
      modified = true;
    }
    if (!parsed.savedItems) {
      parsed.savedItems = {};
      modified = true;
    }
    if (!parsed.quizAttempts) {
      parsed.quizAttempts = [];
      modified = true;
    }

    // Ensure providers are updated if older US dummy data was there
    if (parsed.providers && parsed.providers.some((p: any) => p.cityId === 'austin-tx')) {
      parsed.providers = INITIAL_PROVIDERS;
      parsed.reviews = INITIAL_REVIEWS;
      modified = true;
    }

    if (modified) {
      saveDatabase(parsed);
    }

    return parsed;
  } catch (err) {
    console.error('Error reading database file, using default data:', err);
    return getDefaultDatabase();
  }
}

function saveDatabase(db: DatabaseSchema): void {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    db.lastUpdated = new Date().toISOString();
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(db, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('Error saving database file:', err);
  }
}

export interface ProviderFilters {
  category?: string;
  cityId?: string;
  search?: string;
  verifiedOnly?: boolean;
  openNow?: boolean;
  sortBy?: 'distance' | 'rating' | 'reviews';
  userLat?: number;
  userLng?: number;
}

export const DataStore = {
  // ==========================================
  // PROVIDERS
  // ==========================================
  getAllProviders(): Provider[] {
    const db = getDatabase();
    return db.providers;
  },

  getProviders(filters: ProviderFilters = {}): (Provider & { distanceMiles?: number; isOpen?: boolean })[] {
    const db = getDatabase();
    let results = [...db.providers];

    // Filter by Category
    if (filters.category && filters.category !== 'all') {
      const cat = filters.category.toLowerCase();
      results = results.filter(p => p.category.toLowerCase() === cat);
    }

    // Filter by City
    if (filters.cityId && filters.cityId !== 'all') {
      const city = filters.cityId.toLowerCase();
      results = results.filter(p => p.cityId.toLowerCase() === city);
    }

    // Filter by Normalized Search Query
    if (filters.search && filters.search.trim() !== '') {
      const q = filters.search.toLowerCase().trim();
      results = results.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        (p.services && p.services.some(s => s.toLowerCase().includes(q)))
      );
    }

    // Filter by Verified Only
    if (filters.verifiedOnly) {
      results = results.filter(p => p.verification_status === 'verified');
    }

    // Calculate distance & open status
    const annotated = results.map(p => {
      let distanceMiles: number | undefined;
      if (filters.userLat !== undefined && filters.userLng !== undefined) {
        distanceMiles = calculateDistanceMiles(filters.userLat, filters.userLng, p.lat, p.lng);
      }
      const status = getBusinessStatus(p.hours);
      return {
        ...p,
        distanceMiles,
        isOpen: status.isOpen
      };
    });

    // Filter by Open Now
    let filtered = annotated;
    if (filters.openNow) {
      filtered = filtered.filter(p => p.isOpen);
    }

    // Sort Results
    const sortBy = filters.sortBy || (filters.userLat !== undefined ? 'distance' : 'rating');
    filtered.sort((a, b) => {
      if (sortBy === 'distance' && a.distanceMiles !== undefined && b.distanceMiles !== undefined) {
        return a.distanceMiles - b.distanceMiles;
      }
      if (sortBy === 'reviews') {
        return b.review_count - a.review_count;
      }
      // Default: Highest Rating First
      if (b.avg_rating !== a.avg_rating) {
        return b.avg_rating - a.avg_rating;
      }
      return b.review_count - a.review_count;
    });

    return filtered;
  },

  getProviderById(id: string): Provider | undefined {
    const db = getDatabase();
    return db.providers.find(p => p.id === id);
  },

  createProvider(data: Omit<Provider, 'id' | 'avg_rating' | 'review_count' | 'created_at'>): Provider {
    const db = getDatabase();
    const newProvider: Provider = {
      ...data,
      id: `prov-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      avg_rating: 0,
      review_count: 0,
      created_at: new Date().toISOString()
    };
    db.providers.unshift(newProvider);
    saveDatabase(db);
    return newProvider;
  },

  updateProvider(id: string, updates: Partial<Provider>): Provider | undefined {
    const db = getDatabase();
    const index = db.providers.findIndex(p => p.id === id);
    if (index === -1) return undefined;

    db.providers[index] = {
      ...db.providers[index],
      ...updates
    };
    saveDatabase(db);
    return db.providers[index];
  },

  deleteProvider(id: string): boolean {
    const db = getDatabase();
    const prevLength = db.providers.length;
    db.providers = db.providers.filter(p => p.id !== id);
    db.reviews = db.reviews.filter(r => r.provider_id !== id);
    if (db.providers.length !== prevLength) {
      saveDatabase(db);
      return true;
    }
    return false;
  },

  // ==========================================
  // REVIEWS
  // ==========================================
  getReviewsByProviderId(providerId: string): Review[] {
    const db = getDatabase();
    return db.reviews.filter(r => r.provider_id === providerId && r.moderation_status === 'approved');
  },

  getAllReviews(): Review[] {
    const db = getDatabase();
    return db.reviews;
  },

  createReview(data: { provider_id: string; author: string; rating: number; text: string }): Review {
    const db = getDatabase();
    const newReview: Review = {
      id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      provider_id: data.provider_id,
      author: data.author.trim() || 'Community Member',
      rating: Math.max(1, Math.min(5, data.rating)),
      text: data.text.trim(),
      created_at: new Date().toISOString(),
      moderation_status: 'approved'
    };

    db.reviews.unshift(newReview);

    // Recalculate provider avg_rating and review_count
    const providerReviews = db.reviews.filter(
      r => r.provider_id === data.provider_id && r.moderation_status === 'approved'
    );
    const provIndex = db.providers.findIndex(p => p.id === data.provider_id);
    if (provIndex !== -1) {
      const sum = providerReviews.reduce((acc, r) => acc + r.rating, 0);
      const count = providerReviews.length;
      db.providers[provIndex].review_count = count;
      db.providers[provIndex].avg_rating = count > 0 ? Math.round((sum / count) * 10) / 10 : 0;
    }

    saveDatabase(db);
    return newReview;
  },

  updateReviewStatus(id: string, moderation_status: 'approved' | 'flagged' | 'rejected'): Review | undefined {
    const db = getDatabase();
    const index = db.reviews.findIndex(r => r.id === id);
    if (index === -1) return undefined;

    db.reviews[index].moderation_status = moderation_status;
    const providerId = db.reviews[index].provider_id;

    // Recalculate provider avg_rating
    const providerReviews = db.reviews.filter(
      r => r.provider_id === providerId && r.moderation_status === 'approved'
    );
    const provIndex = db.providers.findIndex(p => p.id === providerId);
    if (provIndex !== -1) {
      const sum = providerReviews.reduce((acc, r) => acc + r.rating, 0);
      const count = providerReviews.length;
      db.providers[provIndex].review_count = count;
      db.providers[provIndex].avg_rating = count > 0 ? Math.round((sum / count) * 10) / 10 : 0;
    }

    saveDatabase(db);
    return db.reviews[index];
  },

  // ==========================================
  // CATEGORIES
  // ==========================================
  getCategories(): ServiceCategory[] {
    const db = getDatabase();
    return db.categories.filter(c => c.active).sort((a, b) => a.sortOrder - b.sortOrder);
  },

  getAllCategoriesAdmin(): ServiceCategory[] {
    const db = getDatabase();
    return db.categories.sort((a, b) => a.sortOrder - b.sortOrder);
  },

  createCategory(cat: Omit<ServiceCategory, 'id'>): ServiceCategory {
    const db = getDatabase();
    const newCat: ServiceCategory = {
      ...cat,
      id: cat.slug || `cat-${Date.now()}`,
      sortOrder: cat.sortOrder || db.categories.length + 1
    };
    db.categories.push(newCat);
    saveDatabase(db);
    return newCat;
  },

  updateCategory(id: string, updates: Partial<ServiceCategory>): ServiceCategory | undefined {
    const db = getDatabase();
    const index = db.categories.findIndex(c => c.id === id);
    if (index === -1) return undefined;

    db.categories[index] = { ...db.categories[index], ...updates };
    saveDatabase(db);
    return db.categories[index];
  },

  deleteCategory(id: string): boolean {
    const db = getDatabase();
    const prevLen = db.categories.length;
    db.categories = db.categories.filter(c => c.id !== id);
    if (db.categories.length !== prevLen) {
      saveDatabase(db);
      return true;
    }
    return false;
  },

  // ==========================================
  // EMERGENCY CONTACTS
  // ==========================================
  getEmergencyContacts(region?: string): EmergencyContact[] {
    const db = getDatabase();
    let contacts = db.emergencyContacts.filter(c => c.active);
    if (region && region !== 'all') {
      contacts = contacts.filter(
        c => c.region.toLowerCase() === region.toLowerCase() || c.region.toLowerCase() === 'national'
      );
    }
    return contacts.sort((a, b) => a.priority - b.priority);
  },

  getAllEmergencyContactsAdmin(): EmergencyContact[] {
    const db = getDatabase();
    return db.emergencyContacts.sort((a, b) => a.priority - b.priority);
  },

  createEmergencyContact(contact: Omit<EmergencyContact, 'id'>): EmergencyContact {
    const db = getDatabase();
    const newContact: EmergencyContact = {
      ...contact,
      id: `em-${Date.now()}`
    };
    db.emergencyContacts.push(newContact);
    saveDatabase(db);
    return newContact;
  },

  updateEmergencyContact(id: string, updates: Partial<EmergencyContact>): EmergencyContact | undefined {
    const db = getDatabase();
    const index = db.emergencyContacts.findIndex(c => c.id === id);
    if (index === -1) return undefined;

    db.emergencyContacts[index] = { ...db.emergencyContacts[index], ...updates };
    saveDatabase(db);
    return db.emergencyContacts[index];
  },

  deleteEmergencyContact(id: string): boolean {
    const db = getDatabase();
    const prevLen = db.emergencyContacts.length;
    db.emergencyContacts = db.emergencyContacts.filter(c => c.id !== id);
    if (db.emergencyContacts.length !== prevLen) {
      saveDatabase(db);
      return true;
    }
    return false;
  },

  // ==========================================
  // HEALTH RESOURCES
  // ==========================================
  getHealthResources(filters: {
    type?: string;
    cityId?: string;
    search?: string;
    emergencyOnly?: boolean;
    userLat?: number;
    userLng?: number;
  } = {}): (HealthResource & { distanceMiles?: number })[] {
    const db = getDatabase();
    let results = [...db.healthResources];

    if (filters.type && filters.type !== 'all') {
      results = results.filter(h => h.type.toLowerCase() === filters.type!.toLowerCase());
    }

    if (filters.cityId && filters.cityId !== 'all') {
      results = results.filter(h => h.cityId.toLowerCase() === filters.cityId!.toLowerCase());
    }

    if (filters.emergencyOnly) {
      results = results.filter(h => h.emergency_available);
    }

    if (filters.search && filters.search.trim() !== '') {
      const q = filters.search.toLowerCase().trim();
      results = results.filter(h =>
        h.name.toLowerCase().includes(q) ||
        h.address.toLowerCase().includes(q) ||
        h.description.toLowerCase().includes(q) ||
        h.services.some(s => s.toLowerCase().includes(q))
      );
    }

    const annotated = results.map(h => {
      let distanceMiles: number | undefined;
      if (filters.userLat !== undefined && filters.userLng !== undefined) {
        distanceMiles = calculateDistanceMiles(filters.userLat, filters.userLng, h.lat, h.lng);
      }
      return { ...h, distanceMiles };
    });

    if (filters.userLat !== undefined) {
      annotated.sort((a, b) => (a.distanceMiles || 9999) - (b.distanceMiles || 9999));
    }

    return annotated;
  },

  getHealthResourceById(id: string): HealthResource | undefined {
    const db = getDatabase();
    return db.healthResources.find(h => h.id === id);
  },

  createHealthResource(data: Omit<HealthResource, 'id'>): HealthResource {
    const db = getDatabase();
    const newRes: HealthResource = {
      ...data,
      id: `health-${Date.now()}`
    };
    db.healthResources.unshift(newRes);
    saveDatabase(db);
    return newRes;
  },

  updateHealthResource(id: string, updates: Partial<HealthResource>): HealthResource | undefined {
    const db = getDatabase();
    const index = db.healthResources.findIndex(h => h.id === id);
    if (index === -1) return undefined;

    db.healthResources[index] = { ...db.healthResources[index], ...updates };
    saveDatabase(db);
    return db.healthResources[index];
  },

  deleteHealthResource(id: string): boolean {
    const db = getDatabase();
    const prevLen = db.healthResources.length;
    db.healthResources = db.healthResources.filter(h => h.id !== id);
    if (db.healthResources.length !== prevLen) {
      saveDatabase(db);
      return true;
    }
    return false;
  },

  // ==========================================
  // STUDY MODULE: SUBJECTS, MATERIALS, QUIZZES
  // ==========================================
  getStudySubjects(): StudySubject[] {
    const db = getDatabase();
    return db.studySubjects.filter(s => s.active).sort((a, b) => a.sortOrder - b.sortOrder);
  },

  getStudyMaterials(filters: { subject_id?: string; difficulty?: string; search?: string } = {}): StudyMaterial[] {
    const db = getDatabase();
    let materials = [...db.studyMaterials];

    if (filters.subject_id && filters.subject_id !== 'all') {
      materials = materials.filter(m => m.subject_id === filters.subject_id);
    }
    if (filters.difficulty && filters.difficulty !== 'all') {
      materials = materials.filter(m => m.difficulty === filters.difficulty);
    }
    if (filters.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      materials = materials.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.content.toLowerCase().includes(q)
      );
    }
    return materials;
  },

  getStudyMaterialById(id: string): StudyMaterial | undefined {
    const db = getDatabase();
    return db.studyMaterials.find(m => m.id === id);
  },

  createStudyMaterial(data: Omit<StudyMaterial, 'id' | 'created_at'>): StudyMaterial {
    const db = getDatabase();
    const newMat: StudyMaterial = {
      ...data,
      id: `mat-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    db.studyMaterials.unshift(newMat);
    saveDatabase(db);
    return newMat;
  },

  getQuizzes(subject_id?: string): Quiz[] {
    const db = getDatabase();
    if (subject_id && subject_id !== 'all') {
      return db.quizzes.filter(q => q.subject_id === subject_id);
    }
    return db.quizzes;
  },

  getQuizById(id: string): Quiz | undefined {
    const db = getDatabase();
    return db.quizzes.find(q => q.id === id);
  },

  submitQuizAttempt(attempt: Omit<QuizAttempt, 'id' | 'completed_at'>): QuizAttempt {
    const db = getDatabase();
    const newAttempt: QuizAttempt = {
      ...attempt,
      id: `att-${Date.now()}`,
      completed_at: new Date().toISOString()
    };
    db.quizAttempts.unshift(newAttempt);
    saveDatabase(db);
    return newAttempt;
  },

  getQuizAttempts(userId: string): QuizAttempt[] {
    const db = getDatabase();
    return db.quizAttempts.filter(a => a.user_id === userId);
  },

  // ==========================================
  // COMMUNITY MODULE: REPORTS & VOLUNTEER
  // ==========================================
  getCommunityReports(cityId?: string): CommunityReport[] {
    const db = getDatabase();
    if (cityId && cityId !== 'all') {
      return db.communityReports.filter(r => r.cityId.toLowerCase() === cityId.toLowerCase());
    }
    return db.communityReports;
  },

  createCommunityReport(data: Omit<CommunityReport, 'id' | 'status' | 'created_at'>): CommunityReport {
    const db = getDatabase();
    const newReport: CommunityReport = {
      ...data,
      id: `rep-${Date.now()}`,
      status: 'submitted',
      created_at: new Date().toISOString()
    };
    db.communityReports.unshift(newReport);
    saveDatabase(db);
    return newReport;
  },

  updateCommunityReportStatus(
    id: string,
    status: 'submitted' | 'under_review' | 'in_progress' | 'resolved'
  ): CommunityReport | undefined {
    const db = getDatabase();
    const index = db.communityReports.findIndex(r => r.id === id);
    if (index === -1) return undefined;

    db.communityReports[index].status = status;
    saveDatabase(db);
    return db.communityReports[index];
  },

  getVolunteerOpportunities(cityId?: string): VolunteerOpportunity[] {
    const db = getDatabase();
    let opps = db.volunteerOpportunities.filter(v => v.active);
    if (cityId && cityId !== 'all') {
      opps = opps.filter(v => v.cityId.toLowerCase() === cityId.toLowerCase());
    }
    return opps;
  },

  getVolunteerOrganizations(): VolunteerOrganization[] {
    const db = getDatabase();
    return db.volunteerOrganizations;
  },

  createVolunteerOpportunity(data: Omit<VolunteerOpportunity, 'id' | 'created_at'>): VolunteerOpportunity {
    const db = getDatabase();
    const newOpp: VolunteerOpportunity = {
      ...data,
      id: `vol-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    db.volunteerOpportunities.unshift(newOpp);
    saveDatabase(db);
    return newOpp;
  },

  // ==========================================
  // SAVED ITEMS
  // ==========================================
  getUserSaved(userId: string): SavedItems {
    const db = getDatabase();
    return db.savedItems[userId] || { providers: [], materials: [], health: [], volunteer: [] };
  },

  toggleSaved(userId: string, type: 'providers' | 'materials' | 'health' | 'volunteer', itemId: string): boolean {
    const db = getDatabase();
    if (!db.savedItems[userId]) {
      db.savedItems[userId] = { providers: [], materials: [], health: [], volunteer: [] };
    }
    const list = db.savedItems[userId][type];
    const index = list.indexOf(itemId);
    let isSaved = false;
    if (index === -1) {
      list.push(itemId);
      isSaved = true;
    } else {
      list.splice(index, 1);
      isSaved = false;
    }
    saveDatabase(db);
    return isSaved;
  },

  // ==========================================
  // ADMIN STATS
  // ==========================================
  getStats() {
    const db = getDatabase();
    return {
      totalProviders: db.providers.length,
      verifiedProviders: db.providers.filter(p => p.verification_status === 'verified').length,
      pendingVerifications: db.providers.filter(p => p.verification_status === 'pending').length,
      unverifiedProviders: db.providers.filter(p => p.verification_status === 'unverified').length,
      demoProviders: db.providers.filter(p => p.is_demo).length,
      totalReviews: db.reviews.length,
      pendingReviews: db.reviews.filter(r => r.moderation_status === 'pending').length,
      flaggedReviews: db.reviews.filter(r => r.moderation_status === 'flagged').length,
      totalHealthResources: db.healthResources.length,
      emergencyHealthFacilities: db.healthResources.filter(h => h.emergency_available).length,
      totalStudyMaterials: db.studyMaterials.length,
      totalQuizzes: db.quizzes.length,
      communityReports: db.communityReports.length,
      pendingReports: db.communityReports.filter(r => r.status === 'submitted' || r.status === 'under_review').length,
      volunteerOpportunities: db.volunteerOpportunities.length
    };
  }
};
