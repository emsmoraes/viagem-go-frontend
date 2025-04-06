import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import AddTransportForm from "../AddTransportForm";

function AddTransport() {
  const [openNewFlight, setOpenNewTransport] = useState(false);
  
  return (
    <>
      {!openNewFlight ? (
        <Button onClick={() => setOpenNewTransport(true)} className="[&_svg:not([class*='size-'])]:size-6">
          <IoIosAddCircleOutline /> Novo transporte
        </Button>
      ) : (
        <Card className="w-full p-0">
          <CardContent className="w-full p-0">
            <Button
              onClick={() => setOpenNewTransport(false)}
              className="[&_svg:not([class*='size-'])]:size-6"
              size={"icon"}
            >
              <IoCloseCircleOutline />
            </Button>

            <div className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Adicionar transporte</h2>
              <AddTransportForm setOpen={setOpenNewTransport} />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default AddTransport;
