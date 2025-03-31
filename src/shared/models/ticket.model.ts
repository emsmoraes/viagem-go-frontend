export interface Ticket {
  id: string;
  origin: string;
  destination: string;
  type: "OUTBOUND" | "INBOUND" | "INTERNAL";
  baggagePerPerson: number | null;
  duration: string | null;
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
