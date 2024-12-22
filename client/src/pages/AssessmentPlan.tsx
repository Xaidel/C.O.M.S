import AppLabel from "@/components/ui/applabel";
import { Button } from "@/components/ui/button";
import FacultyTabs from "@/features/faculty/FacultyTabs";
import { FacultyResponse } from "@/types/Interface";
import { useQueryClient } from "@tanstack/react-query";
import { CircleArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function AssessmentPlan() {
  const { courseID } = useParams<{ courseID: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const faculty = queryClient.getQueryData<FacultyResponse>(["courses"]);
  const courses = faculty?.faculty?.Courses;
  const [courseName, setCourseName] = useState("")

  useEffect(() => {
    const parsedCourseID = parseInt(courseID || "", 10)
    const selectedCourse = courses?.find((course) => course.ID === parsedCourseID)
    setCourseName(selectedCourse?.Course_Name.toUpperCase() || "")
  }, [courseID, courses])
  return (
    <>
      <div>
        <AppLabel currentPage="Course Outcome Assessment and Evaluation Plan" />
      </div>

      <div className="flex justify-start gap-1 items-center text-xl font-bold text-[#1f2937] mb-6">
        <Button variant="ghost" onClick={() => navigate("/courses")}>
          <CircleArrowLeft />
        </Button>
        {courseName}
      </div>
      <FacultyTabs />
    </>
  );
}
