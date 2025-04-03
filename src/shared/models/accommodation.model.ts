export interface Accommodation {
  id: string;
  name: string;
  location: string;
  address: string;
  checkIn: string;
  checkOut: string;
  category: string;
  boardType: string;
  roomType: string;
  description: string;
  price: number;
  imageUrls: string[];
  pdfUrls: string[];
  proposalId: string;
  createdAt: string;
  updatedAt: string;
}
