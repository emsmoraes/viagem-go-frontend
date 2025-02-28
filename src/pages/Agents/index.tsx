import usePageTitle from "@/shared/hooks/usePageTitle";
import AgentItem from "./components/AgentItem";
import { LoadingSkeleton } from "@/shared/components/LoadingSkeleton";

export function Agents() {
  const currentRoute = usePageTitle();
  const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"];

  return (
    <div>
      <h1 className="text-3xl font-semibold text-black">{currentRoute.label}</h1>

      <h2 className="text-xl font-semibold text-black mt-5">Agentes Pré-configurados</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 mb-5">
        {items.map((item, index) => (
          <AgentItem key={index} />
        ))}
      </div>

      <LoadingSkeleton
        quantity={6}
        layout="grid"
        gridColumns={3}
        gridGap="gap-4"
        width="100%"
        height="200px"
        rounded="8px"
      />
    </div>
  );
}
