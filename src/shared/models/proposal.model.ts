import { DayByDay } from "./day-by-day.model";
import { Destination } from "./destination.model";
import { Passenger } from "./passenger.model";
import { Ticket } from "./ticket.model";

export interface Proposal {
  id: string;
  title: string;
  coverUrl: string | null;
  status: "INCOMPLETE" | "AWAITING_RESPONSE" | "CONFIRMED" | "LOST";
  departureDate: string | null;
  returnDate: string | null;
  userId: string;
  passengers?: Passenger[];
  destinations?: Destination[];
  dayByDays?: DayByDay[];
  tickets?: Ticket[];
  createdAt: string;
  updatedAt: string;
}
