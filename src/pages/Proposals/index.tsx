import usePageTitle from "@/shared/hooks/usePageTitle";

export function Proposals() {
  const currentRoute = usePageTitle();

  return (
    <div>
      <h1 className="text-3xl font-semibold text-black">{currentRoute.label}</h1>
    </div>
  );
}
