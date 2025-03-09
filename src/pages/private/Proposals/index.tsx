import SearchProposals from "./components/SearchProposals";
import { useLocation } from "react-router-dom";
import { useProposalsQuery } from "./hooks/useProposal";
import { useState } from "react";
import ProposalItem from "./components/ProposalItem";

export function Proposals() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("search") || "";
  const pageValue = Number(searchParams.get("page")) || 1;

  const { proposals, totalPages, isLoadingProposals, isErrorProposals, errorProposals } = useProposalsQuery({
    search: searchValue,
    page: pageValue,
  });

  return (
    <>
      <SearchProposals defaultValues={{ search: searchValue }} />

      {isLoadingProposals && <p>Carregando propostas...</p>}
      {isErrorProposals && <p>Erro ao carregar: {errorProposals?.message}</p>}

      {proposals?.length > 0 && proposals.map((proposal) => <ProposalItem key={proposal.id} proposal={proposal} />)}
    </>
  );
}
