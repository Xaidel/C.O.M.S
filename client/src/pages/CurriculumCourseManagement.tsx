import AppLabel from "@/components/ui/applabel";
import CurriculumFilter from "../features/curriculum-management/CurriculumFilter";
import { Button } from "@/components/ui/button";
import { useCurrentPeriod } from "@/features/auth/useCurrentPeriod";
import { Course } from "@/types/Interface";
import { ChevronRight, CircleArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useProspectus } from "@/features/curriculum-management/useProspectus";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function CurriculumCourseManagement() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const year = searchParams.get("year") || "1"
  const { currID } = useParams<{ currID: string }>()
  const curr = currID || ""
  const { data: prospectus, isLoading: prospectusLoading, error: prospectusError } = useProspectus(curr)
  const courses: Course[] = prospectus?.prospectus?.Courses || []
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const { response: period, isLoading: periodLoading, error: periodError } = useCurrentPeriod()


  const handleFilterChange = (newYear: string) => {
    setSearchParams({ year: newYear })
    const intYear = parseInt(newYear)
    const filterCourses = courses?.filter((course) => course.Year_Level === intYear && period?.current_period?.Semester === course.Sem)
    setFilteredCourses(filterCourses)
  }

  useEffect(() => {
    if (courses.length) {
      handleFilterChange(year)
    }
  }, [courses, year])
  if (prospectusLoading || periodLoading) return
  if (prospectusError || periodError) return
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
        {`Curriculum ${curr}`}
      </div>
      <CurriculumFilter
        year={year}
        setYear={(newYear) => handleFilterChange(newYear)}
        includeAll={false}
      />
      <Table>
        <TableHeader className="bg-[#CBD2DB]">
          <TableRow >
            <TableHead className="text-black">Subject ID</TableHead>
            <TableHead className="text-black">Subject Description</TableHead>
            <TableHead className="text-black">Lec</TableHead>
            <TableHead className="text-black">Lab</TableHead>
            <TableHead className="text-black">Total Units</TableHead>
            <TableHead className="text-black"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCourses.length ? (
            filteredCourses.map((course: Course) => (
              <TableRow key={course.Course_No}>
                <TableCell>{course.Course_No}</TableCell>
                <TableCell>{course.Course_Name}</TableCell>
                <TableCell>{course.Lec_Unit}</TableCell>
                <TableCell>{course.Lab_Unit}</TableCell>
                <TableCell>{Number.isNaN(Number(course.Lec_Unit)) ? course.Lec_Unit : Number(course.Lab_Unit) + Number(course.Lec_Unit)}</TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={() => navigate(`/curriculums/${curr}/courses/${course.Course_No}`)}><ChevronRight size={20} /></Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Sections</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center" colSpan={6}>No Courses Found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
