import AppLabel from "@/components/ui/applabel";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useSectionsByCourseNo } from "@/features/curriculum-management/useSectionsByCourseNo";
import { ChevronRight, CircleArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function PHSection() {
  const navigate = useNavigate()
  const { currID } = useParams<{ currID: string }>()
  const { courseCode } = useParams<{ courseCode: string }>()

  const { data: sections, isLoading: sectionsLoading, error: sectionsError } = useSectionsByCourseNo(currID || "", courseCode || "")
  if (sectionsLoading) return
  if (sectionsError) return
  return (
    <>
      <div>
        <AppLabel currentPage="Course Offerings" />
      </div>

      <div className="flex justify-start gap-1 items-center text-3xl font-bold text-[#1F2937] mb-6">
        <Button variant="ghost" onClick={() => navigate("/curriculums/KT/courses")}>
          <CircleArrowLeft className="text-2xl" />
        </Button>
        Sections
      </div>
      <Table>
        <TableHeader className="bg-[#CBD2DB]">
          <TableRow>
            <TableHead className="text-black">No</TableHead>
            <TableHead className="text-black">Code</TableHead>
            <TableHead className="text-black">Course No</TableHead>
            <TableHead className="text-black">Description</TableHead>
            <TableHead className="text-black">Unit</TableHead>
            <TableHead className="text-black">Teacher</TableHead>
            <TableHead className="text-black"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sections?.sections?.length ? (
            sections.sections?.map((section, index) => (
              <TableRow key={section.ID}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{section.SectionCode}</TableCell>
                <TableCell>{`${section.Course.Course_No}-${section.CurriculumID}${section.Section_Name}`}</TableCell>
                <TableCell>{section.Course.Course_Name}</TableCell>
                <TableCell>{Number(section.Course.Lec_Unit) + Number(section.Course.Lab_Unit)}</TableCell>
                <TableCell>{`${section.Faculty.User?.Lastname} ${section.Faculty.User?.Firstname} ${section.Faculty.User?.Middlename.charAt(0)}.`}</TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={() => navigate(`/curriculums/${currID}/courses/${courseCode}/section/${section.ID}/profile`)}>
                          <ChevronRight />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Report</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center" colSpan={6}>No Course Offerings Found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table >
    </>
  )
}
