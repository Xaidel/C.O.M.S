import AppLabel from "@/components/ui/applabel"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCOAEPByCourse } from "@/features/faculty/useCOAEPByCourse";
import { CircleArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
export default function Plan() {
  const navigate = useNavigate()
  const selectedCourse = sessionStorage.getItem("selectedCourse")
  const { Course } = selectedCourse ? JSON.parse(selectedCourse) : null
  const courseID = Course?.ID
  const { data: coaep } = useCOAEPByCourse(courseID)
  console.log(coaep)
  return (
    <>
      <div>
        <AppLabel currentPage="Course Outcome Assessment and Evaluation Plan" />
      </div>
      <div className="flex justify-start gap-1 items-start text-2xl font-bold text-[#1f2937] mb-6">
        <Button variant="ghost" onClick={() => navigate("/coaep/course")}>
          <CircleArrowLeft />
        </Button>
        <div>
          Course Outcomes Assessment and Evaluation Data
          <p className="text-[1.2rem] font-light">{`${Course.Course_No} (${Course.Course_Name})`}</p>
        </div>
      </div>
      <Table>
        <TableHeader className="bg-[#CBD2DB] ">
          <TableRow className="font-bold text-sm">
            <TableHead rowSpan={2} className="border text-black text-center hover:bg-[#CBD2DB]">CO#</TableHead>
            <TableHead rowSpan={2} className="border text-black text-center hover:bg-[#CBD2DB]">Course Outcome Statement</TableHead>
            <TableHead rowSpan={2} className="border text-black text-center hover:bg-[#CBD2DB]">Intended Learning Outcome Statement</TableHead>
            <TableHead rowSpan={2} className="border text-black text-center hover:bg-[#CBD2DB]">Assessment Tool</TableHead>
            <TableHead rowSpan={2} className="border text-black text-center hover:bg-[#CBD2DB]">Performance Target</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm font-light">
          {coaep && coaep?.coaep?.CourseOutcomes.length > 0 ? (
            coaep.coaep?.CourseOutcomes.map((co, index) => (
              <Fragment key={co.ID}>
                {co.IntendedLearningOutcomes.length === 1 ? (
                  <TableRow>
                    <TableCell className="border">{index + 1}</TableCell>
                    <TableCell className="border">{`${co.Level}: ${co.Statement}`}</TableCell>
                    <TableCell className="border">{co.IntendedLearningOutcomes[0].Statement}</TableCell>
                    <TableCell className="border text-left">{co.IntendedLearningOutcomes[0].AssessmentTool.Tool}</TableCell>
                  </TableRow>
                ) : (
                  <>
                    <TableRow>
                      <TableCell rowSpan={co.IntendedLearningOutcomes.length + 1} className="border">{index + 1}</TableCell>
                      <TableCell rowSpan={co.IntendedLearningOutcomes.length + 1} className="border"><span className="font-medium border rounded-lg bg-[#CBD2DB] text-[#1F2937] py-[2px] px-[5px]">{`${co.Level}: `}</span>{`${co.Statement}`}</TableCell>
                    </TableRow>
                    {co.IntendedLearningOutcomes.map((ilo) => {
                      return (
                        <Fragment key={ilo.ID}>
                          < TableRow key={ilo.ID} >
                            <TableCell className="border">{ilo.Statement}</TableCell>
                            <TableCell className="border text-left">{ilo.AssessmentTool.Tool}</TableCell>
                            <TableCell className="border text-left">{`
At least ${ilo.AssessmentTool.TargetPopulation}% of enrolled students with a rating of at least ${ilo.AssessmentTool.TargetScore}% of the total score
                        `}</TableCell>
                          </TableRow>
                        </Fragment>)
                    })}
                  </>
                )}
              </Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="border text-center ">No Report Data Found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
