import { ServiceCategory } from '../types';

export const CATEGORIES: ServiceCategory[] = [
  {
    id: 'electrician',
    name: 'Electrician',
    slug: 'electrician',
    iconName: 'Zap',
    description: 'Electrical wiring, inverter & solar installations, distribution boards, generator ATS & lighting.',
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
    description: 'Borehole systems, water pumping machines, plumbing pipes, leak detection, and sanitary fittings.',
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
    description: 'Auto diagnostics, engine overhauls, brake pads, suspension repair, and routine vehicle servicing.',
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
    description: 'Smartphone screen replacement, laptop battery swaps, board-level micro-soldering, and data recovery.',
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
    name: 'Cleaner',
    slug: 'cleaner',
    iconName: 'Sparkles',
    description: 'Post-construction cleaning, deep home sanitization, fumigation, upholstery steaming, and office upkeep.',
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
    name: 'Tutor',
    slug: 'tutor',
    iconName: 'GraduationCap',
    description: 'One-on-one academic tutoring, WAEC/JAMB/UTME prep, coding instruction, and professional exam coaching.',
    commonServices: [
      'WAEC, NECO & JAMB/UTME Preparation',
      'Primary & Secondary Math & Sciences',
      'Python, Web Development & Scratch Coding',
      'English Diction, Phonics & Essay Writing',
      'IGCSE, SAT & Cambridge Checkpoint Tutoring',
      'Adult Literacy & Digital Skills'
    ],
    active: true,
    sortOrder: 6
  },
  {
    id: 'other',
    name: 'Other Trades & Handyman',
    slug: 'other',
    iconName: 'Hammer',
    description: 'Carpentry, painting, air conditioning, POP ceiling design, welding, and general facility maintenance.',
    commonServices: [
      'Air Conditioner Installation & Gas Servicing',
      'POP Ceiling Installation & Painting',
      'Carpentry, Cabinetry & Door Hanging',
      'Welding, Metal Gates & Burglar Proofing',
      'Tiling & Interlocking Stone Laying',
      'General Handyman & Furniture Assembly'
    ],
    active: true,
    sortOrder: 7
  }
];

export function getCategoryById(id: string): ServiceCategory | undefined {
  if (!id) return undefined;
  return CATEGORIES.find(c => c.id === id || c.slug === id);
}
