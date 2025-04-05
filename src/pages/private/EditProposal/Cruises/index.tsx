import { useSteppers } from "../contexts/SteppersContext/useSteppers";
import AddCruise from "./components/AddCruise";
import CruiseItem from "./components/CruiseItem";

export function Cruises() {
  const { proposal } = useSteppers();
  const cruises = proposal?.cruises || [];

  return (
    <div className="max-h-full space-y-3 lg:pr-6">
      <AddCruise />

      <div className="mt-4 space-y-4 lg:pr-6">
        <div className="space-y-3">
          {cruises.length > 0 ? (
            cruises.map((cruise) => <CruiseItem cruise={cruise} />)
          ) : (
            <p className="text-center text-gray-500">Nenhum cruzeiro encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}
