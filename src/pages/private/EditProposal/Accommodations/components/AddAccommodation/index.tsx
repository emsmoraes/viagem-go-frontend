import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import AddAccommodationForm from "../AddAccommodationForm";

function AddAccommodation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open ? (
        <Button onClick={() => setOpen(true)} className="[&_svg:not([class*='size-'])]:size-6">
          <IoIosAddCircleOutline /> Nova hospedagem
        </Button>
      ) : (
        <Card className="w-full p-0">
          <CardContent className="w-full p-0">
            <Button onClick={() => setOpen(false)} className="[&_svg:not([class*='size-'])]:size-6" size={"icon"}>
              <IoCloseCircleOutline />
            </Button>

            <div className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Adicionar hospedagem</h2>
              <AddAccommodationForm setOpen={setOpen} />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default AddAccommodation;
