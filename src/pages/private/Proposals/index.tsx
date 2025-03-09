import SearchProposals from "./components/SearchProposals";
import { useLocation } from "react-router-dom";
import { useProposalsQuery } from "./hooks/useProposal";

export function Proposals() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("search") || "";

  const { proposals, isLoadingProposals, isErrorProposals, errorProposals } = useProposalsQuery({
    search: searchValue,
  });

  console.log(proposals);

  return (
    <>
      <SearchProposals defaultValues={{ search: searchValue }} />s
      {proposals.map((prop) => (
        <div>{prop.title}</div>
      ))}
    </>
  );
}
