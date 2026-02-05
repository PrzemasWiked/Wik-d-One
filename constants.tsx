
import React from 'react';
import { 
  Globe, 
  Settings, 
  MapPin, 
  Calculator, 
  ShieldCheck, 
  Hammer, 
  GraduationCap, 
  LayoutDashboard,
  UserCircle
} from 'lucide-react';
import { ServiceLink } from './types';

export const SERVICE_LINKS: ServiceLink[] = [
  {
    id: 'wiked-pl',
    title: 'Wikęd.pl',
    description: 'Strona główna producenta drzwi Wikęd.',
    url: 'https://wiked.pl/',
    icon: 'globe',
    category: 'main'
  },
  {
    id: 'studio',
    title: 'Studio Wikęd',
    description: 'Konfigurator drzwi - zaprojektuj swoje wymarzone wejście.',
    url: 'https://konfigurator.wiked.pl/',
    icon: 'settings',
    category: 'main'
  },
  {
    id: 'salony',
    title: 'Salony',
    description: 'Znajdź najbliższy salon sprzedaży drzwi Wikęd.',
    url: 'https://gdziekupic.wiked.pl/',
    icon: 'map-pin',
    category: 'main'
  },
  {
    id: 'wymiary',
    title: 'Wymiary',
    description: 'Kalkulator wymiarów montażowych i otworów.',
    url: 'https://kalkulator.wiked.pl/',
    icon: 'calculator',
    category: 'tools'
  },
  {
    id: 'gwarancja',
    title: 'Gwarancja',
    description: 'Zarejestruj produkt lub sprawdź status gwarancji.',
    url: 'https://strefa.wiked.pl/zaloguj',
    icon: 'shield-check',
    category: 'support'
  },
  {
    id: 'strefa-montera',
    title: 'Strefa Montera',
    description: 'Portal dedykowany dla profesjonalnych montażystów.',
    url: 'https://strefa.wiked.pl/monter',
    icon: 'hammer',
    category: 'support'
  },
  {
    id: 'akademia',
    title: 'Zostań Montażystą',
    description: 'Akademia Wikęd - szkolenia i certyfikacja dla fachowców.',
    url: 'https://akademia.wiked.pl/',
    icon: 'graduation-cap',
    category: 'support'
  },
  {
    id: 'admin-panel',
    title: 'Panel Admina',
    description: 'Zarządzanie systemem Wikęd One (tylko dla administratorów).',
    url: '#',
    icon: 'layout-dashboard',
    category: 'admin',
    requiresAdmin: true
  }
];

export const getIcon = (name: string) => {
  const iconSize = 24;
  switch (name) {
    case 'globe': return <Globe size={iconSize} />;
    case 'settings': return <Settings size={iconSize} />;
    case 'map-pin': return <MapPin size={iconSize} />;
    case 'calculator': return <Calculator size={iconSize} />;
    case 'shield-check': return <ShieldCheck size={iconSize} />;
    case 'hammer': return <Hammer size={iconSize} />;
    case 'graduation-cap': return <GraduationCap size={iconSize} />;
    case 'layout-dashboard': return <LayoutDashboard size={iconSize} />;
    case 'user-circle': return <UserCircle size={iconSize} />;
    default: return <Globe size={iconSize} />;
  }
};
