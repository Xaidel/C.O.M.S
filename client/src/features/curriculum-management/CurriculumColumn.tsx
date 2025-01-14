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
    cell: ({ row }) => {
      switch (row.original.Effectivity_Sem) {
        case 0:
          return "Summer"
        case 1:
          return "First Semester"
        case 2:
          return "Second Semester"
      }
    },
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
    cell: ({ row }) => {
      const status = row.original.IsActive > 0 ? "Active" : "Not Active";
      return (
        <div className="flex items-center gap-2">
          <div
            className={`size-[1rem] rounded ${status === "Active" ? "bg-green-400" : "bg-gray-500"}`}
          ></div>
          {status}
        </div>
      );
    },
  },
];
