import { Curriculum } from "@/types/Interface";
import { ColumnDef } from "@tanstack/react-table";

export const CurriculumColumn: ColumnDef<Curriculum>[] = [
  {
    accessorKey: "CurrID",
    header: "ID",
  },
  {
    accessorKey: "Revision_No",
    header: "Revision Number",
  },
  {
    accessorKey: "Effectivity_Sem",
    header: "Effectivity Sem",
  },
  {
    accessorKey: "Effectivity_SY",
    header: "Effectivity S/Y",
  },
  {
    accessorKey: "CMO_Name",
    header: "CMO Reference",
  },
  {
    accessorKey: "IsActive",
    header: "Status",
  },
];
