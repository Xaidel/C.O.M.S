import AppLabel from "@/components/ui/applabel";
import { useUser } from "@/features/auth/useUser";
import CurriculumFilter from "@/features/curriculum-management/CurriculumFilter";
import { useSections } from "@/features/faculty/useSections";
import { CurrentPeriodResponse, Section } from "@/types/Interface";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function AssessmentPlanCourseSelection() {
  const navigate = useNavigate()
  const { currentUser } = useUser()
  const [searchParams, setSearchParams] = useSearchParams()
  const year = searchParams.get("year") || "1"
  const queryClient = useQueryClient()
  const period: CurrentPeriodResponse = queryClient.getQueryData(["current-period"])!
  const { data: sections, isLoading: sectionsLoading, error: sectionsError } = useSections(currentUser?.role_info?.ID)
  const [filteredSections, setFilteredSections] = useState<Section[]>([])
  const handleFilterChange = (newYear: string) => {
    setSearchParams({ year: newYear })
    const intYear = parseInt(year || "0", 10)
    const newSections: Section[] = sections?.sections?.filter((section) =>
      section.Course.Year_Level === intYear && section.Course.Sem === period?.current_period?.Semester) || []
    setFilteredSections(newSections)
  }
  useEffect(() => {
    if (sections?.sections) {
      handleFilterChange(year)
    }
  }, [year, sections])
  if (sectionsLoading) return
  if (sectionsError) return
  return (
    <>
      <div>
        <AppLabel currentPage="Course Selection" />
      </div>
      <h1 className="text-3xl font-bold text-[#1F2937] mb-3">
        Assigned Courses
      </h1>
      <CurriculumFilter
        year={year}
        setYear={(newYear) => handleFilterChange(newYear)}
      />
      <Table>
        <TableHeader className="bg-[#CBD2DB]">
          <TableRow>
            <TableHead className="text-black">No</TableHead>
            <TableHead className="text-black">Code</TableHead>
            <TableHead className="text-black">Course No</TableHead>
            <TableHead className="text-black">Description</TableHead>
            <TableHead className="text-black">Unit</TableHead>
            <TableHead className="text-black"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSections?.length ? (
            filteredSections.map((section, index) => (
              <TableRow key={section.ID}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{section.SectionCode}</TableCell>
                <TableCell>{`${section.Course.Course_No}-${section.CurriculumID}${section.Section_Name}`}</TableCell>
                <TableCell>{section.Course.Course_Name}</TableCell>
                <TableCell>{Number(section.Course.Lec_Unit) + Number(section.Course.Lab_Unit)}</TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={() => {
                          sessionStorage.setItem("selectedCourse", JSON.stringify(section))
                          navigate(`/coaep/course/${section.ID}`)
                        }}>
                          <ChevronRight />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Outcomes</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center" colSpan={50}>No Courses found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
