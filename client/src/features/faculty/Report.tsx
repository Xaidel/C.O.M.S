import { useParams } from "react-router-dom";
import { IntendedLearningOutcomes, Period, Recommendation } from "@/types/Interface";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCOAEPByCourse } from "./useCOAEPByCourse";
import { Fragment } from "react/jsx-runtime";
import { useEvaluation } from "./useEvaluation";
import { useAddRecommendation } from "./useAddRecommendation";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import RecommendationInput from "./RecommendationInput";
import { useQueryClient } from "@tanstack/react-query";
import { PDF } from "../pdf/PDF";
import { useUser } from "../auth/useUser";
import { useCurrentPeriod } from "../auth/useCurrentPeriod";
import { Button } from "@/components/ui/button";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from 'file-saver'

const formatYear = (current: Period) => {
  return ` 20${current.School_Year.slice(0, 2)}-20${current.School_Year.slice(2)}`;
};

const formatSem = (current: Period) => {
  let formattedSem;
  if (current.Semester === 1) {
    formattedSem = `${current?.Semester}st Semester`;
  } else if (current.Semester === 2) {
    formattedSem = `${current?.Semester}nd Semester`;
  } else {
    formattedSem = `Summer Semester`;
  }
  return formattedSem
}
export default function Report() {
  const { courseID } = useParams<{ courseID: string }>()
  const [recommendationInput, setRecommendationInput] = useState<Recommendation | null>(null)
  const [debounceRecommendation, setDebounceRecommendation] = useState<Recommendation | null>(null)
  const parsedCourseID = parseInt(courseID || "", 10)
  const { sectionID } = useParams<{ sectionID: string }>()
  const parsedSectionID = parseInt(sectionID || "", 10)
  const { data: coaep, isLoading: fetchingCoaep } = useCOAEPByCourse(parsedCourseID)
  const { data: evaluations, isLoading: fetchingEval, error } = useEvaluation(coaep?.coaep.ID || 0, parsedSectionID || 0)
  const { mutate: addRecommendation, isCreating } = useAddRecommendation(parsedSectionID)
  const selectedCourse = sessionStorage.getItem("selectedCourse")
  const selectedCourseObj = selectedCourse ? JSON.parse(selectedCourse) : null
  let phName;
  if (selectedCourse) {
    const { User } = selectedCourseObj.Curriculum.Program.ProgramHead
    const middleName: string = User.Middlename
    const initial = middleName ? `${middleName.charAt(0)}.` : ""
    phName = `${User.Firstname} ${initial} ${User.Lastname}`
  }
  const { currentUser } = useUser()
  const { User } = currentUser?.role_info
  const middleInitial = User?.Middlename !== undefined ? `${User?.Middlename.charAt(0)}.` : ""
  const fullname = `${User?.Firstname} ${middleInitial} ${User.Lastname}`
  const selected = sessionStorage.getItem("selectedCourse")
  const parsedSelected = selected ? JSON.parse(selected) : null
  const { Course } = parsedSelected
  const { response } = useCurrentPeriod()
  let currentYear;
  let currentSem
  const handleDownload = async () => {
    await queryClient.invalidateQueries({ queryKey: [`${parsedSectionID}-evaluation`] })

    const doc = (
      <PDF
        cos={coaep!.coaep!.CourseOutcomes}
        evaluations={evaluations!.res}
        programHeadName={phName!}
        currentYear={currentYear!}
        currentSem={currentSem!}
        fullname={fullname}
        Course={Course}
      />
    )

    const blob = await pdf(doc).toBlob()
    console.log(blob)
    saveAs(blob, `Course Outcome Assessment & Evaluation Plan ${Course.Course_Name} -- ${fullname}.pdf`)


  }
  if (response?.current_period) {
    currentYear = formatYear(response?.current_period)
    currentSem = formatSem(response?.current_period)
  }
  const queryClient = useQueryClient()
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceRecommendation(recommendationInput)
    }, 300)
    return () => {
      clearTimeout(handler)
    }
  }, [recommendationInput])

  useEffect(() => {
    if (debounceRecommendation && !isCreating) {
      addRecommendation(debounceRecommendation, {
        onError: () => {
          toast({
            variant: "destructive",
            title: "Error!!",
            description: "Error adding Recommendation",
            duration: 3500
          })
        },
        onSuccess: () => {
          toast({
            variant: "success",
            title: "Success!",
            description: "Recommendation saved",
            duration: 1500
          })
          queryClient.invalidateQueries({ queryKey: [`${parsedSectionID}-evaluation` || ""] })
        }
      })
    }
  }, [debounceRecommendation])


  const handleRecommendationChange = (comment: string, ilo_id: number, section_id: number) => {
    setRecommendationInput({ comment, ilo_id, section_id })
  }

  if (fetchingCoaep || fetchingEval) return <div className="flex justify-center">Fetching Evaluation Data</div>
  if (error) return <div className="flex justify-center">No Performance Data Yet</div>
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
              <TableHead rowSpan={2} className="border text-black text-center hover:bg-[#CBD2DB]">Performance Target</TableHead>
              <TableHead colSpan={2} className="border text-black text-center hover:bg-[#CBD2DB]">Performance Data</TableHead>
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
                      <TableCell className="border text-left">{`
                        At least 80% of enrolled students with a rating of at least 60% of the total score
                        `}</TableCell>
                      <TableCell className="border text-center text-neutral-400">
                        {(evaluations?.res[0]?.total_passed !== 0 && evaluations!.res[0]?.total_population > 0)
                          ? `${evaluations?.res[0]?.total_passed}/${evaluations?.res[0]?.total_population}`
                          : `No Data`
                        }
                      </TableCell>
                      <TableCell className="border text-center">{evaluations?.res[0].total_percentage}</TableCell>
                      <TableCell className="border text-center text-red-400 font-bold">
                        {
                          (evaluations?.res[0]?.total_percentage !== undefined && evaluations?.res[0]?.total_percentage >= co.IntendedLearningOutcomes[0].AssessmentTool.TargetPopulation)
                            ? (<p className="text-green-400 text-center">S</p>) : (<p className="text-red-400 text-center">NS</p>)
                        }
                      </TableCell>
                      <TableCell className="border"></TableCell>
                    </TableRow>
                  ) : (
                    <>
                      <TableRow>
                        <TableCell rowSpan={co.IntendedLearningOutcomes.length + 1} className="border">{index + 1}</TableCell>
                        <TableCell rowSpan={co.IntendedLearningOutcomes.length + 1} className="border">{co.Statement}</TableCell>
                      </TableRow>
                      {co.IntendedLearningOutcomes.map((ilo: IntendedLearningOutcomes) => {
                        const data = evaluations?.res.find(data => data.ilo_id === ilo.ID)
                        return (
                          <Fragment key={ilo.ID}>
                            < TableRow key={ilo.ID} >
                              <TableCell className="border">{ilo.Statement}</TableCell>
                              <TableCell className="border text-left">{ilo.AssessmentTool.Tool}</TableCell>
                              <TableCell className="border text-left">{`
At least ${ilo.AssessmentTool.TargetPopulation}% of enrolled students with a rating of at least ${ilo.AssessmentTool.TargetScore}% of the total score
                        `}</TableCell>
                              <TableCell className="border text-center">
                                {`${data?.total_passed}/${data?.total_population}`}
                              </TableCell>
                              <TableCell className="border text-center">{`${data?.total_percentage}%`}</TableCell>
                              <TableCell className="border font-bold text-lg">
                                {
                                  data?.total_percentage === 0 && data?.total_failed === 0
                                    ? <p className="text-center text-gray-500">No Data</p>
                                    : (data?.total_percentage !== undefined && data?.total_percentage >= ilo.AssessmentTool.TargetPopulation)
                                      ? (<p className="text-green-400 text-center">S</p>) : (<p className="text-red-400 text-center">NS</p>)
                                }
                              </TableCell>
                              <TableCell className="border">
                                <RecommendationInput initialRecommendation={data?.recommendation || ""}
                                  sectionID={parsedSectionID}
                                  ilo_id={ilo.ID}
                                  isPassed={data?.total_percentage !== undefined && data?.total_percentage >= ilo.AssessmentTool.TargetPopulation || data?.total_percentage === 0 && data?.total_failed === 0}
                                  handleRecommendationChange={handleRecommendationChange}
                                />
                              </TableCell>
                            </TableRow>
                          </Fragment>)
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
        <div className="w-full flex justify-end">
          <Button
            onClick={handleDownload}
          >
            Download PDF
          </Button>
        </div>
      </div >
    </>
  )
}

