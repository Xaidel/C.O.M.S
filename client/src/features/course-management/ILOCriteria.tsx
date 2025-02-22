import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useParams } from "react-router-dom"
import { useCOAEPByCourse } from "../faculty/useCOAEPByCourse";
import { Fragment } from "react/jsx-runtime";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useAddCriteria } from "../faculty/useAddCriteria";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useCriteria } from "../faculty/useCriteria";

interface criteriaRequest {
  ilo_id: number
  criteria: number | null
  section_id: number
}

export default function ILOCriteria() {
  const { courseID } = useParams<{ courseID: string }>()
  const { sectionID } = useParams<{ sectionID: string }>()
  const [criteriaValues, setCriteriaValues] = useState<{ [key: number]: number | null }>({})
  const [criteriaInput, setCriteriaInput] = useState<criteriaRequest | null>(null)
  const [debounceValue, setDebounceValue] = useState<criteriaRequest | null>(null)
  const { mutate: addCriteria, isCreating } = useAddCriteria()
  const parsedCourseID = parseInt(courseID || "0", 10)
  const parsedSectionID = parseInt(sectionID || "0", 10)
  const { data: coaep, isLoading: fetchingCoaep, error: fetchingCoaepError } = useCOAEPByCourse(parsedCourseID)
  const { data: criteria, isLoading: fetchingCriteria, error: fetchingCriteriaError } = useCriteria(parsedSectionID)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (criteria?.criteria) {
      criteria.criteria.map((crit) => {
        setCriteriaValues((prev) => ({ ...prev, [crit.IntendedLearningOutcomeID]: crit.Criteria }))
      })
    }
  }, [criteria?.criteria])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(criteriaInput)
    }, 1000)
    return () => {
      clearTimeout(handler)
    }
  }, [criteriaInput])

  const handleCriteriaChange = (ilo_id: number, criteria: number | null, section_id: number) => {
    setCriteriaValues(prev => ({ ...prev, [ilo_id]: criteria }))
    setCriteriaInput({ ilo_id, criteria, section_id })
  }

  useEffect(() => {
    if (debounceValue && !isCreating) {
      addCriteria(debounceValue, {
        onError: () => {
          toast({
            variant: "destructive",
            title: "Error!",
            description: "Error updating Criteria",
            duration: 3500
          })
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [`criteria-${parsedSectionID}`] })
        }
      })
    }
  }, [debounceValue])

  if (fetchingCoaep || fetchingCriteria) return
  if (fetchingCoaepError || fetchingCriteriaError) return
  return (
    <>
      <Table>
        <TableHeader className="bg-[#CBD2DB] hover:bg-[#CBD2DB]">
          <TableRow className="font-bold hover:bg-[#CBD2DB]">
            <TableHead rowSpan={2} className="border text-black">CO#</TableHead>
            <TableHead rowSpan={2} className="border text-black">Course Outcomes</TableHead>
            <TableHead rowSpan={2} className="border text-black">Intended Learning Outcomes</TableHead>
            <TableHead rowSpan={2} className="border text-black">Total Score</TableHead>
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
                    <TableCell className="border">{ }</TableCell>
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
                                value={criteriaValues[ilo.ID] === 0 ? "" : criteriaValues[ilo.ID] ?? ""}
                                onChange={(e) => {
                                  const newValue = e.target.value === "" ? null : parseInt(e.target.value, 10)
                                  handleCriteriaChange(ilo.ID, newValue, parsedSectionID)
                                  setCriteriaInput({ ilo_id: ilo.ID, criteria: newValue, section_id: parsedSectionID })
                                }}
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
          ) : <div>No COAEP</div>}
        </TableBody>
      </Table>
    </>
  )
}
