
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

export interface User {
  id: string;
  username: string;
  role: UserRole;
  email: string;
  linkedAccounts?: IQuoteAccount[];
  warrantyDoors?: WarrantyDoor[];
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
