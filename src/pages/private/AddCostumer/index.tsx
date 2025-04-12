import { ScrollArea } from "@/shared/components/ui/scroll-area";
import DataForm from "./components/DataForm";
import { BackButton } from "@/shared/components/BackButton";

export function AddCostumer() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <ScrollArea className="flex h-full flex-col">
        <div className="mb-8 flex items-center gap-4 pt-3">
          <BackButton />
          <h1 className="text-xl font-medium">Adicionar cliente</h1>
        </div>

        <div className="pb-6 lg:pr-6">
          <DataForm />
        </div>
      </ScrollArea>
    </div>
  );
}
