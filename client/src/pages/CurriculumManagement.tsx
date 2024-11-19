import AppLabel from "@/components/ui/applabel";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CurriculumColumn } from "@/features/curriculum-management/CurriculumColumn";
import { useCurriculumByProgram } from "@/features/curriculum-management/useCurriculum";
import { currentUser, Curriculum } from "@/types/Interface";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CurriculumManagement() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<currentUser>(["current-user"]);
  const programID = currentUser?.role_info.Program.ID || 0;
  const { isLoading, response, error } = useCurriculumByProgram(programID);

  if (isLoading) return;
  if (error) return;
  const currs: Curriculum[] = response?.curriculums || [];
  console.log(currs);
  return (
    <>
      <div>
        <AppLabel currentPage="Curriculum Management" />
      </div>
      <h1 className="text-3xl font-bold text-[#1F2937] mb-3">
        List of Curriculums
      </h1>
      <DataTable
        resource="Curriculum"
        columns={[
          ...CurriculumColumn,
          {
            id: "action",
            cell: ({ row }) => {
              const id = row.original.CurrID;
              return (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          navigate(`/curriculums/${id}/courses`);
                        }}
                      >
                        <ChevronRight />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View Courses</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            },
          },
        ]}
        data={currs}
      />
    </>
  );
}
