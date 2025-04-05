import AppLabel from "@/components/ui/applabel";
import { Button } from "@/components/ui/button";
import FacultyTabs from "@/features/faculty/FacultyTabs";
import { CircleArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AssessmentPlan() {
  const navigate = useNavigate()
  const selectedCourse = sessionStorage.getItem("selectedCourse")

  const { Course } = selectedCourse ? JSON.parse(selectedCourse) : null
  console.log(Course)
  return (
    <>
      <div>
        <AppLabel currentPage="Course Outcome Assessment and Evaluation Plan" />
      </div>
      <div className="flex justify-start gap-1 items-start text-2xl font-bold text-[#1f2937] mb-6">
        <Button variant="ghost" onClick={() => navigate("/courses")}>
          <CircleArrowLeft />
        </Button>
        <div>
          Course Outcomes Assessment and Evaluation Data
          <p className="text-[1.2rem] font-light">{`${Course.Course_No} (${Course.Course_Name})`}</p>
        </div>
      </div>
      <FacultyTabs />
    </>
  );
}
