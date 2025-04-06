import { useSteppers } from "../contexts/SteppersContext/useSteppers";
import AddInsurance from "./components/AddInsurance";
import InsuranceItem from "./components/InsuranceItem";

export function Insurances() {
  const { proposal } = useSteppers();
  const insurences = proposal?.insurances || [];

  return (
    <div className="max-h-full space-y-3 lg:pr-6">
      <AddInsurance />

      <div className="mt-4 space-y-4 lg:pr-6">
        <div className="space-y-3">
          {insurences.length > 0 ? (
            insurences.map((insurance) => <InsuranceItem key={insurance.id} insurance={insurance} />)
          ) : (
            <p className="text-center text-gray-500">Nenhum seguro encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}
