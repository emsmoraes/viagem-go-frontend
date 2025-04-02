import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Destination } from "@/shared/models/destination.model";
import { Proposal } from "@/shared/models/proposal.model";
import { useQueryClient } from "@tanstack/react-query";
import { CgSpinner } from "react-icons/cg";
import { HiOutlineTrash } from "react-icons/hi";
import { useDeleteDestinationMutation } from "../../hooks/useDestination";
import { toast } from "sonner";
import moment from "moment";
import { FiEdit2 } from "react-icons/fi";
import EditDestination from "../EditDestination";

function DestinationItem({
  destination,
  proposal,
  index,
}: {
  destination: Destination;
  proposal: Proposal;
  index: number;
}) {
  const queryClient = useQueryClient();

  const { deleteDestination, isLoadingDeleteDestination } = useDeleteDestinationMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal", proposal?.id] });
      toast("Destino excluído com sucesso. Alterações salvas!");
    },
    onError: () => {
      toast("Erro ao excluir destino");
    },
  });

  const handleDelete = () => {
    deleteDestination({ id: destination.id });
  };

  return (
    <Card>
      <CardContent className="relative flex items-center justify-between">
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-xl font-semibold">
              {index + 1} - {destination.name}
            </h2>
            <p className="mt-2 max-w-[300px]">{destination.description}</p>
          </div>
          {destination.images && (
            <div className="flex flex-wrap gap-3">
              {destination.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="destination-image"
                  className="max-h-40 max-w-full rounded-lg border object-contain shadow-xl"
                />
              ))}
            </div>
          )}

          <div>
            <p className="text-[13px]">
              De: <span className="font-semibold">{moment(destination.departureDate).format("DD/MM/YYYY")}</span>
            </p>
            <p className="text-[13px]">
              Até: <span className="font-semibold">{moment(destination.returnDate).format("DD/MM/YYYY")}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <EditDestination
            destinationId={destination.id}
            defaultValues={{
              dateRange: {
                from: destination.departureDate ? new Date(destination.departureDate) : new Date(),
                to: destination.returnDate ? new Date(destination.returnDate) : new Date(),
              },
              name: destination.name,
              description: destination.description,
              images: destination.images,
            }}
          />
          <Button onClick={handleDelete} disabled={isLoadingDeleteDestination} size={"icon"} variant={"destructive"}>
            {isLoadingDeleteDestination ? <CgSpinner className="animate-spin" /> : <HiOutlineTrash />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default DestinationItem;
