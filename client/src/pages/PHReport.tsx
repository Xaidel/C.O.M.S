import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEvaluationByProgram } from "@/features/course-management/useEvaluationByProgram"
import { useCOAEPByCourse } from "@/features/faculty/useCOAEPByCourse"
import { useParams } from "react-router-dom"
import { Fragment } from "react/jsx-runtime"
import LoadingState from "./LoadingState"

export default function PHReport() {
  const { courseID } = useParams<{ courseID: string }>()
  const { programID } = useParams<{ programID: string }>()
  const parsedCourseID = parseInt(courseID || "0", 10)
  const parsedProgramID = parseInt(programID || "0", 10)
  const { data: coaep, isLoading: fetchingCoaep, error: coaepError } = useCOAEPByCourse(parsedCourseID)
  const { data: evaluations, isLoading: fetchingEval, error: evalError } = useEvaluationByProgram(coaep?.coaep?.ID || 0, parsedProgramID)
  if (fetchingCoaep || fetchingEval) return <LoadingState />
  if (coaepError || evalError) return <div className="min-w-screen h-[40rem] flex items-center justify-center font-bold text-xl">
    Course Outcome Assessment and Evaluation Plan data not found</div>

  return (
    <>
      <div className="bg-gray-main">
        <Table >
          <TableHeader className="bg-[#CBD2DB]">
            <TableRow className="font-bold text-sm">
              <TableHead rowSpan={2} className="border text-black text-center hover:bg-[#CBD2DB]">CO#</TableHead>
              <TableHead rowSpan={2} className="border text-black text-center hover:bg-[#CBD2DB]">Course Outcome Statement</TableHead>
              <TableHead rowSpan={2} className="border text-black text-center hover:bg-[#CBD2DB]">Intended Learning Outcome Statement</TableHead>
              <TableHead rowSpan={2} className="border text-black text-center hover:bg-[#CBD2DB]">Assessment Tool</TableHead>
              <TableHead colSpan={2} className="border text-black text-center hover:bg-[#CBD2DB]">Performance Target</TableHead>
              <TableHead rowSpan={2} className="border text-black text-center hover:bg-[#CBD2DB]">Evaluations</TableHead>
            </TableRow>
            <TableRow>
              <TableHead className="border text-black text-center hover:bg-[#CBD2DB]">#</TableHead>
              <TableHead className="border text-black text-center hover:bg-[#CBD2DB]">%</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-sm font-light">
            {coaep && coaep?.coaep?.CourseOutcomes.length > 0 ? (
              coaep?.coaep?.CourseOutcomes.map((co, index) => (
                <Fragment>
                  {co.IntendedLearningOutcomes.length === 1 ? (
                    <TableRow>
                      <TableCell className="border">{index + 1}</TableCell>
                      <TableCell className="border">{co.Statement}</TableCell>
                      <TableCell className="border">{co.IntendedLearningOutcomes[0].Statement}</TableCell>
                      <TableCell className="border text-center text-neutral-400">
                        {(evaluations?.res[0]?.total_passed !== 0 && evaluations!.res[0]?.total_population > 0) ? `${evaluations?.res[0]?.total_passed !== 0 && evaluations!.res[0]?.total_population > 0}`
                          : `No Data`
                        }
                      </TableCell>
                      <TableCell className="border text-center">{evaluations?.res[0].total_percentage}</TableCell>
                      <TableCell className="border text-center text-red-400">
                        {
                          (evaluations?.res[0]?.total_percentage !== undefined && evaluations?.res[0]?.total_percentage >= co.IntendedLearningOutcomes[0].AssessmentTool.TargetPopulation)
                            ? (<p className="text-green-400 text-center">S</p>) : (<p className="text-red-400 text-center">NS</p>)
                        }
                      </TableCell>
                    </TableRow>
                  ) : (
                    <>
                      <TableRow>
                        <TableCell rowSpan={co.IntendedLearningOutcomes.length + 1} className="border">{index + 1}</TableCell>
                        <TableCell rowSpan={co.IntendedLearningOutcomes.length + 1} className="border">{co.Statement}</TableCell>
                      </TableRow>
                      {co.IntendedLearningOutcomes.map((ilo) => {
                        const data = evaluations?.res?.find(data => data.ilo_id === ilo.ID)
                        return (
                          <Fragment key={ilo.ID}>
                            <TableRow key={ilo.ID}>
                              <TableCell className="border">{ilo.Statement}</TableCell>
                              <TableCell className="border text-left">{ilo.AssessmentTool.Tool}</TableCell>
                              <TableCell className="border text-center">
                                {`${data?.total_passed}/${data?.total_population}`}
                              </TableCell>
                              <TableCell className="border text-center">{`${data?.total_percentage}%`}</TableCell>
                              <TableCell className="border">
                                {
                                  data?.total_percentage === 0 && data?.total_failed === 0
                                    ? <p className="text-center text-gray-500">No Data</p>
                                    : (data?.total_percentage !== undefined && data?.total_percentage >= ilo.AssessmentTool.TargetPopulation)
                                      ? (<p className="text-green-400 text-center">S</p>) : (<p className="text-red-400 text-center">NS</p>)
                                }
                              </TableCell>
                            </TableRow>
                          </Fragment>
                        )
                      })}
                    </>
                  )}
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="border text-center">No Report Data Found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
