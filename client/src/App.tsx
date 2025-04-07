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
import PHData from "./pages/PHData.tsx";
import EnrolledStudents from "./pages/EnrolledStudents.tsx";
import PHTab from "./pages/PHTab.tsx";
import PHSection from "./pages/PHSection.tsx";
import PHCourseTab from "./pages/PHCourseTab.tsx";
import PerformanceData from "./pages/PerformanceData.tsx";
import StudentPerformance from "./pages/StudentPerformance.tsx";
import Plan from "./features/faculty/Plan.tsx";
import Coaep from "./pages/Coaep.tsx";
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
              path="/curriculums/:currID/courses/:courseCode"
              element={<PHSection />}
            />
            <Route
              path="/curriculums/:currID/courses/:courseCode/section/:sectionID/profile"
              element={<PHCourseTab />}
            />
            <Route
              path="/curriculums/:currID/courses/:courseID/program/:programID/profile"
              element={<PHTab />}
            />
            <Route path="/curriculums/:currID/courses/:courseID/sections/:sectionID/coaep" element={<PHData />} />
            <Route path="/courses" element={<CourseSelection />} />
            <Route path="/courses/:courseID/assessment-plan/section/:sectionID" element={<AssessmentPlan />} />
            <Route path="/performance-data" element={<PerformanceData />} />
            <Route path="/performance-data/program/:programID/course/:courseID" element={<StudentPerformance />} />
            <Route path="/coaep" element={<Coaep />} />
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
