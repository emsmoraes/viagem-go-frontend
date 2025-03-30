export interface Ticket {
  id: string;
  origin: string;
  destination: string;
  type: string;
  baggagePerPerson: number | null;
  duration: number | null;
  price: string;
  imageUrls: string[];
  fileUrls: string[];
  departureAt: string;
  arrivalAt: string;
  proposalId: string;
  createdAt: string;
  updatedAt: string;
  observation: string | null;
}
