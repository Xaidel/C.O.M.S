import AppLabel from "@/components/ui/applabel";
import { DataTable } from "@/components/ui/datatable";
import { useDepartments } from "@/features/course-management/useDepartment";
import { useQueryClient } from "@tanstack/react-query";
import { currentUser } from "@/types/Interface";
import { ProgramColumn } from "@/features/course-management/ProgramColumn";

import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Book, UserRoundPen, UserRoundPlus } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import NonPHTable from "../features/course-management/NonPHTable.tsx";
import { useNavigate } from "react-router-dom";

export default function ProgramManagement() {
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<currentUser>(["current-user"]);
  const departmentID = currentUser?.role_info?.DepartmentID;
  const navigate = useNavigate();
  const { isLoading, response, error } = useDepartments(departmentID);
  if (isLoading) return;
  if (error) return;

  const programs = response?.department?.Programs || [];
  return (
    <>
      <div>
        <AppLabel currentPage="Course Management" />
      </div>
      <h1 className="text-3xl font-bold text-[#1F2937] mb-3">Programs</h1>
      <DataTable
        resource="Programs"
        columns={[
          ...ProgramColumn,

          {
            id: "action",
            cell: ({ row }) => {
              const { User } = row.original.ProgramHead || {};
              const ID = row.original.ID;
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
                        <DialogHeader>
                          <DialogTitle className="text-2xl">
                            Assign Program Head
                          </DialogTitle>
                          <DialogDescription>
                            Choose a <span className="font-bold">Faculty</span>{" "}
                            Member among the{" "}
                            <span className="font-bold">
                              School of Computer and Information Sciences
                            </span>
                          </DialogDescription>
                        </DialogHeader>
                        <NonPHTable programID={ID} />
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
                        <DialogHeader>
                          <DialogTitle className="text-2xl">
                            Edit Program Head
                          </DialogTitle>
                          <DialogDescription>
                            Choose a <span className="font-bold">Faculty</span>{" "}
                            Member among the{" "}
                            <span className="font-bold">
                              School of Computer and Information Sciences
                            </span>
                          </DialogDescription>
                        </DialogHeader>
                        <NonPHTable programID={ID} />
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
                        <Button onClick={() => navigate("/programs/courses")}>
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
        ]}
        data={programs}
      />
    </>
  );
}
