import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import AddExperienceForm from "../AddExperienceForm";

function AddExperience() {
  const [openNewFlight, setOpenNewExperience] = useState(false);

  return (
    <>
      {!openNewFlight ? (
        <Button onClick={() => setOpenNewExperience(true)} className="[&_svg:not([class*='size-'])]:size-6">
          <IoIosAddCircleOutline /> Nova experiência
        </Button>
      ) : (
        <Card className="w-full p-0">
          <CardContent className="w-full p-0">
            <Button
              onClick={() => setOpenNewExperience(false)}
              className="[&_svg:not([class*='size-'])]:size-6"
              size={"icon"}
            >
              <IoCloseCircleOutline />
            </Button>

            <div className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Adicionar experiência</h2>
              <AddExperienceForm setOpen={setOpenNewExperience} />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default AddExperience;
