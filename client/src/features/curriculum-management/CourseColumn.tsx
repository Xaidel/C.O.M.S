import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  TooltipContent,
  Tooltip,
} from "@/components/ui/tooltip";
import { Course } from "@/types/Interface";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { UserPen } from "lucide-react";

const handleClick = () => {
  console.log("Hello World");
};

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
        <div className="flex ">
          {facultyFullName === " . " ? (
            <Button onClick={handleClick}>Assign Faculty</Button>
          ) : (
            <div className="gap-2 flex items-center">
              <span className="text-gray-500">{facultyFullName}</span>{" "}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost">
                      <UserPen />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reassign Teacher</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
      );
    },
  },
];
