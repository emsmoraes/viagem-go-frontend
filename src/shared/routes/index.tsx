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
import Dashboard from "../components/layout/Dashboard";
import SignUp from "@/pages/public/SignUp";

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

const PreAttendancesRouter = lazy(() =>
  import("@/pages/private/PreAttendances").then((module) => ({
    default: module.PreAttendances,
  })),
);

export function Router(): ReactElement {
  const navigate = useNavigate();
  const { logged } = authStore.getState().load();
  const location = useLocation();

  useEffect(() => {
    if (!logged && location.pathname !== "/sign-up" && location.pathname !== "/sign-in") {
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
          <CgSpinner className="animate-spin text-6xl" />
        </div>
      }
    >
      <Routes>
        {!logged && (
          <Route element={<Public />}>
            <Route index element={<Navigate to="/sign-in" />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
          </Route>
        )}

        {logged && (
          <Route element={<Private />}>
            <Route element={<Dashboard />}>
              <Route path="/" element={<HomeRouter />} />
              <Route path="proposals" element={<ProposalsRouter />} />
              <Route path="clients" element={<ClientsRouter />} />
              <Route path="pre-attendance" element={<PreAttendancesRouter />} />
            </Route>
          </Route>
        )}
      </Routes>
    </Suspense>
  );
}
