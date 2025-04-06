import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import AddInsuranceForm from "../AddInsuranceForm";

function AddInsurance() {
  const [openNewInsurance, setOpenNewInsurance] = useState(false);

  return (
    <>
      {!openNewInsurance ? (
        <Button onClick={() => setOpenNewInsurance(true)} className="[&_svg:not([class*='size-'])]:size-6">
          <IoIosAddCircleOutline /> Novo seguro
        </Button>
      ) : (
        <Card className="w-full p-0">
          <CardContent className="w-full p-0">
            <Button
              onClick={() => setOpenNewInsurance(false)}
              className="[&_svg:not([class*='size-'])]:size-6"
              size={"icon"}
            >
              <IoCloseCircleOutline />
            </Button>

            <div className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Adicionar seguro</h2>
              <AddInsuranceForm setOpen={setOpenNewInsurance} />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default AddInsurance;
