
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST'
}

export interface User {
  id: string;
  username: string;
  role: UserRole;
  email: string;
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
