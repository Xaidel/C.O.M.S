import { Button } from "@/components/ui/button";
import { Program } from "@/types/Interface";
import { ColumnDef } from "@tanstack/react-table";

export const ProgramColumn: ColumnDef<Program>[] = [
  {
    accessorKey: "Program_Code",
    header: "Program Code",
    cell: (info) => <div className="w-48">{info.getValue() as string}</div>,
  },
  {
    accessorKey: "Program_Name",
    header: "Program Name",
    cell: (info) => (
      <div className="w-96 truncate">{info.getValue() as string}</div>
    ),
  },
  {
    accessorKey: "ProgramHead",
    header: "Program Head",
    cell: ({ row }) => {
      const { Firstname, Middlename, Lastname } =
        row.original.ProgramHead?.User || {};
      const initialMiddlename =
        Middlename !== undefined ? Middlename?.charAt(0) + "." : "";
      const fullname =
        `${Firstname || ""} ${initialMiddlename || ""} ${Lastname || ""}`.trim();
      return <div className="w-60 truncate">{fullname}</div>;
    },
  },
  {
    id: "action",
    cell: () => (
      <div className="flex justify-center gap-2 ">
        <Button variant="outline" size="sm">
          View Courses
        </Button>
        <Button size="sm">Assign Program Head</Button>
      </div>
    ),
    size: 100,
  },
];
