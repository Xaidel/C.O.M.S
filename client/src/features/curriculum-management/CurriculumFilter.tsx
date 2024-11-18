import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

interface CurriculumFilterProps {
  curriculum: string;
  setCurriculum: Dispatch<SetStateAction<string>>;
  year: string;
  setYear: Dispatch<SetStateAction<string>>;
  semester: string;
  setSemester: Dispatch<SetStateAction<string>>;
}

export default function CurriculumFilter({
  curriculum,
  setCurriculum,
  year,
  setYear,
  semester,
  setSemester,
}: CurriculumFilterProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {/* Curriculum Select */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Curriculum:</span>
        <Select value={curriculum} onValueChange={setCurriculum}>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Select curriculum" />
          </SelectTrigger>
          <SelectContent>
            {/* Curriculum Data */}
          </SelectContent>
        </Select>
      </div>

      {/* Year Select */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Year:</span>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Semester Select */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Sem:</span>
        <Select value={semester} onValueChange={setSemester}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Select semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="0">0</SelectItem>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
