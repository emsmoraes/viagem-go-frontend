import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Button } from "@/shared/components/ui/button";

interface BackButtonProps {
  to?: string;
}

export const BackButton = ({ to }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button size={"icon"} onClick={handleClick} className="flex items-center gap-2">
      <FiArrowLeft className="h-4 w-4" />
    </Button>
  );
};
