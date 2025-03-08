import SearchProposals from "./components/SearchProposals";
import { useLocation } from "react-router-dom";

export function Proposals() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("search") || "";

  return (
    <>
      <SearchProposals defaultValues={{ search: searchValue }} />
    </>
  );
}
