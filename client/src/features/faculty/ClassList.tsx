import { DataTable } from "@/components/ui/datatable";

export default function ClassList() {
  return (
    <>
      <DataTable columns={[
        { header: "Student Number" },
        { header: "Student Name" },
        { id: "action" }
      ]}
        data={[]}
        resource="Students"
      />
    </>
  )
}
