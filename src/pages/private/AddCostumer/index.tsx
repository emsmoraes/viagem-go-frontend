import { ScrollArea } from "@/shared/components/ui/scroll-area";
import React from "react";
import DataForm from "./components/DataForm";

export function AddCostumer() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <ScrollArea className="flex h-full flex-col">
        <h1 className="mb-8 pt-3 text-xl font-medium">Adicionar cliente</h1>

        <div className="lg:pr-6">
          <DataForm />
        </div>
      </ScrollArea>
    </div>
  );
}
