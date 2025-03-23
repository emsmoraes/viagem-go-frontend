export enum UserRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
}

export interface UserRoleEntry {
  id: string;
  role: UserRole;
  userId: string;
  agencyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone: string | null;
  avatarUrl: string | null;
  agencyId: string;
  userRoles: UserRoleEntry[];
  active: boolean;
  proposalThankYouMessageTitle: string | null;
  proposalThankYouMessageSubtitle: string | null;
  createdAt: string;
  updatedAt: string;
}
