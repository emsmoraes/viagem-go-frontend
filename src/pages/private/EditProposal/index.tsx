import { Separator } from "@/shared/components/ui/separator";
import clsx from "clsx";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import EditProposalProfile from "./components/EditProposalProfile";
import { useGetProposal } from "./hooks/useEditProposal";

export function EditProposal() {
  const { id } = useParams();
  const { proposal, isLoadingProposal, isErrorProposal } = useGetProposal(id ?? "");

  if (isLoadingProposal) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <CgSpinner className="text-primary animate-spin text-6xl" />
      </div>
    );
  }

  if (!proposal || isErrorProposal) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex h-full flex-col">
      <div className={clsx("flex-1 overflow-y-auto pb-6")}>
        <h1 className="mb-8 pt-3 text-xl font-medium">Editar proposta</h1>

        <EditProposalProfile
          defaultValues={{
            status: proposal.status,
            title: proposal.title,
            departureDate: proposal.departureDate,
            profileImage: proposal.coverUrl,
            returnDate: proposal.returnDate,
          }}
          proposalId={proposal.id}
        />

        <Separator className="mt-10 mb-6" />

        <Outlet />
      </div>
    </div>
  );
}
