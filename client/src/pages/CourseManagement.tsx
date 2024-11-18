import AppLabel from "@/components/ui/applabel";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import CourseTable from "@/features/course-management/CourseTable";
import { ArrowUpDown, CircleArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CourseManagement() {
  const navigate = useNavigate();
  const [sortAscending, setSortAscending] = useState(true);

  return (
    <>
      <div>
        <AppLabel currentPage="Course Management" />
      </div>

      {/*Return Button with Table Name*/}
      <div className="flex justify-start gap-1 items-center text-3xl font-bold text-[#1F2937] ">
        <Button
          variant="ghost"
          onClick={() => {
            navigate(-1);
          }}
        >
          <CircleArrowLeft className="text-2xl" />
        </Button>
        Courses
      </div>

      {/*Filter Button*/}
      <div className="flex justify-end items-center mb-2 gap-2">
        <span className="text-sm">Sort by:</span>
        <Toggle
          aria-label="Toggle sort direction"
          pressed={sortAscending}
          onPressedChange={setSortAscending}
          className="gap-2 rounded-md border border-[#1F2937] px-3 py-2"
        >
          <ArrowUpDown className="h-4 w-4" />
          Course Name {sortAscending ? "(A-Z)" : "(Z-A)"}
        </Toggle>
      </div>

      {/*List of Course Table*/}
      <CourseTable />
    </>
  );
}

