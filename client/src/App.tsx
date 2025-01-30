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
import AssessmentPlan from "./pages/AssessmentPlan.tsx"
import NotFound from "./pages/NotFound";
import CurriculumCourseManagement from "./pages/CurriculumCourseManagement";
import CurriculumManagement from "./pages/CurriculumManagement";
import CourseSelection from "./pages/CourseSelection";
import ProtectedRoute from "./utils/ProtectedRoute";
import ProgramCurriculum from "./pages/ProgramCurriculum.tsx";
import CourseOfferings from "./pages/CourseOfferings.tsx";
import Sections from "./pages/Sections.tsx";
import PHData from "./pages/PHData.tsx";
import EnrolledStudents from "./pages/EnrolledStudents.tsx";
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
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/programs" element={<ProgramManagement />} />
            <Route
              path="/programs/:programID/courses"
              element={<CourseManagement />}
            />
            <Route path="/programs/:programID/curriculums" element={<ProgramCurriculum />} />
            <Route path="/programs/:programID/curriculums/:currID/course-offerings" element={<CourseOfferings />} />
            <Route path="/programs/:progID/enrolled-students" element={<EnrolledStudents />} />
            <Route path="/curriculums" element={<CurriculumManagement />} />
            <Route
              path="/curriculums/:currID/courses"
              element={<CurriculumCourseManagement />}
            />
            <Route
              path="/curriculums/:currID/courses/:courseID"
              element={<Sections />}
            />
            <Route path="/curriculums/:currID/courses/:courseID/sections/:sectionID/coaep" element={<PHData />} />
            <Route path="/courses" element={<CourseSelection />} />
            <Route path="/courses/:courseID/assessment-plan/section/:sectionID" element={<AssessmentPlan />} />

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
