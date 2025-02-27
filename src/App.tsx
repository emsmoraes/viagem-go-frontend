import { Home } from "./pages/Home";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/services/query-client";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}

export default App;
