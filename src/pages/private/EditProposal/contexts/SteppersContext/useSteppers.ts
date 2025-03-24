import { useContext } from "react";
import { SteppersContext, SteppersContextType } from "./ContextSteppers";

export const useSteppers = (): SteppersContextType => useContext(SteppersContext);
