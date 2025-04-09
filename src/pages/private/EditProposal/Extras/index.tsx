import { useSteppers } from "../contexts/SteppersContext/useSteppers";
import AddExtra from "./components/AddExtra";
import ExtraItem from "./components/ExtraItem";

export function Extras() {
  const { proposal } = useSteppers();
  const extras = proposal?.extras || [];

  return (
    <div className="max-h-full space-y-3 lg:pr-6">
      <AddExtra />

      <div className="mt-4 space-y-4 lg:pr-6">
        <div className="space-y-3">
          {extras.length > 0 ? (
            extras.map((extra) => <ExtraItem key={extra.id} extra={extra} />)
          ) : (
            <p className="text-center text-gray-500">Nenhum item adicional encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}
