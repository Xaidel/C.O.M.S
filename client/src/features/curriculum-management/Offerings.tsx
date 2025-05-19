import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CurriculumFilter from "./CurriculumFilter";
import UploadSections from "./UploadSections";
import { useSections } from "./useSections";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Section } from "@/types/Interface";
import { Button } from "@/components/ui/button";
import { ChevronsRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
export default function Offerings() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const year = searchParams.get("year") || "1"
  const semester = searchParams.get("semester") || "1"
  const { currID } = useParams<{ currID: string }>()
  const { data: sections, isLoading, error: errorSections } = useSections(currID || "")
  const [filteredSections, setFilteredSections] = useState<Section[]>([])
  const handleFilterChange = (newYear: string, newSem: string) => {
    setSearchParams({ year: newYear, semester: newSem })
    const intYear = parseInt(newYear, 10)
    const intSem = parseInt(newSem, 10)
    const newSections = sections?.sections?.filter((section) => {
      const yearMatch = intYear === section.Course.Year_Level
      const semMatch = intSem === section.Course.Sem
      return yearMatch && semMatch
    })
    setFilteredSections(newSections || [])
  }

  useEffect(() => {
    if (sections?.sections) {
      const initialSection = sections.sections.filter((section) => section.Course.Year_Level === Number(year) && section.Course.Sem === Number(semester))
      setFilteredSections(initialSection)
    }
  }, [sections?.sections])


  if (isLoading) return
  if (errorSections) return
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
            <TableHead className="text-black">Assigned Faculty</TableHead>
            <TableHead className="text-black"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSections?.length ? (
            filteredSections.map((section, index) => (
              <TableRow key={section.ID}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{section.SectionCode}</TableCell>
                <TableCell>{`${section.Course.Course_No}-${section.Curriculum.CurrID}${section.Section_Name}`}</TableCell>
                <TableCell>{section.Course.Course_Name}</TableCell>
                <TableCell>{Number(section.Course.Lec_Unit) + Number(section.Course.Lab_Unit)}</TableCell>
                <TableCell>{`${section.Faculty.User?.Lastname.toUpperCase()} ${section.Faculty.User?.Firstname.toUpperCase()}`}</TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={() => navigate(`/curriculums/${currID}/courses/${section.Course.Course_No}/section/${section.ID}/profile`)}>
                          <ChevronsRight />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Report</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center" colSpan={50}>No Sections found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <UploadSections />
    </>
  )
}
