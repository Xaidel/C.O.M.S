import { Button } from "@/components/ui/button";
import { Course } from "@/types/Interface";
import { ColumnDef } from "@tanstack/react-table";

export const CourseColumn: ColumnDef<Course>[] = [
  { header: "Year", accessorKey: "Year_Level" },
  { header: "Sem", accessorKey: "Sem" },
  { header: "Code", accessorKey: "Course_No" },
  { header: "Course Name", accessorKey: "Course_Name" },
  { header: "Lec", accessorKey: "Lec_Unit" },
  { header: "Lab", accessorKey: "Lab_Unit" },
  {
    id: "action",
    cell: () => {
      return (
        <div className="flex justify-center">
          <Button>Assign Faculty</Button>
        </div>
      );
    },
  },
];
