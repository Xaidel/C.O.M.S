import { ColumnDef } from "@tanstack/react-table";
import { Program } from "../../types/Interface";
export const ProgramColumn: ColumnDef<Program>[] = [
  {
    accessorKey: "Program_Code",
    header: "Program Code",
  },
  {
    accessorKey: "Program_Name",
    header: "Program Name",
  },
  {
    accessorKey: "Program_Code",
    header: "Program Head",
  },
  {
    accessorKey: "Program_Code",
    header: "Actions",
  },
];
