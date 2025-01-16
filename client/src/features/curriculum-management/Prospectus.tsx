import { useParams, useSearchParams } from "react-router-dom";
import CurriculumFilter from "./CurriculumFilter";
import { DataTable } from "@/components/ui/datatable";
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
  const { data: prospectus, isLoading } = useProspectus(curr)
  const courses: Course[] = prospectus?.prospectus.Courses || []
  const totalLec = courses.reduce((sum, course) => sum + (Number(course.Lec_Unit) || 0), 0)
  const totalLab = courses.reduce((sum, course) => sum + (Number(course.Lab_Unit) || 0), 0)
  const totalUnits = totalLab + totalLec
  const handleFilterChange = (newYear: string, newSem: string) => {
    setSearchParams({ year: newYear, semester: newSem })
  }

  if (isLoading) return
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
            <TableHead className="text-black">Lec Units</TableHead>
            <TableHead className="text-black">Lab Units</TableHead>
            <TableHead className="text-black">Total Units</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.Course_No}>
              <TableCell>{course.Course_No}</TableCell>
              <TableCell>{course.Course_Name}</TableCell>
              <TableCell>{course.Lec_Unit}</TableCell>
              <TableCell>{course.Lab_Unit}</TableCell>
              <TableCell>{Number(course.Lab_Unit) + Number(course.Lec_Unit)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} className="text-right font-bold">TOTAL:  </TableCell>
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
