import { useParams } from "react-router-dom";
import { IntendedLearningOutcomes } from "@/types/Interface";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCOAEPByCourse } from "./useCOAEPByCourse";
import { Fragment } from "react/jsx-runtime";

export default function Report() {
  const { courseID } = useParams<{ courseID: string }>()
  const parsedCourseID = parseInt(courseID || "", 10)
  const { data: coaep, isLoading: fetchingCoaep } = useCOAEPByCourse(parsedCourseID)
  if (fetchingCoaep) return
  return (
    <>
      <div className="flex flex-col gap-8">
        <Table>
          <TableHeader className="bg-[#CBD2DB] ">
            <TableRow className="font-bold text-sm">
              <TableHead rowSpan={2} className="border text-black text-center hover:bg-[#CBD2DB]">CO#</TableHead>
              <TableHead rowSpan={2} className="border text-black text-center hover:bg-[#CBD2DB]">Course Outcome Statement</TableHead>
              <TableHead rowSpan={2} className="border text-black text-center hover:bg-[#CBD2DB]">Intended Learning Outcome Statement</TableHead>
              <TableHead rowSpan={2} className="border text-black text-center hover:bg-[#CBD2DB]">Assessment Tool</TableHead>
              <TableHead colSpan={2} className="border text-black text-center hover:bg-[#CBD2DB]">Performance Target </TableHead>
              <TableHead rowSpan={2} className="border text-black text-center hover:bg-[#CBD2DB]">Evaluation</TableHead>
              <TableHead rowSpan={2} className="border text-black text-center hover:bg-[#CBD2DB]">Recommendation</TableHead>
            </TableRow>
            <TableRow>
              <TableHead className="border text-black text-center hover:bg-[#CBD2DB]">#</TableHead>
              <TableHead className="border text-black text-center hover:bg-[#CBD2DB]">%</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-sm font-light">
            {coaep && coaep?.coaep?.CourseOutcomes.length > 0 ? (
              coaep.coaep?.CourseOutcomes.map((co, index) => (
                <Fragment key={co.ID}>
                  {co.IntendedLearningOutcomes.length === 1 ? (
                    <TableRow>
                      <TableCell className="border">{index + 1}</TableCell>
                      <TableCell className="border">{co.Statement}</TableCell>
                      <TableCell className="border">{co.IntendedLearningOutcomes[0].Statement}</TableCell>
                      <TableCell className="border text-left">{co.IntendedLearningOutcomes[0].AssessmentTool.Tool}</TableCell>
                      <TableCell className="border text-center text-neutral-400">No Data</TableCell>
                      <TableCell className="border text-center">80%</TableCell>
                      <TableCell className="border text-center text-red-400">NS</TableCell>
                      <TableCell className="border">{ }</TableCell>
                    </TableRow>
                  ) : (
                    <>
                      <TableRow>
                        <TableCell rowSpan={co.IntendedLearningOutcomes.length + 1} className="border">{index + 1}</TableCell>
                        <TableCell rowSpan={co.IntendedLearningOutcomes.length + 1} className="border">{co.Statement}</TableCell>
                      </TableRow>
                      {co.IntendedLearningOutcomes.map((ilo: IntendedLearningOutcomes) => (
                        <TableRow key={ilo.ID}>
                          <TableCell className="border">{ilo.Statement}</TableCell>
                          <TableCell className="border text-left">{ilo.AssessmentTool.Tool}</TableCell>
                          <TableCell className="border">{ }</TableCell>
                          <TableCell className="border">{ }</TableCell>
                          <TableCell className="border">{ }</TableCell>
                          <TableCell className="border">{ }</TableCell>
                        </TableRow>
                      ))}
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

