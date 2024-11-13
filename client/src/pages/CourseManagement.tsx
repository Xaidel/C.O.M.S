import AppLabel from "@/components/ui/applabel";
import { ProgramColumn } from "@/features/course-management/ProgramColumn";
import { DataTable } from "@/components/ui/datatable";
import { Program } from "@/types/Interface";

const programs: Program[] = [
  {
    Program_Code: "BSIT",
    Program_Name: "Bachelor of Science in Information Technology",
  },
  {
    Program_Code: "BSCS",
    Program_Name: "Bachelor of Science in Computer Science",
  },
];

export default function CourseManagement() {
  return (
    <>
      <div>
        <AppLabel currentPage="Course Management" />
      </div>
      <h1 className="text-3xl font-bold text-[#1F2937] mb-3">Programs</h1>
      <DataTable columns={ProgramColumn} data={programs} />
    </>
  );
}
