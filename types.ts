
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST'
}

export enum IQuoteAccountType {
  DISTRIBUTOR = 'DISTRIBUTOR',
  APS = 'APS'
}

export interface APSInfo {
  id: string;
  name: string;
  login: string;
}

export interface WarrantyDoor {
  id: string;
  model: string;
  serialNumber: string;
  purchaseDate: string;
  warrantyUntil: string;
  status: 'active' | 'expired';
}

export interface IQuoteAccount {
  id: string;
  login: string;
  passwordHash: string;
  label?: string;
  type: IQuoteAccountType;
  apsList?: APSInfo[];
}

export interface InstallerProfile {
  id: string;
  name: string;
  city: string;
  rating: number;
  completedCourses: string[];
  isCertified: boolean;
}

export interface User {
  id: string;
  username: string;
  role: UserRole;
  email: string;
  isInstaller?: boolean;
  linkedAccounts?: IQuoteAccount[];
  warrantyDoors?: WarrantyDoor[];
  installerProfile?: InstallerProfile;
}

export interface ServiceLink {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  category: 'main' | 'tools' | 'support' | 'admin';
  requiresAuth?: boolean;
  requiresAdmin?: boolean;
}
