import AppLabel from "@/components/ui/applabel";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import { useProgramByID } from "@/features/course-management/useProgramByID";
import { useStudentsByProgram } from "@/features/course-management/useStudentsByProgram";
import CurriculumFilter from "@/features/curriculum-management/CurriculumFilter";
import { StudentResponse } from "@/types/Interface";
import { CircleArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function EnrolledStudents() {
  const navigate = useNavigate()
  const { progID } = useParams<{ progID: string }>()
  const parsedProgID = parseInt(progID || "", 10)
  const { data: program, isLoading: programLoading, error: programError } = useProgramByID(parsedProgID)
  const { data: students, isLoading: studentLoading, error: studentError } = useStudentsByProgram(parsedProgID)
  const [progStudents, setProgStudents] = useState<StudentResponse[]>([])
  const [searchParams, setSearchParams] = useSearchParams()
  const year = searchParams.get("year") || "1"
  const handleFilterChange = (newYear: string) => {
    const parsedYear = parseInt(year || "")
    setSearchParams({ year: newYear })
    const newStuds = students?.students?.filter((student) => {
      student.CurrentYearLvl === parsedYear
    })
    setProgStudents(newStuds || [])
  }

  useEffect(() => {
    if (students?.students) {
      const initStuds = students?.students?.filter((student) => student.CurrentYearLvl === Number(year))
      console.log(initStuds)
      setProgStudents(initStuds)
    }
  }, [students?.students, year])

  if (programLoading || studentLoading) return
  if (programError || studentError) return
  return (
    <>
      <AppLabel currentPage="Enrolled Students" />
      <div className="flex items-center text-3xl font-bold text-[#1f2937]">
        <Button variant="ghost"
          onClick={() => navigate("/programs")}
        >
          <CircleArrowLeft />
        </Button>
        {program?.program.Program_Code} Students
      </div>
      <CurriculumFilter
        year={year}
        setYear={(newYear) => handleFilterChange(newYear)}
      />
      <DataTable
        resource="Students"
        columns={
          [
            {
              header: "Student ID",
              accessorKey: "UserID"
            },
            {
              header: "Student Name",
              cell: ({ row }) => {
                const fullName = `${row.original.User.Firstname} ${row.original.User.Middlename.charAt(0)}. ${row.original.User.Lastname}`
                return (
                  <div>{fullName}</div>
                )
              }
            }
          ]
        }
        data={progStudents}
      />
    </>
  )
}
