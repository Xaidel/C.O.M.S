import AppLabel from "@/components/ui/applabel";
import { Button } from "@/components/ui/button";
import { CircleArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSectionsByCourseNo } from "@/features/curriculum-management/useSectionsByCourseNo";

export default function Sections() {
  const navigate = useNavigate()
  const { courseID } = useParams<{ courseID: string }>()
  const { currID } = useParams<{ currID: string }>()
  const curr = currID ?? ""
  const { data: sectionsData, isLoading: sectionLoading, error: sectionError } = useSectionsByCourseNo(curr, courseID || "")
  const sections = sectionsData?.sections
  if (sectionLoading) return
  if (sectionError) return
  return (
    <>
      <div>
        <AppLabel currentPage="Subject Offerings" />
      </div>
      <div className="flex justify-start gap-1 items-center text-3xl font-bold text-[#1F2937] mb-6">
        <Button
          variant="ghost"
          onClick={() => {
            navigate(`/curriculums/${curr}/courses`);
          }}
        >
          <CircleArrowLeft className="text-2xl" />
        </Button>
        {`${courseID} Sections`}
      </div>
      <Table>
        <TableHeader className="bg-[#CBD2DB]">
          <TableRow>
            <TableHead className="text-black">No</TableHead>
            <TableHead className="text-black">Code</TableHead>
            <TableHead className="text-black">Course No</TableHead>
            <TableHead className="text-black">Description</TableHead>
            <TableHead className="text-black">Unit</TableHead>
            <TableHead className="text-black">Faculty Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sections?.length ? (
            sections.map((section, index) => (
              <TableRow key={section.ID}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{section.SectionCode}</TableCell>
                <TableCell>{`${section.Course.Course_No}-${section.Curriculum.CurrID}${section.Section_Name}`}</TableCell>
                <TableCell>{section.Course.Course_Name}</TableCell>
                <TableCell>{Number(section.Course.Lec_Unit) + Number(section.Course.Lab_Unit)}</TableCell>
                <TableCell>{`${section.Faculty.User?.Lastname.toUpperCase()} ${section.Faculty.User?.Firstname.toUpperCase()}`}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center" colSpan={6}>No Sections Found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
