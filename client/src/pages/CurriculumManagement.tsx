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
import { useCurriculum } from "@/features/curriculum-management/useCurriculum";
import { Curriculum } from "@/types/Interface";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CurriculumManagement() {
  const navigate = useNavigate();
  const { isLoading, response, error } = useCurriculum();
  if (isLoading) return;
  if (error) return;
  const currs: Curriculum[] = response?.curriculums || [];
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
