export type CategoryId =
  | 'electrician'
  | 'plumber'
  | 'mechanic'
  | 'phone-laptop'
  | 'cleaner'
  | 'tutor'
  | 'other';

export type VerificationStatus = 'unverified' | 'pending' | 'verified';

export interface DayHours {
  open: string;  // e.g. "08:00"
  close: string; // e.g. "18:00"
  closed?: boolean;
}

export interface WeeklyHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface Provider {
  id: string;
  name: string;
  category: CategoryId | string;
  cityId: string;
  city?: string;
  state?: string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  email: string;
  website?: string;
  hours: WeeklyHours;
  services: string[];
  photos: string[];
  verification_status: VerificationStatus;
  verified?: boolean;
  verificationTier?: string;
  license_number?: string;
  verified_date?: string;
  avg_rating: number;
  review_count: number;
  created_at: string;
  claimed_by_user_id?: string;
  is_demo?: boolean;
}

export interface Review {
  id: string;
  provider_id: string;
  author: string;
  rating: number; // 1 to 5
  text: string;
  created_at: string;
  moderation_status: 'approved' | 'pending' | 'flagged' | 'rejected';
}

export interface ServiceCategory {
  id: CategoryId | string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  commonServices: string[];
  active: boolean;
  sortOrder: number;
}

export interface CityOption {
  id: string;
  name: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
  areas: string[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  description: string;
  phone: string;
  number?: string;
  country: string;
  region: string;
  service_type: string;
  category?: string;
  is24_7?: boolean;
  active: boolean;
  priority: number;
  urgent: boolean;
}

export interface HealthResource {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'pharmacy' | 'emergency' | 'mental_health' | 'dental' | 'lab' | 'other';
  category?: string;
  address: string;
  cityId: string;
  city?: string;
  state?: string;
  lat: number;
  lng: number;
  phone: string;
  hours: string;
  operatingHours?: string;
  services: string[];
  servicesOffered?: string[];
  description: string;
  emergency_available: boolean;
  emergencyServices?: boolean;
  is24Hours?: boolean;
  verified_status: 'verified' | 'unverified';
  website?: string;
  is_demo?: boolean;
}

export interface StudySubject {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  icon?: string;
  description: string;
  sortOrder: number;
  active: boolean;
  color: string;
  topicsCount?: number;
}

export interface StudyTopic {
  id: string;
  subject_id: string;
  name: string;
  slug: string;
  description: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  subject_id: string;
  subjectId?: string;
  topic_id: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'guide' | 'cheat_sheet' | 'formula' | 'practice_notes' | string;
  content: string;
  tags?: string[];
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question: string;
  text?: string;
  type: 'multiple_choice' | 'true_false';
  options: string[];
  correct_index: number;
  correctOptionIndex?: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  subject_id: string;
  subjectId?: string;
  topic_id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  durationMinutes?: number;
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  quiz_id: string;
  quizTitle?: string;
  quiz_title: string;
  subjectId?: string;
  score: number;
  total: number;
  totalQuestions?: number;
  percentage?: number;
  selected_answers: number[];
  completed_at: string;
  completedAt?: string;
}

export interface AIConversation {
  id: string;
  user_id?: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface AIMessage {
  id: string;
  conversation_id: string;
  sender: 'user' | 'ai';
  text: string;
  created_at: string;
}

export interface CommunityReport {
  id: string;
  user_id?: string;
  user_name: string;
  title: string;
  description: string;
  category: 'road' | 'streetlight' | 'waste' | 'water' | 'public_facility' | 'other' | string;
  location: string;
  address: string;
  cityId: string;
  city?: string;
  upvotes?: number;
  photo?: string;
  status: 'submitted' | 'under_review' | 'in_progress' | 'investigating' | 'resolved';
  created_at: string;
  createdAt?: string;
}

export interface VolunteerOrganization {
  id: string;
  name: string;
  mission: string;
  website?: string;
  contact_email: string;
  phone: string;
  address: string;
  cityId: string;
  verified: boolean;
}

export interface VolunteerOpportunity {
  id: string;
  org_id: string;
  org_name: string;
  organization?: string;
  title: string;
  description: string;
  location: string;
  cityId: string;
  city?: string;
  category?: string;
  commitment?: string;
  spotsRemaining?: number;
  date: string;
  requirements: string[];
  contact: string;
  active: boolean;
  created_at: string;
}

export interface SavedItems {
  providers: string[];
  materials: string[];
  health: string[];
  healthResources?: string[];
  volunteer: string[];
}

export type UserRole = 'user' | 'provider' | 'volunteer_org' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  provider_id?: string;
  email_verified?: boolean;
  saved_items?: SavedItems;
  created_at?: string;
}
