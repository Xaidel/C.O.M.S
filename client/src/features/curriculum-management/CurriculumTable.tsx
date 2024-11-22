import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"

export default function CurriculumTable() {
  /* Column Header*/
  const columns = [
    { header: "Curriculum ID", accessorKey: "id" },
    { header: "CMO Name", accessorKey: "cmo" },
    { header: "Year", accessorKey: "year" },
    { header: "Semester", accessorKey: "sem" },
    { header: "Revision No.", accessorKey: "revision" },
    { header: "Status", accessorKey: "status" },
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
      resource="Curriculum"
      columns={columns}
      data={[]}
    />
  )
}