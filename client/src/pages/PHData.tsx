import AppLabel from "@/components/ui/applabel";
import { Button } from "@/components/ui/button";
import { CircleArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function PHData() {
  const { courseID } = useParams<{ courseID: string }>()
  const { currID } = useParams<{ currID: string }>()
  const navigate = useNavigate()
  return (
    <>
      <AppLabel currentPage="Course Outcome Assessment and Evaluation Plan" />
      <div className="flex justify-start gap-1 items-start text-3xl font-bold text-[#1F2937] mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(`/curriculums/${currID}/courses/${courseID}`)}
        >
          <CircleArrowLeft className="text-2xl" />
        </Button>
        Assessment Data
      </div>
    </>
  )
}
