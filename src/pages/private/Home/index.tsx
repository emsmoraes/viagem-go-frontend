import usePageTitle from "@/shared/hooks/usePageTitle";

export function Home() {
  const currentRoute = usePageTitle();

  return (
    <div className="flex flex-col flex-1 gap-4 bg-[#F7F7F7] overflow-y-auto h-full">
      <h1 className="text-3xl font-semibold text-black">{currentRoute.label}</h1>
    </div>
  );
}
