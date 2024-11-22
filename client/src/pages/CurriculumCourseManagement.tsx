import AppLabel from "@/components/ui/applabel";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import AddCourse from "@/features/course-management/AddCourse";
import UploadCourse from "@/features/course-management/UploadCourse";
import { CourseColumn } from "@/features/curriculum-management/CourseColumn";
import CurriculumFilter from "@/features/curriculum-management/CurriculumFilter";
import { useCurriculumByID } from "@/features/curriculum-management/useCurriculumByID";
import { Course } from "@/types/Interface";
import { CircleArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function CurriculumCourseManagement() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const year = searchParams.get("year") || "all";
  const semester = searchParams.get("semester") || "all";

  const { currID } = useParams<{ currID: string }>();
  const { isLoading, response, error } = useCurriculumByID(currID);

  const handleFilterChange = (newYear: string, newSem: string) => {
    setSearchParams({ year: newYear, semester: newSem });
    const intYear = newYear === "all" ? null : parseInt(newYear, 10);
    const intSem = newSem === "all" ? null : parseInt(newSem, 10);
    const filteredCourse = response?.curriculum?.Courses?.filter(
      (course: Course) => {
        const yearMatch = intYear === null || course.Year_Level === intYear;
        const semMatch = intSem === null || course.Sem === intSem;
        return yearMatch && semMatch;
      },
    );
    setCourses(filteredCourse || []);
  };
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    if (response?.curriculum?.Courses) {
      const initialCOurses = response.curriculum.Courses;
      setCourses(initialCOurses);
    }
  }, [response?.curriculum?.Courses]);
  if (isLoading) return;
  if (error) return;
  return (
    <>
      <div>
        <AppLabel currentPage="Course Management" />
      </div>

      <div className="flex justify-start gap-1 items-center text-3xl font-bold text-[#1F2937] mb-6">
        <Button
          variant="ghost"
          onClick={() => {
            navigate("/curriculums");
          }}
        >
          <CircleArrowLeft className="text-2xl" />
        </Button>
        List of Courses
      </div>

      <CurriculumFilter
        year={year}
        setYear={(newYear) => handleFilterChange(newYear, semester)}
        semester={semester}
        setSemester={(newSem) => handleFilterChange(year, newSem)}
      />

      <DataTable columns={CourseColumn} data={courses} resource="Courses" />
      <div className="flex gap-4 mt-4">
        <UploadCourse />
        <AddCourse />
      </div>
    </>
  );
}
