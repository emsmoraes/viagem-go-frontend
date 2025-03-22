export interface Agency {
  id: string;
  logoUrl: string | null;
  name: string;
  whatsapp?: string | null;
  phone?: string | null;
  website?: string | null;
  instagram: string | null;
  locationLink?: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}
