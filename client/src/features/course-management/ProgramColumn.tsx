import { Program } from "@/types/Interface";
import { ColumnDef } from "@tanstack/react-table";

export const ProgramColumn: ColumnDef<Program>[] = [
  {
    accessorKey: "Program_Code",
    header: "Program Code",
  },
  {
    accessorKey: "Program_Name",
    header: "Program Name",
  },
];
