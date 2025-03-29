import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Proposal } from "@/shared/models/proposal.model";
import { useQueryClient } from "@tanstack/react-query";
import { CgSpinner } from "react-icons/cg";
import { HiOutlineTrash } from "react-icons/hi";
import { toast } from "sonner";
import moment from "moment";
import { DayByDay } from "@/shared/models/day-by-day.model";
import { useDeleteDayByDayMutation } from "../../hooks/useDayByDay";
import EditDestination from "../EditDestination";
import EditDayByDay from "../EditDayByDay";

function DayByDayItem({ dayByDay, proposal, index }: { dayByDay: DayByDay; proposal: Proposal; index: number }) {
  const queryClient = useQueryClient();

  const { deleteDayByDay, isLoadingDeleteDayByDay } = useDeleteDayByDayMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal", proposal?.id] });
      toast("Destino excluído com sucesso");
    },
    onError: () => {
      toast("Erro ao excluir destino");
    },
  });

  const handleDelete = () => {
    deleteDayByDay({ id: dayByDay.id });
  };

  return (
    <Card>
      <CardContent className="relative flex items-center justify-between">
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-xl font-semibold">
              {index + 1} - {dayByDay.title}
            </h2>
            <p className="mt-2 max-w-[300px]">{dayByDay.description}</p>
          </div>
          {dayByDay.images && (
            <div className="flex flex-wrap gap-3">
              {dayByDay.images?.map((image, index) => (
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
              De: <span className="font-semibold">{moment(dayByDay.departureDate).format("DD/MM/YYYY")}</span>
            </p>
            <p className="text-[13px]">
              Até: <span className="font-semibold">{moment(dayByDay.returnDate).format("DD/MM/YYYY")}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <EditDayByDay
            dayByDayId={dayByDay.id}
            defaultValues={{
              dateRange: {
                from: dayByDay.departureDate ? new Date(dayByDay.departureDate) : new Date(),
                to: dayByDay.returnDate ? new Date(dayByDay.returnDate) : new Date(),
              },
              title: dayByDay.title,
              description: dayByDay.description,
              images: dayByDay.images,
            }}
          />
          <Button onClick={handleDelete} disabled={isLoadingDeleteDayByDay} size={"icon"} variant={"destructive"}>
            {isLoadingDeleteDayByDay ? <CgSpinner className="animate-spin" /> : <HiOutlineTrash />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default DayByDayItem;
