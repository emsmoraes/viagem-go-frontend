import { Proposal } from "@/shared/models/proposal.model";
import { FiEdit3 } from "react-icons/fi";
import { HiOutlineShare, HiOutlinePhotograph } from "react-icons/hi";
import DeleteProposal from "../DeleteProposal";

export function ProposalItem({ proposal }: { proposal: Proposal }) {
  return (
    <div className="w-full overflow-hidden rounded-2xl bg-white shadow-sm transition-transform duration-300 hover:shadow-md">
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gray-100">
        {proposal.coverUrl ? (
          <img
            src={proposal.coverUrl}
            alt={proposal.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
          />
        ) : (
          <HiOutlinePhotograph className="h-16 w-16 text-gray-400" />
        )}
      </div>
      <div className="p-4">
        <h2 className="text-md line-clamp-2 font-semibold text-gray-800">{proposal.title}</h2>
        <p className="mt-2 flex items-center gap-1 text-sm font-medium text-red-600">
          <span className="mr-2 h-2 w-2 rounded-full bg-red-600" />
          Incompleto
        </p>
      </div>

      <div className="my-4 flex h-[45px] items-center justify-between gap-4 px-4">
        <button className="text-primary flex h-full flex-1 items-center justify-center gap-2 rounded-full bg-blue-100 px-4 font-medium">
          <FiEdit3 size={20} /> Editar
        </button>
        <DeleteProposal proposalId={proposal.id} />
        <button className="text-primary h-full rounded-full bg-blue-100 px-3">
          <HiOutlineShare size={21} />
        </button>
      </div>
    </div>
  );
}
