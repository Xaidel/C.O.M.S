import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";

export default function CourseAssignment() {
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
      ),
    },
  ];
  return <DataTable resource="Courses" columns={columns} data={[]} />;
}
