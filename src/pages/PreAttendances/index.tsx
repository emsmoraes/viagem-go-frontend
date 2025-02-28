import usePageTitle from "@/shared/hooks/usePageTitle";

export function PreAttendances() {
  const currentRoute = usePageTitle();

  return (
    <div>
      <h1 className="text-3xl font-semibold text-black">{currentRoute.label}</h1>
    </div>
  );
}
