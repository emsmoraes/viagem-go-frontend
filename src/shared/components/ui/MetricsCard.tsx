interface MetricsCardProps {
  title: string;
  value: number;
  description: string;
}

export function MetricsCard({ title, value, description }: MetricsCardProps) {
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 flex flex-col gap-2">
      <h2 className="text-[16px] font-semibold text-[#1d1d1d]">{title}</h2>
      <strong className="text-[22px] font-bold text-[#1d1d1d]">{value}</strong>
      <p className="text-[12px] text-[#036308]">{description}</p>
    </div>
  );
}
