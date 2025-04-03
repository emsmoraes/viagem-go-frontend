import { useState } from "react";
import AddFlight from "./components/AddFlight";
import { useSteppers } from "../contexts/SteppersContext/useSteppers";
import FlightItem from "./components/FlightItem";
import { Ticket } from "@/shared/models/ticket.model";

export function Flights() {
  const { proposal } = useSteppers();
  const tickets = proposal?.tickets || [];

  const [activeFilter, setActiveFilter] = useState<Ticket["type"] | "ALL">("ALL");

  const filterTickets = (ticket: Ticket) => {
    if (activeFilter === "ALL") return true;
    return ticket.type === activeFilter;
  };

  const filteredTickets = tickets.filter(filterTickets);

  const filters = [
    { label: "Todos", value: "ALL" },
    { label: "Ida", value: "OUTBOUND" },
    { label: "Volta", value: "INBOUND" },
    { label: "Interna", value: "INTERNAL" },
  ] as const;

  return (
    <div className="max-h-full space-y-3 lg:pr-6">
      <AddFlight />

      <div className="mt-2 flex gap-2">
        {filters.map(({ label, value }) => (
          <button
            key={value}
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${
              activeFilter === value ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-4 lg:pr-6">
        <div className="space-y-3">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <FlightItem
                key={ticket.id}
                defaultValues={{
                  destination: ticket.destination,
                  origin: ticket.origin,
                  type: ticket.type,
                  arrivalAt: ticket.arrivalAt && new Date(ticket.arrivalAt) || undefined,
                  departureAt: ticket.departureAt && new Date(ticket.departureAt) || undefined,
                  baggagePerPerson: ticket.baggagePerPerson || undefined,
                  duration: ticket.duration || undefined,
                  files: ticket.fileUrls,
                  images: ticket.imageUrls,
                  observation: ticket.observation || "",
                  price: Number(ticket.price),
                }}
                flight={ticket}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">Nenhum voo encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}
