import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"

export default function CourseTable() {
  /* Column Header*/
  const columns = [
    { header: "Year", accessorKey: "year" },
    { header: "Sem", accessorKey: "sem" },
    { header: "Code", accessorKey: "code" },
    { header: "Course Name", accessorKey: "name" },
    { header: "Lec", accessorKey: "lecture" },
    { header: "Lab", accessorKey: "laboratory" },
    { 
      header: "Description", 
      accessorKey: "description",
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