import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import AddCruiseForm from "../AddCruiseForm";

function AddCruise() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open ? (
        <Button onClick={() => setOpen(true)} className="[&_svg:not([class*='size-'])]:size-6">
          <IoIosAddCircleOutline /> Nova cruzeiro
        </Button>
      ) : (
        <Card className="w-full p-0">
          <CardContent className="w-full p-0">
            <Button onClick={() => setOpen(false)} className="[&_svg:not([class*='size-'])]:size-6" size={"icon"}>
              <IoCloseCircleOutline />
            </Button>

            <div className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Adicionar cruzeiro</h2>
              <AddCruiseForm setOpen={setOpen}/>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default AddCruise;
