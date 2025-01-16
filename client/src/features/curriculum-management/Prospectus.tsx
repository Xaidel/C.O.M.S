import { useSearchParams } from "react-router-dom";
import CurriculumFilter from "./CurriculumFilter";
import { DataTable } from "@/components/ui/datatable";
import UploadProspectus from "./UploadProspectus";

export default function Prospectus() {
  const [searchParams, setSearchParams] = useSearchParams()
  const year = searchParams.get("year") || "all"
  const semester = searchParams.get("semester") || "all"

  const handleFilterChange = (newYear: string, newSem: string) => {
    setSearchParams({ year: newYear, semester: newSem })
    const intYear = newYear === "all" ? null : parseInt(newYear, 10)
    const intSem = newSem === "all" ? null : parseInt(newSem, 10)
  }
  return (
    <>
      <CurriculumFilter
        year={year}
        setYear={(newYear) => handleFilterChange(newYear, semester)}
        semester={semester}
        setSemester={(newSem) => handleFilterChange(year, newSem)}
      />
      <DataTable
        columns={[
          { header: "Subject ID" },
          { header: "Subject Description" },
          { header: "Lec" },
          { header: "Lab" },
          { header: "Total Units" },
        ]}
        data={[]}
        resource="Prospectus" />
      <UploadProspectus />
    </>
  )
}
