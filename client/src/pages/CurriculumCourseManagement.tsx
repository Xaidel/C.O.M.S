import AppLabel from "@/components/ui/applabel";
import { Button } from "@/components/ui/button";
import AddCourse from "@/features/course-management/AddCourse";
import UploadCourse from "@/features/course-management/UploadCourse";
import CourseTable from "@/features/curriculum-management/CourseTable";
import CurriculumFilter from "@/features/curriculum-management/CurriculumFilter";
import { CircleArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CurriculumCourseManagement() {
  const navigate = useNavigate();
  const [curriculum, setCurriculum] = useState("");
  const [year, setYear] = useState("all");
  const [semester, setSemester] = useState("all");

  return (
    <>
      <div>
        <AppLabel currentPage="Course Management" />
      </div>

      <div className="flex justify-start gap-1 items-center text-3xl font-bold text-[#1F2937] mb-6">
        <Button
          variant="ghost"
          onClick={() => {
            navigate(-1);
          }}
        >
          <CircleArrowLeft className="text-2xl" />
        </Button>
        List of Courses
      </div>

      {/* Curriculum Filters */}
      <CurriculumFilter
        curriculum={curriculum}
        setCurriculum={setCurriculum}
        year={year}
        setYear={setYear}
        semester={semester}
        setSemester={setSemester}
      />

      {/* Course Table */}
      <CourseTable />

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <UploadCourse />
        <AddCourse />
      </div>
    </>
  );
}
