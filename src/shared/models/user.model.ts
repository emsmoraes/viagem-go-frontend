export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone: string | null;
  avatarUrl: string | null;
  agencyId: string;
  type: "AGENCY_ADMIN" | "AGENCY_EMPLOYEE";
  proposalThankYouMessageTitle: string | null;
  proposalThankYouMessageSubtitle: string | null;
  createdAt: string;
  updatedAt: string;
}
