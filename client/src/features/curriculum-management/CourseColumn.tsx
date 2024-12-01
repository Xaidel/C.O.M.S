import { Button } from "@/components/ui/button";
import { Course } from "@/types/Interface";
import { ColumnDef } from "@tanstack/react-table";
import { UserPen } from "lucide-react";

export const CourseColumn: ColumnDef<Course>[] = [
  { header: "Year", accessorKey: "Year_Level" },
  { header: "Sem", accessorKey: "Sem" },
  { header: "Code", accessorKey: "Course_No" },
  { header: "Course Name", accessorKey: "Course_Name" },
  { header: "Lec", accessorKey: "Lec_Unit" },
  { header: "Lab", accessorKey: "Lab_Unit" },
  {
    id: "action",
    header: "Teacher",
    size: 200,
    cell: ({ row }) => {
      const user = row.original.Faculty?.User;
      const facultyFullName = `${user?.Firstname} ${user?.Middlename?.charAt(0)}. ${user?.Lastname}`;
      return (
        <div className="flex">
          {facultyFullName === " . " ? (
            <Button>Assign Faculty</Button>
          ) : (
            <div className="gap-2 flex items-center">
              <span className="text-gray-500">{facultyFullName}</span>{" "}
              <Button variant="ghost">
                <UserPen />
              </Button>
            </div>
          )}
        </div>
      );
    },
  },
];
