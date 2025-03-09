export interface Proposal {
    id: string;
    title: string;
    coverUrl: string | null;
    status: "INCOMPLETE" | "AWAITING_RESPONSE" | "CONFIRMED" | "LOST";
    departureDate: string | null;
    returnDate: string | null;
    userId: string;
    createdAt: string;
    updatedAt: string;
  }
  