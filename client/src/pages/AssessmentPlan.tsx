import AppLabel from "@/components/ui/applabel";
import { Button } from "@/components/ui/button";
import FacultyTabs from "@/features/faculty/FacultyTabs";
import { CircleArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AssessmentPlan() {
  const navigate = useNavigate()
  return (
    <>
      <div>
        <AppLabel currentPage="Course Outcome Assessment and Evaluation Plan" />
      </div>

      <div className="flex justify-start gap-1 items-center text-xl font-bold text-[#1f2937] mb-6">
        <Button variant="ghost" onClick={() => navigate("/courses")}>
          <CircleArrowLeft />
        </Button>
        COAEP Data
      </div>
      <FacultyTabs />
    </>
  );
}
