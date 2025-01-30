import AppLabel from "@/components/ui/applabel";
import { DataTable } from "@/components/ui/datatable";
import { ProgramColumn } from "@/features/course-management/ProgramColumn";
import { useDepartments } from "@/features/course-management/useDepartment";
import { currentUser } from "@/types/Interface";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronRight, UserRoundPen, UserRoundPlus, Users } from "lucide-react";
import NonPHTable from "../features/course-management/NonPHTable.tsx";
import { useNavigate } from "react-router-dom";

export default function ProgramManagement() {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const currentUser = queryClient.getQueryData<currentUser>(["current-user"]);
  const departmentID = currentUser?.role_info?.DepartmentID;
  const { isLoading, response, error } = useDepartments(departmentID);
  if (isLoading) return;
  if (error) return;

  const programs = response?.department?.Programs || [];
  return (
    <>
      <div>
        <AppLabel currentPage="Program Management" />
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
              const phIcon =
                User.UserID === "" ? (
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
                              Choose a{" "}
                              <span className="font-bold">Faculty</span> Member
                              among the{" "}
                              <span className="font-bold">
                                {currentUser?.role_info.Department.Dept_Name}
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
                              Choose a{" "}
                              <span className="font-bold">Faculty</span> Member
                              among the{" "}
                              <span className="font-bold">
                                {currentUser?.role_info.Department.Dept_Name}
                              </span>
                            </DialogDescription>
                          </DialogHeader>
                          <NonPHTable programID={ID} userID={User.UserID} />
                        </DialogContent>
                      </Dialog>
                      <TooltipContent>
                        <p className="text-white">Edit Program Head</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              return (
                <div className="flex gap-2 items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline"
                          onClick={() => {
                            navigate(`/programs/${ID}/enrolled-students`)
                          }}>
                          <Users />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Students</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <div>{phIcon}</div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={() => {
                          navigate(`/programs/${ID}/curriculums`)
                        }}>
                          <ChevronRight />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Curriculum</p>
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
