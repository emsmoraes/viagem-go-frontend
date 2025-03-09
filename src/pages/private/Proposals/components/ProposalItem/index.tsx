import { Proposal } from "@/shared/models/proposal.model";
import { HiOutlineShare } from "react-icons/hi";
import { FiEdit3 } from "react-icons/fi";
interface ProposalItemProps {
  proposal: Proposal;
}

export function ProposalItem({ proposal }: ProposalItemProps) {
  return (
    <div className="w-full overflow-hidden rounded-2xl bg-white shadow-sm transition-transform duration-300 hover:shadow-md">
      <div className="relative h-52 overflow-hidden">
        <img
          src={proposal.coverUrl!}
          alt={proposal.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
        />
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
        <button className="text-primary h-full rounded-full bg-blue-100 px-4">
          <HiOutlineShare size={21} />
        </button>
      </div>
    </div>
  );
}
