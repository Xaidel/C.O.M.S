import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useParams } from "react-router-dom"
import { useCOAEPByCourse } from "../faculty/useCOAEPByCourse";
import { Fragment } from "react/jsx-runtime";
import { Input } from "@/components/ui/input";
export default function ILOCriteria() {
  const { courseID } = useParams<{ courseID: string }>()
  const parsedCourseID = parseInt(courseID || "0", 10)
  const { data: coaep, isLoading: fetchingCoaep, error: fetchingCoaepError } = useCOAEPByCourse(parsedCourseID)

  if (fetchingCoaep) return
  if (fetchingCoaepError) return
  return (
    <>
      <Table>
        <TableHeader className="bg-[#CBD2DB] hover:bg-[#CBD2DB]">
          <TableRow className="font-bold hover:bg-[#CBD2DB]">
            <TableHead rowSpan={2} className="border text-black">CO#</TableHead>
            <TableHead rowSpan={2} className="border text-black">Course Outcomes</TableHead>
            <TableHead rowSpan={2} className="border text-black">Intended Learning Outcomes</TableHead>
            <TableHead rowSpan={2} className="border text-black">Criteria</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm font-light">
          {coaep && coaep?.coaep?.CourseOutcomes.length > 0 ? (
            coaep?.coaep?.CourseOutcomes.map((co, index) => (
              <Fragment key={co.ID}>
                {co.IntendedLearningOutcomes.length === 1 ? (
                  <TableRow>
                    <TableCell className="border ">{index + 1}</TableCell>
                    <TableCell className="border">{co.Statement}</TableCell>
                    <TableCell className="border">{co.IntendedLearningOutcomes[0]?.Statement}</TableCell>
                  </TableRow>
                ) : (
                  <>
                    <TableRow>
                      <TableCell rowSpan={co.IntendedLearningOutcomes.length + 1} className="border text-center">{index + 1}</TableCell>
                      <TableCell rowSpan={co.IntendedLearningOutcomes.length + 1} className="border">{co.Statement}</TableCell>
                    </TableRow>
                    {co.IntendedLearningOutcomes.map((ilo) => {
                      return (
                        <Fragment key={ilo.ID}>
                          <TableRow key={ilo.ID}>
                            <TableCell className="border">{ilo.Statement}</TableCell>
                            <TableCell className="border">
                              <Input className="border-none bg-transparent text-center"
                              />
                            </TableCell>
                          </TableRow>
                        </Fragment>
                      )
                    })}
                  </>
                )}
              </Fragment>
            ))
          ) : <div>Error</div>}
        </TableBody>
      </Table>
    </>
  )
}
