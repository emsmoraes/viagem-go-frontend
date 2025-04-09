import { useSteppers } from "../contexts/SteppersContext/useSteppers";
import AddSummary from "./components/AddSummary";
import SummaryItem from "./components/SummaryItem";

export function Summaries() {
  const { proposal } = useSteppers();
  const summaries = proposal?.summary || [];

  return (
    <div className="max-h-full space-y-3 lg:pr-6">
      <AddSummary />

      <div className="mt-4 space-y-4 lg:pr-6">
        <div className="space-y-3">
          {summaries.length > 0 ? (
            summaries.map((summary) => <SummaryItem key={summary.id} summary={summary} />)
          ) : (
            <p className="text-center text-gray-500">Nenhum resumo encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}
