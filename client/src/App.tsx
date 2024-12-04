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
import CourseManagement from "./pages/CourseManagement";
import NotFound from "./pages/NotFound";
import CurriculumCourseManagement from "./pages/CurriculumCourseManagement";
import CurriculumManagement from "./pages/CurriculumManagement";
import CourseSelection from "./pages/CourseSelection";
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
      persistOptions={{
        persister,
        dehydrateOptions: {
          shouldDehydrateQuery: () => true,
        },
      }}
    >
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/programs" element={<ProgramManagement />} />
            <Route
              path="/programs/:programID/courses"
              element={<CourseManagement />}
            />
            <Route path="/curriculums" element={<CurriculumManagement />} />
            <Route
              path="/curriculums/:currID/courses"
              element={<CurriculumCourseManagement />}
            />
            <Route path="/courses" element={<CourseSelection />} />
            <Route
              path="/courses/:courseID/assessment-plan"
              element={<Coaep />}
            />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </PersistQueryClientProvider>
  );
}

export default App;
