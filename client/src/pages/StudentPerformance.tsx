import AppLabel from "@/components/ui/applabel";
import { Button } from "@/components/ui/button";
import { useUser } from "@/features/auth/useUser";
import { useCOAEPByCourse } from "@/features/faculty/useCOAEPByCourse";
import { usePerformanceDataByProgram } from "@/features/faculty/usePerformanceDataByProgram";
import { useStudentByProgramAndEnrolledCourses } from "@/features/faculty/useStudentByProgramAndEnrolledCourses";
import { CircleArrowLeft } from "lucide-react";
import { Fragment, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useCriteria } from "@/features/faculty/useCriteria";

export default function StudentPerformance() {
  const navigate = useNavigate()
  const { currentUser } = useUser()
  const studentID = currentUser?.role_info?.UserID
  const { courseID } = useParams<{ courseID: string }>()
  const parsedCourseID = parseInt(courseID || "")
  const { programID } = useParams<{ programID: string }>()
  const parsedProgramID = parseInt(programID || "")
  const { data: coaep, isLoading: fetchingCoaep, error: fetchingCoaepError } = useCOAEPByCourse(parsedCourseID)
  const coaepID = coaep?.coaep?.ID || 0
  const { data: classlist, isLoading: fetchingClasslist } = useStudentByProgramAndEnrolledCourses(coaepID, parsedProgramID);
  const { data: performanceData, isLoading: fetchingPerformanceData } = usePerformanceDataByProgram(coaepID, parsedProgramID);
  const selectedCourse = localStorage.getItem("selectedCourse")
  const parsedSelectedCourse = JSON.parse(selectedCourse || "")
  const { data: criteria } = useCriteria(parsedCourseID)

  const student = useMemo(() => {
    if (!classlist?.classlist.length) return null

    const s = classlist?.classlist.find((stud) => (
      stud.UserID === studentID
    ))

    return ({
      UserID: s?.UserID,
      Fullname: `${s?.User?.Lastname} ${s?.User?.Firstname} ${s?.User?.Middlename.charAt(0) || ""}.`.trim()
    })
  }, [classlist?.classlist])


  const criteriaByILO = useMemo(() => {
    if (!criteria?.criteria.length) return {}
    return criteria.criteria.reduce((acc: Record<number, typeof criteria.criteria>, c) => {
      if (!acc[c.IntendedLearningOutcomeID]) {
        acc[c.IntendedLearningOutcomeID] = []
      }
      acc[c.IntendedLearningOutcomeID].push(c)
      return acc
    }, {})

  }, [criteria?.criteria])

  const scores = useMemo(() => {
    if (!coaep?.coaep || !performanceData?.scores?.length) return [];
    return performanceData.scores
      .filter((sc) => sc.StudentID === student?.UserID)
      .map((s) => ({
        student_id: s.StudentID,
        coaep_id: coaepID,
        ilo_id: s.IntendedLearningOutcomeID,
        value: s.Value,
        status: s.Status
      }));
  }, [coaep?.coaep, performanceData?.scores, classlist?.classlist, student?.UserID]);


  const courseOutcomeWeights = useMemo(() => {
    if (!coaep?.coaep?.CourseOutcomes?.length) return {}

    const levelWeights = {
      Introductory: 20,
      Enabling: 30,
      Demonstrative: 50
    }
    const levelCounts: Record<string, number> = {}

    for (const co of coaep?.coaep?.CourseOutcomes) {
      levelCounts[co.Level] = (levelCounts[co.Level] || 0) + 1
    }

    const calculateWeights: Record<number, number> = {}

    for (const co of coaep?.coaep?.CourseOutcomes) {
      const count = levelCounts[co.Level]
      const totalWeight = levelWeights[co.Level as keyof typeof levelWeights]
      calculateWeights[co.ID] = totalWeight / count
    }

    return calculateWeights

  }, [coaep?.coaep?.CourseOutcomes])

  if (fetchingCoaep || fetchingPerformanceData || fetchingClasslist) return
  if (fetchingCoaepError) return
  return (
    <>
      <AppLabel currentPage="Performance Data" />
      <div className="mb-6 flex flex-col">
        <div className="flex justify-start gap-1 items-center text-3xl font-bold text-[#1F2937] ">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <CircleArrowLeft className="text-2xl" />
          </Button>
          Student Performance Data
        </div>
        <p className="ml-[3.7rem] text-md">{`${parsedSelectedCourse.Course_No}-${parsedSelectedCourse.Course_Name}`}</p>
      </div>
      <Table >
        <TableHeader className="bg-[#CBD2DB] hover:bg-[#CBD2DB]">
          <TableRow className="font-bold hover:bg-[CBD2DB] text-md">
            <TableHead className="text-[#1F2937]">Course Outcome</TableHead>
            <TableHead className="text-[#1F2937]">Weight</TableHead>
            <TableHead className="text-[#1F2937]">ILO</TableHead>
            <TableHead className="text-[#1F2937]">P.PER</TableHead>
            <TableHead className="text-[#1F2937]">T.SCORE</TableHead>
            <TableHead className="text-[#1F2937]">SCORE</TableHead>
            <TableHead className="text-[#1F2937]">GRADE</TableHead>
            <TableHead className="text-[#1F2937]">TRANSMUTED</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coaep?.coaep.CourseOutcomes.map((co) => (
            <Fragment key={co.ID}>
              {co.IntendedLearningOutcomes.map((ilo, index) => (
                <TableRow key={`${co.ID}-${ilo.ID}`}>
                  {index === 0 && (
                    <>
                      <TableCell rowSpan={co.IntendedLearningOutcomes.length} className="align-middle max-w-7">
                        <span className="font-medium border rounded-lg bg-[#CBD2DB] text-[#1F2937] py-[2px] px-[5px]">
                          {`${co.Level}: `}
                        </span>
                        {co.Statement}
                      </TableCell>
                      <TableCell rowSpan={co.IntendedLearningOutcomes.length} className="align-middle ">
                        {courseOutcomeWeights[co.ID]?.toFixed(0)}%
                      </TableCell>
                    </>
                  )}
                  <TableCell className="">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="cursor-pointer">{`ILO ${index + 1}`}</div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{ilo.Statement}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="">{ilo.AssessmentTool.TargetScore}%</TableCell>
                  <TableCell className="">
                    {criteriaByILO[ilo.ID]?.length ? (
                      <ul className=" pl-4">
                        {criteriaByILO[ilo.ID].map((crit) => (
                          <li key={crit.ID}>{crit.Criteria}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-400 italic">No criteria found</span>
                    )}
                  </TableCell>
                  <TableCell className="">
                    {(() => {
                      const score = scores.find((sc) => sc.ilo_id === ilo.ID)
                      return (
                        <>
                          <TableCell >
                            {score ? `${score.value}` : <span className="text-gray-400 italic">No score </span>}
                          </TableCell>
                        </>
                      )
                    })()}
                  </TableCell>
                  <TableCell className="">
                    {(() => {
                      const score = scores.find((sc) => sc.ilo_id === ilo.ID)
                      return (
                        <>
                          <ul>
                            {criteriaByILO[ilo.ID].map((crit) => {
                              return (
                                <li key={crit.ID}>{(((score?.value || 0) / crit.Criteria) * 100).toFixed(0)}%</li>
                              )
                            })}
                          </ul>
                        </>
                      )
                    })()}
                  </TableCell>
                  <TableCell className="">{
                    (() => {

                      const score = scores.find((sc) => sc.ilo_id === ilo.ID)
                      const gradeArray = criteriaByILO[ilo.ID].map((crit) => {
                        const grade = ((score?.value || 0) / crit.Criteria) * 100
                        const finalGrade = grade >= 60
                          ? ((grade - 60) / 1.6) + 75
                          : (grade / 4) + 60
                        return finalGrade.toFixed(0) // or `.toFixed(0)` if you want an integer
                      })
                      return (
                        <div>{gradeArray}%</div>
                      )
                    })()
                  }</TableCell>
                </TableRow>
              ))}
            </Fragment>
          ))}
          <TableRow>
            <TableCell colSpan={2} className="text-right font-medium">
              Final Grade:
            </TableCell>
            <TableCell className="text-center font-medium">Grade</TableCell>
            <TableCell colSpan={8}></TableCell>
          </TableRow>
        </TableBody>
      </Table >
    </>
  )
}
