
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST'
}

export interface IQuoteAccount {
  id: string;
  login: string;
  passwordHash: string;
  label?: string;
}

export interface User {
  id: string;
  username: string;
  role: UserRole;
  email: string;
  linkedAccounts?: IQuoteAccount[];
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
