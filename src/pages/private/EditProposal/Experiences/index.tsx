import { useSteppers } from "../contexts/SteppersContext/useSteppers";
import AddExperience from "./components/AddExperience";
import ExperienceItem from "./components/ExperienceItem";

export function Experiences() {
  const { proposal } = useSteppers();
  const experiences = proposal?.experiences || [];

  return (
    <div className="max-h-full space-y-3 lg:pr-6">
      <AddExperience />

      <div className="mt-4 space-y-4 lg:pr-6">
        <div className="space-y-3">
          {experiences.length > 0 ? (
            experiences.map((experience) => <ExperienceItem key={experience.id} experience={experience} />)
          ) : (
            <p className="text-center text-gray-500">Nenhuma experiência encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}
