import { CourseOutcome } from "@/types/Interface";
import { ColumnDef } from "@tanstack/react-table";

export const CoaepBaseColumn: ColumnDef<CourseOutcome>[] = [
  {
    header: "CO#",
    accessorKey: "ID",
  },
  { header: "CO Statement", accessorKey: "Statement" },
];
