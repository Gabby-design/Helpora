import { ServiceCategory } from '../types';

export const CATEGORIES: ServiceCategory[] = [
  {
    id: 'electrician',
    name: 'Electrician',
    slug: 'electrician',
    iconName: 'Zap',
    description: 'Solar inverter installations, wiring, distribution panels, generator changeovers, and electrical troubleshooting.',
    commonServices: [
      'Inverter & Solar Installation',
      'Generator Changeover Switch (ATS)',
      'Distribution Board & Breaker Repair',
      'Building Conduit & Surface Rewiring',
      'Appliance Surge Protection',
      'Fault Tracing & Troubleshooting'
    ],
    active: true,
    sortOrder: 1
  },
  {
    id: 'plumber',
    name: 'Plumber',
    slug: 'plumber',
    iconName: 'Wrench',
    description: 'Borehole pumping machines, overhead tanks, piping repairs, bathroom sanitary fittings, and leak detection.',
    commonServices: [
      'Borehole & Submersible Pump Installation',
      'Overhead Water Tank & Float Switch Setup',
      'Concealed Pipe Leak Detection & Repair',
      'Water Heater Installation & Servicing',
      'Bathroom Sanityware & Faucet Fittings',
      'Drain & Sewage Line Unblocking'
    ],
    active: true,
    sortOrder: 2
  },
  {
    id: 'mechanic',
    name: 'Mechanic',
    slug: 'mechanic',
    iconName: 'Car',
    description: 'Auto diagnostics, engine overhauls, brake pad replacements, suspension work, and vehicle routine maintenance.',
    commonServices: [
      'OBD-II Computer Diagnostics',
      'Brake Pad Replacement & Bleeding',
      'Engine Oil & Filter Service',
      'Suspension, Bushing & Shock Absorbers',
      'Auto Air Conditioning Recharging',
      'Transmission & Clutch Maintenance'
    ],
    active: true,
    sortOrder: 3
  },
  {
    id: 'phone-laptop',
    name: 'Phone & Laptop Repair',
    slug: 'phone-laptop',
    iconName: 'Smartphone',
    description: 'Screen replacements, laptop battery swaps, logic board micro-soldering, data recovery, and malware removal.',
    commonServices: [
      'iPhone, Samsung & Android Screen Replacement',
      'Laptop Battery, Keyboard & Screen Fixes',
      'Motherboard Micro-soldering & IC Chip Repairs',
      'Operating System Reinstall & Malware Cleaning',
      'Charging Port & Power Jack Replacement',
      'Corrupted Drive Data Recovery'
    ],
    active: true,
    sortOrder: 4
  },
  {
    id: 'cleaner',
    name: 'Cleaning',
    slug: 'cleaner',
    iconName: 'Sparkles',
    description: 'Post-construction cleaning, deep home sanitization, fumigation, upholstery steam cleaning, and office upkeep.',
    commonServices: [
      'Deep Residential Cleaning',
      'Post-Construction Cleanup',
      'Fumigation & Pest Extermination',
      'Sofa, Rug & Upholstery Steam Extraction',
      'Move-In / Move-Out Deep Sanitization',
      'Commercial Office Daily Maintenance'
    ],
    active: true,
    sortOrder: 5
  },
  {
    id: 'tutor',
    name: 'Tutoring',
    slug: 'tutor',
    iconName: 'GraduationCap',
    description: 'One-on-one academic tutoring, WAEC/JAMB/UTME preparation, coding instruction, and professional coaching.',
    commonServices: [
      'WAEC, NECO & JAMB/UTME Preparation',
      'Primary & Secondary Math & Sciences',
      'Python, Web Development & Coding',
      'English Diction, Phonics & Essay Writing',
      'IGCSE, SAT & Cambridge Checkpoint Tutoring',
      'Adult Literacy & Digital Skills'
    ],
    active: true,
    sortOrder: 6
  },
  {
    id: 'beauty',
    name: 'Beauty & Hair',
    slug: 'beauty',
    iconName: 'Scissors',
    description: 'Barbing, bridal hairstyling, manicure & pedicure, skin treatments, and makeup artistry.',
    commonServices: [
      'Gentlemen Grooming & Barbing',
      'Braids, Wigs & Hair Styling',
      'Nails, Manicure & Pedicure',
      'Bridal & Event Makeup',
      'Facials & Skincare Therapies'
    ],
    active: true,
    sortOrder: 7
  },
  {
    id: 'moving',
    name: 'Moving & Logistics',
    slug: 'moving',
    iconName: 'Truck',
    description: 'Home relocation, packing services, furniture moving trucks, and inter-city dispatch.',
    commonServices: [
      'Residential Relocation & Moving',
      'Office Furniture Haulage',
      'Fragile Items Packaging & Crating',
      'Inter-state Luggage Delivery'
    ],
    active: true,
    sortOrder: 8
  },
  {
    id: 'catering',
    name: 'Catering & Events',
    slug: 'catering',
    iconName: 'Utensils',
    description: 'Event catering, small chops, custom cakes, private chefs, and corporate meal deliveries.',
    commonServices: [
      'Corporate Lunch Catering',
      'Wedding & Party Buffet Catering',
      'Small Chops & Finger Foods',
      'Custom Birthday Cakes'
    ],
    active: true,
    sortOrder: 9
  },
  {
    id: 'photography',
    name: 'Photography & Video',
    slug: 'photography',
    iconName: 'Camera',
    description: 'Portrait studio sessions, wedding coverage, drone cinematography, and product photography.',
    commonServices: [
      'Studio & Outdoor Portrait Sessions',
      'Wedding & Event Video Coverage',
      'E-commerce Product Photography',
      'Aerial Drone Videography'
    ],
    active: true,
    sortOrder: 10
  },
  {
    id: 'fitness',
    name: 'Fitness & Wellness',
    slug: 'fitness',
    iconName: 'Activity',
    description: 'Personal gym trainers, weight loss coaches, home yoga instructors, and nutrition plans.',
    commonServices: [
      'One-on-One Gym Personal Training',
      'Home Aerobics & HIIT Coaching',
      'Custom Meal Planning & Diet Prep',
      'Yoga & Flexibility Sessions'
    ],
    active: true,
    sortOrder: 11
  },
  {
    id: 'other',
    name: 'Handyman & Trades',
    slug: 'other',
    iconName: 'Hammer',
    description: 'Carpentry, painting, air conditioning, POP ceiling design, welding, and facility maintenance.',
    commonServices: [
      'Air Conditioner Installation & Gas Servicing',
      'POP Ceiling Installation & Painting',
      'Carpentry, Cabinetry & Door Hanging',
      'Welding, Metal Gates & Burglar Proofing',
      'Tiling & Interlocking Stone Laying',
      'General Handyman & Furniture Assembly'
    ],
    active: true,
    sortOrder: 12
  }
];

export function getCategoryById(id: string): ServiceCategory | undefined {
  if (!id) return undefined;
  return CATEGORIES.find(c => c.id === id || c.slug === id);
}
