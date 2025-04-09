import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import AddExtraForm from "../AddExtraForm";

function AddExtra() {
  const [openNewExtra, setOpenNewExtra] = useState(false);

  return (
    <>
      {!openNewExtra ? (
        <Button onClick={() => setOpenNewExtra(true)} className="[&_svg:not([class*='size-'])]:size-6">
          <IoIosAddCircleOutline /> Novo extra
        </Button>
      ) : (
        <Card className="w-full p-0">
          <CardContent className="w-full p-0">
            <Button
              onClick={() => setOpenNewExtra(false)}
              className="[&_svg:not([class*='size-'])]:size-6"
              size={"icon"}
            >
              <IoCloseCircleOutline />
            </Button>

            <div className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Adicionar extra</h2>
              <AddExtraForm setOpen={setOpenNewExtra} />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default AddExtra;
