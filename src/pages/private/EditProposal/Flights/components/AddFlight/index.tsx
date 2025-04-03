import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import AddFlightForm from "../AddFlightForm";

function AddFlight() {
  const [openNewFlight, setOpenNewFlight] = useState(false);

  return (
    <>
      {!openNewFlight ? (
        <Button onClick={() => setOpenNewFlight(true)} className="[&_svg:not([class*='size-'])]:size-6">
          <IoIosAddCircleOutline /> Novo destino
        </Button>
      ) : (
        <Card className="w-full p-0">
          <CardContent className="w-full p-0">
            <Button
              onClick={() => setOpenNewFlight(false)}
              className="[&_svg:not([class*='size-'])]:size-6"
              size={"icon"}
            >
              <IoCloseCircleOutline />
            </Button>

            <div className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Adicionar Passagem</h2>
              <AddFlightForm setOpen={setOpenNewFlight} />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default AddFlight;
