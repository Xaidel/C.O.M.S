import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import { Plus } from "lucide-react";
import UploadClassList from "./UploadClassList";
import { useParams } from "react-router-dom";
import { useClassList } from "./useClassList";
import { useEffect, useState } from "react";
import { Student, StudentResponse } from "@/types/Interface";

export default function ClassList() {
  const { courseID } = useParams<{ courseID: string }>()
  const parsedCourseID = parseInt(courseID || "")
  const { data, isLoading } = useClassList(parsedCourseID)
  const [students, setStudents] = useState<Student[]>([])
  useEffect(() => {
    if (data?.classlist) {
      const student = data.classlist?.map((student: StudentResponse) => {
        return {
          UserID: student.UserID,
          Fullname: `${student.User.Firstname} ${student.User.Middlename.charAt(0)}. ${student.User.Lastname}`
        }
      })
      setStudents(student)
    }
  }, [data])
  if (isLoading) return
  console.log(students)
  return (
    <>
      <div className="mt-5">
        <DataTable columns={[
          {
            accessorKey: "UserID",
            header: "Student Number"
          },
          {
            accessorKey: "Fullname",
            header: "Student Name"
          },
          { id: "action" }
        ]}
          data={students}
          resource="Students"
        />
      </div>
      <div className="flex gap-2 mt-5">
        <Button className="flex gap-1"><Plus size={20} />Add Student</Button>
        <UploadClassList />
      </div>
    </>
  )
}
