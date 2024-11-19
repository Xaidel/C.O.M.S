import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CurriculumFilterProps {
  year: string;
  setYear: (year: string) => void;
  semester: string;
  setSemester: (year: string) => void;
}

export default function CurriculumFilter({
  year,
  setYear,
  semester,
  setSemester,
}: CurriculumFilterProps) {
  return (
    <div className="flex justify-end flex-wrap gap-4 mb-6">
      {/* Year Select */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Select Year:</span>
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
        <span className="text-sm font-medium">Select Sem:</span>
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
