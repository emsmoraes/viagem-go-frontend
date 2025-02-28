import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/services/query-client";
import { BrowserRouter } from "react-router-dom";
import { Router } from "@/shared/routes";
import { Toaster } from "sonner";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
