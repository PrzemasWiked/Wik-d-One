
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
  UserCircle,
  Key
} from 'lucide-react';
import { ServiceLink } from './types';

export const SERVICE_LINKS: ServiceLink[] = [
  {
    id: 'wiked-pl',
    title: 'Wikęd.pl',
    description: 'Oficjalny portal producenta drzwi premium. Poznaj pełną ofertę i aktualności.',
    url: 'https://wiked.pl/',
    icon: 'globe',
    category: 'main'
  },
  {
    id: 'studio',
    title: 'Studio Wikęd',
    description: 'Zaawansowany konfigurator 3D – zaprojektuj swoje idealne drzwi online.',
    url: 'https://konfigurator.wiked.pl/',
    icon: 'settings',
    category: 'main'
  },
  {
    id: 'salony',
    title: 'Salony',
    description: 'Mapa autoryzowanych salonów sprzedaży. Znajdź ekspertów w swojej okolicy.',
    url: 'https://gdziekupic.wiked.pl/',
    icon: 'map-pin',
    category: 'main'
  },
  {
    id: 'moj-wiked',
    title: 'Mój Wikęd',
    description: 'Dostęp do konta iQuote. Zarządzaj swoimi zamówieniami i danymi po zalogowaniu.',
    url: '#',
    icon: 'user-circle',
    category: 'main',
    requiresAuth: true
  },
  {
    id: 'wymiary',
    title: 'Wymiary',
    description: 'Kalkulator techniczny – precyzyjne wytyczne montażowe i wymiary otworów.',
    url: 'https://kalkulator.wiked.pl/',
    icon: 'calculator',
    category: 'tools'
  },
  {
    id: 'gwarancja',
    title: 'Gwarancja',
    description: 'Strefa klienta – rejestracja produktów oraz zgłaszanie zgłoszeń serwisowych.',
    url: 'https://strefa.wiked.pl/zaloguj',
    icon: 'shield-check',
    category: 'support'
  },
  {
    id: 'strefa-montera',
    title: 'Strefa Montera',
    description: 'Dokumentacja i narzędzia dla profesjonalnych ekip montażowych.',
    url: 'https://strefa.wiked.pl/monter',
    icon: 'hammer',
    category: 'support'
  },
  {
    id: 'akademia',
    title: 'Akademia Wikęd',
    description: 'Zostań certyfikowanym monterem. Profesjonalne szkolenia i rozwój kompetencji.',
    url: 'https://akademia.wiked.pl/',
    icon: 'graduation-cap',
    category: 'support'
  },
  {
    id: 'admin-panel',
    title: 'Panel Admina',
    description: 'Centralne zarządzanie uprawnieniami i parametrami platformy Wikęd One.',
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
    case 'key': return <Key size={iconSize} />;
    default: return <Globe size={iconSize} />;
  }
};
