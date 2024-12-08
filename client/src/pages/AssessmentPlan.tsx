import AppLabel from "@/components/ui/applabel";
import { useSidebar } from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CoaepTabContent from "@/features/faculty/CoaepTabContent";

export default function AssessmentPlan() {
  const { state } = useSidebar();
  return (
    <>
      <div>
        <AppLabel currentPage="Course Outcome Assessment and Evaluation Plan" />
      </div>
    </>
  );
}
