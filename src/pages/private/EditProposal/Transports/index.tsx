import { useSteppers } from "../contexts/SteppersContext/useSteppers";
import AddTransport from "./components/AddTransport";
import TransportItem from "./components/TransportItem";

export function Transports() {
  const { proposal } = useSteppers();
  const transports = proposal?.transports || [];

  return (
    <div className="max-h-full space-y-3 lg:pr-6">
      <AddTransport />

      <div className="mt-4 space-y-4 lg:pr-6">
        <div className="space-y-3">
          {transports.length > 0 ? (
            transports.map((transport) => <TransportItem key={transport.id} transport={transport} />)
          ) : (
            <p className="text-center text-gray-500">Nenhum transporte encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}
