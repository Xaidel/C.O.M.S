import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import { CircleArrowLeft } from "lucide-react";
import { NavigateFunction } from "react-router-dom";
import { CoaepBaseColumn } from "./CoaepBaseColumn";

interface TabProps {
  courseName: string
  navigate: NavigateFunction;
}

export default function ILOTab({ courseName, navigate }: TabProps) {
  return (
    <>
      <div className="flex justify-start gap-1 items-center text-xl font-bold text-[#1f2937] mb-6">
        <Button variant="ghost" onClick={() => navigate("/coaep/course")}>
          <CircleArrowLeft />
        </Button>
        {courseName}
      </div>
      <DataTable
        resource="Course Outcomes"
        columns={[
          ...CoaepBaseColumn,
          {
            header: "Intended Learning Outcomes",
          },
        ]}
        data={[]}
      />
    </>
  )
}
