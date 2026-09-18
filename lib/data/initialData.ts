import {
  Provider,
  Review,
  EmergencyContact,
  HealthResource,
  StudySubject,
  StudyTopic,
  StudyMaterial,
  Quiz,
  CommunityReport,
  VolunteerOrganization,
  VolunteerOpportunity
} from '../types';

export const INITIAL_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'em-112',
    name: 'National Emergency Toll-Free',
    description: 'Unified national dispatch for Police, Federal Fire Service, and Medical Ambulance.',
    phone: '112',
    country: 'Nigeria',
    region: 'National',
    service_type: 'Police / Fire / Ambulance',
    active: true,
    priority: 1,
    urgent: true
  },
  {
    id: 'em-199',
    name: 'Federal Fire Service',
    description: 'Direct federal fire outbreak control and industrial hazmat response.',
    phone: '199',
    country: 'Nigeria',
    region: 'National',
    service_type: 'Fire & Rescue',
    active: true,
    priority: 2,
    urgent: true
  },
  {
    id: 'em-122',
    name: 'FRSC Road Crash Helpline',
    description: 'Federal Road Safety Corps emergency vehicle crash and highway rescue coordination.',
    phone: '122',
    country: 'Nigeria',
    region: 'National',
    service_type: 'Highway Rescue',
    active: true,
    priority: 3,
    urgent: false
  },
  {
    id: 'em-6232',
    name: 'NCDC Toll-Free Health Line',
    description: 'Nigeria Centre for Disease Control infectious outbreak reporting and medical guidance.',
    phone: '6232',
    country: 'Nigeria',
    region: 'National',
    service_type: 'Public Health',
    active: true,
    priority: 4,
    urgent: false
  },
  {
    id: 'em-fema',
    name: 'FCT Emergency Management Agency',
    description: 'Abuja municipal flood response, building collapse rescue, and disaster mitigation.',
    phone: '0800-900-9000',
    country: 'Nigeria',
    region: 'Federal Capital Territory',
    service_type: 'Disaster Mitigation',
    active: true,
    priority: 5,
    urgent: false
  }
];

export const INITIAL_PROVIDERS: Provider[] = [
  {
    id: 'prov-demo-elec-1',
    name: 'Demo Electrician — Solar & Inverter Techs',
    category: 'electrician',
    cityId: 'abuja-fct',
    description: 'Sample demo record for testing: Experienced team specializing in solar inverter systems, 24V/48V battery setups, and changeover switchboards across Abuja.',
    address: 'Plot 412, Aminu Kano Crescent, Wuse II, Abuja',
    lat: 9.0765,
    lng: 7.4898,
    phone: '+234 802 000 1101',
    email: 'demo.electrician@civictrust.local',
    website: 'https://civictrust.ng/demo-electrician',
    hours: {
      monday: { open: '08:00', close: '18:00' },
      tuesday: { open: '08:00', close: '18:00' },
      wednesday: { open: '08:00', close: '18:00' },
      thursday: { open: '08:00', close: '18:00' },
      friday: { open: '08:00', close: '18:00' },
      saturday: { open: '09:00', close: '16:00' },
      sunday: { open: '00:00', close: '00:00', closed: true }
    },
    services: [
      'Inverter & Solar Installation',
      'Generator Changeover Switch (ATS)',
      'Distribution Board & Breaker Repair',
      'Earthing & Lightning Arrestor Setup'
    ],
    photos: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    verification_status: 'verified',
    license_number: 'NEMSA Certified Trade ID: CT-NG-0914',
    verified_date: '2026-02-10',
    avg_rating: 4.8,
    review_count: 3,
    created_at: '2026-01-15T09:00:00Z',
    is_demo: true
  },
  {
    id: 'prov-demo-plumb-2',
    name: 'Demo Plumber — Borehole & Piping Pros',
    category: 'plumber',
    cityId: 'abuja-fct',
    description: 'Sample demo record for testing: Submersible borehole pumps, overhead tank automatic float switches, and PPR pressure pipe repairs.',
    address: 'Suite 18, Emab Plaza, Wuse II, Abuja',
    lat: 9.0712,
    lng: 7.4765,
    phone: '+234 803 000 2202',
    email: 'demo.plumber@civictrust.local',
    hours: {
      monday: { open: '07:30', close: '18:30' },
      tuesday: { open: '07:30', close: '18:30' },
      wednesday: { open: '07:30', close: '18:30' },
      thursday: { open: '07:30', close: '18:30' },
      friday: { open: '07:30', close: '18:30' },
      saturday: { open: '08:00', close: '17:00' },
      sunday: { open: '10:00', close: '15:00' }
    },
    services: [
      'Borehole & Submersible Pump Installation',
      'Overhead Water Tank & Float Switch Setup',
      'Concealed Pipe Leak Detection',
      'Drain & Sewage Line Unblocking'
    ],
    photos: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
    ],
    verification_status: 'verified',
    license_number: 'Plumbers Guild Abuja #PL-7712',
    verified_date: '2026-02-22',
    avg_rating: 4.6,
    review_count: 2,
    created_at: '2026-01-20T11:00:00Z',
    is_demo: true
  },
  {
    id: 'prov-demo-mech-3',
    name: 'Demo Auto Tech — Computer Diagnostics',
    category: 'mechanic',
    cityId: 'abuja-fct',
    description: 'Sample demo record for testing: Complete OBD-II computer scanning, Japanese and European vehicle brake maintenance, and cooling system servicing in Garki.',
    address: 'Apo Mechanic Village, Zone B, Apo District, Abuja',
    lat: 9.0125,
    lng: 7.5020,
    phone: '+234 805 000 3303',
    email: 'demo.mechanic@civictrust.local',
    hours: {
      monday: { open: '08:00', close: '18:00' },
      tuesday: { open: '08:00', close: '18:00' },
      wednesday: { open: '08:00', close: '18:00' },
      thursday: { open: '08:00', close: '18:00' },
      friday: { open: '08:00', close: '18:00' },
      saturday: { open: '08:30', close: '16:30' },
      sunday: { open: '00:00', close: '00:00', closed: true }
    },
    services: [
      'OBD-II Computer Diagnostics',
      'Brake Pad Replacement & Bleeding',
      'Suspension, Bushing & Shock Absorbers',
      'Engine Radiator & Water Pump Servicing'
    ],
    photos: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80'
    ],
    verification_status: 'pending',
    license_number: 'NADDC Motor Vehicle Guild #MV-901',
    avg_rating: 4.5,
    review_count: 2,
    created_at: '2026-02-01T14:30:00Z',
    is_demo: true
  },
  {
    id: 'prov-demo-tech-4',
    name: 'Demo Phone & PC Lab — Micro-Soldering',
    category: 'phone-laptop',
    cityId: 'abuja-fct',
    description: 'Sample demo record for testing: Smartphone screen replacements, MacBook & ThinkPad motherboard diagnostics, and lost partition data recovery.',
    address: 'Shop 24, Banex Plaza, Aminu Kano Way, Wuse II, Abuja',
    lat: 9.0830,
    lng: 7.4810,
    phone: '+234 807 000 4404',
    email: 'demo.repair@civictrust.local',
    hours: {
      monday: { open: '09:00', close: '19:00' },
      tuesday: { open: '09:00', close: '19:00' },
      wednesday: { open: '09:00', close: '19:00' },
      thursday: { open: '09:00', close: '19:00' },
      friday: { open: '09:00', close: '19:00' },
      saturday: { open: '09:30', close: '18:00' },
      sunday: { open: '00:00', close: '00:00', closed: true }
    },
    services: [
      'iPhone, Samsung & Android Screen Replacement',
      'Laptop Battery, Keyboard & Screen Fixes',
      'Motherboard Micro-soldering & IC Chip Repairs',
      'Corrupted Drive Data Recovery'
    ],
    photos: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80'
    ],
    verification_status: 'verified',
    license_number: 'CPN Registered Technician #CPN-1044',
    verified_date: '2026-01-28',
    avg_rating: 4.9,
    review_count: 4,
    created_at: '2026-01-10T08:00:00Z',
    is_demo: true
  },
  {
    id: 'prov-demo-clean-5',
    name: 'Demo Clean & Fumigation Services',
    category: 'cleaner',
    cityId: 'abuja-fct',
    description: 'Sample demo record for testing: Residential deep cleaning, post-construction cleanup, sofa steam washing, and eco-certified pest fumigation.',
    address: 'Plot 104, 3rd Avenue, Gwarinpa Estate, Abuja',
    lat: 9.1080,
    lng: 7.4120,
    phone: '+234 809 000 5505',
    email: 'demo.cleaner@civictrust.local',
    hours: {
      monday: { open: '08:00', close: '18:00' },
      tuesday: { open: '08:00', close: '18:00' },
      wednesday: { open: '08:00', close: '18:00' },
      thursday: { open: '08:00', close: '18:00' },
      friday: { open: '08:00', close: '18:00' },
      saturday: { open: '08:00', close: '17:00' },
      sunday: { open: '00:00', close: '00:00', closed: true }
    },
    services: [
      'Deep Residential Cleaning',
      'Post-Construction Cleanup',
      'Fumigation & Pest Extermination',
      'Sofa & Rug Steam Extraction'
    ],
    photos: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80'
    ],
    verification_status: 'unverified',
    avg_rating: 0,
    review_count: 0,
    created_at: '2026-02-18T10:00:00Z',
    is_demo: true
  },
  {
    id: 'prov-demo-tutor-6',
    name: 'Demo STEM & UTME Study Hub',
    category: 'tutor',
    cityId: 'abuja-fct',
    description: 'Sample demo record for testing: Experienced educators providing targeted one-on-one Mathematics, Physics, and Chemistry coaching for secondary and university prep.',
    address: 'Jabi Lake Mall Tech Hub, Jabi District, Abuja',
    lat: 9.0750,
    lng: 7.4280,
    phone: '+234 808 000 6606',
    email: 'demo.tutor@civictrust.local',
    hours: {
      monday: { open: '09:00', close: '18:00' },
      tuesday: { open: '09:00', close: '18:00' },
      wednesday: { open: '09:00', close: '18:00' },
      thursday: { open: '09:00', close: '18:00' },
      friday: { open: '09:00', close: '18:00' },
      saturday: { open: '10:00', close: '16:00' },
      sunday: { open: '00:00', close: '00:00', closed: true }
    },
    services: [
      'WAEC, NECO & JAMB/UTME Preparation',
      'Secondary Mathematics & Physics Coaching',
      'Python & Coding for Beginners',
      'English Diction & Essay Writing'
    ],
    photos: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80'
    ],
    verification_status: 'verified',
    license_number: 'TRCN Verified Teacher #TRCN-5510',
    verified_date: '2026-02-05',
    avg_rating: 5.0,
    review_count: 2,
    created_at: '2026-01-05T12:00:00Z',
    is_demo: true
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-sample-1',
    provider_id: 'prov-demo-elec-1',
    author: 'Kelechi O. (Verified Client)',
    rating: 5,
    text: 'Installed a 5kVA solar hybrid inverter in our Wuse II home. Neat cable trunking, arrived on schedule, and explained the battery depth of discharge clearly.',
    created_at: '2026-02-15T14:20:00Z',
    moderation_status: 'approved'
  },
  {
    id: 'rev-sample-2',
    provider_id: 'prov-demo-elec-1',
    author: 'Hauwa M.',
    rating: 5,
    text: 'Very professional troubleshooting on our distribution board. Identified a neutral fault that caused breaker tripping within 30 minutes.',
    created_at: '2026-02-28T09:10:00Z',
    moderation_status: 'approved'
  },
  {
    id: 'rev-sample-3',
    provider_id: 'prov-demo-plumb-2',
    author: 'Babatunde A.',
    rating: 5,
    text: 'Replaced our borehole pump and calibrated the automatic tank float switch in Gwarinpa. Reliable and fair pricing.',
    created_at: '2026-02-24T16:45:00Z',
    moderation_status: 'approved'
  },
  {
    id: 'rev-sample-4',
    provider_id: 'prov-demo-tech-4',
    author: 'Zainab B.',
    rating: 5,
    text: 'My MacBook wouldn’t turn on after a liquid spill. They performed ultrasonic cleaning and board micro-soldering. Saved all my research files!',
    created_at: '2026-02-12T11:30:00Z',
    moderation_status: 'approved'
  }
];

export const INITIAL_HEALTH_RESOURCES: HealthResource[] = [
  {
    id: 'health-nat-hosp-abuja',
    name: 'National Hospital Abuja',
    type: 'hospital',
    address: 'Plot 132, Central Business District, Abuja, FCT',
    cityId: 'abuja-fct',
    lat: 9.0385,
    lng: 7.4642,
    phone: '+234 9 291 5830',
    hours: 'Open 24 Hours / 7 Days',
    services: [
      '24/7 Level 1 Emergency & Trauma',
      'Intensive Care Unit (ICU)',
      'Pediatric Emergency',
      'Diagnostic Radiology & CT Scan',
      'Blood Bank & Pathology Labs'
    ],
    description: 'Premier multi-specialty federal referral hospital in Nigeria equipped with a 24-hour trauma ward, surgical theaters, and specialized critical care.',
    emergency_available: true,
    verified_status: 'verified',
    website: 'https://nationalhospital.gov.ng',
    is_demo: false
  },
  {
    id: 'health-maitama-dist-hosp',
    name: 'Maitama District Hospital',
    type: 'hospital',
    address: 'Aguiyi Ironsi Street, Maitama District, Abuja, FCT',
    cityId: 'abuja-fct',
    lat: 9.0882,
    lng: 7.4938,
    phone: '+234 9 461 8000',
    hours: 'Open 24 Hours / 7 Days',
    services: [
      '24/7 Casualty & Emergency Ward',
      'Maternity & Labor Delivery',
      'Internal Medicine',
      'Pharmacy Services'
    ],
    description: 'Major public secondary healthcare facility in the Federal Capital Territory providing full casualty emergency services, maternal care, and surgical units.',
    emergency_available: true,
    verified_status: 'verified',
    is_demo: false
  },
  {
    id: 'health-garki-hosp',
    name: 'Garki Hospital Abuja',
    type: 'hospital',
    address: 'Tafawa Balewa Way, Area 8, Garki District, Abuja, FCT',
    cityId: 'abuja-fct',
    lat: 9.0336,
    lng: 7.4891,
    phone: '+234 809 393 0000',
    hours: 'Open 24 Hours / 7 Days',
    services: [
      'Accident & Emergency Care',
      'Cardiology & Dialysis Center',
      'Neonatal ICU',
      'Outpatient Consultation'
    ],
    description: 'Accredited multi-disciplinary hospital recognized for rapid casualty triage, dialysis, and emergency maternal and pediatric admissions.',
    emergency_available: true,
    verified_status: 'verified',
    website: 'https://garkihospital.com',
    is_demo: false
  },
  {
    id: 'health-healthplus-wuse',
    name: 'HealthPlus Pharmacy & 24/7 Care Point',
    type: 'pharmacy',
    address: 'Plot 782, Adetokunbo Ademola Crescent, Wuse II, Abuja',
    cityId: 'abuja-fct',
    lat: 9.0792,
    lng: 7.4856,
    phone: '+234 817 200 4400',
    hours: 'Open 24 Hours',
    services: [
      'Emergency Prescription Dispensing',
      'Blood Pressure & Sugar Screenings',
      'Vaccination & Travel Immunizations',
      'First Aid Supplies & Reagents'
    ],
    description: 'Licensed retail community pharmacy stocking verified prescription drugs, infant nutrition, emergency medical dressings, and diagnostics.',
    emergency_available: false,
    verified_status: 'verified',
    is_demo: false
  },
  {
    id: 'health-fmc-jabi',
    name: 'Federal Medical Centre (FMC) Jabi',
    type: 'hospital',
    address: 'Jabi District, near Motor Park, Abuja, FCT',
    cityId: 'abuja-fct',
    lat: 9.0720,
    lng: 7.4310,
    phone: '+234 803 700 8822',
    hours: 'Open 24 Hours / 7 Days',
    services: [
      'Emergency Resuscitation Center',
      'Orthopedic & Trauma Surgery',
      'Ophthalmology & ENT',
      'Mental Health Support Clinic'
    ],
    description: 'Modern federal clinical referral center serving the FCT and surrounding north-central communities with dedicated trauma and triage care.',
    emergency_available: true,
    verified_status: 'verified',
    is_demo: false
  },
  {
    id: 'health-synlab-med-lab',
    name: 'SYNLAB Clinical Laboratory Abuja',
    type: 'lab',
    address: 'Plot 1084, Joseph Gomwalk Street, Gudu District, Abuja',
    cityId: 'abuja-fct',
    lat: 9.0180,
    lng: 7.4890,
    phone: '+234 810 000 7965',
    hours: '07:30 - 18:00 (Mon - Sat)',
    services: [
      'Automated Blood Chemistry & Hematology',
      'Molecular PCR Testing',
      'Toxicology & Drug Screening',
      'Preventive Wellness Panels'
    ],
    description: 'ISO-accredited medical testing laboratory offering precision blood panels, hormone assays, and corporate health screenings.',
    emergency_available: false,
    verified_status: 'verified',
    is_demo: false
  }
];

export const INITIAL_STUDY_SUBJECTS: StudySubject[] = [
  {
    id: 'math',
    name: 'Mathematics',
    slug: 'mathematics',
    iconName: 'Calculator',
    description: 'From fundamental fractions and algebra to quadratic functions, calculus, and statistics for secondary and UTME exams.',
    sortOrder: 1,
    active: true,
    color: 'emerald',
    topicsCount: 14
  },
  {
    id: 'english',
    name: 'English Language & Comprehension',
    slug: 'english',
    iconName: 'BookOpen',
    description: 'Sentence syntax, grammar mechanics, oral phonetics, reading comprehension, and formal essay composition.',
    sortOrder: 2,
    active: true,
    color: 'blue',
    topicsCount: 12
  },
  {
    id: 'physics',
    name: 'Physics',
    slug: 'physics',
    iconName: 'Zap',
    description: 'Mechanics, Ohm’s law, electromagnetic induction, optical reflection, wave particle duality, and thermal physics.',
    sortOrder: 3,
    active: true,
    color: 'amber',
    topicsCount: 16
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    slug: 'chemistry',
    iconName: 'Atom',
    description: 'Atomic structures, chemical bonding, acid-base titration, stoichiometry, periodic trends, and organic hydrocarbons.',
    sortOrder: 4,
    active: true,
    color: 'purple',
    topicsCount: 15
  },
  {
    id: 'comp-sci',
    name: 'Computer Science & Coding',
    slug: 'computer-science',
    iconName: 'Code2',
    description: 'Algorithms, logic diagrams, Python programming foundations, web technology (HTML/CSS), and database essentials.',
    sortOrder: 5,
    active: true,
    color: 'cyan',
    topicsCount: 10
  },
  {
    id: 'trades-tech',
    name: 'Electrical & Technical Trades',
    slug: 'electrical-trades',
    iconName: 'Wrench',
    description: 'Practical electricity, circuit schematics, inverter sizing, solar photovoltaic calculations, and electrical safety codes.',
    sortOrder: 6,
    active: true,
    color: 'rose',
    topicsCount: 8
  }
];

export const INITIAL_STUDY_MATERIALS: StudyMaterial[] = [
  {
    id: 'mat-math-quad',
    title: 'Mastering the Quadratic Formula: Step-by-Step Derivation',
    subject_id: 'math',
    topic_id: 'algebra',
    description: 'Learn how the quadratic formula x = (-b ± √(b² - 4ac)) / 2a is derived from completing the square, with 3 real worked examples.',
    difficulty: 'intermediate',
    type: 'guide',
    content: `# The Quadratic Formula & Derivation

The standard quadratic equation takes the form:
**ax² + bx + c = 0** (where a ≠ 0)

### Method: Completing the Square
1. Divide through by a:
   x² + (b/a)x + (c/a) = 0
2. Move the constant term to the right side:
   x² + (b/a)x = -c/a
3. Add (b / 2a)² to both sides to complete the square:
   x² + (b/a)x + (b / 2a)² = (b² / 4a²) - (c/a)
   [x + (b/2a)]² = (b² - 4ac) / 4a²
4. Take square roots of both sides:
   x + (b/2a) = ± √(b² - 4ac) / 2a
5. Subtract b/2a:
   **x = [-b ± √(b² - 4ac)] / (2a)**

### Key Discriminant Rules (Δ = b² - 4ac)
- **Δ > 0**: Two distinct real roots.
- **Δ = 0**: Exactly one repeated real root (perfect square).
- **Δ < 0**: No real roots (complex roots).`,
    created_at: '2026-02-01T10:00:00Z'
  },
  {
    id: 'mat-elec-ohms',
    title: "Ohm's Law & Circuit Analysis Cheat Sheet",
    subject_id: 'trades-tech',
    topic_id: 'circuits',
    description: 'Quick reference for Voltage, Current, Resistance, and Electrical Power relationships (V = IR, P = VI = I²R = V²/R).',
    difficulty: 'beginner',
    type: 'cheat_sheet',
    content: `# Ohm's Law & DC Power Formulas

### The Fundamental Triangle
- **V = I × R** (Voltage = Current in Amperes × Resistance in Ohms)
- **I = V / R**
- **R = V / I**

### Electrical Power Calculations
- **P = V × I** (Watts = Volts × Amps)
- **P = I² × R** (Joule heating loss in cables)
- **P = V² / R**

### Practical Application: Solar Inverter Sizing
If a residential inverter supplies **3000 Watts (3kW)** at **240V AC**, the AC current drawn is:
I = P / V = 3000W / 240V = **12.5 Amps**.

On the DC 48V battery side (assuming 90% inverter efficiency):
Total DC Power = 3000 / 0.90 = 3333W.
DC Current = 3333W / 48V = **69.4 Amps**.
*Rule of thumb:* Always size battery DC cable conductors for minimum 70A to prevent excessive voltage drops!`,
    created_at: '2026-02-04T12:00:00Z'
  },
  {
    id: 'mat-phys-newton',
    title: "Newton's Laws of Motion & Momentum Conservation",
    subject_id: 'physics',
    topic_id: 'mechanics',
    description: 'Concise summary of the three laws of motion, inertia, friction factors, and impulse-momentum equations with exam tips.',
    difficulty: 'beginner',
    type: 'guide',
    content: `# Newton's Three Laws of Motion

### 1. First Law (Law of Inertia)
An object at rest stays at rest, and an object in uniform straight-line motion stays in motion unless acted upon by a net external force.

### 2. Second Law (Force & Acceleration)
The rate of change of momentum is directly proportional to the applied force and occurs in the direction of the force:
**F_net = m × a** (Force in Newtons = Mass in kg × Acceleration in m/s²)

### 3. Third Law (Action & Reaction)
For every action force exerted on body B by body A, there is an equal in magnitude and opposite in direction reaction force exerted on body A by body B.
*Important:* Action and reaction forces act on **two different objects**, which is why they never cancel each other out!`,
    created_at: '2026-02-08T15:00:00Z'
  },
  {
    id: 'mat-cs-python',
    title: 'Python Core Syntax & Data Structures Quickstart',
    subject_id: 'comp-sci',
    topic_id: 'python',
    description: 'Lists, dictionaries, control flow loops, list comprehensions, and function definitions with practical snippets.',
    difficulty: 'beginner',
    type: 'cheat_sheet',
    content: `# Python Core Syntax Reference

### Data Structures
\`\`\`python
# List (Ordered, mutable)
cities = ["Abuja", "Lagos", "Port Harcourt"]
cities.append("Ibadan")

# Dictionary (Key-value mapping)
provider = {
    "name": "Wuse Electrical",
    "verified": True,
    "rating": 4.8
}

# Tuple (Immutable)
coordinates = (9.0765, 7.3986)
\`\`\`

### Loops & List Comprehensions
\`\`\`python
# Filter high ratings
verified_names = [p["name"] for p in provider_list if p["verified"]]
\`\`\``,
    created_at: '2026-02-12T14:00:00Z'
  }
];

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'quiz-math-algebra',
    subject_id: 'math',
    topic_id: 'algebra',
    title: 'Algebraic Equations & Quadratic Roots Drill',
    difficulty: 'intermediate',
    description: 'Test your grasp on solving linear systems, factorizing quadratics, and evaluating discriminants.',
    questions: [
      {
        id: 'q-m-1',
        quiz_id: 'quiz-math-algebra',
        question: 'What are the roots of the quadratic equation x² - 7x + 12 = 0?',
        type: 'multiple_choice',
        options: ['x = 2 and x = 6', 'x = 3 and x = 4', 'x = -3 and x = -4', 'x = 1 and x = 12'],
        correct_index: 1,
        explanation: 'Factoring: (x - 3)(x - 4) = 0. Therefore x = 3 or x = 4. Check: 3² - 7(3) + 12 = 9 - 21 + 12 = 0.'
      },
      {
        id: 'q-m-2',
        quiz_id: 'quiz-math-algebra',
        question: 'If the discriminant (b² - 4ac) of a quadratic equation is strictly negative (Δ < 0), what can be said about the roots?',
        type: 'multiple_choice',
        options: [
          'The equation has two equal rational roots',
          'The equation has two distinct real roots',
          'The equation has no real roots (the roots are complex)',
          'The equation has exactly one zero root'
        ],
        correct_index: 2,
        explanation: 'Because the quadratic formula requires taking the square root of the discriminant, √(negative number) produces complex/imaginary roots, meaning there are no intersections on the real x-axis.'
      },
      {
        id: 'q-m-3',
        quiz_id: 'quiz-math-algebra',
        question: 'Solve for x: 3(2x - 4) = 4x + 6.',
        type: 'multiple_choice',
        options: ['x = 9', 'x = 5', 'x = 3', 'x = 11'],
        correct_index: 0,
        explanation: 'Expand: 6x - 12 = 4x + 6. Subtract 4x from both sides: 2x - 12 = 6. Add 12: 2x = 18. Divide by 2: x = 9.'
      }
    ]
  },
  {
    id: 'quiz-elec-basics',
    subject_id: 'trades-tech',
    topic_id: 'circuits',
    title: 'Electrical Principles & Circuit Safety Drill',
    difficulty: 'beginner',
    description: 'Fundamental questions on current flow, Ohm’s Law, inverter power calculations, and household protective devices.',
    questions: [
      {
        id: 'q-e-1',
        quiz_id: 'quiz-elec-basics',
        question: 'If a 240V electric water heater has an internal element resistance of 20 Ohms, what current does it draw from the mains?',
        type: 'multiple_choice',
        options: ['8 Amperes', '12 Amperes', '24 Amperes', '4800 Amperes'],
        correct_index: 1,
        explanation: 'By Ohm’s Law, Current I = V / R = 240V / 20Ω = 12 Amperes.'
      },
      {
        id: 'q-e-2',
        quiz_id: 'quiz-elec-basics',
        question: 'Which protective safety device trips within milliseconds specifically when it senses electrical leakage current to ground, protecting human life from lethal shock?',
        type: 'multiple_choice',
        options: [
          'Standard Thermal-Magnetic Circuit Breaker (MCB)',
          'RCD / GFCI (Residual Current Device / Ground Fault Interrupter)',
          'High Rupture Capacity (HRC) Fuse',
          'Manual Isolator Knife Switch'
        ],
        correct_index: 1,
        explanation: 'An RCD (Residual Current Device) or GFCI detects small current imbalances (typically 30mA or less) between live and neutral wires and disconnects power to prevent fatal electrocution.'
      },
      {
        id: 'q-e-3',
        quiz_id: 'quiz-elec-basics',
        question: 'In a residential solar system, what is the primary role of a Charge Controller?',
        type: 'multiple_choice',
        options: [
          'Converting DC battery voltage into 220V AC voltage',
          'Regulating voltage and current from solar panels to protect batteries from overcharging',
          'Switching between NEPA/PHCN utility power and generator automatically',
          'Measuring the water level in lead-acid battery cells'
        ],
        correct_index: 1,
        explanation: 'Solar Charge Controllers (MPPT or PWM) regulate incoming power from photovoltaic arrays to safely charge storage batteries without overheating or overcharging them.'
      }
    ]
  },
  {
    id: 'quiz-physics-newton',
    subject_id: 'physics',
    topic_id: 'mechanics',
    title: 'Newtonian Mechanics & Force Dynamics',
    difficulty: 'intermediate',
    description: 'Test your understanding of Newton’s second law, friction, acceleration due to gravity, and momentum conservation.',
    questions: [
      {
        id: 'q-p-1',
        quiz_id: 'quiz-physics-newton',
        question: 'A constant horizontal force of 50 N is applied to accelerate a 10 kg crate across a frictionless floor. What is the acceleration produced?',
        type: 'multiple_choice',
        options: ['0.2 m/s²', '5.0 m/s²', '500 m/s²', '25 m/s²'],
        correct_index: 1,
        explanation: 'Using Newton’s second law: a = F / m = 50 N / 10 kg = 5.0 m/s².'
      },
      {
        id: 'q-p-2',
        quiz_id: 'quiz-physics-newton',
        question: 'True or False: Action and reaction forces described in Newton’s third law cancel each other out because they are equal and opposite.',
        type: 'true_false',
        options: ['True', 'False'],
        correct_index: 1,
        explanation: 'False! Action and reaction forces act on TWO DIFFERENT bodies, so they never cancel each other out on any single isolated object.'
      }
    ]
  }
];

export const INITIAL_COMMUNITY_REPORTS: CommunityReport[] = [
  {
    id: 'rep-001',
    user_name: 'Emeka Uche',
    title: 'Open Trench & Damaged Storm Drain Hazard',
    description: 'Deep exposed concrete drain near the junction along Ahmadu Bello Way. Poses high risk to pedestrians and turning vehicles during evening hours.',
    category: 'road',
    location: 'Ahmadu Bello Way near Wuse II roundabout',
    address: 'Wuse II, Abuja',
    cityId: 'abuja-fct',
    status: 'under_review',
    created_at: '2026-03-01T08:30:00Z'
  },
  {
    id: 'rep-002',
    user_name: 'Fatima Garba',
    title: 'Faulty Solar Streetlight Array on 3rd Avenue',
    description: 'Three consecutive streetlights are dark after 8pm between 3rd Avenue junction and the shopping complex, creating a dark spot.',
    category: 'streetlight',
    location: '3rd Avenue, Gwarinpa Estate',
    address: 'Gwarinpa Estate, Abuja',
    cityId: 'abuja-fct',
    status: 'in_progress',
    created_at: '2026-02-27T19:15:00Z'
  },
  {
    id: 'rep-003',
    user_name: 'Dr. Chidi Nwosu',
    title: 'Burst Public Water Reticulation Pipe',
    description: 'Clean municipal water pipe ruptured on the shoulder of Area 1 road, causing continuous road erosion and water pooling.',
    category: 'water',
    location: 'Area 1 Section near District Park',
    address: 'Garki, Abuja',
    cityId: 'abuja-fct',
    status: 'resolved',
    created_at: '2026-02-20T10:00:00Z'
  }
];

export const INITIAL_VOLUNTEER_ORGANIZATIONS: VolunteerOrganization[] = [
  {
    id: 'org-abuja-green',
    name: 'Abuja Urban Conservation & Cleanup Guild',
    mission: 'Citizen-led initiative restoring urban green belts, cleaning neighborhood storm drains, and planting indigenous shade trees.',
    website: 'https://civictrust.ng/abuja-green',
    contact_email: 'volunteer@abujagreen.local',
    phone: '+234 803 111 0022',
    address: 'Millennium Park Pavilion, Maitama, Abuja',
    cityId: 'abuja-fct',
    verified: true
  },
  {
    id: 'org-tech-youth',
    name: 'TechBridge Northern Youth Literacy',
    mission: 'Equipping underprivileged students and young school leavers with basic programming, computer maintenance, and digital literacy skills.',
    website: 'https://civictrust.ng/techbridge',
    contact_email: 'hello@techbridge.local',
    phone: '+234 809 222 3344',
    address: 'Jabi Community Tech Center, Jabi, Abuja',
    cityId: 'abuja-fct',
    verified: true
  }
];

export const INITIAL_VOLUNTEER_OPPORTUNITIES: VolunteerOpportunity[] = [
  {
    id: 'vol-drain-clean',
    org_id: 'org-abuja-green',
    org_name: 'Abuja Urban Conservation & Cleanup Guild',
    title: 'Pre-Rainy Season Drainage & Waste Clearance Drive',
    description: 'Join community members for a 3-hour weekend environmental cleanup targeting plastic waste clogging water channels in Utako market perimeter.',
    location: 'Utako Market Public Access Road, Abuja',
    cityId: 'abuja-fct',
    date: 'Saturday, March 28, 2026 • 07:30 AM',
    requirements: [
      'Sturdy boots or covered shoes',
      'Gloves and trash bags will be provided on site',
      'Open to all volunteers age 16+'
    ],
    contact: 'volunteer@abujagreen.local or call +234 803 111 0022',
    active: true,
    created_at: '2026-02-25T12:00:00Z'
  },
  {
    id: 'vol-code-mentor',
    org_id: 'org-tech-youth',
    org_name: 'TechBridge Northern Youth Literacy',
    title: 'Weekend Python & Digital Skills Peer Mentor',
    description: 'Assist secondary school students during Saturday hands-on lab sessions introducing variables, loops, and basic web creation.',
    location: 'Jabi Community Tech Hub, Abuja',
    cityId: 'abuja-fct',
    date: 'Saturdays (Recurring) • 10:00 AM - 01:00 PM',
    requirements: [
      'Basic knowledge of Python or HTML/CSS',
      'Patience and passion for mentoring beginners',
      'Commitment to 2 sessions per month'
    ],
    contact: 'mentors@techbridge.local',
    active: true,
    created_at: '2026-02-28T09:00:00Z'
  }
];
