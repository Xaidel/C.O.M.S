import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Program } from "@/types/Interface";
import { ColumnDef } from "@tanstack/react-table";
import { Book, UserRoundPen, UserRoundPlus } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import AssignProgramHead from "./AssignProgramHead";
import EditProgramHead from "./EditProgramHead";

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
    cell: ({ row }) => {
      const { User } = row.original.ProgramHead || {};
      const phIcon = !User ? (
        <TooltipProvider>
          <Tooltip>
            <Dialog>
              <DialogTrigger asChild>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    <UserRoundPlus />
                  </Button>
                </TooltipTrigger>
              </DialogTrigger>
              <DialogContent>
                <AssignProgramHead />
              </DialogContent>
            </Dialog>
            <TooltipContent>
              <p className="text-white">Add Program Head</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <Dialog>
              <DialogTrigger asChild>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    <UserRoundPen />
                  </Button>
                </TooltipTrigger>
              </DialogTrigger>
              <DialogContent>
                <EditProgramHead />
              </DialogContent>
            </Dialog>
            <TooltipContent>
              <p className="text-white">Edit Program Head</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
      return (
        <div className="flex justify-center gap-2 ">
          {phIcon}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button>
                  <Book />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View Courses</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];
