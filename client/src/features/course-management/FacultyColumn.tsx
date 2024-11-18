import { ColumnDef } from "@tanstack/react-table";

export interface FacultyFullName {
  programID: number;
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
