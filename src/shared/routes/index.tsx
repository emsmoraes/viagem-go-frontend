import type { ReactElement } from "react";
import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";

import { Private } from "./private";
import { Public } from "./public";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { authStore } from "../store/auth.store";
import { SignIn } from "@/pages/public/SignIn";
import api from "@/shared/services/axios/api";
import SignUp from "@/pages/public/SignUp";
import ActivateUser from "@/pages/public/ActivateUser";
import ForgotPassword from "@/pages/public/ForgotPassword";
import UpdatePassword from "@/pages/public/UpdatePassword";
import { Dashboard } from "../components/layout/dashboard";
import { SteppersProvider } from "@/pages/private/EditProposal/contexts/SteppersContext/ContextSteppers";

const HomeRouter = lazy(() =>
  import("@/pages/private/Home").then((module) => ({
    default: module.Home,
  })),
);

const ProposalsRouter = lazy(() =>
  import("@/pages/private/Proposals").then((module) => ({
    default: module.Proposals,
  })),
);

const ClientsRouter = lazy(() =>
  import("@/pages/private/Clients").then((module) => ({
    default: module.Clients,
  })),
);

const AgencyRouter = lazy(() =>
  import("@/pages/private/Agency").then((module) => ({
    default: module.Agency,
  })),
);

const UserProfileRouter = lazy(() =>
  import("@/pages/private/UserProfile").then((module) => ({
    default: module.UserProfile,
  })),
);

const EditProposalRouter = lazy(() =>
  import("@/pages/private/EditProposal").then((module) => ({
    default: module.EditProposal,
  })),
);

const ItineraryRouter = lazy(() =>
  import("@/pages/private/EditProposal/Itinerary").then((module) => ({
    default: module.Itinerary,
  })),
);

const FlightsRouter = lazy(() =>
  import("@/pages/private/EditProposal/Flights").then((module) => ({
    default: module.Flights,
  })),
);

export function Router(): ReactElement {
  const navigate = useNavigate();
  const { logged } = authStore.getState().load();
  const location = useLocation();

  useEffect(() => {
    const isPublicRoute =
      ["/sign-up", "/sign-in", "/forgot-password", "/update-password"].includes(location.pathname) ||
      location.pathname.startsWith("/activate-user") ||
      location.pathname.startsWith("/update-password");

    if (!logged && !isPublicRoute) {
      navigate("/sign-in", { replace: true });
    }
  }, [logged, navigate, location.pathname]);

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (isAxiosError(error)) {
          const status = error.response?.status;

          if (status === 401) {
            sessionStorage.clear();
            navigate("/sign-in", { replace: true });
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [navigate]);

  return (
    <Suspense
      fallback={
        <div className="flex h-[100vh] w-full items-center justify-center bg-gray-900/10">
          <CgSpinner className="text-primary animate-spin text-6xl" />
        </div>
      }
    >
      <Routes>
        {!logged && (
          <Route element={<Public />}>
            <Route index element={<Navigate to="/sign-in" />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="activate-user/:key" element={<ActivateUser />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="update-password/:key" element={<UpdatePassword />} />
          </Route>
        )}

        {logged && (
          <Route element={<Private />}>
            <Route element={<Dashboard />}>
              <Route path="/" element={<HomeRouter />} />
              <Route path="clients" element={<ClientsRouter />} />
              <Route path="agency" element={<AgencyRouter />} />
              <Route path="profile" element={<UserProfileRouter />} />
              <Route path="proposals" element={<ProposalsRouter />} />

              <Route
                path="proposals/:id"
                element={
                  <SteppersProvider>
                    <EditProposalRouter />
                  </SteppersProvider>
                }
              >
                <Route path="itinerary" element={<ItineraryRouter />} />
                <Route path="flights" element={<FlightsRouter />} />
                <Route path="accommodations" element={<h2>Hospedagem</h2>} />
                <Route path="cruise" element={<h2>Cruzeiro</h2>} />
                <Route path="transport" element={<h2>Transporte</h2>} />
                <Route path="experiences" element={<h2>Experiências</h2>} />
                <Route path="insurance" element={<h2>Seguros</h2>} />
                <Route path="extras" element={<h2>Extras</h2>} />
                <Route path="summary" element={<h2>Resumo</h2>} />
              </Route>
            </Route>
          </Route>
        )}
      </Routes>
    </Suspense>
  );
}
