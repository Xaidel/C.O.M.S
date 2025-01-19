import AppLabel from "@/components/ui/applabel";
import { Button } from "@/components/ui/button";
import SubjectOfferingsTab from "@/features/curriculum-management/SubjectOfferingsTab";
import { DepartmentResponse } from "@/types/Interface";
import { useQueryClient } from "@tanstack/react-query";
import { CircleArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function CourseOfferings() {
  const navigate = useNavigate()
  const { currID } = useParams<{ currID: string }>()
  const { programID } = useParams<{ programID: string }>()
  const parsedProgID = parseInt(programID || "0", 10)
  const queryClient = useQueryClient()
  const deptData = queryClient.getQueryData<DepartmentResponse>(["department"])
  const currentProgram = deptData?.department?.Programs.find((program) => program.ID === parsedProgID)
  return (
    <>
      <div>
        <AppLabel currentPage="Subject Offerings" />
      </div>
      <div className="flex justify-start gap-1 items-start text-3xl font-bold text-[#1f2937] mb-6">
        <Button variant="ghost" onClick={() => { navigate(`/programs/${programID}/curriculums`) }}>
          <CircleArrowLeft />
        </Button>
        <div>
          {`Curriculum ${currID}`}
          <p className="text-[1.2rem] font-light">{currentProgram?.Program_Name}</p>
        </div>
      </div>
      <SubjectOfferingsTab />
    </>
  )
}
