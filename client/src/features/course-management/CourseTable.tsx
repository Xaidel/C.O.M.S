import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"

export default function CourseTable() {
  /* Column Header*/
  const columns = [
    { header: "Code", accessorKey: "code" },
    { header: "Course Name", accessorKey: "name" },
    { header: "Faculty Assigned", accessorKey: "faculty" },
    { 
      header: "Action", 
      accessorKey: "action",
      cell: () => (
        <Button variant="outline" size="sm">
          View
        </Button>
      )
    },
  ]
  /* No Course data yet */
  return (
    <DataTable 
      resource="Courses"
      columns={columns}
      data={[]}
    />
  )
}