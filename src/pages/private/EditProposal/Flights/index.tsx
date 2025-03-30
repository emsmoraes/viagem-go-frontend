import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import AddFlight from "./components/AddFlight";
import { useSteppers } from "../contexts/SteppersContext/useSteppers";
import { useState } from "react";

export function Flights() {
  const { proposal } = useSteppers();

  const tickets = proposal?.tickets;

  return (
    <div className="space-y-3 lg:pr-6">
      <AddFlight />

      <Tabs defaultValue="OUTBOUND">
        <TabsList className="py-1">
          <TabsTrigger className="py-4" value="OUTBOUND">
            Voos de ida
          </TabsTrigger>
          <TabsTrigger className="py-4" value="INBOUND">
            Voos de volta
          </TabsTrigger>
          <TabsTrigger className="py-4" value="INTERNAL">
            Voos de internos
          </TabsTrigger>
        </TabsList>

        <div className="mt-4 space-y-4 lg:pr-6">
          <TabsContent value="OUTBOUND">{tickets?.map((ticket) => <p>{ticket.origin}</p>)}</TabsContent>
          <TabsContent value="INBOUND">Change your password here.</TabsContent>
          <TabsContent value="INTERNAL">Change your password here.</TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
