import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import AddSummaryForm from "../AddSummaryForm";

function AddSummary() {
  const [openNewSummary, setOpenNewSummary] = useState(false);

  return (
    <>
      {!openNewSummary ? (
        <Button onClick={() => setOpenNewSummary(true)} className="[&_svg:not([class*='size-'])]:size-6">
          <IoIosAddCircleOutline /> Novo resumo
        </Button>
      ) : (
        <Card className="w-full p-0">
          <CardContent className="w-full p-0">
            <Button
              onClick={() => setOpenNewSummary(false)}
              className="[&_svg:not([class*='size-'])]:size-6"
              size={"icon"}
            >
              <IoCloseCircleOutline />
            </Button>

            <div className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Adicionar resumo</h2>
              <AddSummaryForm setOpen={setOpenNewSummary} />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default AddSummary;
