import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import { Plus } from "lucide-react";
import UploadClassList from "./UploadClassList";
import { useParams } from "react-router-dom";
import { useClassList } from "./useClassList";

export default function ClassList() {
  const { courseID } = useParams<{ courseID: string }>()
  const parsedCourseID = parseInt(courseID || "")
  const { data, isLoading } = useClassList(parsedCourseID)
  if (isLoading) return
  return (
    <>
      <div className="mt-5">
        <DataTable columns={[
          { header: "Student Number" },
          { header: "Student Name" },
          { id: "action" }
        ]}
          data={data}
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
