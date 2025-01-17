import { useSearchParams } from "react-router-dom";
import CurriculumFilter from "./CurriculumFilter";
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
    </>
  )
}
