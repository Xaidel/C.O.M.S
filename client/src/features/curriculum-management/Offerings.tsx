import { useSearchParams } from "react-router-dom";
import CurriculumFilter from "./CurriculumFilter";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
export default function Offerings() {
  const [searchParams, setSearchParams] = useSearchParams()
  const year = searchParams.get("year") || "1"
  const semester = searchParams.get("semester") || "1"
  const handleFilterChange = (newYear: string, newSem: string) => {
    setSearchParams({ year: newYear, semester: newSem })
  }
  return (
    <>
      <CurriculumFilter
        year={year}
        setYear={(newYear) => handleFilterChange(newYear, semester)}
        semester={semester}
        setSemester={(newSem) => handleFilterChange(year, newSem)}
        includeAll={false}
      />

      <Table>
        <TableHeader className="bg-[#CBD2DB]">
          <TableRow>
            <TableHead className="text-black">No</TableHead>
            <TableHead className="text-black">Code</TableHead>
            <TableHead className="text-black">Course No</TableHead>
            <TableHead className="text-black">Description</TableHead>
            <TableHead className="text-black">Unit</TableHead>
            <TableHead className="text-black">Faculty Name</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </>
  )
}
