export interface Destination {
  id: string;
  name: string;
  proposalId: string;
  description?: string;
  departureDate?: string;
  returnDate?: string;
  images?: string[];
}
