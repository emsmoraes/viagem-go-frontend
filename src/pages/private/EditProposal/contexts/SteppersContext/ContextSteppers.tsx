import React, { createContext, useContext, ReactNode } from "react";
import { useParams } from "react-router-dom";
import { useGetProposal } from "../../hooks/useEditProposal";

export interface SteppersContextType {
  id: string | undefined;
  proposal: any;
  isLoadingProposal: boolean;
  isErrorProposal: boolean;
}

export const SteppersContext = createContext<SteppersContextType>({
  id: "",
  proposal: null,
  isLoadingProposal: false,
  isErrorProposal: false,
});

export const SteppersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { id } = useParams();
  const { proposal, isLoadingProposal, isErrorProposal } = useGetProposal(id ?? "");

  return (
    <SteppersContext.Provider value={{ proposal, isLoadingProposal, isErrorProposal, id }}>
      {children}
    </SteppersContext.Provider>
  );
};
