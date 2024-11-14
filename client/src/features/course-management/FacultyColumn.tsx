import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

export interface FacultyFullName {
  fullname: string;
}

export const FacultyColumn: ColumnDef<FacultyFullName>[] = [
  {
    accessorKey: "fullname",
    header: "Faculties",
    cell: ({ row }) => <div>{row.original.fullname}</div>,
  },
  {
    id: "select",
    header: "",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button onClick={() => console.log(row.original.fullname)}>
          Assign
        </Button>
      </div>
    ),
  },
];
