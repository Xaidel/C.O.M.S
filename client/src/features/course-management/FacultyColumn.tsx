import { ColumnDef } from "@tanstack/react-table";

export interface FacultyFullName {
  courseOrProgramID: number;
  userID: string;
  fullname: string;
}

export const FacultyColumn: ColumnDef<FacultyFullName>[] = [
  {
    accessorKey: "fullname",
    header: "Faculty",
    cell: ({ row }) => <div>{row.original.fullname}</div>,
  },
];
