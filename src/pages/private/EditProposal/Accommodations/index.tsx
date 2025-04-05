import { useSteppers } from "../contexts/SteppersContext/useSteppers";
import AccommodationItem from "./components/AccommodationItem";
import AddAccommodation from "./components/AddAccommodation";

export function Accommodations() {
  const { proposal } = useSteppers();
  const accommodations = proposal?.accommodations || [];

  return (
    <div className="max-h-full space-y-3 lg:pr-6">
      <AddAccommodation />

      <div className="mt-4 space-y-4 lg:pr-6">
        <div className="space-y-3">
          {accommodations.length > 0 ? (
            accommodations.map((accommodation) => <AccommodationItem accommodation={accommodation} />)
          ) : (
            <p className="text-center text-gray-500">Nenhuma hospedagem encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}
