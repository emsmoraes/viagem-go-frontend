import { MetricsCard } from "@/shared/components/ui/MetricsCard";

export function Home() {
  const metrics = [
    { title: "Métrica 1", value: 240, description: "Aumento de 14% vs semana anterior" },
    { title: "Métrica 2", value: 240, description: "Aumento de 14% vs semana anterior" },
    { title: "Métrica 3", value: 240, description: "Aumento de 14% vs semana anterior" },
    { title: "Métrica 4", value: 240, description: "Aumento de 14% vs semana anterior" },
  ];

  return (
    <div className="flex flex-col flex-1 gap-4 p-4 bg-[#F7F7F7] overflow-y-auto h-full">
      <h1 className="text-3xl font-semibold text-black">Home</h1>

      <div className="flex flex-col gap-4">
        {metrics.map((metric, index) => (
          <MetricsCard key={index} {...metric} />
        ))}
      </div>

      <div className="w-full bg-white rounded-lg shadow-md p-4 flex flex-col gap-2">
        <h2 className="text-[16px] font-semibold text-[#1d1d1d]">Atividade Recente</h2>

        <div className="w-full h-[420px] bg-[#D0D0D0] rounded-lg flex items-center justify-center">
          <p className="text-[#585858] text-[14px]">Gráfico de atividade</p>
        </div>
      </div>
    </div>
  );
}
