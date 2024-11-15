import AppLabel from "@/components/ui/applabel";
import { Button } from "@/components/ui/button";
import { CircleArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function CourseManagement() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <AppLabel currentPage="Course Management" />
      </div>
      <div className="flex gap-1 items-center text-3xl font-bold text-[#1F2937] mb-3">
        <Button
          variant="ghost"
          onClick={() => {
            navigate(-1);
          }}
        >
          <CircleArrowLeft className="text-2xl" />
        </Button>
        Course
      </div>
    </>
  );
}
