import { useParams, useSearchParams } from "react-router-dom";
import CurriculumFilter from "./CurriculumFilter";
import UploadProspectus from "./UploadProspectus";
import { useProspectus } from "./useProspectus";
import { Course } from "@/types/Interface";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";

export default function Prospectus() {
  const [totalLec, setTotalLec] = useState(0)
  const [totalLab, setTotalLab] = useState(0)
  const [totalUnits, setTotalUnits] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams()
  const year = searchParams.get("year") || "1"
  const semester = searchParams.get("semester") || "1"
  const { currID } = useParams<{ currID: string }>()
  const curr = currID || ""
  const { data: prospectus, isLoading, error: prospectusError } = useProspectus(curr)
  const courses: Course[] = prospectus?.prospectus?.Courses || []
  const [filteredProspectus, setFilteredProspectus] = useState<Course[]>([])

  const handleFilterChange = (newYear: string, newSem: string) => {
    setSearchParams({ year: newYear, semester: newSem })

    const intYear = parseInt(newYear, 10)
    const intSem = parseInt(newSem, 10)
    const filteredCourses = courses.filter(course => course.Year_Level === intYear && course.Sem === intSem)

    setFilteredProspectus(filteredCourses)

    let lecTotal = 0, labTotal = 0
    filteredCourses.forEach(course => {
      lecTotal += Number(course.Lec_Unit) || 0
      labTotal += Number(course.Lab_Unit) || 0
    })

    setTotalLec(lecTotal)
    setTotalLab(labTotal)
    setTotalUnits(lecTotal + labTotal)
  }
  useEffect(() => {
    if (courses.length) {
      handleFilterChange(year, semester)
    }
  }, [courses, year, semester])

  if (isLoading) return
  if (prospectusError) return
  return (
    <>
      <CurriculumFilter
        year={year}
        setYear={(newYear) => handleFilterChange(newYear, semester)}
        semester={semester}
        setSemester={(newSem) => handleFilterChange(year, newSem)}
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProspectus.length ? (
            filteredProspectus.map((course: Course) => (
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
              <TableCell className="h-24 text-center" colSpan={6}>No Course Offerings Found</TableCell>
            </TableRow>
          )}
        </TableBody>
        {filteredProspectus.length > 0 ? (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className="text-right font-bold pr-[3.5rem]">TOTAL:</TableCell>
              <TableCell className="font-bold">{totalLec}</TableCell>
              <TableCell className="font-bold">{totalLab}</TableCell>
              <TableCell className="font-bold">{totalUnits}</TableCell>
            </TableRow>
          </TableFooter>
        ) : <TableFooter />}
      </Table>
      <UploadProspectus />
    </>
  )
}
