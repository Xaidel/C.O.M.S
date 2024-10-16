import { Toaster } from "react-hot-toast";
import { QueryClient } from "@tanstack/query-core";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import Login from "./pages/Login";
import Sample from "./pages/Sample";
import ProtectedRoute from "./utils/ProtectedRoute";

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
          <Route
            element={
              <ProtectedRoute>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="/sample" />} />
            <Route path="sample" element={<Sample />} />
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
