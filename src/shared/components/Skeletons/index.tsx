import { Skeleton } from "../ui/skeleton";

type SkeletonsProps = {
  itemCount: number;
  cardClassName?: string;
  containerClassName?: string;
};

const Skeletons: React.FC<SkeletonsProps> = ({
  itemCount,
  cardClassName = "p-4 bg-gray-200 rounded-lg",
  containerClassName = "",
}) => {
  return (
    <div className={`${containerClassName}`}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <div key={index} className={cardClassName}>
          <Skeleton className="h-full w-full" />
        </div>
      ))}
    </div>
  );
};

export default Skeletons;
