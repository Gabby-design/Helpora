import { CityOption } from '../types';

export const CITIES: CityOption[] = [
  {
    id: 'abuja-fct',
    name: 'Abuja',
    state: 'Federal Capital Territory',
    country: 'Nigeria',
    lat: 9.0765,
    lng: 7.3986,
    areas: ['Garki', 'Wuse II', 'Maitama', 'Asokoro', 'Jabi', 'Gwarinpa', 'Utako', 'Kubwa', 'Lugbe', 'Apo']
  },
  {
    id: 'lagos-ng',
    name: 'Lagos',
    state: 'Lagos State',
    country: 'Nigeria',
    lat: 6.5244,
    lng: 3.3792,
    areas: ['Ikeja', 'Victoria Island', 'Lekki', 'Yaba', 'Surulere', 'Ikoyi', 'Maryland', 'Festac', 'Magodo']
  },
  {
    id: 'portharcourt-ng',
    name: 'Port Harcourt',
    state: 'Rivers State',
    country: 'Nigeria',
    lat: 4.8156,
    lng: 7.0498,
    areas: ['Old GRA', 'New GRA', 'D-Line', 'Trans Amadi', 'Rumuokoro', 'Peter Odili Road']
  },
  {
    id: 'ibadan-ng',
    name: 'Ibadan',
    state: 'Oyo State',
    country: 'Nigeria',
    lat: 7.3775,
    lng: 3.9470,
    areas: ['Bodija', 'Dugbe', 'Ring Road', 'Agodi GRA', 'Samonda', 'Oluyole']
  },
  {
    id: 'kano-ng',
    name: 'Kano',
    state: 'Kano State',
    country: 'Nigeria',
    lat: 12.0022,
    lng: 8.5920,
    areas: ['Nassarawa', 'Bompai', 'Fagge', 'Dala', 'Kano Municipal']
  },
  {
    id: 'benin-ng',
    name: 'Benin City',
    state: 'Edo State',
    country: 'Nigeria',
    lat: 6.3350,
    lng: 5.6037,
    areas: ['GRA', 'Uselu', 'Airport Road', 'Ikpoba Hill', 'Ring Road']
  },
  {
    id: 'enugu-ng',
    name: 'Enugu',
    state: 'Enugu State',
    country: 'Nigeria',
    lat: 6.4584,
    lng: 7.5464,
    areas: ['Independence Layout', 'New Haven', 'GRA', 'Ogui', 'Trans-Ekulu']
  }
];

export const NIGERIAN_CITIES = CITIES;
export const DEFAULT_CITY = CITIES[0]; // Abuja, FCT

export function getCityById(id: string): CityOption | undefined {
  if (!id) return DEFAULT_CITY;
  return CITIES.find(
    c => c.id.toLowerCase() === id.toLowerCase() || c.name.toLowerCase() === id.toLowerCase()
  );
}

export function findCityByQuery(query: string): CityOption | undefined {
  if (!query) return DEFAULT_CITY;
  const clean = query.trim().toLowerCase();
  return CITIES.find(
    c =>
      c.name.toLowerCase().includes(clean) ||
      c.id.toLowerCase().includes(clean) ||
      c.state.toLowerCase().includes(clean) ||
      `${c.name}, ${c.state}`.toLowerCase().includes(clean) ||
      c.areas.some(a => a.toLowerCase().includes(clean))
  );
}
