import { Toaster } from "react-hot-toast";
import { QueryClient } from "@tanstack/query-core";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TeachingAssignment from "./pages/TeachingAssignment";
import AppLayout from "./utils/AppLayout";
import Coaep from "./pages/Coaep";

function App() {
  const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 100,
        gcTime: 1000 * 60 * 60 * 24,
      },
    },
  });

  const persister = createSyncStoragePersister({
    storage: window.sessionStorage,
  });
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/teaching-assignment"
              element={<TeachingAssignment />}
            />
            <Route path="/coaep" element={<Coaep />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "1px" }}
        toastOptions={{
          loading: {
            style: {
              backgroundColor: "#F97316",
              color: "#FAFAFA",
            },
          },
          success: {
            duration: 2000,
            style: {
              backgroundColor: "#198754",
              color: "#FAFAFA",
            },
          },
          error: {
            duration: 2000,
            style: {
              backgroundColor: "red",
              color: "#FAFAFA",
            },
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            fontWeight: "600",
          },
        }}
      />
    </PersistQueryClientProvider>
  );
}

export default App;
