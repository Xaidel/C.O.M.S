import { Toaster } from "./components/ui/toaster";
import { QueryClient } from "@tanstack/query-core";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProgramManagement from "./pages/ProgramManagement";
import AppLayout from "./utils/AppLayout";
import Coaep from "./pages/Coaep";
import CourseManagement from "./pages/CourseManagement";

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
            <Route path="/programs" element={<ProgramManagement />} />
            <Route path="/programs/courses" element={<CourseManagement />} />
            <Route path="/coaep" element={<Coaep />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </PersistQueryClientProvider>
  );
}

export default App;
