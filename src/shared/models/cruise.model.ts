export interface Cruise {
    id: string;
    name: string;
    cabin?: string;
    checkIn?: string;
    checkOut?: string;
    route?: string;
    description?: string;
    price?: number;
    paymentMethods?: string;
    images?: string[];
    files?: string[];
    proposalId: string;
    createdAt: string;
    updatedAt: string;
  }
  