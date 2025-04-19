import { CustomerDocument } from "./customer-document.model";

export interface Customer {
  id: string;
  userId: string;
  fullName: string;
  imageUrl: string | null;
  nickname: string | null;
  rg: string | null;
  cpf: string | null;
  birthDate: string | null;
  email: string | null;
  phone: string | null;
  maritalStatus: string | null;
  profession: string | null;
  numberOfChildren: number | null;
  postalCode: string | null;
  address: string | null;
  addressNumber: string | null;
  neighborhood: string | null;
  complement: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  family: string[];
  accommodationPreference: string[];
  airPreference: string[];
  travelStyle: string[];
  interestedExperiences: string[];
  dreamTrips: string[];
  recentTrips: string[];
  tags: string[];
  documents: CustomerDocument[];
  observation: string | null;
  referralSource: string | null;
  createdAt: string;
  updatedAt: string;
}
