import { Proposal } from "@/shared/models/proposal.model";

interface ProposalItemProps {
  proposal: Proposal;
}

function ProposalItem({ proposal }: ProposalItemProps) {
  return <div>{proposal.title}</div>;
}

export default ProposalItem;
