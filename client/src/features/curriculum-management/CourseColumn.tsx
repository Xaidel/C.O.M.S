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
    header: "Teacher",
    size: 200,
    cell: ({ row }) => {
      const user = row.original.Faculty?.User;
      const facultyFullName = `${user?.Firstname} ${user?.Middlename?.charAt(0)}. ${user?.Lastname}`;
      return (
        <>
          {facultyFullName === " . " ? (
            <span />
          ) : (
            <span>{facultyFullName}</span>
          )}
        </>
      );
    },
  },
];
