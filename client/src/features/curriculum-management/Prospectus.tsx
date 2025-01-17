import { useParams, useSearchParams } from "react-router-dom";
import CurriculumFilter from "./CurriculumFilter";
import UploadProspectus from "./UploadProspectus";
import { useProspectus } from "./useProspectus";
import { Course } from "@/types/Interface";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Prospectus() {
  const [searchParams, setSearchParams] = useSearchParams()
  const year = searchParams.get("year") || "all"
  const semester = searchParams.get("semester") || "all"
  const { currID } = useParams<{ currID: string }>()
  const curr = currID || ""
  const { data: prospectus, isLoading, error: prospectusError } = useProspectus(curr)
  const courses: Course[] = prospectus?.prospectus?.Courses || []
  const totalLec = courses.reduce((sum, course) => sum + (Number(course.Lec_Unit) || 0), 0)
  const totalLab = courses.reduce((sum, course) => sum + (Number(course.Lab_Unit) || 0), 0)
  const totalUnits = totalLab + totalLec || 0
  const handleFilterChange = (newYear: string, newSem: string) => {
    setSearchParams({ year: newYear, semester: newSem })
  }

  if (isLoading) return
  if (prospectusError) return
  return (
    <>
      <CurriculumFilter
        year={year}
        setYear={(newYear) => handleFilterChange(newYear, semester)}
        semester={semester}
        setSemester={(newSem) => handleFilterChange(year, newSem)}
      />
      <Table>
        <TableHeader className="bg-[#CBD2DB]">
          <TableRow >
            <TableHead className="text-black">Subject ID</TableHead>
            <TableHead className="text-black">Subject Description</TableHead>
            <TableHead className="text-black">Lec</TableHead>
            <TableHead className="text-black">Lab</TableHead>
            <TableHead className="text-black">Total Units</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length ? (
            courses.map((course: Course) => (
              <TableRow key={course.Course_No}>
                <TableCell>{course.Course_No}</TableCell>
                <TableCell>{course.Course_Name}</TableCell>
                <TableCell>{course.Lec_Unit}</TableCell>
                <TableCell>{course.Lab_Unit}</TableCell>
                <TableCell>{Number.isNaN(Number(course.Lec_Unit)) ? course.Lec_Unit : Number(course.Lab_Unit) + Number(course.Lec_Unit)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center" colSpan={50}>No Prospectus Found</TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} className="text-right font-bold pr-[3.5rem]">TOTAL:</TableCell>
            <TableCell className="font-bold">{totalLec}</TableCell>
            <TableCell className="font-bold">{totalLab}</TableCell>
            <TableCell className="font-bold">{totalUnits}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <UploadProspectus />
    </>
  )
}
